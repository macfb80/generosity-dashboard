// Client-side only auth helpers
const TOKEN_COOKIE_NAME = 'generosity_token'

// Client-side token getter (reads from document.cookie)
export function getClientToken(): string | null {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find((c) => c.trim().startsWith(`${TOKEN_COOKIE_NAME}=`))
  
  if (!tokenCookie) return null
  
  return tokenCookie.split('=')[1]
}
