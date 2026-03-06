'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import AppShell from '@/components/layout/AppShell'
import ApprovalQueue from '@/components/approvals/ApprovalQueue'
import AuditLog from '@/components/approvals/AuditLog'
import FallbackCard from '@/components/shared/FallbackCard'
import apiClient, { apiCall } from '@/lib/api'
import { ApprovalQueueItem } from '@/lib/types'

const fetchApprovals = async (): Promise<ApprovalQueueItem[]> => {
  const res = await apiClient.get('/approvals')
  return res.data
}

const approveItem = async (id: string, notes: string): Promise<void> => {
  await apiClient.post(`/approvals/${id}/approve`, { review_notes: notes })
}

const rejectItem = async (id: string, notes: string): Promise<void> => {
  await apiClient.post(`/approvals/${id}/reject`, { review_notes: notes })
}

export default function ApprovalsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'pending' | 'audit'>('pending')

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: approvalsResponse, isLoading, mutate } = useSWR(
    mounted ? 'approvals' : null,
    async () => await apiCall(fetchApprovals),
    { revalidateOnFocus: false }
  )

  const approvalsData = approvalsResponse?.data || []
  const showFallback = approvalsResponse?.isFallback

  const handleApprove = async (id: string, notes: string) => {
    await approveItem(id, notes)
    mutate()
  }

  const handleReject = async (id: string, notes: string) => {
    await rejectItem(id, notes)
    mutate()
  }

  if (!mounted) return null

  return (
    <AppShell pageTitle="Approvals">
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Approvals</h2>
          <p className="font-body text-sm text-text-muted">
            Compliance Queue — Home WTR Hub Templates
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`pb-3 px-1 border-b-2 font-display text-sm font-medium transition-colors ${
                activeTab === 'pending'
                  ? 'border-brand-blue text-brand-blue'
                  : 'border-transparent text-text-muted hover:text-text-primary'
              }`}
            >
              Pending Queue
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`pb-3 px-1 border-b-2 font-display text-sm font-medium transition-colors ${
                activeTab === 'audit'
                  ? 'border-brand-blue text-brand-blue'
                  : 'border-transparent text-text-muted hover:text-text-primary'
              }`}
            >
              Audit Log{' '}
              <span className="text-xs text-text-muted">(Read-Only Audit Record)</span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {isLoading ? (
          <div className="bg-white rounded-lg border border-border p-8 text-center">
            <p className="font-body text-sm text-text-muted">Loading approvals...</p>
          </div>
        ) : showFallback ? (
          <FallbackCard pageName="Approvals" />
        ) : activeTab === 'pending' ? (
          <ApprovalQueue
            items={approvalsData}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ) : (
          <AuditLog items={approvalsData} />
        )}
      </div>
    </AppShell>
  )
}
