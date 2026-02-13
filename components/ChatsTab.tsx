
'use client';

import { useState } from 'react';

interface ChatsTabProps {
  brandId: string;
}

export default function ChatsTab({ brandId }: ChatsTabProps) {
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [newMessage, setNewMessage] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const conversations = [
    {
      id: '1',
      buyer: 'Wellness Beauty Co.',
      buyerLogo: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional&width=40&height=40&seq=buyer-chat-1&orientation=squarish',
      lastMessage: 'Thank you for the quick response. Looking forward to the new product samples.',
      timestamp: '2 min ago',
      unreadCount: 0,
      status: 'active',
      participant: 'Sarah Johnson'
    },
    {
      id: '2',
      buyer: 'Beauty Boutique Paris',
      buyerLogo: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics&width=40&height=40&seq=buyer-chat-2&orientation=squarish',
      lastMessage: 'Can we discuss the wholesale pricing for the holiday collection?',
      timestamp: '1 hour ago',
      unreadCount: 2,
      status: 'active',
      participant: 'Marie Dubois'
    },
    {
      id: '3',
      buyer: 'Spa Essentials Pro',
      buyerLogo: 'https://readdy.ai/api/search-image?query=spa%20essentials%20professional%20logo%20calming%20blue%20purple%20design%20relaxation%20wellness&width=40&height=40&seq=buyer-chat-3&orientation=squarish',
      lastMessage: 'The shipment arrived safely. All products are in perfect condition.',
      timestamp: '3 hours ago',
      unreadCount: 0,
      status: 'resolved',
      participant: 'Emma Thompson'
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'buyer',
      senderName: 'Sarah Johnson',
      content: 'Hi! I\'m interested in placing a bulk order for the Nourishing Face Oil. Could you provide more details about wholesale pricing?',
      timestamp: '2024-01-15 10:30 AM',
      type: 'message'
    },
    {
      id: '2',
      sender: 'admin',
      senderName: 'Admin',
      content: 'Thank you for your interest! I\'ll forward your inquiry to the brand for detailed wholesale pricing information.',
      timestamp: '2024-01-15 10:45 AM',
      type: 'admin_response',
      forwarded: false
    },
    {
      id: '3',
      sender: 'system',
      content: 'Message forwarded to Pure Essence brand team',
      timestamp: '2024-01-15 10:46 AM',
      type: 'system'
    },
    {
      id: '4',
      sender: 'brand',
      senderName: 'Pure Essence',
      content: 'Hello Sarah! We\'re excited about your interest. For orders of 100+ units, we offer 15% off our standard wholesale price. The Nourishing Face Oil would be $18.70 per unit instead of $22.00.',
      timestamp: '2024-01-15 11:15 AM',
      type: 'brand_response'
    },
    {
      id: '5',
      sender: 'buyer',
      senderName: 'Sarah Johnson',
      content: 'That sounds great! Could you also send me information about your other skincare products? I\'m particularly interested in the Hydrating Essence.',
      timestamp: '2024-01-15 11:30 AM',
      type: 'message'
    },
    {
      id: '6',
      sender: 'admin',
      senderName: 'Admin',
      content: 'I\'ll coordinate with the brand to send you a complete product catalog with wholesale pricing. You should receive it within 24 hours.',
      timestamp: '2024-01-15 11:45 AM',
      type: 'admin_response',
      forwarded: true
    }
  ];

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Send message:', newMessage);
      setNewMessage('');
    }
  };

  const handleForwardMessage = (messageId: string) => {
    console.log('Forward message to brand:', messageId);
  };

  const handleMarkResolved = () => {
    console.log('Mark conversation as resolved');
  };

  const handleStartNewChat = () => {
    setShowNewChatModal(true);
  };

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'admin':
        return 'bg-blue-50 border-blue-200';
      case 'brand':
        return 'bg-green-50 border-green-200';
      case 'buyer':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'admin':
        return 'ri-shield-user-line text-blue-600';
      case 'brand':
        return 'ri-store-2-line text-green-600';
      case 'buyer':
        return 'ri-user-line text-gray-600';
      default:
        return 'ri-user-line text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Brand Communication History</h3>
          <p className="text-sm text-gray-500 mt-1">All conversations between admin, brand, and buyers</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkResolved}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-check-line mr-2"></i>
            Mark Resolved
          </button>
          <button
            onClick={handleStartNewChat}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-chat-new-line mr-2"></i>
            Start New Chat
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-x divide-gray-200 h-96">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-medium text-gray-900">Conversations</h4>
            </div>
            <div className="divide-y divide-gray-200 overflow-y-auto max-h-80">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation === conversation.id ? 'bg-red-50 border-r-2 border-red-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={conversation.buyerLogo}
                      alt={`${conversation.buyer} logo`}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-gray-900 truncate">{conversation.buyer}</div>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mb-1">{conversation.participant}</div>
                      <div className="text-sm text-gray-600 truncate">{conversation.lastMessage}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          conversation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {conversation.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentConversation?.buyerLogo}
                    alt={`${currentConversation?.buyer} logo`}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{currentConversation?.buyer}</div>
                    <div className="text-sm text-gray-500">{currentConversation?.participant}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Admin moderating</span>
                  <i className="ri-shield-check-line text-blue-600"></i>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  {message.type === 'system' ? (
                    <div className="flex justify-center">
                      <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        <i className="ri-information-line mr-1"></i>
                        {message.content}
                      </span>
                    </div>
                  ) : (
                    <div className={`flex items-start gap-3 ${getSenderColor(message.sender)} p-3 rounded-lg border`}>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                        <i className={`${getSenderIcon(message.sender)} text-sm`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-gray-900">{message.senderName}</div>
                          <div className="flex items-center gap-2">
                            {message.type === 'admin_response' && !message.forwarded && (
                              <button
                                onClick={() => handleForwardMessage(message.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer"
                              >
                                <i className="ri-share-forward-line mr-1"></i>
                                Forward to Brand
                              </button>
                            )}
                            {message.forwarded && (
                              <span className="text-xs text-green-600">
                                <i className="ri-check-line mr-1"></i>
                                Forwarded to Brand
                              </span>
                            )}
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                        </div>
                        <div className="text-gray-700">{message.content}</div>
                        {message.type === 'admin_response' && (
                          <div className="mt-2 text-xs text-gray-500">
                            <i className="ri-shield-user-line mr-1"></i>
                            Admin message - controlled by system
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your admin message..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label>
                    <input type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                    <span className="ml-2 text-xs text-gray-600">Forward to brand</span>
                  </label>
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-send-plane-line mr-2"></i>
                    Send
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                <i className="ri-information-line mr-1"></i>
                All messages are moderated by admin. Check "Forward to brand" to send admin messages to the brand team.
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Start New Conversation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Participant</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8">
                  <option>Choose buyer or brand...</option>
                  <option>Wellness Beauty Co. (Buyer)</option>
                  <option>Beauty Boutique Paris (Buyer)</option>
                  <option>Pure Essence (Brand)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Message</label>
                <textarea
                  rows={4}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  maxLength={500}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => setShowNewChatModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
