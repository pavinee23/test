import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/mysql'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Only allow 'admin' username for R&D System
    if (username.toLowerCase() !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied. Only admin users are allowed.' },
        { status: 403 }
      )
    }

    // Query database for admin user authentication from 'users' table
    const result = await query(
      'SELECT "userID", "userName", "userFULLNAME" FROM users WHERE LOWER("userName") = $1 AND "userPassword" = $2',
      ['admin', parseInt(password)]
    )

    if (result && result.length > 0) {
      const user = result[0]

      // Generate a simple token (in production use JWT or proper session)
      const token = btoa(`${user.userName}:${user.userID}:${Date.now()}`)

      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful',
        user: {
          id: user.userID,
          username: user.userName,
          fullname: user.userFULLNAME
        }
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Database connection failed: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    )
  }
}