
'use client';

import { useState } from 'react';

interface ComplianceDetailModalProps {
  document: any;
  onClose: () => void;
  onAction: (documentId: number, action: string, reason?: string) => void;
}

export default function ComplianceDetailModal({
  document,
  onClose,
  onAction,
}: ComplianceDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [rejectReason, setRejectReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);

  const documentHistory = [
    {
      id: 1,
      action: 'Document Submitted',
      date: '2024-03-15 14:30',
      user: document.entityName,
      details: 'Initial document submission',
      status: 'submitted',
    },
    {
      id: 2,
      action: 'Under Review',
      date: '2024-03-15 15:45',
      user: 'System',
      details: 'Document moved to review queue',
      status: 'review',
    },
    {
      id: 3,
      action: 'Additional Info Requested',
      date: '2024-03-16 09:15',
      user: 'Jennifer Martinez',
      details: 'Requested clarification on business structure',
      status: 'info_request',
    },
  ];

  const complianceChecklist = [
    {
      item: 'Document Format',
      status: 'passed',
      details: 'PDF format, readable quality',
    },
    {
      item: 'Information Completeness',
      status: 'passed',
      details: 'All required fields present',
    },
    {
      item: 'Document Authenticity',
      status: 'pending',
      details: 'Verification in progress',
    },
    {
      item: 'Expiry Date Validity',
      status: 'passed',
      details: 'Valid until March 2025',
    },
    {
      item: 'Legal Compliance',
      status: 'pending',
      details: 'Legal team review required',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'passed':
        return 'ri-check-circle-fill text-green-500';
      case 'pending':
        return 'ri-time-line text-yellow-500';
      case 'rejected':
      case 'failed':
        return 'ri-close-circle-fill text-red-500';
      default:
        return 'ri-file-line text-gray-500';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Document Submitted':
        return 'ri-upload-line text-blue-500';
      case 'Under Review':
        return 'ri-eye-line text-yellow-500';
      case 'Additional Info Requested':
        return 'ri-question-line text-orange-500';
      case 'Approved':
        return 'ri-check-line text-green-500';
      case 'Rejected':
        return 'ri-close-line text-red-500';
      default:
        return 'ri-file-line text-gray-500';
    }
  };

  const safeOnAction = async (
    documentId: number,
    action: string,
    reason?: string,
  ) => {
    try {
      await onAction(documentId, action, reason);
    } catch (error) {
      console.error(`Failed to ${action} document ${documentId}:`, error);
      // Optional: show a toast/alert to the user
    }
  };

  const handleApprove = () => {
    safeOnAction(document.id, 'approve', adminNotes);
    setShowApproveModal(false);
  };

  const handleReject = () => {
    safeOnAction(document.id, 'reject', rejectReason);
    setShowRejectModal(false);
  };

  const handleRequestResubmission = () => {
    safeOnAction(document.id, 'request_resubmission', rejectReason);
    setShowRejectModal(false);
  };

  const tabs = [
    { id: 'overview', name: 'Document Overview', icon: 'ri-file-line' },
    { id: 'checklist', name: 'Compliance Checklist', icon: 'ri-task-line' },
    { id: 'history', name: 'Document History', icon: 'ri-history-line' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{document.documentType}</h2>
              <p className="text-gray-600 mt-1">{document.entityName} • {document.category}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Document Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Document Type:</span>
                        <span className="text-sm font-medium text-gray-900">{document.documentType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Category:</span>
                        <span className="text-sm font-medium text-gray-900">{document.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Submission Date:</span>
                        <span className="text-sm font-medium text-gray-900">{document.submissionDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Expiry Date:</span>
                        <span className="text-sm font-medium text-gray-900">{document.expiryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">File Size:</span>
                        <span className="text-sm font-medium text-gray-900">{document.fileSize}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Status:</span>
                        <div className="flex items-center gap-2">
                          <i className={getStatusIcon(document.status)}></i>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                            {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Entity Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Entity Name:</span>
                        <span className="text-sm font-medium text-gray-900">{document.entityName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Entity Type:</span>
                        <span className={`px-2 py-1 bg-${document.entityType === 'buyer' ? 'blue' : 'purple'}-100 text-${document.entityType === 'buyer' ? 'blue' : 'purple'}-800 text-xs rounded-full`}>
                          {document.entityType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Country:</span>
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://readdy.ai/api/search-image?query=%5C${document.country}%20country%20flag%20icon%20simple%20clean%20design&width=16&height=12&seq=flag-${document.country}-modal&orientation=landscape`}
                            alt={`${document.country} flag`}
                            className="w-4 h-3 rounded-sm object-cover"
                          />
                          <span className="text-sm font-medium text-gray-900">{document.country}</span>
                        </div>
                      </div>
                      {document.reviewer && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Reviewer:</span>
                          <span className="text-sm font-medium text-gray-900">{document.reviewer}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Notes</h3>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      rows={4}
                      placeholder="Add your review notes here..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                      maxLength={500}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Document Preview</h3>
                    <div className="flex items-center justify-center h-64 bg-white border-2 border-dashed border-gray-300 rounded-lg">
                      <div className="text-center">
                        <i className="ri-file-pdf-line text-4xl text-red-500 mb-2"></i>
                        <p className="text-sm font-medium text-gray-900">{document.fileName}</p>
                        <p className="text-xs text-gray-500 mt-1">{document.fileSize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
                        <i className="ri-download-line mr-2"></i>
                        Download
                      </button>
                      <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
                        <i className="ri-external-link-line mr-2"></i>
                        View Full Size
                      </button>
                    </div>
                  </div>

                  {document.notes && (
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Existing Notes</h3>
                      <p className="text-sm text-gray-700">{document.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'checklist' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Checklist</h3>
                  <p className="text-sm text-gray-600 mb-6">Review each compliance requirement before approving the document.</p>
                </div>

                <div className="space-y-4">
                  {complianceChecklist.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <i className={getStatusIcon(item.status)}></i>
                          <div>
                            <h4 className="font-medium text-gray-900">{item.item}</h4>
                            <p className="text-sm text-gray-500 mt-1">{item.details}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-information-line text-blue-500 mt-0.5"></i>
                    <div>
                      <h4 className="font-medium text-blue-900">Compliance Score</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        {complianceChecklist.filter((item) => item.status === 'passed').length} of{' '}
                        {complianceChecklist.length} requirements passed
                      </p>
                      <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(complianceChecklist.filter((item) => item.status === 'passed').length /
                              complianceChecklist.length) *
                              100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Document History</h3>
                  <p className="text-sm text-gray-600 mb-6">Complete timeline of all actions taken on this document.</p>
                </div>

                <div className="space-y-4">
                  {documentHistory.map((entry, index) => (
                    <div key={entry.id} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={getActionIcon(entry.action)}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{entry.action}</p>
                          <p className="text-sm text-gray-500">{entry.date}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{entry.details}</p>
                        <p className="text-xs text-gray-500 mt-1">by {entry.user}</p>
                      </div>
                      {index < documentHistory.length - 1 && (
                        <div className="absolute left-4 mt-8 w-px h-6 bg-gray-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="ri-shield-check-line text-blue-500"></i>
              <span>All actions are logged and auditable</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Close
              </button>
              {document.status === 'pending' && (
                <>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
                  >
                    Reject Document
                  </button>
                  <button
                    onClick={() => setShowApproveModal(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
                  >
                    Approve Document
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Approve Document</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to approve this document? This action will mark it as compliant and notify the{' '}
              {document.entityType}.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowApproveModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
              >
                Yes, Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-close-line text-red-600"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Reject Document</h3>
            </div>
            <p className="text-gray-600 mb-4">Please provide a reason for rejecting this document:</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="Enter rejection reason..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none mb-6"
              maxLength={500}
            />
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestResubmission}
                className="px-4 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 whitespace-nowrap cursor-pointer"
              >
                Request Resubmission
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                Reject Document
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
