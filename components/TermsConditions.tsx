
'use client';

import { useState } from 'react';

interface TermsConditionsProps {
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

export default function TermsConditions({ brandData }: TermsConditionsProps) {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'brand',
      message: 'Hello, we would like to negotiate the payment terms. Can we discuss a 45-day payment cycle instead of 30 days?',
      timestamp: '2024-01-16 09:30 AM',
      avatar: 'SJ'
    },
    {
      id: 2,
      sender: 'admin',
      message: 'Hi Sarah, thank you for reaching out. I can review the payment terms with our team. What is the reason for requesting extended payment terms?',
      timestamp: '2024-01-16 10:15 AM',
      avatar: 'AD'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const terms = [
    {
      id: 1,
      title: 'Marketing & Promotion Terms',
      description: 'Brand agrees to participate in marketplace marketing campaigns and promotional activities',
      status: 'approved',
      negotiations: 0
    },
    {
      id: 2,
      title: 'Product Information Sharing',
      description: 'Brand will provide accurate product descriptions, images, and specifications',
      status: 'approved',
      negotiations: 0
    },
    {
      id: 3,
      title: 'Payment Terms',
      description: 'Net 30 payment terms for all marketplace transactions',
      status: 'negotiating',
      negotiations: 2
    },
    {
      id: 4,
      title: 'Inventory Management',
      description: 'Brand maintains minimum inventory levels and provides stock updates',
      status: 'pending',
      negotiations: 0
    },
    {
      id: 5,
      title: 'Quality Assurance',
      description: 'All products meet marketplace quality standards and certifications',
      status: 'approved',
      negotiations: 0
    },
    {
      id: 6,
      title: 'Return & Refund Policy',
      description: 'Brand accepts marketplace return policy and handles customer refunds',
      status: 'pending',
      negotiations: 0
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'admin',
        message: newMessage,
        timestamp: new Date().toLocaleString(),
        avatar: 'AD'
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const handleTermAction = (termId: number, action: 'approve' | 'reject') => {
    // Handle term approval/rejection logic here
    console.log(`${action} term ${termId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negotiating':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Terms & Conditions Review</h3>
        <p className="text-sm text-gray-500 mt-1">Review and approve individual terms with the brand</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-base font-medium text-gray-900">Terms Status</h4>
          
          {terms.map((term) => (
            <div key={term.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 mb-1">{term.title}</h5>
                  <p className="text-sm text-gray-600">{term.description}</p>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  {term.negotiations > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <i className="ri-chat-3-line mr-1"></i>
                      {term.negotiations}
                    </span>
                  )}
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(term.status)}`}>
                    {term.status === 'approved' && <i className="ri-check-line mr-1"></i>}
                    {term.status === 'negotiating' && <i className="ri-chat-3-line mr-1"></i>}
                    {term.status === 'pending' && <i className="ri-time-line mr-1"></i>}
                    {term.status.charAt(0).toUpperCase() + term.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {term.status === 'pending' && (
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleTermAction(term.id, 'reject')}
                    className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 whitespace-nowrap cursor-pointer"
                  >
                    Request Changes
                  </button>
                  <button
                    onClick={() => handleTermAction(term.id, 'approve')}
                    className="px-3 py-1 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded hover:bg-green-100 whitespace-nowrap cursor-pointer"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-medium text-gray-900">Negotiation Chat</h4>
              <span className="text-sm text-gray-500">with {brandData.contactPerson}</span>
            </div>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-xs ${msg.sender === 'admin' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                    msg.sender === 'admin' ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                    {msg.avatar}
                  </div>
                  <div className={`rounded-lg px-3 py-2 ${
                    msg.sender === 'admin' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'admin' ? 'text-red-100' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-send-plane-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <i className="ri-information-line text-blue-500"></i>
          <span className="text-sm text-gray-600">
            {terms.filter(t => t.status === 'approved').length} of {terms.length} terms approved
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
            Save Progress
          </button>
          <button className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer">
            Complete Terms Review
          </button>
        </div>
      </div>
    </div>
  );
}
