import { CampaignRunResult } from '@/lib/types'
import { displayType, titleStatus, normalizeStatus } from '@/lib/utils'
import StatusBadge from '../shared/StatusBadge'
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react'

interface CampaignResultsProps {
  result: CampaignRunResult
  onRunAnother: () => void
}

export default function CampaignResults({ result, onRunAnother }: CampaignResultsProps) {
  const statusVariant = (() => {
    const status = normalizeStatus(result.campaign.status)
    if (status === 'running') return 'blue'
    if (status === 'completed') return 'green'
    if (status === 'failed') return 'red'
    return 'gray'
  })()

  return (
    <div className="bg-white rounded-lg border border-border p-6 space-y-6">
      <div>
        <h3 className="font-display font-bold text-lg text-text-primary mb-2">
          Campaign Results
        </h3>
        <div className="flex items-center gap-3">
          <p className="font-body text-sm text-text-muted">
            Campaign ID:{' '}
            <span className="font-mono text-xs text-text-primary">{result.campaign.id}</span>
          </p>
          <StatusBadge
            label={titleStatus(result.campaign.status)}
            variant={statusVariant as any}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Prospects Selected */}
        <div className="bg-gray-50 rounded-lg p-4 border border-border">
          <p className="font-body text-xs text-text-muted mb-1">Prospects Selected</p>
          <p className="font-display text-2xl font-bold text-text-primary">
            {result.prospects_selected}
          </p>
        </div>

        {/* Emails Sent */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="font-body text-xs text-green-700 font-medium">Emails Sent</p>
          </div>
          <p className="font-display text-2xl font-bold text-green-700">
            {result.emails_sent}
          </p>
        </div>

        {/* Emails Failed */}
        <div
          className={`rounded-lg p-4 border ${
            result.emails_failed === 0
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            {result.emails_failed === 0 ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
            <p
              className={`font-body text-xs font-medium ${
                result.emails_failed === 0 ? 'text-green-700' : 'text-red-700'
              }`}
            >
              Emails Failed
            </p>
          </div>
          <p
            className={`font-display text-2xl font-bold ${
              result.emails_failed === 0 ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {result.emails_failed}
          </p>
        </div>

        {/* Emails Skipped */}
        <div className="bg-gray-50 rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <MinusCircle className="w-4 h-4 text-gray-500" />
            <p className="font-body text-xs text-text-muted font-medium">Emails Skipped</p>
          </div>
          <p className="font-display text-2xl font-bold text-text-muted">
            {result.emails_skipped}
          </p>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="border-t border-border pt-4">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <dt className="font-body text-xs text-text-muted mb-1">Campaign Name</dt>
            <dd className="font-body text-sm text-text-primary font-medium">
              {result.campaign.name}
            </dd>
          </div>
          <div>
            <dt className="font-body text-xs text-text-muted mb-1">Product</dt>
            <dd className="font-body text-sm text-text-primary font-medium">
              {displayType(result.campaign.type)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Run Another Button */}
      <button
        onClick={onRunAnother}
        className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-display font-bold py-3 px-6 rounded-md transition-colors"
      >
        Run Another Campaign
      </button>
    </div>
  )
}
