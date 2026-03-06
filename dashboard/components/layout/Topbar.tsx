'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

interface TopbarProps {
  pageTitle: string
  tenantName?: string
}

export default function Topbar({ pageTitle, tenantName }: TopbarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <header className="h-14 bg-white border-b border-border flex items-center justify-between px-6">
      <h1 className="font-display text-lg font-bold text-text-primary">{pageTitle}</h1>
      <div className="flex items-center gap-4">
        {tenantName && (
          <span className="inline-flex items-center rounded-full bg-brand-blue px-3 py-1 text-xs font-medium text-white">
            {tenantName}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-text-muted hover:text-brand-danger transition-colors"
          title="Sign out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
