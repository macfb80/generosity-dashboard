export function SkeletonKPITile() {
  return (
    <div className="bg-white rounded-lg border border-border p-4 animate-pulse">
      <div className="h-3 bg-border rounded w-24 mb-3" />
      <div className="h-8 bg-border rounded w-16 mb-2" />
      <div className="h-2 bg-border rounded w-20" />
    </div>
  )
}

export function SkeletonTableRow() {
  return (
    <div className="flex gap-4 py-3 border-b border-border animate-pulse">
      <div className="h-4 bg-border rounded flex-1" />
      <div className="h-4 bg-border rounded flex-1" />
      <div className="h-4 bg-border rounded flex-1" />
      <div className="h-4 bg-border rounded w-20" />
      <div className="h-4 bg-border rounded w-16" />
    </div>
  )
}

export function SkeletonGeoCard() {
  return (
    <div className="bg-white rounded-lg border border-border border-l-4 border-l-brand-blue p-4 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="h-5 bg-border rounded w-24" />
        <div className="h-5 bg-border rounded w-16" />
      </div>
      <div className="h-3 bg-border rounded w-48 mb-2" />
      <div className="h-3 bg-border rounded w-40 mb-4" />
      <div className="space-y-2">
        <div className="h-3 bg-border rounded w-full" />
        <div className="h-3 bg-border rounded w-full" />
        <div className="h-3 bg-border rounded w-3/4" />
      </div>
    </div>
  )
}

export function SkeletonAlertRow() {
  return (
    <div className="flex gap-3 py-2 animate-pulse">
      <div className="h-5 bg-border rounded w-20" />
      <div className="h-4 bg-border rounded flex-1" />
      <div className="h-4 bg-border rounded w-24" />
    </div>
  )
}
