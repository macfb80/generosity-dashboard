import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://generosity-sales-engine-mvp-api.onrender.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Call backend API
    const res = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    })

    const { token } = res.data

    // Create response and set httpOnly cookie
    const response = NextResponse.json({ success: true }, { status: 200 })
    
    response.cookies.set('generosity_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || 'Authentication failed' },
        { status: error.response?.status || 401 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
