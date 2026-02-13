
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ConnectionDetails from '../../components/ConnectionDetails';

export default function ConnectionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedConnection, setSelectedConnection] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [forwardMessage, setForwardMessage] = useState<any>(null);
  const [forwardTo, setForwardTo] = useState<'buyer' | 'brand'>('brand');

  const connections = [
    {
      id: '1',
      buyer: {
        name: 'Wellness Beauty Co.',
        company: 'Wellness Beauty Group',
        logo: 'https://readdy.ai/api/search-image?query=wellness%20beauty%20company%20logo%20modern%20clean%20design%20with%20green%20accents%20professional%20branding&width=50&height=50&seq=conn-buyer-1&orientation=squarish',
        email: 'sarah@wellnessbeauty.com',
        contactPerson: 'Sarah Johnson',
        country: 'US',
        businessType: 'Beauty Retailer',
        marketsServed: ['United States', 'Canada'],
        complianceStatus: 'Verified'
      },
      connectedEntity: {
        name: 'Pure Essence',
        type: 'Brand',
        logo: 'https://readdy.ai/api/search-image?query=pure%20essence%20brand%20logo%20clean%20minimal%20natural%20beauty%20cosmetics%20white%20background%20professional&width=50&height=50&seq=conn-brand-1&orientation=squarish',
        category: 'Natural Skincare',
        region: 'North America',
        description: 'Premium natural skincare brand focusing on organic ingredients'
      },
      dateConnected: '2024-01-10',
      lastActivity: '2024-01-15',
      status: 'Active',
      totalOrders: 8,
      totalValue: '$12,450',
      activeNegotiations: 1,
      conversations: [
        {
          id: 1,
          sender: 'buyer',
          senderName: 'Sarah Johnson',
          message: 'Thank you for the updated catalog. We\'re interested in expanding our order.',
          timestamp: '2024-01-15 14:30'
        },
        {
          id: 2,
          sender: 'brand',
          senderName: 'Pure Essence Team',
          message: 'Great to hear! We can offer additional discounts for larger orders.',
          timestamp: '2024-01-15 15:15'
        }
      ]
    },
    {
      id: '2',
      buyer: {
        name: 'Beauty Boutique Paris',
        company: 'Belle Group International',
        logo: 'https://readdy.ai/api/search-image?query=beauty%20boutique%20paris%20logo%20elegant%20french%20design%20luxury%20cosmetics%20branding%20golden%20accents&width=50&height=50&seq=conn-buyer-2&orientation=squarish',
        email: 'marie@beautyboutique.fr',
        contactPerson: 'Marie Dubois',
        country: 'FR',
        businessType: 'Luxury Retailer',
        marketsServed: ['France', 'Belgium', 'Switzerland'],
        complianceStatus: 'Pending Review'
      },
      connectedEntity: {
        name: 'Global Beauty Distributors',
        type: 'Wholesaler',
        logo: 'https://readdy.ai/api/search-image?query=global%20beauty%20distributors%20logo%20professional%20wholesale%20business%20corporate%20blue%20design&width=50&height=50&seq=conn-wholesale-1&orientation=squarish',
        category: 'Beauty Wholesale',
        region: 'Europe',
        description: 'Leading beauty products distributor serving European markets'
      },
      dateConnected: '2024-01-05',
      lastActivity: '2024-01-12',
      status: 'Pending',
      totalOrders: 0,
      totalValue: '$0',
      activeNegotiations: 0,
      conversations: [
        {
          id: 1,
          sender: 'buyer',
          senderName: 'Marie Dubois',
          message: 'We would like to discuss wholesale terms for our boutique chain.',
          timestamp: '2024-01-12 10:30'
        }
      ]
    },
    {
      id: '3',
      buyer: {
        name: 'Spa Essentials Pro',
        company: 'Spa Essentials International',
        logo: 'https://readdy.ai/api/search-image?query=spa%20essentials%20professional%20logo%20calming%20blue%20purple%20design%20wellness%20relaxation%20branding&width=50&height=50&seq=conn-buyer-3&orientation=squarish',
        email: 'emma@spaessentials.com.au',
        contactPerson: 'Emma Thompson',
        country: 'AU',
        businessType: 'Spa & Wellness',
        marketsServed: ['Australia', 'New Zealand'],
        complianceStatus: 'Verified'
      },
      connectedEntity: {
        name: 'Botanica Natural',
        type: 'Brand',
        logo: 'https://readdy.ai/api/search-image?query=botanica%20natural%20brand%20logo%20green%20leaf%20organic%20botanical%20cosmetics%20white%20background%20professional&width=50&height=50&seq=conn-brand-2&orientation=squarish',
        category: 'Organic Beauty',
        region: 'Asia-Pacific',
        description: 'Certified organic beauty products with sustainable packaging'
      },
      dateConnected: '2023-12-20',
      lastActivity: '2024-01-14',
      status: 'Active',
      totalOrders: 15,
      totalValue: '$28,750',
      activeNegotiations: 2,
      conversations: []
    },
    {
      id: '4',
      buyer: {
        name: 'Natural Glow Ltd',
        company: 'Natural Glow Holdings',
        logo: 'https://readdy.ai/api/search-image?query=natural%20glow%20company%20logo%20organic%20green%20design%20sustainable%20beauty%20branding&width=50&height=50&seq=conn-buyer-4&orientation=squarish',
        email: 'james@naturalglow.co.uk',
        contactPerson: 'James Wilson',
        country: 'UK',
        businessType: 'Health & Beauty',
        marketsServed: ['United Kingdom', 'Ireland'],
        complianceStatus: 'Issues Found'
      },
      connectedEntity: {
        name: 'Luxury Glow',
        type: 'Brand',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20glow%20brand%20logo%20elegant%20gold%20premium%20beauty%20cosmetics%20white%20background%20professional&width=50&height=50&seq=conn-brand-3&orientation=squarish',
        category: 'Premium Cosmetics',
        region: 'Europe',
        description: 'High-end luxury beauty products for discerning customers'
      },
      dateConnected: '2023-11-15',
      lastActivity: '2023-12-20',
      status: 'Inactive',
      totalOrders: 3,
      totalValue: '$4,200',
      activeNegotiations: 0,
      conversations: []
    },
    {
      id: '5',
      buyer: {
        name: 'Urban Beauty Co',
        company: 'Urban Beauty Holdings',
        logo: 'https://readdy.ai/api/search-image?query=urban%20beauty%20company%20logo%20modern%20city%20inspired%20design%20contemporary%20cosmetics%20branding&width=50&height=50&seq=conn-buyer-5&orientation=squarish',
        email: 'alex@urbanbeauty.com',
        contactPerson: 'Alex Rodriguez',
        country: 'US',
        businessType: 'Modern Retailer',
        marketsServed: ['United States'],
        complianceStatus: 'Verified'
      },
      connectedEntity: {
        name: 'Premium Cosmetics Wholesale',
        type: 'Wholesaler',
        logo: 'https://readdy.ai/api/search-image?query=premium%20cosmetics%20wholesale%20logo%20professional%20business%20corporate%20luxury%20design&width=50&height=50&seq=conn-wholesale-2&orientation=squarish',
        category: 'Cosmetics Wholesale',
        region: 'North America',
        description: 'Premium cosmetics wholesale distribution network'
      },
      dateConnected: '2024-01-08',
      lastActivity: '2024-01-13',
      status: 'Pending',
      totalOrders: 1,
      totalValue: '$890',
      activeNegotiations: 1,
      conversations: [
        {
          id: 1,
          sender: 'buyer',
          senderName: 'Alex Rodriguez',
          message: 'Looking forward to establishing a long-term partnership.',
          timestamp: '2024-01-13 16:45'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.buyer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.connectedEntity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || connection.status === statusFilter;
    const matchesType = typeFilter === 'all' || connection.connectedEntity.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const statusCounts = {
    all: connections.length,
    Active: connections.filter(c => c.status === 'Active').length,
    Pending: connections.filter(c => c.status === 'Pending').length,
    Inactive: connections.filter(c => c.status === 'Inactive').length
  };

  const handleViewConnection = (connection: any) => {
    setSelectedConnection(connection);
  };

  const handleCloseDetails = () => {
    setSelectedConnection(null);
  };

  const handleConnectionAction = (action: string, connectionId: string) => {
    console.log(`${action} connection:`, connectionId);
  };

  const handleForwardMessage = (message: any, fromType: 'buyer' | 'brand') => {
    setForwardMessage(message);
    setForwardTo(fromType === 'buyer' ? 'brand' : 'buyer');
    setShowForwardModal(true);
  };

  const handleSendForward = () => {
    if (forwardMessage) {
      console.log(`Forwarding message from ${forwardMessage.sender} to ${forwardTo}:`, forwardMessage.message);
      setShowForwardModal(false);
      setForwardMessage(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Connections</h1>
                <p className="text-gray-600 mt-1">Manage all buyer-to-brand and buyer-to-wholesaler connections</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap cursor-pointer ${
                      viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <i className="ri-table-line mr-2"></i>
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded text-sm font-medium whitespace-nowrap cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    <i className="ri-grid-line mr-2"></i>
                    Grid
                  </button>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
                  <i className="ri-download-line mr-2"></i>
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Connections</p>
                    <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-links-line text-blue-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Connections</p>
                    <p className="text-2xl font-bold text-green-600">{statusCounts.Active}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-checkbox-circle-line text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Connections</p>
                    <p className="text-2xl font-bold text-yellow-600">{statusCounts.Pending}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <i className="ri-time-line text-yellow-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Order Value</p>
                    <p className="text-2xl font-bold text-purple-600">$46,290</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-purple-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search by buyer or brand name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="all">All Types</option>
                  <option value="Brand">Brand Connection</option>
                  <option value="Wholesaler">Wholesaler Connection</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>

            {viewMode === 'table' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Buyer / Company</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Connected Entity</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Date Connected</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Orders</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredConnections.map((connection) => (
                      <tr key={connection.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={connection.buyer.logo}
                              alt={`${connection.buyer.name} logo`}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{connection.buyer.name}</div>
                              <div className="text-sm text-gray-500">{connection.buyer.company}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <img
                                  src={`https://readdy.ai/api/search-image?query=${connection.buyer.country} country flag icon simple clean design&width=16&height=12&seq=conn-flag-${connection.buyer.country}&orientation=landscape`}
                                  alt={`${connection.buyer.country} flag`}
                                  className="w-4 h-3 rounded-sm object-cover"
                                />
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(connection.buyer.complianceStatus)}`}>
                                  {connection.buyer.complianceStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={connection.connectedEntity.logo}
                              alt={`${connection.connectedEntity.name} logo`}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{connection.connectedEntity.name}</div>
                              <div className="text-sm text-gray-500">{connection.connectedEntity.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            connection.connectedEntity.type === 'Brand'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {connection.connectedEntity.type}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-700">{connection.dateConnected}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{connection.totalOrders}</div>
                            <div className="text-xs text-gray-500">{connection.totalValue}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(connection.status)}`}>
                            {connection.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleViewConnection(connection)}
                            className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredConnections.map((connection) => (
                    <div key={connection.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(connection.status)}`}>
                          {connection.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          connection.connectedEntity.type === 'Brand'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {connection.connectedEntity.type}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={connection.buyer.logo}
                            alt={`${connection.buyer.name} logo`}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{connection.buyer.name}</div>
                            <div className="text-sm text-gray-500">{connection.buyer.company}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400">
                          <i className="ri-arrow-right-line"></i>
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={connection.connectedEntity.logo}
                            alt={`${connection.connectedEntity.name} logo`}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{connection.connectedEntity.name}</div>
                            <div className="text-sm text-gray-500">{connection.connectedEntity.category}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                          <div className="text-center">
                            <div className="font-medium text-gray-900">{connection.totalOrders}</div>
                            <div className="text-xs text-gray-500">Orders</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-gray-900">{connection.totalValue}</div>
                            <div className="text-xs text-gray-500">Total Value</div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleViewConnection(connection)}
                          className="w-full px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {filteredConnections.length} of {connections.length} connections
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
          </div>
        </div>
      </div>

      {selectedConnection && (
        <ConnectionDetails
          connection={selectedConnection}
          onClose={handleCloseDetails}
          onConnectionAction={handleConnectionAction}
        />
      )}

      {/* Forward Message Modal */}
      {showForwardModal && forwardMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Forward Message</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Original message from {forwardMessage.senderName}:</p>
                <div className="p-3 bg-gray-100 rounded-lg text-sm text-gray-900">
                  {forwardMessage.message}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Forward to:</p>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <i className={`${forwardTo === 'buyer' ? 'ri-user-line' : 'ri-store-2-line'} text-blue-600`}></i>
                  <span className="text-sm font-medium text-blue-900">
                    {forwardTo === 'buyer' ? selectedConnection.buyer.name : selectedConnection.connectedEntity.name}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add admin note (optional):</label>
                <textarea
                  rows={3}
                  placeholder="Add context or instructions when forwarding..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                  maxLength={200}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => {
                  setShowForwardModal(false);
                  setForwardMessage(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendForward}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Forward Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
