import { Campaign } from '@/lib/types'
import { displayType, normalizeStatus, titleStatus, relativeTime } from '@/lib/utils'
import StatusBadge from '../shared/StatusBadge'

interface CampaignListProps {
  campaigns: Campaign[]
}

export default function CampaignList({ campaigns }: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-8 text-center">
        <p className="font-body text-sm text-text-muted">
          No campaigns yet. Run your first campaign above.
        </p>
      </div>
    )
  }

  // Sort by created_at descending
  const sortedCampaigns = [...campaigns].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-display font-bold text-base text-text-primary">Campaign History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Pack
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Segment
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Emails Sent
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedCampaigns.map((campaign) => {
              const statusVariant = (() => {
                const status = normalizeStatus(campaign.status)
                if (status === 'running') return 'blue'
                if (status === 'completed') return 'green'
                if (status === 'failed') return 'red'
                if (status === 'paused') return 'yellow'
                return 'gray'
              })()

              return (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-primary font-medium">
                    {campaign.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-primary">
                    {displayType(campaign.type)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-muted capitalize">
                    {campaign.template_pack}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-muted capitalize">
                    {campaign.segment}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge label={titleStatus(campaign.status)} variant={statusVariant as any} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-primary">
                    {campaign.results?.emails_sent ?? '—'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-muted">
                    {relativeTime(campaign.created_at)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
