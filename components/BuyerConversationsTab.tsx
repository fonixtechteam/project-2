'use client';

import { useState } from 'react';

interface BuyerConversationsTabProps {
  buyerData: any;
}

export default function BuyerConversationsTab({ buyerData }: BuyerConversationsTabProps) {
  const [selectedThread, setSelectedThread] = useState(null);

  const conversations = [
    {
      id: 1,
      brand: 'Pure Essence',
      lastMessage: 'Thank you for the bulk pricing information. We would like to proceed with the order.',
      timestamp: '2024-01-15 14:30',
      unread: 2,
      status: 'active',
      avatar: 'https://readdy.ai/api/search-image?query=pure%20essence%20brand%20logo%20clean%20minimal%20natural%20beauty%20cosmetics%20white%20background%20professional&width=40&height=40&seq=conv1&orientation=squarish'
    },
    {
      id: 2,
      brand: 'Botanica Natural',
      lastMessage: 'Could you provide more details about your organic certification requirements?',
      timestamp: '2024-01-12 09:15',
      unread: 0,
      status: 'pending',
      avatar: 'https://readdy.ai/api/search-image?query=botanica%20natural%20brand%20logo%20green%20leaf%20organic%20botanical%20cosmetics%20white%20background%20professional&width=40&height=40&seq=conv2&orientation=squarish'
    },
    {
      id: 3,
      brand: 'Luxury Glow',
      lastMessage: 'Welcome to our brand partnership! Here are the initial product catalogs.',
      timestamp: '2024-01-08 16:45',
      unread: 0,
      status: 'completed',
      avatar: 'https://readdy.ai/api/search-image?query=luxury%20glow%20brand%20logo%20elegant%20gold%20premium%20beauty%20cosmetics%20white%20background%20professional&width=40&height=40&seq=conv3&orientation=squarish'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      senderType: 'buyer',
      message: 'Hi, I\'m interested in your bulk pricing for the moisturizer line. Could you provide details for orders over 100 units?',
      timestamp: '2024-01-15 10:00',
      attachments: []
    },
    {
      id: 2,
      sender: 'Pure Essence Team',
      senderType: 'brand',
      message: 'Hello Sarah! Thank you for your interest. For orders over 100 units, we offer a 15% discount. Here\'s our detailed pricing sheet.',
      timestamp: '2024-01-15 11:30',
      attachments: [
        { name: 'bulk-pricing-2024.pdf', size: '2.1 MB', type: 'pdf' }
      ]
    },
    {
      id: 3,
      sender: 'Sarah Johnson',
      senderType: 'buyer',
      message: 'Thank you for the bulk pricing information. We would like to proceed with the order.',
      timestamp: '2024-01-15 14:30',
      attachments: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-96 bg-white rounded-lg border border-gray-200">
      {/* Conversation List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-gray-900">Conversations</h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              {conversations.length} threads
            </span>
          </div>
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-80">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedThread(conversation.id)}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                selectedThread === conversation.id ? 'bg-red-50 border-red-200' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={conversation.avatar}
                  alt={conversation.brand}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 truncate">{conversation.brand}</h4>
                    {conversation.unread > 0 && (
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-2">{conversation.lastMessage}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                      {conversation.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 flex flex-col">
        {selectedThread ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <img
                  src={conversations.find(c => c.id === selectedThread)?.avatar}
                  alt="Brand"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {conversations.find(c => c.id === selectedThread)?.brand}
                  </h4>
                  <p className="text-sm text-gray-500">Active conversation</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.senderType === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderType === 'buyer' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium opacity-75">{message.sender}</span>
                      <span className="text-xs opacity-50">{message.timestamp}</span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                    {message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-white/10 rounded">
                            <i className="ri-file-line text-sm"></i>
                            <span className="text-xs">{attachment.name}</span>
                            <span className="text-xs opacity-50">({attachment.size})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="This is read-only view. Messages are managed through the messaging system."
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <button
                  disabled
                  className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                >
                  <i className="ri-send-plane-line"></i>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <i className="ri-chat-3-line text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Conversation</h3>
              <p className="text-gray-500">Choose a conversation thread to view messages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}