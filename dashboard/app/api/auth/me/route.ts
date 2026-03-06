import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { cookies } from 'next/headers'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://generosity-sales-engine-mvp-api.onrender.com'

export async function GET(request: NextRequest) {
  try {
    // Get token from httpOnly cookie
    const cookieStore = await cookies()
    const tokenCookie = cookieStore.get('generosity_token')
    
    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Call backend API with token
    const res = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    })

    return NextResponse.json(res.data, { status: 200 })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.error || 'Unauthorized' },
        { status: error.response?.status || 401 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
