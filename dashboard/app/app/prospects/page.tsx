'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import AppShell from '@/components/layout/AppShell'
import ProspectsTable from '@/components/prospects/ProspectsTable'
import GeoCard from '@/components/geo/GeoCard'
import FallbackCard from '@/components/shared/FallbackCard'
import DemoWatermark from '@/components/shared/DemoWatermark'
import { SkeletonTableRow } from '@/components/shared/LoadingSkeleton'
import apiClient, { apiCall } from '@/lib/api'
import { ProspectRow, GeoIntelligence } from '@/lib/types'
import { MOCK_PROSPECTS, MOCK_GEO } from '@/lib/mock-data'
import { X } from 'lucide-react'

const fetchProspects = async (): Promise<ProspectRow[]> => {
  const res = await apiClient.get('/prospects')
  return res.data
}

const fetchGeo = async (postalCode: string): Promise<GeoIntelligence> => {
  const res = await apiClient.get(`/geo?postal_code=${postalCode}`)
  return res.data
}

export default function ProspectsPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedPostalCode, setSelectedPostalCode] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: prospectsResponse, isLoading: prospectsLoading } = useSWR(
    mounted ? 'prospects' : null,
    async () => await apiCall(fetchProspects),
    { revalidateOnFocus: false }
  )

  const { data: geoResponse, isLoading: geoLoading } = useSWR(
    selectedPostalCode ? `geo-${selectedPostalCode}` : null,
    async () => (selectedPostalCode ? await apiCall(() => fetchGeo(selectedPostalCode)) : null),
    { revalidateOnFocus: false }
  )

  const prospectsData =
    prospectsResponse?.data || (prospectsResponse?.isFallback ? MOCK_PROSPECTS : null)
  const showProspectsDemo = prospectsResponse?.isFallback

  const geoData = geoResponse?.data || (geoResponse?.isFallback ? MOCK_GEO : null)

  if (!mounted) return null

  return (
    <AppShell pageTitle="Prospects">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Prospects</h2>
            <p className="font-body text-sm text-text-muted">Home WTR Hub Pipeline</p>
          </div>
          {showProspectsDemo && <DemoWatermark />}
        </div>

        {prospectsLoading ? (
          <div className="bg-white rounded-lg border border-border p-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonTableRow key={i} />
            ))}
          </div>
        ) : prospectsData ? (
          <ProspectsTable
            prospects={prospectsData}
            onViewGeo={(postalCode) => setSelectedPostalCode(postalCode)}
          />
        ) : (
          <FallbackCard pageName="Prospects" />
        )}
      </div>

      {/* Geo Modal */}
      {selectedPostalCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedPostalCode(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
            {geoLoading ? (
              <div className="space-y-4">
                <div className="h-6 bg-border rounded w-32 animate-pulse" />
                <div className="h-4 bg-border rounded w-48 animate-pulse" />
                <div className="h-24 bg-border rounded animate-pulse" />
              </div>
            ) : geoData ? (
              <GeoCard data={geoData} />
            ) : (
              <div className="py-8 text-center">
                <p className="font-body text-sm text-text-muted">
                  No geo data found for postal code {selectedPostalCode}.
                  <br />
                  Data coverage expands weekly.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  )
}
