import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow } from 'date-fns'
import { KPISnapshot } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Normalize API UPPERCASE status to lowercase
export const normalizeStatus = (s: string): string => s?.toLowerCase() ?? ''

// Display status in title case
export const titleStatus = (s: string): string =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '—'

// ALWAYS returns "Home WTR Hub" regardless of API type value
export const displayType = (_type: string): string => 'Home WTR Hub'

// Human-readable event label
export const displayEvent = (event: string | null): string => {
  if (!event) return '—'
  return event.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// Relative time (e.g. "2 hours ago")
export const relativeTime = (isoString: string): string => {
  try {
    return formatDistanceToNow(new Date(isoString), { addSuffix: true })
  } catch {
    return '—'
  }
}

// KPI Threshold Configuration
export const KPI_THRESHOLDS: Record<
  keyof KPISnapshot,
  { green: [number, number]; yellow: [number, number]; red: [number, number] }
> = {
  email_delivery_rate: { green: [95, 100], yellow: [90, 95], red: [0, 90] },
  open_rate: { green: [35, 100], yellow: [25, 35], red: [0, 25] },
  bounce_rate: { green: [0, 2], yellow: [2, 4], red: [4, 100] },
  complaint_rate: { green: [0, 0.08], yellow: [0.08, 0.15], red: [0.15, 100] },
  compliance_block_rate: { green: [0, 1], yellow: [1, 2], red: [2, 100] },
  unsubscribe_rate: { green: [0, 0.5], yellow: [0.5, 1], red: [1, 100] },
  dealer_activation_rate: { green: [70, 100], yellow: [50, 70], red: [0, 50] },
  lead_response_time_min: { green: [0, 15], yellow: [15, 30], red: [30, 9999] },
  conversion_rate: { green: [8, 100], yellow: [4, 8], red: [0, 4] },
  time_to_first_approved_template_days: {
    green: [0, 7],
    yellow: [8, 14],
    red: [14, 999],
  },
}

// KPI status from threshold config
export const kpiStatus = (
  metric: keyof KPISnapshot,
  value: number
): 'green' | 'yellow' | 'red' => {
  const thresholds = KPI_THRESHOLDS[metric]
  if (!thresholds) return 'gray' as any

  if (value >= thresholds.green[0] && value <= thresholds.green[1]) return 'green'
  if (value >= thresholds.yellow[0] && value <= thresholds.yellow[1]) return 'yellow'
  return 'red'
}

// Get threshold label for display
export const getThresholdLabel = (metric: keyof KPISnapshot): string => {
  const labels: Record<keyof KPISnapshot, string> = {
    email_delivery_rate: 'Target: ≥ 95%',
    open_rate: 'Target: ≥ 35%',
    bounce_rate: 'Target: < 2%',
    complaint_rate: 'Target: < 0.08%',
    compliance_block_rate: 'Target: < 1%',
    unsubscribe_rate: 'Target: < 0.5%',
    dealer_activation_rate: 'Target: ≥ 70%',
    lead_response_time_min: 'Target: < 15 min',
    conversion_rate: 'Target: ≥ 8%',
    time_to_first_approved_template_days: 'Target: < 7 days',
  }
  return labels[metric] || ''
}

// Format KPI value for display
export const formatKPIValue = (metric: keyof KPISnapshot, value: number | null): string => {
  if (value === null) return '—'

  const percentMetrics: Array<keyof KPISnapshot> = [
    'email_delivery_rate',
    'open_rate',
    'bounce_rate',
    'complaint_rate',
    'compliance_block_rate',
    'unsubscribe_rate',
    'dealer_activation_rate',
    'conversion_rate',
  ]

  if (percentMetrics.includes(metric)) {
    return `${value.toFixed(1)}%`
  }

  if (metric === 'lead_response_time_min') {
    return `${value.toFixed(0)} min`
  }

  if (metric === 'time_to_first_approved_template_days') {
    return `${value.toFixed(0)} days`
  }

  return value.toFixed(1)
}

// Get friendly metric name
export const getMetricName = (metric: keyof KPISnapshot): string => {
  const names: Record<keyof KPISnapshot, string> = {
    email_delivery_rate: 'Email Delivery Rate',
    open_rate: 'Open Rate',
    bounce_rate: 'Bounce Rate',
    complaint_rate: 'Complaint Rate',
    compliance_block_rate: 'Compliance Block Rate',
    unsubscribe_rate: 'Unsubscribe Rate',
    dealer_activation_rate: 'Dealer Activation Rate',
    lead_response_time_min: 'Lead Response Time',
    conversion_rate: 'Conversion Rate',
    time_to_first_approved_template_days: 'Time to First Approval',
  }
  return names[metric] || metric
}
