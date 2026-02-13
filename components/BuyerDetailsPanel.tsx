
'use client';

import { useState } from 'react';

interface BuyerDetailsPanelProps {
  buyer: any;
  onClose: () => void;
}

export default function BuyerDetailsPanel({ buyer, onClose }: BuyerDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [expandedChats, setExpandedChats] = useState<{ [key: number]: boolean }>({});

  const buyerProfile = {
    ...buyer,
    fullAddress: '123 Beauty Street, Los Angeles, CA 90210, USA',
    businessLicense: 'CA-BL-2023-001234',
    taxId: 'US-TAX-456789',
    established: '2018',
    employees: '25-50',
    marketsServed: ['United States', 'Canada', 'Mexico'],
    businessDescription: 'Leading wellness beauty retailer specializing in clean, sustainable beauty products for health-conscious consumers.',
    website: 'https://wellnessbeauty.com',
    socialMedia: {
      instagram: '@wellnessbeautyco',
      facebook: 'WellnessBeautyCo',
      linkedin: 'wellness-beauty-company'
    }
  };

  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      products: ['Nourishing Face Oil', 'Hydrating Essence'],
      total: '$2,004.00',
      status: 'delivered'
    },
    {
      id: 'ORD-002',
      date: '2024-01-08',
      products: ['Balancing Toner', 'Gentle Micellar Water'],
      total: '$1,456.00',
      status: 'delivered'
    },
    {
      id: 'ORD-003',
      date: '2023-12-20',
      products: ['Nourishing Lip Balm'],
      total: '$576.00',
      status: 'delivered'
    }
  ];

  const invoices = [
    {
      id: 'INV-001',
      orderId: 'ORD-001',
      date: '2024-01-15',
      amount: '$2,004.00',
      status: 'paid',
      dueDate: '2024-01-30'
    },
    {
      id: 'INV-002',
      orderId: 'ORD-002',
      date: '2024-01-08',
      amount: '$1,456.00',
      status: 'paid',
      dueDate: '2024-01-23'
    }
  ];

  const chatHistory = [
    {
      date: '2024-01-15',
      messages: 3,
      lastMessage: 'Thank you for the quick response regarding the delivery schedule.',
      participants: ['Sarah Johnson', 'Brand Manager']
    },
    {
      date: '2024-01-10',
      messages: 5,
      lastMessage: 'Could we discuss bulk pricing for the new product line?',
      participants: ['Sarah Johnson', 'Sales Team']
    }
  ];

  const toggleChatExpansion = (index: number) => {
    setExpandedChats(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'ri-user-line' },
    { id: 'orders', name: 'Order History', icon: 'ri-shopping-cart-line' },
    { id: 'invoices', name: 'Invoices', icon: 'ri-file-list-3-line' },
    { id: 'chats', name: 'Chat History', icon: 'ri-chat-3-line' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <p className="text-gray-900">{buyerProfile.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <p className="text-gray-900">{buyerProfile.contactPerson}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{buyerProfile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <p className="text-gray-900">{buyerProfile.businessType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Established</label>
                  <p className="text-gray-900">{buyerProfile.established}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <p className="text-gray-900">{buyerProfile.fullAddress}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business License</label>
                  <p className="text-gray-900">{buyerProfile.businessLicense}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
                  <p className="text-gray-900">{buyerProfile.taxId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employees</label>
                  <p className="text-gray-900">{buyerProfile.employees}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <a href={buyerProfile.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                    {buyerProfile.website}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
              <p className="text-gray-700 leading-relaxed">{buyerProfile.businessDescription}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Markets Served</label>
              <div className="flex flex-wrap gap-2">
                {buyerProfile.marketsServed.map((market, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {market}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Social Media</label>
              <div className="flex items-center gap-4">
                <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                  <i className="ri-instagram-line"></i>
                  {buyerProfile.socialMedia.instagram}
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                  <i className="ri-facebook-line"></i>
                  {buyerProfile.socialMedia.facebook}
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                  <i className="ri-linkedin-line"></i>
                  {buyerProfile.socialMedia.linkedin}
                </a>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-gray-900">{order.id}</h5>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.total}</p>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Products: {order.products.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'invoices':
        return (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">{invoice.id}</h5>
                    <p className="text-sm text-gray-500">Order: {invoice.orderId}</p>
                    <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{invoice.amount}</p>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {invoice.status}
                    </span>
                    <button className="block text-xs text-red-600 hover:text-red-700 mt-1 cursor-pointer">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'chats':
        return (
          <div className="space-y-4">
            {chatHistory.map((chat, index) => {
              const isExpanded = expandedChats[index] || false;

              const chatMessages = [
                {
                  id: 1,
                  sender: 'Sarah Johnson',
                  senderType: 'buyer',
                  message: 'Hi there! I wanted to check on the delivery status for order ORD-001.',
                  timestamp: `${chat.date} 13:45`,
                  avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20sarah%20johnson%20business%20portrait%20friendly%20smile%20clean%20background&width=32&height=32&seq=avatar-sarah-details&orientation=squarish'
                },
                {
                  id: 2,
                  sender: 'Brand Manager',
                  senderType: 'brand',
                  message: 'Hello Sarah! Your order ORD-001 is currently being prepared for shipment. It should be dispatched within the next 2 business days.',
                  timestamp: `${chat.date} 14:10`,
                  avatar: 'https://readdy.ai/api/search-image?query=professional%20brand%20manager%20business%20portrait%20confident%20clean%20background&width=32&height=32&seq=avatar-brand-details&orientation=squarish'
                },
                {
                  id: 3,
                  sender: 'Sarah Johnson',
                  senderType: 'buyer',
                  message: chat.lastMessage,
                  timestamp: `${chat.date} 14:30`,
                  avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20sarah%20johnson%20business%20portrait%20friendly%20smile%20clean%20background&width=32&height=32&seq=avatar-sarah-details&orientation=squarish'
                }
              ];

              const formatTime = (timestamp: string) => {
                const date = new Date(timestamp);
                return date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                });
              };

              return (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleChatExpansion(index)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{chat.date}</h5>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{chat.messages} messages</span>
                        <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-gray-400`}></i>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{chat.lastMessage}</p>
                    <p className="text-xs text-gray-500">
                      Participants: {chat.participants.join(', ')}
                    </p>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                        {chatMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${message.senderType === 'brand' ? 'flex-row-reverse' : ''}`}
                          >
                            <img
                              src={message.avatar}
                              alt={message.sender}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div className={`flex-1 max-w-md ${message.senderType === 'brand' ? 'text-right' : ''}`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">{message.sender}</span>
                                <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                              </div>
                              <div
                                className={`inline-block p-3 rounded-lg text-sm ${message.senderType === 'brand'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-white text-gray-900 border border-gray-200'
                                  }`}
                              >
                                {message.message}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl z-50 overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={buyer.logo}
              alt={`${buyer.name} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{buyer.name}</h2>
              <p className="text-sm text-gray-500">{buyer.contactPerson}</p>
            </div>
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

        <div className="flex-1 overflow-y-auto p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
