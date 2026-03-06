import { cn } from '@/lib/utils'

interface KPITileProps {
  name: string
  value: string
  threshold: string
  status: 'green' | 'yellow' | 'red'
  disabled?: boolean
}

export default function KPITile({ name, value, threshold, status, disabled }: KPITileProps) {
  const statusColors = {
    green: 'border-brand-success',
    yellow: 'border-brand-warning',
    red: 'border-brand-danger',
  }

  if (disabled) {
    return (
      <div className="bg-white rounded-lg border border-border p-4">
        <p className="font-body text-xs text-text-muted mb-2">{name}</p>
        <div className="flex items-center justify-center py-4">
          <span className="inline-flex items-center rounded border border-gray-300 bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-500">
            Tracking not enabled
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('bg-white rounded-lg border-l-4 border-t border-r border-b p-4', statusColors[status])}>
      <p className="font-body text-xs text-text-muted mb-2">{name}</p>
      <p className="font-display text-[32px] font-bold text-text-primary leading-none mb-2">
        {value}
      </p>
      <p className="font-body text-[11px] text-text-muted">{threshold}</p>
    </div>
  )
}
