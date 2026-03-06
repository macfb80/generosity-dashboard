import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

type StatusVariant = 'green' | 'yellow' | 'red' | 'blue' | 'gray' | 'orange' | 'phase2'

interface StatusBadgeProps {
  label: string
  variant: StatusVariant
  className?: string
}

export default function StatusBadge({ label, variant, className }: StatusBadgeProps) {
  // Normalize label to title case
  const displayLabel =
    variant === 'phase2'
      ? 'Phase 2'
      : label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()

  const variantStyles = {
    green: 'bg-brand-success/10 text-brand-success border-brand-success/20',
    yellow: 'bg-brand-warning/10 text-brand-warning border-brand-warning/20',
    red: 'bg-brand-danger/10 text-brand-danger border-brand-danger/20',
    blue: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    gray: 'bg-gray-100 text-gray-600 border-gray-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    phase2: 'bg-gray-100 text-gray-500 border-gray-200',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border',
        variantStyles[variant],
        className
      )}
    >
      {variant === 'phase2' && <Lock className="w-3 h-3" />}
      {displayLabel}
    </span>
  )
}
