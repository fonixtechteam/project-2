'use client';

import { useState } from 'react';

interface BuyerDetailHeaderProps {
  buyerData: {
    name: string;
    company: string;
    logo: string;
    country: string;
    countryName: string;
    status: string;
    tier: string;
    totalOrders: number;
    lifetimeSpend: string;
    connectedBrands: number;
    openInvoices: number;
    accountManager?: string;
  };
}

export default function BuyerDetailHeader({ buyerData }: BuyerDetailHeaderProps) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'Premium':
        return 'bg-blue-100 text-blue-800';
      case 'Standard':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = () => {
    console.log('Sending message:', message);
    setShowMessageModal(false);
    setMessage('');
  };

  const handleAssignAM = () => {
    console.log('Assigning account manager');
    setShowAssignModal(false);
  };

  const handleAddNote = () => {
    console.log('Adding note:', notes);
    setShowNotesModal(false);
    setNotes('');
  };

  const handleExport = () => {
    console.log('Exporting buyer data');
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={buyerData.logo}
                  alt={`${buyerData.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-2xl font-semibold text-gray-900">{buyerData.name}</h1>
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://readdy.ai/api/search-image?query=$%7BbuyerData.country%7D%20country%20flag%20icon%20simple%20clean%20design&width=24&height=16&seq=flag-${buyerData.country}-header&orientation=landscape`}
                      alt={`${buyerData.country} flag`}
                      className="w-6 h-4 rounded-sm object-cover"
                    />
                    <span className="text-sm text-gray-600">{buyerData.countryName}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(buyerData.tier)}`}>
                    {buyerData.tier}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(buyerData.status)}`}>
                    {buyerData.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{buyerData.company}</p>
                
                {buyerData.accountManager && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className="ri-user-line"></i>
                    <span>Account Manager: {buyerData.accountManager}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMessageModal(true)}
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-message-line mr-2"></i>
                Send Message
              </button>
              <button
                onClick={() => setShowAssignModal(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-user-settings-line mr-2"></i>
                Assign AM
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-download-line mr-2"></i>
                Export
              </button>
              <button
                onClick={() => setShowNotesModal(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-sticky-note-line mr-2"></i>
                Add Note
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{buyerData.totalOrders}</div>
              <div className="text-sm text-gray-500">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-green-600">{buyerData.lifetimeSpend}</div>
              <div className="text-sm text-gray-500">Lifetime Spend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-blue-600">{buyerData.connectedBrands}</div>
              <div className="text-sm text-gray-500">Connected Brands</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-semibold ${buyerData.openInvoices > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                {buyerData.openInvoices}
              </div>
              <div className="text-sm text-gray-500">Open Invoices</div>
            </div>
          </div>
        </div>
      </div>

      {/* Send Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Send Message</h3>
            <p className="text-gray-600 mb-4">Send a direct message to {buyerData.name}:</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Enter your message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none mb-4"
              maxLength={500}
            />
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Account Manager Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assign Account Manager</h3>
            <p className="text-gray-600 mb-4">Select an account manager for {buyerData.name}:</p>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4 pr-8">
              <option value="">Select Account Manager</option>
              <option value="jennifer">Jennifer Martinez</option>
              <option value="david">David Thompson</option>
              <option value="sarah">Sarah Wilson</option>
              <option value="michael">Michael Chen</option>
            </select>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignAM}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Note</h3>
            <p className="text-gray-600 mb-4">Add an internal note about {buyerData.name}:</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Enter internal note..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none mb-4"
              maxLength={500}
            />
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}