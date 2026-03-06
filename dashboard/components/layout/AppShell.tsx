'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import apiClient from '@/lib/api'
import { AuthUser } from '@/lib/types'

interface AppShellProps {
  children: React.ReactNode
  pageTitle: string
}

const fetcher = async (url: string): Promise<AuthUser> => {
  const res = await apiClient.get(url)
  return res.data
}

export default function AppShell({ children, pageTitle }: AppShellProps) {
  const [mounted, setMounted] = useState(false)
  
  const { data: user } = useSWR<AuthUser>('/auth/me', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 300000, // 5 minutes
    onError: () => {
      // Silent fail - show "—" in UI
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar tenantName={user?.tenant_name} role={user?.role} />
      <div className="ml-60">
        <Topbar pageTitle={pageTitle} tenantName={user?.tenant_name} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
