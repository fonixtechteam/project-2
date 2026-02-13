
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ComplianceTableProps {
  filters: any;
  onViewDocument: (document: any) => void;
  onDocumentAction: (documentId: number, action: string, reason?: string) => void;
}

export default function ComplianceTable({ filters, onViewDocument, onDocumentAction }: ComplianceTableProps) {
  const [sortBy, setSortBy] = useState('submissionDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const documents = [
    {
      id: 1,
      entityName: 'TechCorp Solutions',
      entityType: 'buyer',
      entityId: '1',
      documentType: 'Business Registration',
      category: 'Legal Documents',
      submissionDate: '2024-03-15',
      expiryDate: '2025-03-15',
      status: 'pending',
      fileName: 'business-registration.pdf',
      fileSize: '2.4 MB',
      reviewer: null,
      lastAction: 'Submitted',
      notes: '',
      country: 'US',
      priority: 'high'
    },
    {
      id: 2,
      entityName: 'Pure Essence',
      entityType: 'brand',
      entityId: '1',
      documentType: 'FDA Manufacturing License',
      category: 'Compliance Certificates',
      submissionDate: '2024-03-12',
      expiryDate: '2024-12-31',
      status: 'expiring',
      fileName: 'fda-license.pdf',
      fileSize: '1.8 MB',
      reviewer: 'Jennifer Martinez',
      lastAction: 'Approved',
      notes: 'License expires soon - renewal required',
      country: 'US',
      priority: 'high'
    },
    {
      id: 3,
      entityName: 'Global Retail Inc.',
      entityType: 'buyer',
      entityId: '2',
      documentType: 'Tax ID Certificate',
      category: 'Tax Information',
      submissionDate: '2024-03-10',
      expiryDate: '2025-12-31',
      status: 'approved',
      fileName: 'tax-certificate.pdf',
      fileSize: '1.2 MB',
      reviewer: 'David Thompson',
      lastAction: 'Approved',
      notes: 'All tax documentation verified',
      country: 'CA',
      priority: 'medium'
    },
    {
      id: 4,
      entityName: 'Luxe Beauty Co.',
      entityType: 'brand',
      entityId: '2',
      documentType: 'Product Safety Certificates',
      category: 'Product Certifications',
      submissionDate: '2024-03-08',
      expiryDate: '2025-06-30',
      status: 'rejected',
      fileName: 'safety-certs.zip',
      fileSize: '5.2 MB',
      reviewer: 'Sarah Wilson',
      lastAction: 'Rejected',
      notes: 'Missing certificates for three product lines',
      country: 'FR',
      priority: 'high'
    },
    {
      id: 5,
      entityName: 'Metro Distributors',
      entityType: 'buyer',
      entityId: '3',
      documentType: 'Insurance Policy',
      category: 'Insurance Certificates',
      submissionDate: '2024-03-05',
      expiryDate: '2025-03-05',
      status: 'approved',
      fileName: 'insurance-policy.pdf',
      fileSize: '3.1 MB',
      reviewer: 'Michael Chen',
      lastAction: 'Approved',
      notes: 'Coverage meets all requirements',
      country: 'UK',
      priority: 'medium'
    },
    {
      id: 6,
      entityName: 'Wellness Brands Ltd.',
      entityType: 'brand',
      entityId: '3',
      documentType: 'Organic Certification',
      category: 'Compliance Certificates',
      submissionDate: '2024-03-03',
      expiryDate: '2024-09-15',
      status: 'expiring',
      fileName: 'organic-cert.pdf',
      fileSize: '1.5 MB',
      reviewer: 'Jennifer Martinez',
      lastAction: 'Approved',
      notes: 'Certification expires in 6 months',
      country: 'AU',
      priority: 'medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expiring':
        return 'bg-orange-100 text-orange-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return 'ri-check-circle-fill text-green-500';
      case 'pending':
        return 'ri-time-line text-yellow-500';
      case 'rejected':
        return 'ri-close-circle-fill text-red-500';
      case 'expiring':
        return 'ri-alarm-warning-line text-orange-500';
      case 'expired':
        return 'ri-error-warning-fill text-gray-500';
      default:
        return 'ri-file-line text-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    return expiry < now;
  };

  const handleQuickAction = (document: any, action: string) => {
    onDocumentAction(document.id, action);
  };

  const paginatedDocuments = documents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(documents.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('entityName')}
                  className="flex items-center gap-1 font-medium text-gray-700 text-sm hover:text-gray-900 cursor-pointer"
                >
                  Entity Name
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('documentType')}
                  className="flex items-center gap-1 font-medium text-gray-700 text-sm hover:text-gray-900 cursor-pointer"
                >
                  Document Type
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('submissionDate')}
                  className="flex items-center gap-1 font-medium text-gray-700 text-sm hover:text-gray-900 cursor-pointer"
                >
                  Submission Date
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('expiryDate')}
                  className="flex items-center gap-1 font-medium text-gray-700 text-sm hover:text-gray-900 cursor-pointer"
                >
                  Expiry Date
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1 font-medium text-gray-700 text-sm hover:text-gray-900 cursor-pointer"
                >
                  Status
                  <i className="ri-arrow-up-down-line text-xs"></i>
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedDocuments.map((document) => (
              <tr key={document.id} className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {/* Fixed syntax error: removed unnecessary template literal */}
                      <i
                        className={
                          document.entityType === 'buyer'
                            ? 'ri-building-line text-blue-600'
                            : document.entityType === 'brand'
                            ? 'ri-star-line text-purple-600'
                            : 'ri-question-line text-gray-600'
                        }
                      ></i>
                    </div>
                    <div>
                      <Link
                        href={`/${document.entityType}s/${document.entityId}`}
                        className="font-medium text-gray-900 hover:text-red-600 cursor-pointer"
                      >
                        {document.entityName}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-1 bg-${
                            document.entityType === 'buyer' ? 'blue' : 'purple'
                          }-100 text-${
                            document.entityType === 'buyer' ? 'blue' : 'purple'
                          }-800 text-xs rounded-full`}
                        >
                          {document.entityType}
                        </span>
                        <img
                          src={`https://readdy.ai/api/search-image?query=%5C${document.country} country flag icon simple clean design&width=16&height=12&seq=flag-${document.country}-table&orientation=landscape`}
                          alt={`${document.country} flag`}
                          className="w-4 h-3 rounded-sm object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{document.documentType}</div>
                    <div className="text-sm text-gray-500">{document.category}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {document.fileName} • {document.fileSize}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-900">{document.submissionDate}</div>
                  {document.reviewer && (
                    <div className="text-xs text-gray-500 mt-1">
                      Reviewed by {document.reviewer}
                    </div>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-900">{document.expiryDate}</div>
                  {isExpiringSoon(document.expiryDate) && (
                    <div className="text-xs text-orange-600 mt-1">
                      <i className="ri-alarm-warning-line mr-1"></i>
                      Expires soon
                    </div>
                  )}
                  {isExpired(document.expiryDate) && (
                    <div className="text-xs text-red-600 mt-1">
                      <i className="ri-error-warning-line mr-1"></i>
                      Expired
                    </div>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <i className={getPriorityColor(document.priority)} title={document.priority + ' priority'}>
                      ●
                    </i>
                    <i className={getStatusIcon(document.status)}></i>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                      {formatStatus(document.status)}
                    </span>
                  </div>
                  {document.notes && (
                    <div className="text-xs text-gray-500 mt-1 max-w-48 truncate">{document.notes}</div>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDocument(document)}
                      className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 whitespace-nowrap cursor-pointer"
                    >
                      View
                    </button>
                    {document.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleQuickAction(document, 'approve')}
                          className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 whitespace-nowrap cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleQuickAction(document, 'reject')}
                          className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {document.status === 'expiring' && (
                      <button
                        onClick={() => handleQuickAction(document, 'remind')}
                        className="px-3 py-1 text-xs font-medium text-orange-600 border border-orange-600 rounded hover:bg-orange-50 whitespace-nowrap cursor-pointer"
                      >
                        Remind
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, documents.length)} of {documents.length} documents
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 text-sm rounded cursor-pointer ${
                currentPage === page
                  ? 'text-white bg-red-600'
                  : 'text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
