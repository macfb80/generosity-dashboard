'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'

interface CampaignFormProps {
  onSubmit: (data: {
    name: string
    segment: 'high' | 'standard' | 'nurture'
    template_pack: 'conservative' | 'standard' | 'aggressive'
  }) => Promise<void>
  isSubmitting: boolean
}

const TEMPLATE_PACKS = [
  {
    id: 'conservative' as const,
    name: 'CONSERVATIVE PACK',
    badge: 'Low Touch',
    badgeColor: 'gray',
    subject: 'A cleaner water option worth considering — [geo_utility_name]',
    preview:
      "We've been working with teams like yours on a water quality solution that installs without a storage tank...",
    cadence: 'Day 1 → Day 5 → Day 12',
    borderColor: 'border-gray-300',
  },
  {
    id: 'standard' as const,
    name: 'STANDARD PACK',
    badge: 'Recommended',
    badgeColor: 'blue',
    subject: 'Your water at [geo_postal_code] — what we found',
    preview:
      'The Home WTR Hub removes [geo_contaminant] and 99% of TDS, delivering alkaline water at the tap...',
    cadence: 'Day 1 → Day 3 → Day 7 → Day 14',
    borderColor: 'border-brand-blue',
  },
  {
    id: 'aggressive' as const,
    name: 'AGGRESSIVE PACK',
    badge: 'High Urgency',
    badgeColor: 'orange',
    subject: '[geo_utility_name] water quality alert — act now',
    preview:
      'Signal level: [geo_signal_level]. The Home WTR Hub addresses this directly...',
    cadence: 'Day 1 → Day 2 → Day 4 → Day 7 → Day 10',
    borderColor: 'border-orange-500',
  },
]

export default function CampaignForm({ onSubmit, isSubmitting }: CampaignFormProps) {
  const [name, setName] = useState('')
  const [segment, setSegment] = useState<'high' | 'standard' | 'nurture'>('high')
  const [templatePack, setTemplatePack] = useState<
    'conservative' | 'standard' | 'aggressive'
  >('standard')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    await onSubmit({ name, segment, template_pack: templatePack })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-6 space-y-6">
      <div>
        <h3 className="font-display font-bold text-base text-text-primary mb-4">
          Create Campaign
        </h3>

        {/* Campaign Name */}
        <div className="mb-4">
          <label className="block font-body text-sm font-medium text-text-primary mb-2">
            Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. PACE Supply — March Push"
            required
            className="w-full px-3 py-2 border border-border rounded-md font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        {/* Segment */}
        <div className="mb-4">
          <label className="block font-body text-sm font-medium text-text-primary mb-2">
            Segment
          </label>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value as any)}
            className="w-full px-3 py-2 border border-border rounded-md font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <option value="high">High Priority — Score ≥ 75</option>
            <option value="standard">Standard — Score 40–74</option>
            <option value="nurture">Nurture — Score &lt; 40</option>
          </select>
        </div>

        {/* Template Pack */}
        <div>
          <label className="block font-body text-sm font-medium text-text-primary mb-3">
            Template Pack
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TEMPLATE_PACKS.map((pack) => (
              <button
                key={pack.id}
                type="button"
                onClick={() => setTemplatePack(pack.id)}
                className={`relative p-4 border-2 rounded-lg text-left transition-all ${
                  templatePack === pack.id
                    ? `${pack.borderColor} bg-blue-50/50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {templatePack === pack.id && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-5 h-5 text-brand-blue" />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs font-bold text-text-primary">
                      {pack.name}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        pack.badgeColor === 'blue'
                          ? 'bg-brand-blue/10 text-brand-blue'
                          : pack.badgeColor === 'orange'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {pack.badge}
                    </span>
                  </div>
                  <p className="font-body text-xs font-medium text-text-primary">
                    Subject: {pack.subject}
                  </p>
                  <p className="font-body text-xs text-text-muted line-clamp-2">
                    {pack.preview}
                  </p>
                  <p className="font-body text-[11px] text-text-muted font-medium">
                    Cadence: {pack.cadence}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !name.trim()}
        className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-display font-bold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          'Run Campaign →'
        )}
      </button>
    </form>
  )
}
