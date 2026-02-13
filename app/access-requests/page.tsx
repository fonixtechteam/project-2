'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import AccessRequestDetails from '../../components/AccessRequestDetails';

export default function AccessRequestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [requestTypeFilter, setRequestTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const accessRequests = [
    {
      id: '1',
      buyerName: 'Sarah Johnson',
      buyerCompany: 'Wellness Beauty Co.',
      buyerBusinessType: 'Beauty Retailer',
      buyerCountry: 'US',
      buyerEmail: 'sarah@wellnessbeauty.com',
      buyerPhone: '+1 (555) 123-4567',
      buyerConnectedBrands: ['Pure Essence', 'Botanica Natural'],
      buyerOrderHistory: {
        totalOrders: 24,
        totalValue: '$12,450',
        lastOrder: '2024-01-15'
      },
      requestedEntity: {
        type: 'Brand',
        name: 'Luxury Glow',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20glow%20beauty%20brand%20logo%20premium%20golden%20design%20high%20end%20cosmetics%20elegant%20sophisticated&width=60&height=60&seq=access-brand-1&orientation=squarish',
        category: 'Luxury Beauty',
        region: 'Global',
        description: 'Premium luxury skincare for discerning clients'
      },
      requestDate: '2024-01-18',
      status: 'Pending',
      requestReason: 'Interested in expanding our luxury skincare offerings. We have strong sales in premium beauty products and believe Luxury Glow would be a perfect fit for our customer base.',
      adminNotes: 'Strong track record with premium brands. Suitable for luxury tier products.',
      conversations: []
    },
    {
      id: '2',
      buyerName: 'Michael Chen',
      buyerCompany: 'Pure Skin Solutions',
      buyerBusinessType: 'Spa & Wellness',
      buyerCountry: 'CA',
      buyerEmail: 'michael@pureskin.ca',
      buyerPhone: '+1 (555) 987-6543',
      buyerConnectedBrands: ['Fresh Start Wellness'],
      buyerOrderHistory: {
        totalOrders: 18,
        totalValue: '$8,920',
        lastOrder: '2024-01-12'
      },
      requestedEntity: {
        type: 'Wholesaler',
        name: 'Global Beauty Distributors',
        logo: 'https://readdy.ai/api/search-image?query=global%20beauty%20distributors%20logo%20professional%20wholesale%20distribution%20network%20blue%20design&width=60&height=60&seq=access-wholesaler-1&orientation=squarish',
        category: 'Beauty Distribution',
        region: 'North America',
        description: 'Leading beauty products wholesaler serving retail and spa clients'
      },
      requestDate: '2024-01-16',
      status: 'Approved',
      requestReason: 'Looking for a reliable wholesaler to expand our product range for spa treatments.',
      adminNotes: 'Approved for wholesale access. Strong spa network.',
      conversations: [
        {
          id: 1,
          sender: 'buyer',
          senderName: 'Michael Chen',
          message: 'Thank you for approving my access request. When can I start viewing the wholesale catalog?',
          timestamp: '2024-01-17 10:30',
          forwarded: false
        },
        {
          id: 2,
          sender: 'admin',
          senderName: 'Admin',
          message: 'Welcome to Global Beauty Distributors network! I\'ll coordinate with them to provide you catalog access within 24 hours.',
          timestamp: '2024-01-17 11:15',
          forwarded: true
        },
        {
          id: 3,
          sender: 'brand',
          senderName: 'Global Beauty Distributors',
          message: 'We\'ve reviewed Michael\'s profile and are excited to work with Pure Skin Solutions. Catalog access has been granted.',
          timestamp: '2024-01-17 14:20',
          forwarded: false
        }
      ]
    },
    {
      id: '3',
      buyerName: 'Emma Rodriguez',
      buyerCompany: 'Urban Spa Solutions',
      buyerBusinessType: 'Spa Chain',
      buyerCountry: 'MX',
      buyerEmail: 'emma@urbanspa.mx',
      buyerPhone: '+52 55 1234 5678',
      buyerConnectedBrands: [],
      buyerOrderHistory: {
        totalOrders: 0,
        totalValue: '$0',
        lastOrder: null
      },
      requestedEntity: {
        type: 'Brand',
        name: 'Botanica Natural',
        logo: 'https://readdy.ai/api/search-image?query=botanica%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics%20elegant&width=60&height=60&seq=access-brand-2&orientation=squarish',
        category: 'Natural Beauty',
        region: 'Americas',
        description: 'Organic botanical skincare from nature'
      },
      requestDate: '2024-01-14',
      status: 'Rejected',
      requestReason: 'We are a new spa chain looking to offer organic, natural skincare products to our clients.',
      adminNotes: 'Rejected - insufficient business history and no previous orders.',
      rejectionReason: 'New business without established track record. Please reapply after demonstrating business operations and initial order history.',
      conversations: []
    },
    {
      id: '4',
      buyerName: 'James Wilson',
      buyerCompany: 'Natural Glow Ltd',
      buyerBusinessType: 'Health & Beauty',
      buyerCountry: 'UK',
      buyerEmail: 'james@naturalglow.co.uk',
      buyerPhone: '+44 20 7946 0958',
      buyerConnectedBrands: ['Botanica Natural'],
      buyerOrderHistory: {
        totalOrders: 6,
        totalValue: '$2,340',
        lastOrder: '2023-12-20'
      },
      requestedEntity: {
        type: 'Brand',
        name: 'Pure Essence',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20on%20white%20background%20premium%20skincare%20cosmetics&width=60&height=60&seq=access-brand-3&orientation=squarish',
        category: 'Skincare',
        region: 'Global',
        description: 'Clean beauty essentials with transparent ingredients'
      },
      requestDate: '2024-01-10',
      status: 'Pending',
      requestReason: 'Our customers are asking for clean beauty products. Pure Essence aligns perfectly with our natural product focus.',
      adminNotes: 'Under review - good alignment with existing brand portfolio.',
      conversations: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = accessRequests.filter(request => {
    const matchesSearch = request.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.buyerCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedEntity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = requestTypeFilter === 'all' || request.requestedEntity.type === requestTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  const statusCounts = {
    all: accessRequests.length,
    Pending: accessRequests.filter(r => r.status === 'Pending').length,
    Approved: accessRequests.filter(r => r.status === 'Approved').length,
    Rejected: accessRequests.filter(r => r.status === 'Rejected').length
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Access Requests</h1>
                <p className="text-gray-600 mt-1">Manage buyer requests to connect with brands and wholesalers</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {statusCounts.Pending} Pending
                </span>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
                  <i className="ri-download-line mr-2"></i>
                  Export List
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
                    <p className="text-sm font-medium text-gray-600">Total Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-search-line text-gray-600 text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
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
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-green-600">{statusCounts.Approved}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-checkbox-circle-line text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">{statusCounts.Rejected}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className="ri-close-circle-line text-red-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-64 relative">
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search by buyer, company, or requested entity..."
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
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  value={requestTypeFilter}
                  onChange={(e) => setRequestTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="all">All Types</option>
                  <option value="Brand">Brand</option>
                  <option value="Wholesaler">Wholesaler</option>
                </select>

                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Buyer Information</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Requested Entity</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Request Date</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {request.buyerName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{request.buyerName}</div>
                            <div className="text-sm text-gray-500">{request.buyerCompany}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <img
                                src={`https://readdy.ai/api/search-image?query=$%7Brequest.buyerCountry%7D%20country%20flag%20icon%20simple%20clean%20design&width=16&height=12&seq=flag-${request.buyerCountry}-access&orientation=landscape`}
                                alt={`${request.buyerCountry} flag`}
                                className="w-4 h-3 rounded-sm object-cover"
                              />
                              <span className="text-xs text-gray-500">{request.buyerBusinessType}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={request.requestedEntity.logo}
                            alt={`${request.requestedEntity.name} logo`}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
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
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700">{request.requestDate}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleViewDetails(request)}
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

            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {filteredRequests.length} of {accessRequests.length} access requests
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

      {showDetails && selectedRequest && (
        <AccessRequestDetails 
          request={selectedRequest}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}