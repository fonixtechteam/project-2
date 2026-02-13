'use client';

import { useState } from 'react';

interface ConnectionDetailsProps {
  connection: any;
  onClose: () => void;
  onConnectionAction: (action: string, connectionId: string) => void;
}

export default function ConnectionDetails({ connection, onClose, onConnectionAction }: ConnectionDetailsProps) {
  const [activeTab, setActiveTab] = useState('buyer');
  const [newMessage, setNewMessage] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Send admin message:', newMessage, 'to tab:', activeTab);
      setNewMessage('');
    }
  };

  const handleConnectionAction = (action: string) => {
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    onConnectionAction(actionType, connection.id);
    setShowActionModal(false);
    setActionType('');
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Issues Found':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const buyerMessages = connection.conversations.filter((msg: any) => msg.sender === 'buyer');
  const brandMessages = connection.conversations.filter((msg: any) => msg.sender === 'brand');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Connection Details</h2>
              <p className="text-sm text-gray-500 mt-1">
                {connection.buyer.name} ↔ {connection.connectedEntity.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                connection.status === 'Active' ? 'bg-green-100 text-green-800' : 
                connection.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {connection.status}
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
                
                {/* Buyer Card */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-user-line text-blue-600"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Buyer Information</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={connection.buyer.logo}
                        alt={`${connection.buyer.name} logo`}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{connection.buyer.name}</div>
                        <div className="text-sm text-gray-500">{connection.buyer.company}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <img
                            src={`https://readdy.ai/api/search-image?query=$%7Bconnection.buyer.country%7D%20country%20flag%20icon%20simple%20clean%20design&width=16&height=12&seq=detail-flag-${connection.buyer.country}&orientation=landscape`}
                            alt={`${connection.buyer.country} flag`}
                            className="w-4 h-3 rounded-sm object-cover"
                          />
                          <span className="text-xs text-gray-500">{connection.buyer.businessType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                        <p className="text-sm text-gray-900">{connection.buyer.contactPerson}</p>
                        <p className="text-sm text-gray-500">{connection.buyer.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Compliance</label>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(connection.buyer.complianceStatus)}`}>
                          {connection.buyer.complianceStatus}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Markets Served</label>
                      <div className="flex flex-wrap gap-2">
                        {connection.buyer.marketsServed.map((market: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {market}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order History</label>
                      <div className="grid grid-cols-2 gap-4 p-3 bg-white rounded-lg border">
                        <div className="text-center">
                          <div className="font-medium text-gray-900">{connection.totalOrders}</div>
                          <div className="text-xs text-gray-500">Total Orders</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-900">{connection.totalValue}</div>
                          <div className="text-xs text-gray-500">Total Value</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connected Entity Card */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className={`${connection.connectedEntity.type === 'Brand' ? 'ri-store-2-line' : 'ri-building-2-line'} text-purple-600`}></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Connected {connection.connectedEntity.type}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={connection.connectedEntity.logo}
                        alt={`${connection.connectedEntity.name} logo`}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{connection.connectedEntity.name}</div>
                        <div className="text-sm text-gray-500">{connection.connectedEntity.category}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            connection.connectedEntity.type === 'Brand' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {connection.connectedEntity.type}
                          </span>
                          <span className="text-xs text-gray-500">{connection.connectedEntity.region}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <p className="text-sm text-gray-900">{connection.connectedEntity.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <i className="ri-links-line text-gray-600"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Connection Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="font-medium text-gray-900">{connection.dateConnected}</div>
                    <div className="text-sm text-gray-500">Date Connected</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="font-medium text-gray-900">{connection.lastActivity}</div>
                    <div className="text-sm text-gray-500">Last Activity</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="font-medium text-gray-900">{connection.totalOrders}</div>
                    <div className="text-sm text-gray-500">Total Orders</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="font-medium text-gray-900">{connection.activeNegotiations}</div>
                    <div className="text-sm text-gray-500">Active Negotiations</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => handleConnectionAction('pause')}
                  className="px-4 py-2 text-sm font-medium text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-50 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-pause-line mr-2"></i>
                  Pause Connection
                </button>
                <button
                  onClick={() => handleConnectionAction('remove')}
                  className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-delete-bin-line mr-2"></i>
                  Remove Connection
                </button>
                <button
                  onClick={() => handleConnectionAction('view_orders')}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-shopping-cart-line mr-2"></i>
                  View Orders
                </button>
                <button
                  onClick={() => handleConnectionAction('view_compliance')}
                  className="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-shield-check-line mr-2"></i>
                  View Compliance
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="w-96 border-l border-gray-200 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Communication</h3>
              <div className="text-xs text-gray-500">
                <i className="ri-shield-user-line mr-1"></i>
                Admin Mediated
              </div>
            </div>
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('buyer')}
                className={`flex-1 py-2 px-1 text-sm font-medium border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'buyer' 
                    ? 'border-red-500 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Buyer ({buyerMessages.length})
              </button>
              <button
                onClick={() => setActiveTab('brand')}
                className={`flex-1 py-2 px-1 text-sm font-medium border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'brand' 
                    ? 'border-red-500 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {connection.connectedEntity.type} ({brandMessages.length})
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'buyer' && (
              <>
                {buyerMessages.map((message: any) => (
                  <div key={message.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600 text-xs"></i>
                      </div>
                      <span className="text-xs font-medium text-gray-900">{message.senderName}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-900">{message.message}</p>
                    <div className="flex items-center justify-end mt-2">
                      <button className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer">
                        <i className="ri-share-forward-line mr-1"></i>
                        Forward to {connection.connectedEntity.type}
                      </button>
                    </div>
                  </div>
                ))}
                {buyerMessages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    <i className="ri-chat-3-line text-2xl text-gray-300 mb-2"></i>
                    <p>No messages from buyer yet</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'brand' && (
              <>
                {brandMessages.map((message: any) => (
                  <div key={message.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <i className="ri-store-2-line text-green-600 text-xs"></i>
                      </div>
                      <span className="text-xs font-medium text-gray-900">{message.senderName}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-900">{message.message}</p>
                    <div className="flex items-center justify-end mt-2">
                      <button className="text-xs text-green-600 hover:text-green-700 cursor-pointer">
                        <i className="ri-share-forward-line mr-1"></i>
                        Forward to Buyer
                      </button>
                    </div>
                  </div>
                ))}
                {brandMessages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    <i className="ri-chat-3-line text-2xl text-gray-300 mb-2"></i>
                    <p>No messages from {connection.connectedEntity.type.toLowerCase()} yet</p>
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
                placeholder={`Type admin message for ${activeTab}...`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                maxLength={500}
              />
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  <i className="ri-information-line mr-1"></i>
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
      </div>

      {/* Action Confirmation Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1).replace('_', ' ')}
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to {actionType.replace('_', ' ')} this connection between {connection.buyer.name} and {connection.connectedEntity.name}?
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowActionModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg whitespace-nowrap cursor-pointer ${
                  actionType === 'remove' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}