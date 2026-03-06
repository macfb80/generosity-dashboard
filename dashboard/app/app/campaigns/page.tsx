'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import AppShell from '@/components/layout/AppShell'
import CampaignForm from '@/components/campaigns/CampaignForm'
import CampaignResults from '@/components/campaigns/CampaignResults'
import CampaignList from '@/components/campaigns/CampaignList'
import FallbackCard from '@/components/shared/FallbackCard'
import DemoWatermark from '@/components/shared/DemoWatermark'
import apiClient, { apiCall } from '@/lib/api'
import { Campaign, CampaignRunResult } from '@/lib/types'
import { MOCK_CAMPAIGNS } from '@/lib/mock-data'

const fetchCampaigns = async (): Promise<Campaign[]> => {
  const res = await apiClient.get('/campaigns')
  return res.data
}

const runCampaign = async (data: {
  name: string
  segment: string
  template_pack: string
}): Promise<CampaignRunResult> => {
  const res = await apiClient.post('/campaigns/run', data)
  return res.data
}

export default function CampaignsPage() {
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastResult, setLastResult] = useState<CampaignRunResult | null>(null)
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: campaignsResponse, isLoading: campaignsLoading, mutate } = useSWR(
    mounted ? 'campaigns' : null,
    async () => await apiCall(fetchCampaigns),
    { revalidateOnFocus: false }
  )

  const campaignsData =
    campaignsResponse?.data || (campaignsResponse?.isFallback ? MOCK_CAMPAIGNS : null)
  const showCampaignsDemo = campaignsResponse?.isFallback

  const handleSubmit = async (data: {
    name: string
    segment: 'high' | 'standard' | 'nurture'
    template_pack: 'conservative' | 'standard' | 'aggressive'
  }) => {
    setIsSubmitting(true)
    try {
      const result = await runCampaign(data)
      setLastResult(result)
      setShowForm(false)
      mutate() // Refresh campaigns list
    } catch (error) {
      console.error('Failed to run campaign:', error)
      alert('Failed to run campaign. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRunAnother = () => {
    setLastResult(null)
    setShowForm(true)
  }

  if (!mounted) return null

  return (
    <AppShell pageTitle="Campaigns">
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Campaigns</h2>
          <p className="font-body text-sm text-text-muted">
            Home WTR Hub — Outbound Execution
          </p>
          <p className="font-body text-xs text-text-muted mt-1">
            All campaigns are for <strong>Home WTR Hub</strong> only.
          </p>
        </div>

        {/* Campaign Form or Results */}
        {showForm ? (
          <CampaignForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        ) : lastResult ? (
          <CampaignResults result={lastResult} onRunAnother={handleRunAnother} />
        ) : null}

        {/* Campaign History */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-text-primary">
              Campaign History
            </h3>
            {showCampaignsDemo && <DemoWatermark />}
          </div>
          {campaignsLoading ? (
            <div className="bg-white rounded-lg border border-border p-8 text-center">
              <p className="font-body text-sm text-text-muted">Loading campaigns...</p>
            </div>
          ) : campaignsData ? (
            <CampaignList campaigns={campaignsData} />
          ) : (
            <FallbackCard pageName="Campaign History" />
          )}
        </div>
      </div>
    </AppShell>
  )
}
