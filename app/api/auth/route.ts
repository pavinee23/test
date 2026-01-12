import { NextResponse } from 'next/server'
import { query } from '@/lib/mysql'

// ⚠️ Changed from 'edge' to 'nodejs' to support PostgreSQL
export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { username, password } = body || {}

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing username or password' }, { status: 400 })
    }

    // ตรวจสอบ username/password จาก PostgreSQL database table 'users'
    // Allow all users to login (not restricted to admin only)
    try {
      const users = await query(
        'SELECT "userID", "userName", "userPassword", "userFULLNAME" FROM users WHERE "userName" = $1 LIMIT 1',
        [username]
      ) as any[]

      if (!users || users.length === 0) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
      }

      const user = users[0]

      // เช็ค password (ตอนนี้เป็น INT ตรวจสอบแบบตรงๆ)
      // ⚠️ WARNING: Storing passwords as plain integers is NOT secure for production!
      if (parseInt(password) !== user.userPassword) {
        return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
      }

      // Login สำเร็จ - สร้าง token
      const token = `user-token-${user.userID}-${Date.now()}`

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
    console.error('Auth error:', err)
    return NextResponse.json({
      error: 'Server error: ' + (err?.message || 'Unknown error')
    }, { status: 500 })
  }
}
