import { GeoIntelligence } from '@/lib/types'
import { relativeTime } from '@/lib/utils'
import StatusBadge from '../shared/StatusBadge'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface GeoCardProps {
  data: GeoIntelligence
  compact?: boolean
}

export default function GeoCard({ data, compact }: GeoCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(data.narrative_text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const signalVariant =
    data.signal_level === 'high' ? 'red' : data.signal_level === 'medium' ? 'yellow' : 'gray'

  if (compact) {
    return (
      <div className="bg-white rounded-lg border border-border border-l-4 border-l-brand-blue p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-sm font-bold text-text-primary">
            {data.postal_code}
          </span>
          <StatusBadge label={data.signal_level} variant={signalVariant as any} />
        </div>
        <p className="font-body text-xs text-text-muted mb-1">
          <span className="font-medium">Utility:</span> {data.utility_name}
        </p>
        <p className="font-body text-xs text-text-muted">
          <span className="font-medium">Contaminant:</span> {data.contaminant}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-border border-l-4 border-l-brand-blue p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xl font-bold text-text-primary">
              {data.postal_code}
            </span>
            <StatusBadge label={`Signal: ${data.signal_level}`} variant={signalVariant as any} />
          </div>
          <p className="font-body text-sm text-text-muted">
            <span className="font-medium">Utility:</span> {data.utility_name}
          </p>
          <p className="font-body text-sm text-text-muted">
            <span className="font-medium">Contaminant:</span> {data.contaminant}
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <p className="font-body text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
          {data.narrative_text || 'Narrative pending for this region. Data refreshes weekly.'}
        </p>
      </div>

      <div className="border-t border-border pt-4 flex items-center justify-between">
        <p className="font-body text-xs text-text-muted">
          Last Refreshed: {relativeTime(data.last_refreshed)}
        </p>
        {data.narrative_text && (
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-md font-body text-sm text-text-primary hover:bg-gray-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Narrative
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
