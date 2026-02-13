
'use client';

import { useState } from 'react';

interface BuyersTabProps {
  brandId: string;
  onViewDetails: (buyer: any) => void;
}

export default function BuyersTab({ brandId, onViewDetails }: BuyersTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<any>(null);

  const buyers = [
    {
      id: 1,
      name: 'Wellness Beauty Co.',
      logo: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional&width=40&height=40&seq=buyer-logo-1&orientation=squarish',
      location: 'Los Angeles, CA, US',
      country: 'US',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@wellnessbeauty.com',
      ordersCount: 24,
      lastOrderDate: '2024-01-15',
      lastOrderValue: '$2,450',
      totalValue: '$12,450',
      badge: 'High Value',
      connectionDate: '2023-09-15'
    },
    {
      id: 2,
      name: 'Pure Skin Solutions',
      logo: 'https://readdy.ai/api/search-image?query=skincare%20solutions%20company%20logo%20elegant%20blue%20design%20professional%20healthcare%20beauty&width=40&height=40&seq=buyer-logo-2&orientation=squarish',
      location: 'Toronto, ON, CA',
      country: 'CA',
      contactPerson: 'Michael Chen',
      email: 'michael@pureskin.ca',
      ordersCount: 18,
      lastOrderDate: '2024-01-12',
      lastOrderValue: '$1,890',
      totalValue: '$8,920',
      badge: 'Regular',
      connectionDate: '2023-11-02'
    },
    {
      id: 3,
      name: 'Beauty Boutique Paris',
      logo: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics&width=40&height=40&seq=buyer-logo-3&orientation=squarish',
      location: 'Paris, FR',
      country: 'FR',
      contactPerson: 'Marie Dubois',
      email: 'marie@beautyboutique.fr',
      ordersCount: 31,
      lastOrderDate: '2024-01-10',
      lastOrderValue: '$3,200',
      totalValue: '$15,680',
      badge: 'VIP',
      connectionDate: '2023-07-20'
    },
    {
      id: 4,
      name: 'Natural Glow Ltd',
      logo: 'https://readdy.ai/api/search-image?query=natural%20glow%20cosmetics%20company%20logo%20organic%20green%20design%20sustainable%20beauty%20brand&width=40&height=40&seq=buyer-logo-4&orientation=squarish',
      location: 'London, UK',
      country: 'UK',
      contactPerson: 'James Wilson',
      email: 'james@naturalglow.co.uk',
      ordersCount: 6,
      lastOrderDate: '2023-12-20',
      lastOrderValue: '$890',
      totalValue: '$2,340',
      badge: 'New',
      connectionDate: '2023-12-15'
    },
    {
      id: 5,
      name: 'Spa Essentials Pro',
      logo: 'https://readdy.ai/api/search-image?query=spa%20essentials%20professional%20logo%20calming%20blue%20purple%20design%20relaxation%20wellness&width=40&height=40&seq=buyer-logo-5&orientation=squarish',
      location: 'Sydney, AU',
      country: 'AU',
      contactPerson: 'Emma Thompson',
      email: 'emma@spaessentials.com.au',
      ordersCount: 42,
      lastOrderDate: '2024-01-14',
      lastOrderValue: '$4,100',
      totalValue: '$22,100',
      badge: 'Top Buyer',
      connectionDate: '2023-06-10'
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'Top Buyer':
        return 'bg-yellow-100 text-yellow-800';
      case 'High Value':
        return 'bg-blue-100 text-blue-800';
      case 'New':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleRemoveConnection = (buyer: any) => {
    console.log('Remove connection with buyer:', buyer.id);
  };

  const handleSendNotification = (buyer: any) => {
    setSelectedBuyer(buyer);
    setShowNotificationModal(true);
  };

  const sendNotification = () => {
    console.log('Send notification to buyer:', selectedBuyer?.id);
    setShowNotificationModal(false);
    setSelectedBuyer(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Connected Buyers</h3>
          <p className="text-sm text-gray-500 mt-1">All buyers connected to this brand with relationship management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
            <i className="ri-download-line mr-2"></i>
            Export List
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
            <i className="ri-user-add-line mr-2"></i>
            Connect Buyer
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search buyers, contact person, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          />
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
        >
          <option value="name">Sort by Name</option>
          <option value="orders">Sort by Orders</option>
          <option value="value">Sort by Value</option>
          <option value="date">Sort by Last Order</option>
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Buyer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Orders</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Last Order</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Total Value</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBuyers.map((buyer) => (
                <tr key={buyer.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={buyer.logo}
                        alt={`${buyer.name} logo`}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{buyer.name}</div>
                        <div className="text-sm text-gray-500">{buyer.contactPerson}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(buyer.badge)}`}>
                            {buyer.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://readdy.ai/api/search-image?query=$%7Bbuyer.country%7D%20country%20flag%20icon%20simple%20clean%20design&width=20&height=14&seq=flag-${buyer.country}-table&orientation=landscape`}
                        alt={`${buyer.country} flag`}
                        className="w-5 h-3.5 rounded-sm object-cover"
                      />
                      <div>
                        <div className="text-sm text-gray-700">{buyer.location}</div>
                        <div className="text-xs text-gray-500">Connected: {buyer.connectionDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{buyer.ordersCount}</div>
                      <div className="text-xs text-gray-500">orders</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-sm text-gray-700">{buyer.lastOrderDate}</div>
                      <div className="text-xs text-gray-500">{buyer.lastOrderValue}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{buyer.totalValue}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewDetails(buyer)}
                        className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleSendNotification(buyer)}
                        className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-notification-line mr-1"></i>
                        Notify
                      </button>
                      <button
                        onClick={() => handleRemoveConnection(buyer)}
                        className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-600 rounded hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {filteredBuyers.length} of {buyers.length} buyers
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

      {showNotificationModal && selectedBuyer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Send Notification</h3>
            <p className="text-gray-600 mb-4">
              Send a notification to {selectedBuyer.name}:
            </p>
            <textarea
              rows={4}
              placeholder="Enter your message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none mb-4"
              maxLength={500}
            />
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={sendNotification}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
