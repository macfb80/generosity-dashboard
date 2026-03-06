import {
  KPISnapshot,
  ProspectRow,
  GeoIntelligence,
  Alert,
  CampaignRunResult,
  Campaign,
  SendGridStatus,
} from './types'

export const MOCK_KPIS: KPISnapshot = {
  email_delivery_rate: 96.4,
  open_rate: 38.2,
  bounce_rate: 1.1,
  complaint_rate: 0.04,
  compliance_block_rate: 0.6,
  unsubscribe_rate: 0.3,
  dealer_activation_rate: 72.0,
  lead_response_time_min: 12,
  conversion_rate: 9.1,
  time_to_first_approved_template_days: 5,
}

export const MOCK_PROSPECTS: ProspectRow[] = [
  {
    id: 'mock-1',
    name: 'Marcus Rivera',
    email: 'mrivera@pacesupply.com',
    company: 'PACE Supply',
    postal_code: '95814',
    lead_score: 82,
    priority_flag: 'high',
    last_event: 'email_opened',
    status: 'QUALIFIED',
    lead_score_updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    name: 'Dana Ortiz',
    email: 'dortiz@franklinelectric.com',
    company: 'Franklin Electric',
    postal_code: '46601',
    lead_score: 61,
    priority_flag: 'standard',
    last_event: 'email_clicked',
    status: 'NURTURING',
    lead_score_updated_at: new Date().toISOString(),
  },
  {
    id: 'mock-3',
    name: 'Kevin Park',
    email: 'kpark@safewaywater.com',
    company: 'Safeway Water',
    postal_code: '92101',
    lead_score: 33,
    priority_flag: 'nurture',
    last_event: null,
    status: 'PROSPECT',
    lead_score_updated_at: new Date().toISOString(),
  },
]

export const MOCK_GEO: GeoIntelligence = {
  postal_code: '95814',
  utility_name: 'Sacramento Regional Water Authority',
  contaminant: 'Chloramines + TTHMs',
  signal_level: 'high',
  narrative_text:
    'Sacramento Regional Water Authority serves water with elevated chloramine levels and trihalomethanes (TTHMs), both common disinfection byproducts. The Home WTR Hub removes 99% of these contaminants while adding back beneficial alkaline minerals. Local homeowners in this zip code are increasingly concerned about taste and long-term health impacts. Positioning the Home WTR Hub as a premium solution for this specific issue has shown strong conversion rates in similar markets.',
  last_refreshed: new Date().toISOString(),
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'mock-alert-1',
    level: 'WATCH',
    message: 'Open rate below 35% threshold for PACE Supply — March campaign.',
    triggered_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    resolved: false,
  },
  {
    id: 'mock-alert-2',
    level: 'INFO',
    message: 'SendGrid warmup day 4 of 14 completed. Daily cap: 200 emails.',
    triggered_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    resolved: false,
  },
]

export const MOCK_CAMPAIGN_RUN: CampaignRunResult = {
  fingerprint: 'campaigns/run v4.0 (proof-get+post+counts)',
  campaign: {
    id: 'demo-campaign-001',
    name: 'PACE Supply — March Push',
    status: 'RUNNING',
    created_at: new Date().toISOString(),
    type: 'home_wtr_hub',
  },
  prospects_selected: 4,
  emails_sent: 4,
  emails_failed: 0,
  emails_skipped: 0,
}

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'mock-campaign-1',
    name: 'PACE Supply — March Push',
    template_pack: 'standard',
    segment: 'high',
    status: 'COMPLETED',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'home_wtr_hub',
    results: {
      prospects_selected: 12,
      emails_sent: 12,
      emails_failed: 0,
      emails_skipped: 0,
    },
  },
  {
    id: 'mock-campaign-2',
    name: 'Franklin Electric — Q1 Outreach',
    template_pack: 'conservative',
    segment: 'standard',
    status: 'RUNNING',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'home_wtr_hub',
    results: {
      prospects_selected: 8,
      emails_sent: 6,
      emails_failed: 0,
      emails_skipped: 2,
    },
  },
]

export const MOCK_SENDGRID_STATUS: SendGridStatus = {
  connected: true,
  domain_authenticated: 'mail.generosity.com',
  warmup_state: 'warming',
  daily_send_cap: 200,
}
