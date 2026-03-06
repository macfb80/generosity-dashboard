'use client'

import { useState } from 'react'
import { ApprovalQueueItem } from '@/lib/types'
import { relativeTime, normalizeStatus } from '@/lib/utils'
import StatusBadge from '../shared/StatusBadge'

interface ApprovalQueueProps {
  items: ApprovalQueueItem[]
  onApprove?: (id: string, notes: string) => Promise<void>
  onReject?: (id: string, notes: string) => Promise<void>
}

export default function ApprovalQueue({ items, onApprove, onReject }: ApprovalQueueProps) {
  const [selectedItem, setSelectedItem] = useState<ApprovalQueueItem | null>(null)
  const [reviewNotes, setReviewNotes] = useState('')
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pendingItems = items.filter((item) => normalizeStatus(item.status) === 'pending')

  const handleOpenModal = (item: ApprovalQueueItem, action: 'approve' | 'reject') => {
    setSelectedItem(item)
    setActionType(action)
    setReviewNotes('')
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
    setActionType(null)
    setReviewNotes('')
  }

  const handleSubmit = async () => {
    if (!selectedItem || !actionType) return
    
    setIsSubmitting(true)
    try {
      if (actionType === 'approve' && onApprove) {
        await onApprove(selectedItem.id, reviewNotes)
      } else if (actionType === 'reject' && onReject) {
        await onReject(selectedItem.id, reviewNotes)
      }
      handleCloseModal()
    } catch (error) {
      console.error('Approval action failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (pendingItems.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-8 text-center">
        <p className="font-body text-sm text-text-muted">
          No items pending review. The queue will populate as campaigns are drafted.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pendingItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-muted capitalize">
                    {item.type}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-text-primary font-medium">
                    {item.subject}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-text-muted max-w-xs truncate">
                    {item.body_preview}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-muted">
                    {relativeTime(item.created_at)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge
                      label={item.status}
                      variant={
                        normalizeStatus(item.status) === 'pending'
                          ? 'yellow'
                          : normalizeStatus(item.status) === 'approved'
                          ? 'green'
                          : 'red'
                      }
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenModal(item, 'approve')}
                        className="px-3 py-1 bg-brand-success hover:bg-brand-success/90 text-white text-xs font-medium rounded transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleOpenModal(item, 'reject')}
                        className="px-3 py-1 bg-brand-danger hover:bg-brand-danger/90 text-white text-xs font-medium rounded transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-text-primary">
              {actionType === 'approve' ? 'Approve Item' : 'Reject Item'}
            </h3>
            <div className="space-y-2">
              <p className="font-body text-sm text-text-muted">
                <strong>Subject:</strong> {selectedItem.subject}
              </p>
              <p className="font-body text-sm text-text-muted">
                <strong>Preview:</strong> {selectedItem.body_preview}
              </p>
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-text-primary mb-2">
                Review Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Enter your review notes..."
                required
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-border rounded-md font-body text-sm text-text-primary hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !reviewNotes.trim()}
                className={`flex-1 px-4 py-2 rounded-md font-body text-sm text-white transition-colors disabled:opacity-50 ${
                  actionType === 'approve'
                    ? 'bg-brand-success hover:bg-brand-success/90'
                    : 'bg-brand-danger hover:bg-brand-danger/90'
                }`}
              >
                {isSubmitting ? 'Processing...' : actionType === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
