'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import AppShell from '@/components/layout/AppShell'
import KPIGrid from '@/components/kpi/KPIGrid'
import AlertsPanel from '@/components/alerts/AlertsPanel'
import FallbackCard from '@/components/shared/FallbackCard'
import DemoWatermark from '@/components/shared/DemoWatermark'
import { SkeletonKPITile, SkeletonAlertRow } from '@/components/shared/LoadingSkeleton'
import apiClient, { apiCall } from '@/lib/api'
import { KPISnapshot, Alert } from '@/lib/types'
import { MOCK_KPIS, MOCK_ALERTS } from '@/lib/mock-data'

const fetchKPIs = async (): Promise<KPISnapshot> => {
  const res = await apiClient.get('/kpis')
  return res.data
}

const fetchAlerts = async (): Promise<Alert[]> => {
  const res = await apiClient.get('/alerts')
  return res.data
}

export default function OverviewPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: kpisResponse, isLoading: kpisLoading } = useSWR(
    mounted ? 'kpis' : null,
    async () => await apiCall(fetchKPIs),
    { revalidateOnFocus: false }
  )

  const { data: alertsResponse, isLoading: alertsLoading } = useSWR(
    mounted ? 'alerts' : null,
    async () => await apiCall(fetchAlerts),
    { revalidateOnFocus: false }
  )

  const kpisData = kpisResponse?.data || (kpisResponse?.isFallback ? MOCK_KPIS : null)
  const alertsData = alertsResponse?.data || (alertsResponse?.isFallback ? MOCK_ALERTS : [])
  const showKPIDemo = kpisResponse?.isFallback
  const showAlertsDemo = alertsResponse?.isFallback

  if (!mounted) return null

  return (
    <AppShell pageTitle="Mission Control">
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
            Mission Control
          </h2>
          <p className="font-body text-sm text-text-muted">
            Home WTR Hub Campaign Intelligence
          </p>
        </div>

        {/* KPI Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-text-primary">
              Key Performance Indicators
            </h3>
            {showKPIDemo && <DemoWatermark />}
          </div>
          {kpisLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonKPITile key={i} />
              ))}
            </div>
          ) : kpisData ? (
            <KPIGrid data={kpisData} />
          ) : (
            <FallbackCard pageName="KPI Dashboard" />
          )}
        </div>

        {/* Alerts Panel */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-text-primary">
              System Alerts
            </h3>
            {showAlertsDemo && <DemoWatermark />}
          </div>
          {alertsLoading ? (
            <div className="bg-white rounded-lg border border-border p-4 space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonAlertRow key={i} />
              ))}
            </div>
          ) : alertsData ? (
            <AlertsPanel alerts={alertsData} />
          ) : (
            <FallbackCard pageName="Alerts" />
          )}
        </div>
      </div>
    </AppShell>
  )
}
