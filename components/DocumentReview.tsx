
'use client';

import { useState } from 'react';

interface DocumentReviewProps {
  brandData: {
    name: string;
    website: string;
    legalEntity: string;
    contactEmail: string;
    contactPhone: string;
    contactPerson: string;
    bio: string;
    status: string;
    submittedDate: string;
  };
}

export default function DocumentReview({ brandData }: DocumentReviewProps) {
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);

  const documents = [
    {
      id: 1,
      name: 'Business Registration Certificate',
      type: 'Legal Document',
      status: 'approved',
      uploadDate: '2024-01-15',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      required: true,
      notes: 'Document verified and approved.'
    },
    {
      id: 2,
      name: 'FDA Manufacturing License',
      type: 'License & Certification',
      status: 'pending',
      uploadDate: '2024-01-15',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      required: true,
      notes: ''
    },
    {
      id: 3,
      name: 'Product Safety Certificates',
      type: 'Quality Assurance',
      status: 'approved',
      uploadDate: '2024-01-15',
      fileSize: '5.2 MB',
      fileType: 'ZIP',
      required: true,
      notes: 'All certificates validated successfully.'
    },
    {
      id: 4,
      name: 'Insurance Policy Document',
      type: 'Insurance',
      status: 'needs_revision',
      uploadDate: '2024-01-15',
      fileSize: '1.1 MB',
      fileType: 'PDF',
      required: true,
      notes: 'Coverage amount needs to meet minimum requirements.'
    },
    {
      id: 5,
      name: 'Tax Identification Document',
      type: 'Legal Document',
      status: 'approved',
      uploadDate: '2024-01-15',
      fileSize: '856 KB',
      fileType: 'PDF',
      required: true,
      notes: 'Tax ID verified.'
    },
    {
      id: 6,
      name: 'Brand Trademark Certificate',
      type: 'Intellectual Property',
      status: 'pending',
      uploadDate: '2024-01-15',
      fileSize: '1.3 MB',
      fileType: 'PDF',
      required: false,
      notes: ''
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'needs_revision':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return 'ri-check-circle-fill text-green-500';
      case 'pending':
        return 'ri-time-line text-yellow-500';
      case 'needs_revision':
        return 'ri-error-warning-fill text-red-500';
      default:
        return 'ri-file-line text-gray-500';
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return 'ri-file-pdf-line text-red-500';
      case 'zip':
        return 'ri-file-zip-line text-purple-500';
      case 'doc':
      case 'docx':
        return 'ri-file-word-line text-blue-500';
      default:
        return 'ri-file-line text-gray-500';
    }
  };

  const handleDocumentAction = (documentId: number, action: 'approve' | 'reject' | 'request_revision') => {
    // Handle document action logic here
    console.log(`${action} document ${documentId}`);
  };

  const approvedCount = documents.filter(doc => doc.status === 'approved').length;
  const requiredDocs = documents.filter(doc => doc.required);
  const approvedRequired = requiredDocs.filter(doc => doc.status === 'approved').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Document Review</h3>
          <p className="text-sm text-gray-500 mt-1">Review and approve uploaded brand documents</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{approvedRequired}</span> of <span className="font-medium">{requiredDocs.length}</span> required documents approved
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(approvedRequired / requiredDocs.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-base font-medium text-gray-900">Uploaded Documents</h4>
          
          <div className="space-y-3">
            {documents.map((doc) => (
              <div 
                key={doc.id} 
                className={`bg-white border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedDocument === doc.id ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedDocument(doc.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <i className={`${getFileIcon(doc.fileType)} text-xl`}></i>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900 truncate">{doc.name}</h5>
                        <p className="text-sm text-gray-500 mt-1">{doc.type}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                          <span>{doc.fileSize}</span>
                          <span>{doc.uploadDate}</span>
                          {doc.required && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Required</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <i className={getStatusIcon(doc.status)}></i>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                          {doc.status.replace('_', ' ').charAt(0).toUpperCase() + doc.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {doc.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">{doc.notes}</p>
                  </div>
                )}

                {doc.status === 'pending' && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDocumentAction(doc.id, 'request_revision');
                      }}
                      className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 whitespace-nowrap cursor-pointer"
                    >
                      Request Changes
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDocumentAction(doc.id, 'approve');
                      }}
                      className="px-3 py-1 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded hover:bg-green-100 whitespace-nowrap cursor-pointer"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          {selectedDocument ? (
            <div>
              <div className="border-b border-gray-200 px-4 py-3">
                <h4 className="text-base font-medium text-gray-900">Document Preview</h4>
              </div>
              
              <div className="p-4">
                {(() => {
                  const doc = documents.find(d => d.id === selectedDocument);
                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <i className={`${getFileIcon(doc?.fileType || 'pdf')} text-4xl mb-2`}></i>
                          <p className="text-sm font-medium text-gray-900">{doc?.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{doc?.fileType} • {doc?.fileSize}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
                          <i className="ri-download-line mr-2"></i>
                          Download
                        </button>
                        <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
                          <i className="ri-external-link-line mr-2"></i>
                          View Full Size
                        </button>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes</label>
                        <textarea
                          rows={4}
                          placeholder="Add notes about this document..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                          maxLength={500}
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-96 text-center p-8">
              <div>
                <i className="ri-file-list-line text-4xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">Select a document to preview</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <i className="ri-information-line text-blue-500"></i>
          <span className="text-sm text-gray-600">
            {approvedCount} of {documents.length} documents approved
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
            Request Missing Documents
          </button>
          <button 
            className={`px-6 py-2 text-sm font-medium rounded-lg whitespace-nowrap cursor-pointer ${
              approvedRequired === requiredDocs.length
                ? 'text-white bg-green-600 hover:bg-green-700'
                : 'text-gray-400 bg-gray-100 cursor-not-allowed'
            }`}
            disabled={approvedRequired !== requiredDocs.length}
          >
            Complete Document Review
          </button>
        </div>
      </div>
    </div>
  );
}
