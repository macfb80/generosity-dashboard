import { ApprovalQueueItem } from '@/lib/types'
import { relativeTime, normalizeStatus } from '@/lib/utils'
import StatusBadge from '../shared/StatusBadge'

interface AuditLogProps {
  items: ApprovalQueueItem[]
}

export default function AuditLog({ items }: AuditLogProps) {
  // Filter to reviewed items only
  const reviewedItems = items.filter(
    (item) => normalizeStatus(item.status) !== 'pending'
  )

  // Sort by created_at descending (newest first)
  const sortedItems = [...reviewedItems].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  if (sortedItems.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-8 text-center">
        <p className="font-body text-sm text-text-muted">
          No audit records yet. Approved and rejected items will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="font-body text-sm text-blue-800">
          <strong>Read-Only Audit Record</strong> — This is an immutable audit record. No edits
          are permitted.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Decision
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Reviewed By
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedItems.map((item) => {
                const status = normalizeStatus(item.status)
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-body text-sm text-text-primary">
                      <div>
                        <p className="font-medium">{item.subject}</p>
                        <p className="text-xs text-text-muted">{item.type}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge
                        label={status}
                        variant={status === 'approved' ? 'green' : 'red'}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-muted">
                      {item.reviewed_by || '—'}
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-text-muted max-w-xs">
                      {item.review_notes || '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-muted">
                      {relativeTime(item.created_at)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
