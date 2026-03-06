'use client'

import { useState, useMemo } from 'react'
import { ProspectRow } from '@/lib/types'
import { displayEvent, normalizeStatus, titleStatus } from '@/lib/utils'
import StatusBadge from '../shared/StatusBadge'
import { Search, MapPin } from 'lucide-react'

interface ProspectsTableProps {
  prospects: ProspectRow[]
  onViewGeo?: (postalCode: string) => void
}

type SortField = 'name' | 'company' | 'lead_score' | 'status'
type SortDirection = 'asc' | 'desc'

export default function ProspectsTable({ prospects, onViewGeo }: ProspectsTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('lead_score')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 25

  // Filter and sort prospects
  const filteredProspects = useMemo(() => {
    let filtered = prospects.filter((p) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        p.name.toLowerCase().includes(searchLower) ||
        p.email.toLowerCase().includes(searchLower) ||
        p.company.toLowerCase().includes(searchLower)

      // Status filter
      const matchesStatus =
        statusFilter === 'all' || normalizeStatus(p.status) === statusFilter

      // Priority filter
      const matchesPriority = priorityFilter === 'all' || p.priority_flag === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })

    // Sort
    filtered.sort((a, b) => {
      let aVal: any = a[sortField]
      let bVal: any = b[sortField]

      if (sortField === 'status') {
        aVal = normalizeStatus(a.status)
        bVal = normalizeStatus(b.status)
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [prospects, searchQuery, statusFilter, priorityFilter, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredProspects.length / rowsPerPage)
  const paginatedProspects = filteredProspects.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const getLeadScoreBadge = (score: number) => {
    if (score >= 75)
      return { label: 'High', variant: 'green' as const, value: score }
    if (score >= 40)
      return { label: 'Standard', variant: 'blue' as const, value: score }
    return { label: 'Nurture', variant: 'gray' as const, value: score }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search name, email, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-md font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <option value="all">All Statuses</option>
            <option value="prospect">Prospect</option>
            <option value="nurturing">Nurturing</option>
            <option value="qualified">Qualified</option>
            <option value="active">Active</option>
            <option value="dormant">Dormant</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md font-body text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="standard">Standard</option>
            <option value="nurture">Nurture</option>
          </select>

          <div className="flex items-center gap-2 text-sm font-body text-text-muted">
            <span>
              {filteredProspects.length} prospect{filteredProspects.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th
                  onClick={() => handleSort('name')}
                  className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Email
                </th>
                <th
                  onClick={() => handleSort('company')}
                  className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Postal Code
                </th>
                <th
                  onClick={() => handleSort('lead_score')}
                  className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Lead Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Last Event
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedProspects.map((prospect) => {
                const scoreBadge = getLeadScoreBadge(prospect.lead_score)

                return (
                  <tr
                    key={prospect.id}
                    className="hover:bg-gray-50 hover:border-l-4 hover:border-l-brand-blue transition-all"
                  >
                    <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-primary font-medium">
                      {prospect.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-muted">
                      {prospect.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-body text-sm text-text-primary">
                      {prospect.company}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-text-muted">
                      {prospect.postal_code}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge
                        label={`${scoreBadge.label} (${scoreBadge.value})`}
                        variant={scoreBadge.variant}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {prospect.last_event ? (
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 border border-blue-200">
                          {displayEvent(prospect.last_event)}
                        </span>
                      ) : (
                        <span className="text-text-muted text-sm">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge
                        label={titleStatus(prospect.status)}
                        variant={
                          normalizeStatus(prospect.status) === 'qualified'
                            ? 'green'
                            : normalizeStatus(prospect.status) === 'nurturing'
                            ? 'yellow'
                            : 'gray'
                        }
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {onViewGeo && (
                        <button
                          onClick={() => onViewGeo(prospect.postal_code)}
                          className="inline-flex items-center gap-1 text-brand-blue hover:text-brand-blue/80 font-body text-sm font-medium"
                        >
                          <MapPin className="w-4 h-4" />
                          View Geo
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <div className="text-sm text-text-muted">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-border rounded-md text-sm font-body disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-border rounded-md text-sm font-body disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
