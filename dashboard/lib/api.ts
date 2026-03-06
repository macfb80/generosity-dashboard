import axios, { AxiosError, AxiosInstance } from 'axios'
import { getClientToken } from './auth'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://generosity-sales-engine-mvp-api.onrender.com'

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - inject token
apiClient.interceptors.request.use(
  (config) => {
    // Try to get token from client-side cookie
    const token = getClientToken()
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        document.cookie = 'generosity_token=; Max-Age=0; path=/'
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

// Server-side API client factory (accepts token directly)
export function createServerApiClient(token: string): AxiosInstance {
  return axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

// Client-side default export
export default apiClient

// API response wrapper type
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  isFallback: boolean
}

// Generic API call wrapper with fallback handling
export async function apiCall<T>(
  fn: () => Promise<T>
): Promise<ApiResponse<T>> {
  try {
    const data = await fn()
    return { data, error: null, isFallback: false }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status
      
      // Network timeout or no response
      if (!error.response || error.code === 'ECONNABORTED') {
        return { data: null, error: 'Network timeout', isFallback: true }
      }
      
      // 404 or 500 - trigger fallback
      if (statusCode === 404 || statusCode === 500) {
        return { data: null, error: `Server error: ${statusCode}`, isFallback: true }
      }
      
      // Other errors
      return { data: null, error: error.message, isFallback: false }
    }
    
    return { data: null, error: 'Unknown error', isFallback: false }
  }
}
