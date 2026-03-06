'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Megaphone,
  GitBranch,
  MapPin,
  CheckSquare,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface SidebarProps {
  tenantName?: string
  role?: string
}

const navLinks = [
  { href: '/app/overview', label: 'Overview', icon: LayoutDashboard },
  { href: '/app/prospects', label: 'Prospects', icon: Users },
  { href: '/app/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/app/sequencing', label: 'Sequencing', icon: GitBranch },
  { href: '/app/geo-intel', label: 'Geo Intelligence', icon: MapPin },
  { href: '/app/approvals', label: 'Approvals', icon: CheckSquare },
  { href: '/app/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ tenantName, role }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-brand-navy flex flex-col">
      {/* Logo and Tenant Info */}
      <div className="p-6 border-b border-[#1E3A5F]">
        <div className="mb-4">
          <Image
            src="/generosity-logo.svg"
            alt="Generosity"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <div className="space-y-0.5">
          <p className="font-display text-[13px] font-bold text-brand-blue">
            {tenantName || '—'}
          </p>
          <p className="font-body text-[11px] text-[#94A3B8]">{role || '—'}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-body transition-colors',
                isActive
                  ? 'bg-[#0D2F4F] text-brand-blue border-l-3 border-brand-blue'
                  : 'text-white/80 hover:bg-[#0D2F4F] hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#1E3A5F] space-y-3">
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center rounded-full border border-brand-blue/50 px-3 py-1 text-[10px] font-medium text-[#94A3B8]">
            Home WTR Hub
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-[13px] font-body text-white/80 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
