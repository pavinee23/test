import mysql from 'mysql2/promise'

// Create MySQL connection pool for user database
const pool = mysql.createPool({
  host: process.env.MYSQL_USER_HOST || process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_USER_PORT || process.env.MYSQL_PORT || '3307'),
  user: process.env.MYSQL_USER_USER || process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_USER_PASSWORD || process.env.MYSQL_PASSWORD || 'Zera2025data',
  database: process.env.MYSQL_USER_DATABASE || process.env.MYSQL_DATABASE || 'user',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 10000, // 10 seconds for Vercel compatibility
  timezone: '+00:00'
})

// Note: Connection test removed for serverless compatibility
// Connections are created on-demand when needed

/**
 * Execute MySQL query with automatic connection management
 * @param sql SQL query string
 * @param values Query parameters (optional)
 * @returns Query results
 */
export async function queryUser(sql: string, values?: any[]): Promise<any[]> {
  let connection
  try {
    connection = await pool.getConnection()
    const [rows] = await connection.execute(sql, values)
    return rows as any[]
  } catch (error: any) {
    console.error('❌ MySQL query error:', error.message)
    throw new Error(`Database query failed: ${error.message}`)
  } finally {
    if (connection) {
      connection.release()
    }
  }
}

/**
 * Authenticate user login
 * @param username Username
 * @param password Password (plain text - will be compared with hashed)
 * @param site Site/Branch
 * @returns User data if authenticated, null otherwise
 */
export async function authenticateUser(
  username: string,
  password: string,
  site?: string
): Promise<{
  userId: number
  userName: string
  name: string
  email: string
  site: string
  typeID: number
} | null> {
  const sql = `
    SELECT userId, userName, name, email, site, password, typeID
    FROM user_list
    WHERE userName = ?
    LIMIT 1
  `

  const connection = await pool.getConnection()

  try {
    const [rows] = await connection.execute(sql, [username])
    const users = rows as any[]

    if (users.length === 0) {
      return null
    }

    const user = users[0]

    // Check if password matches (plain text comparison for now)
    // TODO: Use bcrypt for password hashing in production
    if (user.password !== password) {
      return null
    }

    // If site is provided, check if it matches (case-insensitive)
    if (site && user.site) {
      if (user.site.toLowerCase() !== site.toLowerCase()) {
        return null
      }
    } else if (site && !user.site) {
      // User has no site in database but site is required
      return null
    }

    // Return user data (without password)
    return {
      userId: user.userId,
      userName: user.userName,
      name: user.name || '',
      email: user.email || '',
      site: user.site || '',
      typeID: user.typeID
    }
  } finally {
    connection.release()
  }
}

/**
 * Get user by ID
 * @param userId User ID
 * @returns User data
 */
export async function getUserById(userId: number): Promise<any | null> {
  const sql = `
    SELECT ul.userId, ul.userName, ul.name, ul.email, ul.site, ul.typeID,
           ct.TypeName, ct.departmentID, ct.departmentName
    FROM user_list ul
    LEFT JOIN cus_type ct ON ul.typeID = ct.typeID
    WHERE ul.userId = ?
    LIMIT 1
  `

  const connection = await pool.getConnection()

  try {
    const [rows] = await connection.execute(sql, [userId])
    const users = rows as any[]

    if (users.length === 0) {
      return null
    }

    return users[0]
  } finally {
    connection.release()
  }
}

/**
 * Record login log to U_log_login table
 * @param userId User ID
 * @param pageName Page name where user logged in
 * @returns boolean true if logged successfully
 */
export async function recordLoginLog(userId: number, pageName: string = 'home'): Promise<boolean> {
  const sql = `
    INSERT INTO U_log_login (userID, name, login_timestamp, page_log, create_by)
    SELECT ?, name, NOW(), ?, 'Auto system'
    FROM user_list
    WHERE userId = ?
    LIMIT 1
  `

  const connection = await pool.getConnection()

  try {
    await connection.execute(sql, [userId, pageName, userId])
    console.log(`✅ Login logged for userId ${userId} at page ${pageName}`)
    return true
  } catch (err: any) {
    console.error('❌ Failed to record login log:', err.message)
    return false
  } finally {
    connection.release()
  }
}

// Export pool for advanced usage
export { pool }
