'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import AppShell from '@/components/layout/AppShell'
import GeoCard from '@/components/geo/GeoCard'
import FallbackCard from '@/components/shared/FallbackCard'
import DemoWatermark from '@/components/shared/DemoWatermark'
import { SkeletonGeoCard } from '@/components/shared/LoadingSkeleton'
import apiClient, { apiCall } from '@/lib/api'
import { ProspectRow, GeoIntelligence } from '@/lib/types'
import { MOCK_GEO, MOCK_PROSPECTS } from '@/lib/mock-data'
import { Search } from 'lucide-react'

const fetchGeo = async (postalCode: string): Promise<GeoIntelligence> => {
  const res = await apiClient.get(`/geo?postal_code=${postalCode}`)
  return res.data
}

const fetchProspects = async (): Promise<ProspectRow[]> => {
  const res = await apiClient.get('/prospects')
  return res.data
}

export default function GeoIntelPage() {
  const [mounted, setMounted] = useState(false)
  const [searchPostalCode, setSearchPostalCode] = useState('')
  const [activePostalCode, setActivePostalCode] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: geoResponse, isLoading: geoLoading } = useSWR(
    activePostalCode ? `geo-${activePostalCode}` : null,
    async () => (activePostalCode ? await apiCall(() => fetchGeo(activePostalCode)) : null),
    { revalidateOnFocus: false }
  )

  const { data: prospectsResponse } = useSWR(
    mounted ? 'prospects' : null,
    async () => await apiCall(fetchProspects),
    { revalidateOnFocus: false }
  )

  const geoData = geoResponse?.data || (geoResponse?.isFallback ? MOCK_GEO : null)
  const showGeoDemo = geoResponse?.isFallback

  const prospectsData =
    prospectsResponse?.data || (prospectsResponse?.isFallback ? MOCK_PROSPECTS : [])

  // Extract unique postal codes from prospects
  const uniquePostalCodes = Array.from(
    new Set(prospectsData?.map((p) => p.postal_code) || [])
  ).sort()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchPostalCode.trim()) {
      setActivePostalCode(searchPostalCode.trim())
    }
  }

  if (!mounted) return null

  return (
    <AppShell pageTitle="Geo Intelligence">
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
            Geo Intelligence
          </h2>
          <p className="font-body text-sm text-text-muted">
            Water Signal per Prospect — Home WTR Hub
          </p>
        </div>

        {/* Postal Code Search */}
        <div className="bg-white rounded-lg border border-border p-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={searchPostalCode}
                onChange={(e) => setSearchPostalCode(e.target.value)}
                placeholder="Enter postal code..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-md font-body text-base focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-display font-bold rounded-md transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Search Result */}
        {activePostalCode && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-text-primary">
                Search Result: {activePostalCode}
              </h3>
              {showGeoDemo && <DemoWatermark />}
            </div>
            {geoLoading ? (
              <SkeletonGeoCard />
            ) : geoData ? (
              <GeoCard data={geoData} />
            ) : (
              <div className="bg-white rounded-lg border border-border p-8 text-center">
                <p className="font-body text-sm text-text-muted">
                  No geo data found for postal code {activePostalCode}.
                  <br />
                  Data coverage expands weekly.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Prospect Geo Grid */}
        {uniquePostalCodes.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-text-primary">
              Prospect Postal Codes ({uniquePostalCodes.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uniquePostalCodes.map((postalCode) => (
                <button
                  key={postalCode}
                  onClick={() => {
                    setSearchPostalCode(postalCode)
                    setActivePostalCode(postalCode)
                  }}
                  className="text-left"
                >
                  <GeoCard data={{ ...MOCK_GEO, postal_code: postalCode }} compact />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
