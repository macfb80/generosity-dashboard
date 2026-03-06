import { KPISnapshot } from '@/lib/types'
import { formatKPIValue, getMetricName, getThresholdLabel, kpiStatus } from '@/lib/utils'
import KPITile from './KPITile'

interface KPIGridProps {
  data: KPISnapshot
}

export default function KPIGrid({ data }: KPIGridProps) {
  const metrics = Object.keys(data) as Array<keyof KPISnapshot>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((metric) => {
        const value = data[metric]
        const isNull = value === null

        return (
          <KPITile
            key={metric}
            name={getMetricName(metric)}
            value={formatKPIValue(metric, value)}
            threshold={getThresholdLabel(metric)}
            status={isNull ? 'green' : kpiStatus(metric, value)}
            disabled={isNull}
          />
        )
      })}
    </div>
  )
}
