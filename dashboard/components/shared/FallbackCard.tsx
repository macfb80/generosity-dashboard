import { AlertCircle } from 'lucide-react'

interface FallbackCardProps {
  pageName: string
}

export default function FallbackCard({ pageName }: FallbackCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-6">
      <div className="border-t-4 border-brand-blue absolute top-0 left-0 right-0 rounded-t-lg" />
      <div className="pt-2 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-display font-bold text-base text-text-primary mb-2">
            {pageName} — Live Data Pending
          </h3>
          <p className="font-body text-sm text-text-muted">
            This module will activate once the backend endpoint is live. All other dashboard
            features remain fully operational.
          </p>
        </div>
      </div>
    </div>
  )
}
