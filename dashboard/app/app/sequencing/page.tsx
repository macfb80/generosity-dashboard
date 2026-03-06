'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import SequenceFlow from '@/components/sequencing/SequenceFlow'

export default function SequencingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AppShell pageTitle="Sequencing">
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
            Sequencing Engine
          </h2>
          <p className="font-body text-sm text-text-muted">
            Home WTR Hub — Compliance-Gated Send Flow
          </p>
        </div>

        <SequenceFlow />
      </div>
    </AppShell>
  )
}
