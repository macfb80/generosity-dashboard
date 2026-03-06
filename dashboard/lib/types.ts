// ─────────────────────────────────────────────
// POST /campaigns/run — VERIFIED LIVE RESPONSE
// ─────────────────────────────────────────────
export interface CampaignRunResult {
  fingerprint: string
  campaign: {
    id: string
    name: string
    status: string // API returns UPPERCASE ("RUNNING") — normalize to lowercase for UI logic
    created_at: string
    type: string // API may return legacy values ("solar") — ALWAYS display "Home WTR Hub"
  }
  prospects_selected: number // use this field name exactly
  emails_sent: number // use this field name exactly
  emails_failed: number // use this field name exactly
  emails_skipped: number // use this field name exactly
}

// ─────────────────────────────────────────────
// GET /prospects — ProspectRow
// ─────────────────────────────────────────────
export interface ProspectRow {
  id: string
  name: string
  email: string
  company: string
  postal_code: string
  lead_score: number // 0–100
  priority_flag: 'high' | 'standard' | 'nurture'
  last_event: string | null // e.g. "email_opened", "email_clicked", null
  status: string // API returns UPPERCASE — normalize before use
  lead_score_updated_at: string
}

// ─────────────────────────────────────────────
// GET /campaigns — Campaign (list view)
// ─────────────────────────────────────────────
export interface Campaign {
  id: string
  name: string
  template_pack: 'conservative' | 'standard' | 'aggressive'
  segment: 'high' | 'standard' | 'nurture'
  status: string // API returns UPPERCASE — normalize before use
  created_at: string
  type: string // ALWAYS display as "Home WTR Hub" regardless of value
  results?: {
    prospects_selected: number // match CampaignRunResult field names
    emails_sent: number
    emails_failed: number
    emails_skipped: number
  }
}

// ─────────────────────────────────────────────
// GET /geo?postal_code={zip} — GeoIntelligence
// ─────────────────────────────────────────────
export interface GeoIntelligence {
  postal_code: string
  utility_name: string
  contaminant: string
  signal_level: 'high' | 'medium' | 'low'
  narrative_text: string
  last_refreshed: string
}

// ─────────────────────────────────────────────
// GET /approvals — ApprovalQueueItem
// ─────────────────────────────────────────────
export interface ApprovalQueueItem {
  id: string
  type: string
  subject: string
  body_preview: string
  status: 'pending' | 'approved' | 'rejected' // lowercase from API
  created_at: string
  reviewed_by?: string
  review_notes?: string
}

// ─────────────────────────────────────────────
// GET /kpis — KPISnapshot
// ─────────────────────────────────────────────
export interface KPISnapshot {
  email_delivery_rate: number
  open_rate: number
  bounce_rate: number
  complaint_rate: number
  compliance_block_rate: number
  unsubscribe_rate: number
  dealer_activation_rate: number
  lead_response_time_min: number
  conversion_rate: number
  time_to_first_approved_template_days: number
}

// ─────────────────────────────────────────────
// GET /alerts — Alert
// ─────────────────────────────────────────────
export interface Alert {
  id: string
  level: 'INFO' | 'WATCH' | 'WARNING' | 'CRITICAL'
  message: string
  triggered_at: string
  resolved: boolean
}

// ─────────────────────────────────────────────
// GET /settings/sendgrid — SendGridStatus
// ─────────────────────────────────────────────
export interface SendGridStatus {
  connected: boolean
  domain_authenticated: string | null
  warmup_state: 'not_started' | 'warming' | 'warmed' | 'cooling' | 'suspended'
  daily_send_cap: number
}

// ─────────────────────────────────────────────
// GET /auth/me — AuthUser
// ─────────────────────────────────────────────
export interface AuthUser {
  tenant_id: string
  tenant_name: string
  role: string
  email: string
}

// ─────────────────────────────────────────────
// POST /auth/login — LoginResponse
// ─────────────────────────────────────────────
export interface LoginResponse {
  token: string
  tenant_id: string
  tenant_name: string
  role: string
}

// ─────────────────────────────────────────────
// Sequence (Phase 2 placeholder)
// ─────────────────────────────────────────────
export interface Sequence {
  id: string
  name: string
  trigger: string
  enabled: boolean
}
