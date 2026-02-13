'use client';

import { useState } from 'react';

interface BuyerDocumentsTabProps {
  buyerData: any;
}

export default function BuyerDocumentsTab({ buyerData }: BuyerDocumentsTabProps) {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const documents = [
    {
      id: 1,
      name: 'Business Registration Certificate',
      type: 'KYC',
      status: 'Verified',
      uploadDate: '2023-03-15',
      expiryDate: '2025-03-15',
      fileSize: '2.4 MB',
      fileName: 'business-registration.pdf',
      required: true,
      description: 'Official business registration document'
    },
    {
      id: 2,
      name: 'Tax Identification Number',
      type: 'Tax',
      status: 'Verified',
      uploadDate: '2023-03-15',
      expiryDate: '2024-12-31',
      fileSize: '1.2 MB',
      fileName: 'tax-id-certificate.pdf',
      required: true,
      description: 'Federal tax identification certificate'
    },
    {
      id: 3,
      name: 'GST Registration',
      type: 'Tax',
      status: 'Pending',
      uploadDate: '2024-01-10',
      expiryDate: '2025-01-10',
      fileSize: '1.8 MB',
      fileName: 'gst-registration.pdf',
      required: true,
      description: 'Goods and Services Tax registration'
    },
    {
      id: 4,
      name: 'Import License',
      type: 'License',
      status: 'Issues',
      uploadDate: '2024-01-08',
      expiryDate: '2024-06-30',
      fileSize: '3.1 MB',
      fileName: 'import-license.pdf',
      required: false,
      description: 'Import/export business license',
      issues: 'Document quality unclear, please resubmit'
    },
    {
      id: 5,
      name: 'Bank Verification Letter',
      type: 'KYC',
      status: 'Verified',
      uploadDate: '2023-03-20',
      expiryDate: '2024-03-20',
      fileSize: '0.8 MB',
      fileName: 'bank-verification.pdf',
      required: true,
      description: 'Bank account verification letter'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Issues':
        return 'bg-red-100 text-red-800';
      case 'Expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'ri-check-line text-green-600';
      case 'Pending':
        return 'ri-time-line text-yellow-600';
      case 'Issues':
        return 'ri-alert-line text-red-600';
      case 'Expired':
        return 'ri-close-line text-gray-600';
      default:
        return 'ri-file-line text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'KYC':
        return 'ri-user-line text-blue-600';
      case 'Tax':
        return 'ri-money-dollar-circle-line text-green-600';
      case 'License':
        return 'ri-award-line text-purple-600';
      default:
        return 'ri-file-line text-gray-600';
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

  const handleApprove = (docId: number) => {
    setSelectedDocument(docId);
    setShowApproveModal(true);
  };

  const handleReject = (docId: number) => {
    setSelectedDocument(docId);
    setShowRejectModal(true);
  };

  const confirmApprove = () => {
    console.log('Approving document:', selectedDocument);
    setShowApproveModal(false);
    setSelectedDocument(null);
  };

  const confirmReject = () => {
    console.log('Rejecting document:', selectedDocument, 'Reason:', rejectReason);
    setShowRejectModal(false);
    setSelectedDocument(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6">
      {/* Document Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-green-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {documents.filter(d => d.status === 'Verified').length}
              </p>
              <p className="text-sm text-green-700">Verified</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-yellow-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {documents.filter(d => d.status === 'Pending').length}
              </p>
              <p className="text-sm text-yellow-700">Pending</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-alert-line text-red-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {documents.filter(d => d.status === 'Issues').length}
              </p>
              <p className="text-sm text-red-700">Issues</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-line text-orange-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {documents.filter(d => isExpiringSoon(d.expiryDate)).length}
              </p>
              <p className="text-sm text-orange-700">Expiring Soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Document Checklist</h3>
            <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer">
              <i className="ri-download-line mr-2"></i>
              Export Report
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className={getTypeIcon(doc.type)}></i>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          {doc.required && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{doc.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {doc.fileName} • {doc.fileSize}
                        </p>
                        {doc.issues && (
                          <p className="text-xs text-red-600 mt-1">
                            <i className="ri-alert-line mr-1"></i>
                            {doc.issues}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <i className={getStatusIcon(doc.status)}></i>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {doc.uploadDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {doc.expiryDate}
                      {isExpiringSoon(doc.expiryDate) && (
                        <div className="text-xs text-orange-600 mt-1">
                          <i className="ri-alert-line mr-1"></i>
                          Expires soon
                        </div>
                      )}
                      {isExpired(doc.expiryDate) && (
                        <div className="text-xs text-red-600 mt-1">
                          <i className="ri-close-line mr-1"></i>
                          Expired
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900 text-sm cursor-pointer">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer">
                        <i className="ri-download-line"></i>
                      </button>
                      {doc.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(doc.id)}
                            className="text-green-600 hover:text-green-900 text-sm cursor-pointer"
                          >
                            <i className="ri-check-line"></i>
                          </button>
                          <button
                            onClick={() => handleReject(doc.id)}
                            className="text-red-600 hover:text-red-900 text-sm cursor-pointer"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Approve Document</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to approve this document? This action will mark it as verified.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
              >
                Approve Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-close-line text-red-600"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Reject Document</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this document:
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="Enter rejection reason..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none mb-6"
              maxLength={500}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                Reject Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}