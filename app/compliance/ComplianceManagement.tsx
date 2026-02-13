
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ComplianceFilters from '../../components/ComplianceFilters';
import ComplianceTable from '../../components/ComplianceTable';
import ComplianceDetailModal from '../../components/ComplianceDetailModal';
import ComplianceStats from '../../components/ComplianceStats';

export default function ComplianceManagement() {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    documentType: 'all',
    entityType: 'all',
    entityName: '',
    dateRange: { start: '', end: '' },
    expiryRange: { start: '', end: '' }
  });

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedDocument(null);
  };

  /**
   * Handles actions performed on a document (e.g., approve, reject).
   * Wrapped in a try/catch block to surface unexpected errors without breaking UI.
   */
  const handleDocumentAction = (documentId: number, action: string, reason?: string) => {
    try {
      if (typeof documentId !== 'number' || isNaN(documentId)) {
        throw new Error('Invalid document ID');
      }
      if (typeof action !== 'string' || !action.trim()) {
        throw new Error('Action must be a non‑empty string');
      }

      // Corrected template literal – removed stray escape characters that caused a syntax error.
      console.log(`${action} document ${documentId}`, reason);
      // TODO: Insert real document‑action logic here (e.g., API call).

      // Close modal after successful handling.
      setShowDetailModal(false);
    } catch (err) {
      console.error('Failed to handle document action:', err);
      // Optionally display a user‑facing error message here.
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Compliance Management</h1>
              <p className="text-gray-600 mt-1">
                Review and manage compliance documents for buyers and brands
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
                <i className="ri-download-line mr-2"></i>
                Export Report
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
                <i className="ri-notification-line mr-2"></i>
                Send Reminders
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <ComplianceStats />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <ComplianceFilters filters={filters} onFiltersChange={setFilters} />
            </div>

            <ComplianceTable
              filters={filters}
              onViewDocument={handleViewDocument}
              onDocumentAction={handleDocumentAction}
            />
          </div>
        </div>
      </div>

      {showDetailModal && selectedDocument && (
        <ComplianceDetailModal
          document={selectedDocument}
          onClose={handleCloseModal}
          onAction={handleDocumentAction}
        />
      )}
    </div>
  );
}
