import { NextResponse } from 'next/server'
import { query } from '@/lib/mysql'

// ⚠️ Changed from 'edge' to 'nodejs' to support PostgreSQL
export const runtime = 'nodejs'

const INFLUX_BASE = process.env.INFLUX_URL || process.env.INFLUX_HOST || 'http://localhost:8086'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { username, password } = body || {}

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing username or password' }, { status: 400 })
    }

    // Only allow 'admin' username for admin system
    if (username.toLowerCase() !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied. Only admin users are allowed.' },
        { status: 403 }
      )
    }

    // Query database for admin user authentication from 'users' table
    try {
      const users = await query(
        'SELECT "userID", "userName", "userPassword", "userFULLNAME" FROM users WHERE LOWER("userName") = $1 LIMIT 1',
        ['admin']
      ) as any[]

      if (!users || users.length === 0) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
      }

      const user = users[0]

      // Check password (stored as integer)
      if (parseInt(password) !== user.userPassword) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
      }

      // Verify InfluxDB is reachable (health endpoint)
      try {
        const healthRes = await fetch(`${INFLUX_BASE}/health`)
        if (!healthRes.ok) {
          return NextResponse.json({ error: 'InfluxDB is not healthy or unreachable' }, { status: 502 })
        }
        const health = await healthRes.json().catch(() => ({}))
        if (health && health.status && health.status !== 'pass') {
          return NextResponse.json({ error: 'InfluxDB reports unhealthy' }, { status: 502 })
        }
      } catch (e) {
        return NextResponse.json({ error: 'Failed to reach InfluxDB' }, { status: 502 })
      }

      const token = `admin-token-${user.userID}-${Date.now()}`
      return NextResponse.json({
        token,
        username: user.userName,
        userId: user.userID,
        fullName: user.userFULLNAME
      })

    } catch (dbError: any) {
      console.error('Database error:', dbError)
      return NextResponse.json({
        error: 'Database connection failed: ' + (dbError?.message || 'Unknown error')
      }, { status: 500 })
    }

  } catch (err: any) {
    console.error('Login error:', err)
    return NextResponse.json({
      error: 'Server error: ' + (err?.message || 'Unknown error')
    }, { status: 500 })
  }
}
