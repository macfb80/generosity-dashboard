'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import AppShell from '@/components/layout/AppShell'
import FallbackCard from '@/components/shared/FallbackCard'
import DemoWatermark from '@/components/shared/DemoWatermark'
import apiClient, { apiCall } from '@/lib/api'
import { AuthUser, SendGridStatus } from '@/lib/types'
import { MOCK_SENDGRID_STATUS } from '@/lib/mock-data'
import { Lock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

const fetchUser = async (): Promise<AuthUser> => {
  const res = await apiClient.get('/auth/me')
  return res.data
}

const fetchSendGridStatus = async (): Promise<SendGridStatus> => {
  const res = await apiClient.get('/settings/sendgrid')
  return res.data
}

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: userResponse } = useSWR(
    mounted ? 'user' : null,
    async () => await apiCall(fetchUser),
    { revalidateOnFocus: false }
  )

  const { data: sendgridResponse, isLoading: sendgridLoading } = useSWR(
    mounted ? 'sendgrid' : null,
    async () => await apiCall(fetchSendGridStatus),
    { revalidateOnFocus: false }
  )

  const userData = userResponse?.data
  const sendgridData =
    sendgridResponse?.data || (sendgridResponse?.isFallback ? MOCK_SENDGRID_STATUS : null)
  const showSendGridDemo = sendgridResponse?.isFallback

  const isRestrictedWarmup =
    sendgridData &&
    ['not_started', 'cooling', 'suspended'].includes(sendgridData.warmup_state)

  if (!mounted) return null

  return (
    <AppShell pageTitle="Settings">
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Settings</h2>
          <p className="font-body text-sm text-text-muted">
            {userData?.tenant_name || '—'} Configuration
          </p>
        </div>

        {/* Tenant Info */}
        <div className="bg-white rounded-lg border border-border p-6 space-y-4">
          <h3 className="font-display font-bold text-base text-text-primary">Tenant Info</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-body text-xs text-text-muted mb-1">Tenant Name</dt>
              <dd className="font-display text-lg font-bold text-text-primary">
                {userData?.tenant_name || '—'}
              </dd>
            </div>
            <div>
              <dt className="font-body text-xs text-text-muted mb-1">Role</dt>
              <dd>
                <span className="inline-flex items-center rounded-full bg-brand-blue/10 px-3 py-1 text-sm font-medium text-brand-blue border border-brand-blue/20">
                  {userData?.role || '—'}
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-body text-xs text-text-muted mb-1">Tenant ID</dt>
              <dd className="font-mono text-xs text-text-muted bg-gray-50 px-2 py-1 rounded inline-block">
                {userData?.tenant_id || '—'}
              </dd>
            </div>
            <div>
              <dt className="font-body text-xs text-text-muted mb-1">Email</dt>
              <dd className="font-body text-sm text-text-primary">
                {userData?.email || '—'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Compliance Mode */}
        <div className="bg-white rounded-lg border border-border p-6 space-y-4">
          <h3 className="font-display font-bold text-base text-text-primary">Compliance Mode</h3>
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <Lock className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-display text-sm font-bold text-green-800">
                Compliance Gate: Enabled
              </p>
              <p className="font-body text-xs text-green-700 mt-1">
                Human review required before any outbound send. This setting cannot be disabled.
              </p>
            </div>
          </div>
        </div>

        {/* SendGrid Status */}
        <div className="bg-white rounded-lg border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-text-primary">
              SendGrid Sending Status
            </h3>
            {showSendGridDemo && <DemoWatermark />}
          </div>

          {sendgridLoading ? (
            <div className="py-4">
              <p className="font-body text-sm text-text-muted">Loading SendGrid status...</p>
            </div>
          ) : sendgridData ? (
            <div className="space-y-4">
              {/* Warning Banner */}
              {isRestrictedWarmup && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-display text-sm font-bold text-red-800">
                      Sending Restricted — Warmup compliance required
                    </p>
                    <p className="font-body text-xs text-red-700 mt-1">
                      Cold accounts cannot send at full volume. Contact Generosity™ HQ to resolve.
                    </p>
                  </div>
                </div>
              )}

              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="font-body text-sm text-text-muted">Connection Status</dt>
                  <dd className="flex items-center gap-2">
                    {sendgridData.connected ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-body text-sm text-green-700 font-medium">
                          Connected via SendGrid
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="font-body text-sm text-red-700 font-medium">
                          Not Connected
                        </span>
                      </>
                    )}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="font-body text-sm text-text-muted">Domain Authenticated</dt>
                  <dd className="font-body text-sm text-text-primary">
                    {sendgridData.domain_authenticated || (
                      <span className="text-orange-600">
                        Not configured — authenticate your domain
                      </span>
                    )}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="font-body text-sm text-text-muted">Warmup State</dt>
                  <dd>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                        sendgridData.warmup_state === 'warmed'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : sendgridData.warmup_state === 'warming'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {sendgridData.warmup_state === 'warmed'
                        ? 'Warmed — Full Send Capacity'
                        : sendgridData.warmup_state === 'warming'
                        ? 'Warming — Ramping Up'
                        : sendgridData.warmup_state === 'not_started'
                        ? '⚠ Not Started — Sending Restricted'
                        : sendgridData.warmup_state === 'cooling'
                        ? '⚠ Cooling — Sending Restricted'
                        : '✗ Suspended — Contact Support'}
                    </span>
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="font-body text-sm text-text-muted">Daily Send Cap</dt>
                  <dd className="font-body text-sm text-text-primary">
                    {sendgridData.daily_send_cap} emails/day
                  </dd>
                </div>
              </dl>
            </div>
          ) : (
            <FallbackCard pageName="SendGrid Status" />
          )}
        </div>
      </div>
    </AppShell>
  )
}
