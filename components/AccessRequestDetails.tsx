'use client';

import { useState } from 'react';

interface AccessRequestDetailsProps {
  request: any;
  onClose: () => void;
}

export default function AccessRequestDetails({ request, onClose }: AccessRequestDetailsProps) {
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [adminNotes, setAdminNotes] = useState(request.adminNotes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [assignTo, setAssignTo] = useState(request.requestedEntity.type);
  const [selectedEntity, setSelectedEntity] = useState(request.requestedEntity.name);
  const [activeTab, setActiveTab] = useState('buyer');
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(request.status === 'Approved' && request.conversations.length > 0);

  const handleApprove = () => {
    console.log('Approving access request:', request.id, 'Assign to:', assignTo, 'Entity:', selectedEntity);
    setShowApprovalModal(false);
    setShowChat(true);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    console.log('Rejecting access request:', request.id, 'Reason:', rejectionReason);
    setShowRejectionModal(false);
    setRejectionReason('');
  };

  const handleSaveNotes = () => {
    setIsSavingNotes(true);
    setTimeout(() => {
      console.log('Saving admin notes:', adminNotes);
      setIsSavingNotes(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Send admin message:', newMessage);
      setNewMessage('');
    }
  };

  const brands = [
    'Pure Essence',
    'Botanica Natural', 
    'Luxury Glow',
    'Fresh Start Wellness',
    'Urban Skin Co'
  ];

  const wholesalers = [
    'Global Beauty Distributors',
    'Premium Cosmetics Wholesale',
    'Natural Products Network',
    'Luxury Beauty Supply'
  ];

  const entityOptions = assignTo === 'Brand' ? brands : wholesalers;

  const buyerMessages = request.conversations.filter((msg: any) => msg.sender === 'buyer');
  const brandMessages = request.conversations.filter((msg: any) => msg.sender === 'brand');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Access Request Details</h2>
              <p className="text-sm text-gray-500 mt-1">{request.buyerCompany} → {request.requestedEntity.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                request.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {request.status}
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                
                {/* Buyer Summary Card */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-user-line text-blue-600"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Buyer Summary</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {request.buyerName.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{request.buyerCompany}</div>
                        <div className="text-sm text-gray-500">{request.buyerName}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <img
                            src={`https://readdy.ai/api/search-image?query=$%7Brequest.buyerCountry%7D%20country%20flag%20icon%20simple%20clean%20design&width=16&height=12&seq=flag-${request.buyerCountry}-detail&orientation=landscape`}
                            alt={`${request.buyerCountry} flag`}
                            className="w-4 h-3 rounded-sm object-cover"
                          />
                          <span className="text-xs text-gray-500">{request.buyerBusinessType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p className="text-sm text-gray-900">{request.buyerEmail}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <p className="text-sm text-gray-900">{request.buyerPhone}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Connected Brands</label>
                      {request.buyerConnectedBrands.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {request.buyerConnectedBrands.map((brand: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {brand}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No connected brands</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order History</label>
                      <div className="grid grid-cols-3 gap-4 p-3 bg-white rounded-lg border">
                        <div className="text-center">
                          <div className="font-medium text-gray-900">{request.buyerOrderHistory.totalOrders}</div>
                          <div className="text-xs text-gray-500">Orders</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-900">{request.buyerOrderHistory.totalValue}</div>
                          <div className="text-xs text-gray-500">Total Value</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-900">
                            {request.buyerOrderHistory.lastOrder || 'None'}
                          </div>
                          <div className="text-xs text-gray-500">Last Order</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requested Entity Card */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className={`${request.requestedEntity.type === 'Brand' ? 'ri-store-2-line' : 'ri-building-2-line'} text-purple-600`}></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Requested {request.requestedEntity.type}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={request.requestedEntity.logo}
                        alt={`${request.requestedEntity.name} logo`}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{request.requestedEntity.name}</div>
                        <div className="text-sm text-gray-500">{request.requestedEntity.category}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.requestedEntity.type === 'Brand' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {request.requestedEntity.type}
                          </span>
                          <span className="text-xs text-gray-500">{request.requestedEntity.region}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <p className="text-sm text-gray-900">{request.requestedEntity.description}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Request Reason</label>
                      <div className="p-3 bg-white rounded-lg border">
                        <p className="text-sm text-gray-700">{request.requestReason}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Assignment Section */}
              {request.status === 'Pending' && (
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-settings-3-line text-blue-600"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Admin Assignment</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                      <select
                        value={assignTo}
                        onChange={(e) => setAssignTo(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                      >
                        <option value="Brand">Brand</option>
                        <option value="Wholesaler">Wholesaler</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select {assignTo}</label>
                      <select
                        value={selectedEntity}
                        onChange={(e) => setSelectedEntity(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                      >
                        {entityOptions.map((entity) => (
                          <option key={entity} value={entity}>{entity}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {assignTo !== request.requestedEntity.type && (
                    <div className="mt-4 p-3 bg-yellow-100 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <i className="ri-information-line text-yellow-600"></i>
                        <span className="text-sm text-yellow-800">
                          You are switching from {request.requestedEntity.type} to {assignTo}. The buyer will be connected to {selectedEntity} instead.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Admin Notes Section */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
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
                    rows={3}
                    placeholder="Add internal notes about this access request..."
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
              {request.status === 'Rejected' && request.rejectionReason && (
                <div className="bg-red-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <i className="ri-close-circle-line text-red-600"></i>
                    </div>
                    <h3 className="text-lg font-medium text-red-900">Rejection Reason</h3>
                  </div>
                  <p className="text-red-800">{request.rejectionReason}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {request.status === 'Pending' && (
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowRejectionModal(true)}
                className="px-6 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
              >
                Reject Request
              </button>
              <button
                onClick={() => setShowApprovalModal(true)}
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
              >
                Approve Request
              </button>
            </div>
          )}
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="w-96 border-l border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Communication</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('buyer')}
                  className={`flex-1 py-2 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'buyer' 
                      ? 'border-red-500 text-red-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Buyer ({buyerMessages.length})
                </button>
                <button
                  onClick={() => setActiveTab('brand')}
                  className={`flex-1 py-2 px-1 text-sm font-medium border-b-2 ${
                    activeTab === 'brand' 
                      ? 'border-red-500 text-red-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {request.requestedEntity.type} ({brandMessages.length})
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeTab === 'buyer' && (
                <>
                  {buyerMessages.map((message: any) => (
                    <div key={message.id} className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-900">{message.senderName}</span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-900">
                        {message.message}
                      </div>
                    </div>
                  ))}
                  {buyerMessages.length === 0 && (
                    <div className="text-center text-gray-500 text-sm">
                      No messages from buyer yet
                    </div>
                  )}
                </>
              )}

              {activeTab === 'brand' && (
                <>
                  {brandMessages.map((message: any) => (
                    <div key={message.id} className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-900">{message.senderName}</span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg text-sm text-gray-900">
                        {message.message}
                      </div>
                    </div>
                  ))}
                  {brandMessages.length === 0 && (
                    <div className="text-center text-gray-500 text-sm">
                      No messages from {request.requestedEntity.type.toLowerCase()} yet
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="space-y-3">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                  placeholder="Type admin message to mediate conversation..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                  maxLength={500}
                />
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <i className="ri-shield-user-line mr-1"></i>
                    Admin mediates all communication
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 whitespace-nowrap cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Approve Access Request</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Approve {request.buyerCompany}'s request to connect with <strong>{selectedEntity}</strong>?
              </p>
              {assignTo !== request.requestedEntity.type && (
                <div className="p-3 bg-yellow-100 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <i className="ri-information-line mr-2"></i>
                    Note: Switching from {request.requestedEntity.type} to {assignTo}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 justify-end mt-6">
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
                Approve & Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reject Access Request</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting {request.buyerCompany}'s request:
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
                Reject Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}