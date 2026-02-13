
'use client';

import { useState } from 'react';

interface ComplianceTabProps {
  brandId: string;
}

export default function ComplianceTab({ brandId }: ComplianceTabProps) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const complianceItems = [
    {
      id: 1,
      documentName: 'Clean Beauty Certification',
      type: 'Certification',
      description: 'Clean beauty standards certification for Pure Essence brand',
      status: 'approved',
      submittedDate: '2024-01-18',
      expiryDate: '2025-01-18',
      version: 'v1.3',
      documents: ['Clean_Beauty_Cert.pdf'],
      notes: 'All documents verified and approved',
      visibleToBuyer: true
    },
    {
      id: 2,
      documentName: 'Face Oil Purity Testing',
      type: 'Testing',
      description: 'Purity and contamination testing for nourishing face oil',
      status: 'approved',
      submittedDate: '2024-02-12',
      expiryDate: '2025-02-12',
      version: 'v1.1',
      documents: ['Purity_Test_Report.pdf'],
      notes: 'Testing completed successfully',
      visibleToBuyer: true
    },
    {
      id: 3,
      documentName: 'Toner Microbiological Safety',
      type: 'Safety',
      description: 'Microbiological safety testing for balancing toner',
      status: 'approved',
      submittedDate: '2024-02-28',
      expiryDate: '2025-02-28',
      version: 'v2.0',
      documents: ['Micro_Safety_Report.pdf'],
      notes: 'All safety parameters met',
      visibleToBuyer: true
    },
    {
      id: 4,
      documentName: 'Sustainable Packaging Compliance',
      type: 'Environmental',
      description: 'Sustainable packaging compliance and environmental impact assessment',
      status: 'expiring',
      submittedDate: '2024-01-25',
      expiryDate: '2024-12-25',
      version: 'v1.0',
      documents: ['Sustainability_Report.pdf'],
      notes: 'Renewal required soon',
      visibleToBuyer: false
    },
    {
      id: 5,
      documentName: 'Micellar Water Efficacy Study',
      type: 'Testing',
      description: 'Clinical efficacy study for gentle micellar water',
      status: 'approved',
      submittedDate: '2024-02-08',
      expiryDate: '2025-02-08',
      version: 'v1.2',
      documents: ['Efficacy_Study.pdf'],
      notes: 'Clinical results confirmed',
      visibleToBuyer: true
    },
    {
      id: 6,
      documentName: 'Essence Preservative Challenge',
      type: 'Testing',
      description: 'Preservative challenge test for hydrating essence',
      status: 'pending',
      submittedDate: '2024-03-05',
      expiryDate: '2025-03-05',
      version: 'v1.0',
      documents: ['Preservative_Test.pdf'],
      notes: 'Under review by technical team',
      visibleToBuyer: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expiring':
        return 'bg-orange-100 text-orange-800';
      case 'revision_required':
        return 'bg-red-100 text-red-800';
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
      case 'expiring':
        return 'ri-alarm-warning-line text-orange-500';
      case 'revision_required':
        return 'ri-error-warning-fill text-red-500';
      default:
        return 'ri-file-line text-gray-500';
    }
  };

  const formatStatus = (status: string) => {
    if (status === 'expiring') return 'Expiring';
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredItems = complianceItems.filter(item => 
    filterStatus === 'all' || item.status === filterStatus
  );

  const handleApprove = (item: any) => {
    setSelectedItem(item);
    setShowApprovalModal(true);
  };

  const handleReject = (item: any) => {
    console.log('Rejecting item:', item.id);
  };

  const toggleVisibility = (itemId: number) => {
    console.log('Toggling visibility for item:', itemId);
  };

  const confirmApproval = () => {
    console.log('Approving item:', selectedItem?.id);
    setShowApprovalModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Compliance Management</h3>
          <p className="text-sm text-gray-500 mt-1">Monitor and manage compliance requirements for brand-buyer relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm pr-8"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="expiring">Expiring</option>
            <option value="revision_required">Revision Required</option>
          </select>
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
            <i className="ri-add-line mr-2"></i>
            Add Requirement
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Document Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Visibility</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Version</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Upload Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Expiry Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{item.documentName}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleVisibility(item.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                          item.visibleToBuyer ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            item.visibleToBuyer ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <span className={`text-xs ${item.visibleToBuyer ? 'text-green-600' : 'text-gray-500'}`}>
                        {item.visibleToBuyer ? 'All can see' : 'Only admin can see'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900 font-mono">{item.version}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">{item.submittedDate}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-sm ${item.status === 'expiring' ? 'text-orange-600' : 'text-gray-700'}`}>
                      {item.expiryDate}
                    </span>
                    {item.status === 'expiring' && (
                      <span className="text-xs text-orange-600 ml-2">Expires soon</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <i className={getStatusIcon(item.status)}></i>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {formatStatus(item.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer">
                        View
                      </button>
                      {item.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleReject(item)}
                            className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer"
                          >
                            Request Update
                          </button>
                          <button
                            onClick={() => handleApprove(item)}
                            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 whitespace-nowrap cursor-pointer"
                          >
                            Approve
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

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {filteredItems.length} of {complianceItems.length} compliance items
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer">
            Previous
          </button>
          <button className="px-3 py-1 text-sm text-white bg-red-600 rounded cursor-pointer">
            1
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer">
            2
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer">
            Next
          </button>
        </div>
      </div>

      {showApprovalModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Approval</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to approve "{selectedItem.documentName}"? 
              This action will update the compliance status and notify relevant parties.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmApproval}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
              >
                Yes, Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
