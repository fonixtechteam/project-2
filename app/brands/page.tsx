
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const brands = [
    {
      id: '1',
      name: 'Pure Essence',
      logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20on%20white%20background%20premium%20skincare%20cosmetics&width=60&height=60&seq=brand-logo-1&orientation=squarish',
      description: 'Clean beauty essentials with transparent ingredients',
      category: 'Skincare',
      complianceStatus: 'Ready-Kit',
      totalBuyers: 47,
      activeBuyers: 32,
      totalOrders: 156,
      revenue: '$45,230',
      countries: ['US', 'CA', 'FR'],
      joinDate: '2023-03-15',
      lastActivity: '2024-01-15'
    },
    {
      id: '2',
      name: 'Botanica Natural',
      logo: 'https://readdy.ai/api/search-image?query=botanical%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics%20elegant&width=60&height=60&seq=brand-logo-2&orientation=squarish',
      description: 'Organic botanical skincare from nature',
      category: 'Natural Beauty',
      complianceStatus: 'Ready-Kit',
      totalBuyers: 63,
      activeBuyers: 45,
      totalOrders: 234,
      revenue: '$78,450',
      countries: ['US', 'UK', 'AU', 'NZ'],
      joinDate: '2022-11-08',
      lastActivity: '2024-01-14'
    },
    {
      id: '3',
      name: 'Luxury Glow',
      logo: 'https://readdy.ai/api/search-image?query=luxury%20glow%20beauty%20brand%20logo%20premium%20golden%20design%20high%20end%20cosmetics%20elegant%20sophisticated&width=60&height=60&seq=brand-logo-3&orientation=squarish',
      description: 'Premium luxury skincare for discerning clients',
      category: 'Luxury Beauty',
      complianceStatus: 'Ready-Kit',
      totalBuyers: 28,
      activeBuyers: 22,
      totalOrders: 89,
      revenue: '$89,340',
      countries: ['US', 'FR', 'IT', 'JP'],
      joinDate: '2023-07-22',
      lastActivity: '2024-01-13'
    },
    {
      id: '4',
      name: 'Fresh Start Wellness',
      logo: 'https://readdy.ai/api/search-image?query=fresh%20start%20wellness%20brand%20logo%20clean%20blue%20green%20design%20health%20beauty%20natural%20products&width=60&height=60&seq=brand-logo-4&orientation=squarish',
      description: 'Wellness-focused beauty for healthy living',
      category: 'Wellness',
      complianceStatus: 'Pending',
      totalBuyers: 19,
      activeBuyers: 14,
      totalOrders: 45,
      revenue: '$23,120',
      countries: ['US', 'CA'],
      joinDate: '2023-12-10',
      lastActivity: '2024-01-12'
    },
    {
      id: '5',
      name: 'Urban Skin Co',
      logo: 'https://readdy.ai/api/search-image?query=urban%20skin%20company%20logo%20modern%20city%20inspired%20design%20contemporary%20beauty%20brand%20sleek&width=60&height=60&seq=brand-logo-5&orientation=squarish',
      description: 'Modern skincare for urban lifestyles',
      category: 'Modern Beauty',
      complianceStatus: 'Issues',
      totalBuyers: 12,
      activeBuyers: 8,
      totalOrders: 27,
      revenue: '$12,890',
      countries: ['US'],
      joinDate: '2024-01-05',
      lastActivity: '2024-01-11'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready-Kit':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Issues':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || brand.complianceStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Brands Management</h1>
                <p className="text-gray-600 mt-1">Manage and monitor all brands in the Synergy Global Hub</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
                <i className="ri-add-line mr-2"></i>
                Add Brand
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Brands</p>
                    <p className="text-2xl font-bold text-gray-900">{brands.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className="ri-store-line text-red-600 text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Brands</p>
                    <p className="text-2xl font-bold text-green-600">{brands.filter(b => b.complianceStatus === 'Ready-Kit').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-checkbox-circle-line text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-blue-600">$249,030</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-blue-600 text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-purple-600">551</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-shopping-cart-line text-purple-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search brands..."
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
                  <option value="Ready-Kit">Ready-Kit</option>
                  <option value="Pending">Pending</option>
                  <option value="Issues">Issues</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="name">Sort by Name</option>
                  <option value="revenue">Sort by Revenue</option>
                  <option value="orders">Sort by Orders</option>
                  <option value="buyers">Sort by Buyers</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Brand</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Category</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Buyers</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Revenue</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBrands.map((brand) => (
                    <tr key={brand.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{brand.name}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">{brand.description}</div>
                            <div className="flex items-center gap-1 mt-1">
                              {brand.countries.slice(0, 3).map((country) => (
                                <img
                                  key={country}
                                  src={`https://readdy.ai/api/search-image?query=$%7Bcountry%7D%20country%20flag%20icon%20simple%20clean%20design&width=16&height=12&seq=flag-${country}-brand&orientation=landscape`}
                                  alt={`${country} flag`}
                                  className="w-4 h-3 rounded-sm object-cover"
                                />
                              ))}
                              {brand.countries.length > 3 && (
                                <span className="text-xs text-gray-500">+{brand.countries.length - 3}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{brand.category}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(brand.complianceStatus)}`}>
                          {brand.complianceStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{brand.activeBuyers}/{brand.totalBuyers}</div>
                          <div className="text-gray-500">active/total</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{brand.revenue}</div>
                          <div className="text-gray-500">{brand.totalOrders} orders</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Link href={`/brands/${brand.id}`}>
                            <button className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer">
                              Manage
                            </button>
                          </Link>
                          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                            <i className="ri-more-2-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {filteredBrands.length} of {brands.length} brands
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
