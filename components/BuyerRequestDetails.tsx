'use client';

import { useState } from 'react';

interface BuyerRequestDetailsProps {
  buyer: any;
  onClose: () => void;
}

export default function BuyerRequestDetails({ buyer, onClose }: BuyerRequestDetailsProps) {
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [adminNotes, setAdminNotes] = useState(buyer.adminNotes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const handleApprove = () => {
    console.log('Approving buyer:', buyer.id);
    setShowApprovalModal(false);
    // Update buyer status logic here
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    console.log('Rejecting buyer:', buyer.id, 'Reason:', rejectionReason);
    setShowRejectionModal(false);
    setRejectionReason('');
    // Update buyer status logic here
  };

  const handleSaveNotes = () => {
    setIsSavingNotes(true);
    setTimeout(() => {
      console.log('Saving admin notes:', adminNotes);
      setIsSavingNotes(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Issues':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Buyer Registration Details</h2>
            <p className="text-sm text-gray-500 mt-1">{buyer.companyName} - {buyer.buyerName}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${buyer.status === 'Approved' ? 'bg-green-100 text-green-800' : buyer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
              {buyer.status}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Company Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-building-line text-blue-600"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <p className="text-gray-900">{buyer.companyName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                      <p className="text-gray-900">{buyer.businessType}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <a href={buyer.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                      {buyer.website}
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{buyer.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-gray-900">{buyer.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Address & Markets */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-map-pin-line text-green-600"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Address & Markets</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                    <p className="text-gray-900">{buyer.fullAddress}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Markets Served</label>
                    <div className="flex flex-wrap gap-2">
                      {buyer.marketsServed.map((market: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {market}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Locations</label>
                    <p className="text-gray-900">{buyer.locations}</p>
                  </div>
                </div>
              </div>

              {/* Legal & Tax Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-file-shield-line text-purple-600"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Legal & Tax Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                      <p className="text-gray-900">{buyer.registrationNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GST/VAT Number</label>
                      <p className="text-gray-900">{buyer.gstVat}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Uploaded Documents</label>
                    <div className="space-y-2">
                      {buyer.documents.map((doc: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div className="flex items-center gap-3">
                            <i className="ri-file-pdf-line text-red-500 text-xl"></i>
                            <div>
                              <p className="font-medium text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                            <button className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
                              <i className="ri-download-line"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Brands & Associations */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <i className="ri-price-tag-3-line text-yellow-600"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Current Brands & Associations</h3>
                </div>
                <div className="space-y-4">
                  {buyer.currentBrands.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {buyer.currentBrands.map((brand: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                          {brand}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No current brand associations</p>
                  )}
                </div>
              </div>

              {/* Contact Setup */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <i className="ri-contacts-line text-indigo-600"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Contact Setup</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-medium text-gray-900 mb-2">Primary Contact</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <p className="text-gray-900">{buyer.primaryContact.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <p className="text-gray-900">{buyer.primaryContact.role}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p className="text-gray-900">{buyer.primaryContact.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <p className="text-gray-900">{buyer.primaryContact.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  {buyer.teamMembers.length > 0 && (
                    <div className="p-4 bg-white rounded-lg border">
                      <h4 className="font-medium text-gray-900 mb-2">Additional Team Members</h4>
                      <div className="space-y-2">
                        {buyer.teamMembers.map((member: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{member.name}</p>
                              <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                            <p className="text-sm text-gray-600">{member.email}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Hierarchy Management */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <i className="ri-organization-chart text-teal-600"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Hierarchy Management</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Entity Type</label>
                      <p className="text-gray-900">{buyer.hierarchy.type}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <p className="text-gray-900">{buyer.hierarchy.industry}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                    <p className="text-gray-900">{buyer.hierarchy.organizationName}</p>
                  </div>
                  {buyer.hierarchy.subEntities.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sub-entities</label>
                      <div className="space-y-1">
                        {buyer.hierarchy.subEntities.map((entity: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <i className="ri-arrow-right-s-line text-gray-400"></i>
                            <span className="text-gray-700">{entity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Admin Notes Section */}
            <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <i className="ri-sticky-note-line text-gray-600"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Admin Notes</h3>
              </div>
              <div className="space-y-4">
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  placeholder="Add internal notes for the admin team..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  maxLength={500}
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50 whitespace-nowrap cursor-pointer"
                >
                  {isSavingNotes ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>

            {/* Rejection Reason Display */}
            {buyer.status === 'Rejected' && buyer.rejectionReason && (
              <div className="mt-6 bg-red-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className="ri-close-circle-line text-red-600"></i>
                  </div>
                  <h3 className="text-lg font-medium text-red-900">Rejection Reason</h3>
                </div>
                <p className="text-red-800">{buyer.rejectionReason}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {buyer.status === 'Pending' && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setShowRejectionModal(true)}
              className="px-6 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
            >
              Reject Buyer
            </button>
            <button
              onClick={() => setShowApprovalModal(true)}
              className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
            >
              Approve Buyer
            </button>
          </div>
        )}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Approve Buyer</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to approve {buyer.companyName}? This will grant them dashboard access and allow them to place orders.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
              >
                Approve Buyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reject Buyer</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting {buyer.companyName}:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              placeholder="Enter rejection reason..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none mb-4"
              maxLength={500}
            />
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
              >
                Reject Buyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}