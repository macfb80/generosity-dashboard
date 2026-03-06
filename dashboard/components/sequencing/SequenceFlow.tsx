import { MapPin, FileText, Shield, Send, Lock } from 'lucide-react'

const PHASE_1_NODES = [
  {
    id: 'research',
    icon: MapPin,
    label: 'RESEARCH',
    name: 'Research',
    description: 'Geo data injected',
    status: 'active',
  },
  {
    id: 'draft',
    icon: FileText,
    label: 'DRAFT',
    name: 'Draft',
    description: 'Template generated w/ narrative',
    status: 'active',
  },
  {
    id: 'compliance',
    icon: Shield,
    label: 'COMPLIANCE GATE',
    name: 'Compliance Gate',
    description: 'Truth Library ✓ | Language Check ✓ | Channel Check ✓',
    status: 'always-active',
  },
  {
    id: 'send',
    icon: Send,
    label: 'SEND EMAIL',
    name: 'Send Email',
    description: 'SendGrid delivered',
    status: 'active',
  },
]

const PHASE_2_BEHAVIORS = [
  {
    id: 'email_opened_no_click',
    label: 'email_opened_no_click → SMS Nudge (90 min delay)',
  },
  {
    id: 'email_clicked_no_reply',
    label: 'email_clicked_no_reply → LinkedIn Task (4 hrs delay)',
  },
  {
    id: 'replied',
    label: 'replied → Route to Dealer (15 min)',
  },
  {
    id: 'high_value_reply',
    label: 'high_value_reply → Schedule Phone Call',
  },
]

export default function SequenceFlow() {
  return (
    <div className="space-y-6">
      {/* Phase 1 Flow */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h3 className="font-display font-bold text-base text-text-primary mb-6">
          Phase 1 Active Flow
        </h3>
        <div className="flex items-center gap-4 overflow-x-auto">
          {PHASE_1_NODES.map((node, index) => {
            const Icon = node.icon
            const isCompliance = node.status === 'always-active'

            return (
              <div key={node.id} className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 w-48 bg-white border-2 rounded-lg p-4 ${
                    isCompliance
                      ? 'border-brand-success bg-green-50/30'
                      : 'border-brand-blue bg-blue-50/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-brand-blue" />
                    {isCompliance && (
                      <div className="ml-auto">
                        <span className="inline-flex items-center rounded-full bg-brand-success px-2 py-0.5 text-[10px] font-bold text-white">
                          ALWAYS ACTIVE
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-display text-[11px] font-bold text-text-muted uppercase tracking-wide mb-1">
                    {node.label}
                  </p>
                  <p className="font-display text-[15px] font-bold text-text-primary mb-2">
                    {node.name}
                  </p>
                  <p className="font-body text-xs text-text-muted leading-tight">
                    {node.description}
                  </p>
                  {!isCompliance && (
                    <div className="mt-3">
                      <span className="inline-flex items-center rounded-full bg-brand-success px-2 py-0.5 text-[10px] font-medium text-white border border-brand-success/20">
                        Active
                      </span>
                    </div>
                  )}
                </div>

                {index < PHASE_1_NODES.length - 1 && (
                  <div className="flex-shrink-0 text-brand-blue">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-body text-sm text-green-800">
            <strong>Compliance Gate</strong> is non-negotiable infrastructure. All outbound sends
            require human review. This setting cannot be disabled in Phase 1.
          </p>
        </div>
      </div>

      {/* Phase 2 Behaviors */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-display font-bold text-base text-text-primary">
            Phase 2 Behaviors — Coming Next
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border border-gray-200">
            <Lock className="w-3 h-3" />
            Phase 2
          </span>
        </div>
        <div className="space-y-3">
          {PHASE_2_BEHAVIORS.map((behavior) => (
            <div
              key={behavior.id}
              className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-50 cursor-not-allowed"
            >
              <input
                type="checkbox"
                disabled
                className="w-4 h-4 cursor-not-allowed"
              />
              <label className="font-body text-sm text-gray-600 cursor-not-allowed">
                {behavior.label}
              </label>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 border border-gray-200">
                <Lock className="w-3 h-3" />
                Phase 2
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm font-body text-text-muted">
          <p>
            These behavior-triggered channels will activate after the MVP demo. Phase 2 adds SMS,
            LinkedIn, and automated routing based on prospect engagement signals.
          </p>
        </div>
      </div>
    </div>
  )
}
