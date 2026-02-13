
'use client';

import { useState } from 'react';

interface DateRange {
  start: string;
  end: string;
}

interface Filters {
  status: string;
  documentType: string;
  entityType: string;
  entityName: string;
  dateRange: DateRange;
  expiryRange: DateRange;
}

interface ComplianceFiltersProps {
  /** Current filter values */
  filters: Filters;
  /** Callback invoked when any filter changes */
  onFiltersChange: (filters: Filters) => void;
}

/**
 * ComplianceFilters – UI component for selecting document filters.
 * Includes basic filters and an optional advanced section.
 */
export default function ComplianceFilters({
  filters,
  onFiltersChange,
}: ComplianceFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  /**
   * Generic handler for simple (non‑nested) filter fields.
   */
  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  /**
   * Handler for nested date range objects.
   */
  const handleDateRangeChange = (
    type: 'dateRange' | 'expiryRange',
    field: keyof DateRange,
    value: string,
  ) => {
    onFiltersChange({
      ...filters,
      [type]: { ...filters[type], [field]: value },
    });
  };

  /**
   * Reset all filters to their default "empty" state.
   */
  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      documentType: 'all',
      entityType: 'all',
      entityName: '',
      dateRange: { start: '', end: '' },
      expiryRange: { start: '', end: '' },
    });
  };

  const documentTypes = [
    'Legal Documents',
    'Tax Information',
    'Business Licenses',
    'Insurance Certificates',
    'Compliance Certificates',
    'Banking Documents',
    'Identity Verification',
    'Product Certifications',
  ];

  return (
    <div className="space-y-4">
      {/* Header with toggle and clear actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Filter Documents</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
          >
            {/* Fixed className syntax – no backticks necessary */}
            <i className="ri-filter-line mr-2"></i>
            Advanced Filters
          </button>
          <button
            onClick={clearFilters}
            className="px-3 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Primary filter grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="expiring">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Document Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Type
          </label>
          <select
            value={filters.documentType}
            onChange={(e) => handleFilterChange('documentType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
          >
            <option value="all">All Types</option>
            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Entity Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entity Type
          </label>
          <select
            value={filters.entityType}
            onChange={(e) => handleFilterChange('entityType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
          >
            <option value="all">All Entities</option>
            <option value="buyer">Buyers</option>
            <option value="brand">Brands</option>
          </select>
        </div>

        {/* Entity Name Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Entity
          </label>
          <input
            type="text"
            value={filters.entityName}
            onChange={(e) => handleFilterChange('entityName', e.target.value)}
            placeholder="Search buyer/brand name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Advanced filters – shown conditionally */}
      {showAdvanced && (
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Submission Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Submission Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) =>
                    handleDateRangeChange('dateRange', 'start', e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) =>
                    handleDateRangeChange('dateRange', 'end', e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Expiry Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={filters.expiryRange.start}
                  onChange={(e) =>
                    handleDateRangeChange('expiryRange', 'start', e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                <input
                  type="date"
                  value={filters.expiryRange.end}
                  onChange={(e) =>
                    handleDateRangeChange('expiryRange', 'end', e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
