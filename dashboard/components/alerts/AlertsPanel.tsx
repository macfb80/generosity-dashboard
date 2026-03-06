import { Alert } from '@/lib/types'
import { relativeTime } from '@/lib/utils'
import StatusBadge from '../shared/StatusBadge'
import { CheckCircle } from 'lucide-react'

interface AlertsPanelProps {
  alerts: Alert[]
}

const LEVEL_VARIANTS = {
  CRITICAL: 'red',
  WARNING: 'orange',
  WATCH: 'yellow',
  INFO: 'blue',
} as const

const LEVEL_ORDER = { CRITICAL: 0, WARNING: 1, WATCH: 2, INFO: 3 }

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  // Sort by level (most severe first), then by time (newest first)
  const sortedAlerts = [...alerts].sort((a, b) => {
    const levelDiff = LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]
    if (levelDiff !== 0) return levelDiff
    return new Date(b.triggered_at).getTime() - new Date(a.triggered_at).getTime()
  })

  const activeAlerts = sortedAlerts.filter((a) => !a.resolved)

  if (activeAlerts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 text-brand-success">
          <CheckCircle className="w-6 h-6" />
          <div>
            <h3 className="font-display font-bold text-base text-text-primary">
              All systems nominal
            </h3>
            <p className="font-body text-sm text-text-muted">No active alerts</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="font-display font-bold text-base text-text-primary">Active Alerts</h3>
      </div>
      <div className="divide-y divide-border">
        {activeAlerts.map((alert) => (
          <div key={alert.id} className="p-4 flex items-start gap-4">
            <StatusBadge
              label={alert.level}
              variant={LEVEL_VARIANTS[alert.level] as any}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-text-primary">{alert.message}</p>
            </div>
            <p className="font-body text-xs text-text-muted whitespace-nowrap">
              {relativeTime(alert.triggered_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
