'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';

export default function BuyersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedBuyers, setSelectedBuyers] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const buyers = [
    {
      id: '1',
      name: 'Wellness Beauty Co.',
      company: 'Wellness Beauty Group',
      logo: 'https://readdy.ai/api/search-image?query=wellness%20beauty%20company%20logo%20modern%20clean%20design%20with%20green%20accents%20professional%20branding&width=50&height=50&seq=buyer-logo-wellness&orientation=squarish',
      email: 'sarah@wellnessbeauty.com',
      contactPerson: 'Sarah Johnson',
      country: 'US',
      countryName: 'United States',
      brandsConnected: 3,
      totalOrders: 24,
      lastActivity: '2024-01-15',
      status: 'Active',
      tier: 'VIP',
      lifetimeSpend: '$45,230',
      businessType: 'Beauty Retailer',
      website: 'https://wellnessbeauty.com',
      phone: '+1 (555) 123-4567'
    },
    {
      id: '2',
      name: 'Pure Skin Solutions',
      company: 'Pure Skin Group Ltd',
      logo: 'https://readdy.ai/api/search-image?query=pure%20skin%20solutions%20company%20logo%20elegant%20blue%20design%20professional%20skincare%20branding&width=50&height=50&seq=buyer-logo-pureskin&orientation=squarish',
      email: 'michael@pureskin.ca',
      contactPerson: 'Michael Chen',
      country: 'CA',
      countryName: 'Canada',
      brandsConnected: 2,
      totalOrders: 18,
      lastActivity: '2024-01-12',
      status: 'Active',
      tier: 'Premium',
      lifetimeSpend: '$28,450',
      businessType: 'Spa & Wellness',
      website: 'https://pureskin.ca',
      phone: '+1 (416) 555-0123'
    },
    {
      id: '3',
      name: 'Beauty Boutique Paris',
      company: 'Belle Group International',
      logo: 'https://readdy.ai/api/search-image?query=beauty%20boutique%20paris%20logo%20elegant%20french%20design%20luxury%20cosmetics%20branding%20golden%20accents&width=50&height=50&seq=buyer-logo-belle&orientation=squarish',
      email: 'marie@beautyboutique.fr',
      contactPerson: 'Marie Dubois',
      country: 'FR',
      countryName: 'France',
      brandsConnected: 5,
      totalOrders: 31,
      lastActivity: '2024-01-10',
      status: 'Active',
      tier: 'VIP',
      lifetimeSpend: '$67,890',
      businessType: 'Luxury Retailer',
      website: 'https://beautyboutique.fr',
      phone: '+33 1 42 86 59 30'
    },
    {
      id: '4',
      name: 'Natural Glow Ltd',
      company: 'Natural Glow Holdings',
      logo: 'https://readdy.ai/api/search-image?query=natural%20glow%20company%20logo%20organic%20green%20design%20sustainable%20beauty%20branding&width=50&height=50&seq=buyer-logo-natural&orientation=squarish',
      email: 'james@naturalglow.co.uk',
      contactPerson: 'James Wilson',
      country: 'UK',
      countryName: 'United Kingdom',
      brandsConnected: 1,
      totalOrders: 6,
      lastActivity: '2023-12-20',
      status: 'Pending',
      tier: 'Standard',
      lifetimeSpend: '$8,340',
      businessType: 'Health & Beauty',
      website: 'https://naturalglow.co.uk',
      phone: '+44 20 7946 0958'
    },
    {
      id: '5',
      name: 'Spa Essentials Pro',
      company: 'Spa Essentials International',
      logo: 'https://readdy.ai/api/search-image?query=spa%20essentials%20professional%20logo%20calming%20blue%20purple%20design%20wellness%20relaxation%20branding&width=50&height=50&seq=buyer-logo-spa&orientation=squarish',
      email: 'emma@spaessentials.com.au',
      contactPerson: 'Emma Thompson',
      country: 'AU',
      countryName: 'Australia',
      brandsConnected: 4,
      totalOrders: 42,
      lastActivity: '2024-01-14',
      status: 'Active',
      tier: 'VIP',
      lifetimeSpend: '$89,250',
      businessType: 'Spa & Wellness',
      website: 'https://spaessentials.com.au',
      phone: '+61 2 9555 0123'
    },
    {
      id: '6',
      name: 'Urban Beauty Co',
      company: 'Urban Beauty Holdings',
      logo: 'https://readdy.ai/api/search-image?query=urban%20beauty%20company%20logo%20modern%20city%20inspired%20design%20contemporary%20cosmetics%20branding&width=50&height=50&seq=buyer-logo-urban&orientation=squarish',
      email: 'alex@urbanbeauty.com',
      contactPerson: 'Alex Rodriguez',
      country: 'US',
      countryName: 'United States',
      brandsConnected: 2,
      totalOrders: 12,
      lastActivity: '2024-01-08',
      status: 'Suspended',
      tier: 'Standard',
      lifetimeSpend: '$15,670',
      businessType: 'Modern Retailer',
      website: 'https://urbanbeauty.com',
      phone: '+1 (555) 987-6543'
    }
  ];

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

  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || buyer.status === statusFilter;
    const matchesCountry = countryFilter === 'all' || buyer.country === countryFilter;
    const matchesTier = tierFilter === 'all' || buyer.tier === tierFilter;
    return matchesSearch && matchesStatus && matchesCountry && matchesTier;
  });

  const handleSelectBuyer = (buyerId: string) => {
    setSelectedBuyers(prev => 
      prev.includes(buyerId) 
        ? prev.filter(id => id !== buyerId)
        : [...prev, buyerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBuyers.length === filteredBuyers.length) {
      setSelectedBuyers([]);
    } else {
      setSelectedBuyers(filteredBuyers.map(buyer => buyer.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for buyers:`, selectedBuyers);
    setSelectedBuyers([]);
    setShowBulkActions(false);
  };

  const statusCounts = {
    all: buyers.length,
    Active: buyers.filter(b => b.status === 'Active').length,
    Pending: buyers.filter(b => b.status === 'Pending').length,
    Suspended: buyers.filter(b => b.status === 'Suspended').length
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Buyers</h1>
                <p className="text-gray-600 mt-1">Manage all buyers and their relationships with brands</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
                  <i className="ri-download-line mr-2"></i>
                  Export CSV
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
                  <i className="ri-add-line mr-2"></i>
                  Add Buyer
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
                    <p className="text-sm font-medium text-gray-600">Total Buyers</p>
                    <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-blue-600 text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Buyers</p>
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
                    <p className="text-sm font-medium text-gray-600">Pending Approval</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-purple-600">$254,830</p>
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
                    placeholder="Search by name, company, or email..."
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
                  <option value="Suspended">Suspended</option>
                </select>

                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="all">All Countries</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="FR">France</option>
                  <option value="AU">Australia</option>
                </select>

                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="all">All Tiers</option>
                  <option value="VIP">VIP</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="name">Sort A-Z</option>
                  <option value="newest">Newest First</option>
                  <option value="orders">Most Orders</option>
                  <option value="spend">Highest Spend</option>
                </select>
              </div>

              {selectedBuyers.length > 0 && (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-900">
                      {selectedBuyers.length} buyer{selectedBuyers.length > 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBulkAction('approve')}
                      className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 whitespace-nowrap cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleBulkAction('deactivate')}
                      className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 whitespace-nowrap cursor-pointer"
                    >
                      Deactivate
                    </button>
                    <button
                      onClick={() => handleBulkAction('assign_am')}
                      className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 whitespace-nowrap cursor-pointer"
                    >
                      Assign AM
                    </button>
                    <button
                      onClick={() => setSelectedBuyers([])}
                      className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedBuyers.length === filteredBuyers.length && filteredBuyers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Buyer / Company</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Country</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Brands Connected</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Orders</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Last Activity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBuyers.map((buyer) => (
                    <tr key={buyer.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedBuyers.includes(buyer.id)}
                          onChange={() => handleSelectBuyer(buyer.id)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={buyer.logo}
                            alt={`${buyer.name} logo`}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{buyer.name}</div>
                            <div className="text-sm text-gray-500">{buyer.company}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(buyer.tier)}`}>
                                {buyer.tier}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://readdy.ai/api/search-image?query=$%7Bbuyer.country%7D%20country%20flag%20icon%20simple%20clean%20design&width=20&height=14&seq=flag-${buyer.country}-buyers&orientation=landscape`}
                            alt={`${buyer.country} flag`}
                            className="w-5 h-3.5 rounded-sm object-cover"
                          />
                          <span className="text-sm text-gray-700">{buyer.countryName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{buyer.brandsConnected}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{buyer.totalOrders}</div>
                          <div className="text-xs text-gray-500">{buyer.lifetimeSpend}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-700">{buyer.lastActivity}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(buyer.status)}`}>
                          {buyer.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link href={`/buyers/${buyer.id}`}>
                          <button className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer">
                            View Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-gray-200">
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
          </div>
        </div>
      </div>
    </div>
  );
}