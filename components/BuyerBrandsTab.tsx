'use client';

import { useState } from 'react';

interface BuyerBrandsTabProps {
  buyerData: any;
}

export default function BuyerBrandsTab({ buyerData }: BuyerBrandsTabProps) {
  const [viewMode, setViewMode] = useState('grid');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const connectedBrands = [
    {
      id: '1',
      name: 'Pure Essence',
      logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare%20cosmetics&width=60&height=60&seq=brand-pure-essence&orientation=squarish',
      region: 'North America',
      relationshipStatus: 'Active',
      lastOrder: '2024-01-15',
      totalOrders: 18,
      totalSpent: '$28,450',
      category: 'Skincare',
      connectionDate: '2023-03-15'
    },
    {
      id: '2',
      name: 'Botanica Natural',
      logo: 'https://readdy.ai/api/search-image?query=botanical%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics%20elegant&width=60&height=60&seq=brand-botanica&orientation=squarish',
      region: 'Global',
      relationshipStatus: 'Active',
      lastOrder: '2024-01-12',
      totalOrders: 12,
      totalSpent: '$19,780',
      category: 'Natural Beauty',
      connectionDate: '2023-06-22'
    },
    {
      id: '3',
      name: 'Luxury Glow',
      logo: 'https://readdy.ai/api/search-image?query=luxury%20glow%20beauty%20brand%20logo%20premium%20golden%20design%20high%20end%20cosmetics%20elegant%20sophisticated&width=60&height=60&seq=brand-luxury-glow&orientation=squarish',
      region: 'North America',
      relationshipStatus: 'Pending',
      lastOrder: 'N/A',
      totalOrders: 0,
      totalSpent: '$0',
      category: 'Luxury Beauty',
      connectionDate: '2024-01-08'
    }
  ];

  const availableBrands = [
    {
      id: '4',
      name: 'Fresh Start Wellness',
      logo: 'https://readdy.ai/api/search-image?query=fresh%20start%20wellness%20brand%20logo%20clean%20blue%20green%20design%20health%20beauty%20natural%20products&width=60&height=60&seq=brand-fresh-start&orientation=squarish',
      category: 'Wellness',
      region: 'North America',
      description: 'Wellness-focused beauty for healthy living'
    },
    {
      id: '5',
      name: 'Urban Skin Co',
      logo: 'https://readdy.ai/api/search-image?query=urban%20skin%20company%20logo%20modern%20city%20inspired%20design%20contemporary%20beauty%20brand%20sleek&width=60&height=60&seq=brand-urban-skin&orientation=squarish',
      category: 'Modern Beauty',
      region: 'Global',
      description: 'Modern skincare for urban lifestyles'
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

  const handleViewBrand = (brandId: string) => {
    console.log('Viewing brand:', brandId);
  };

  const handleDisconnect = (brandId: string) => {
    console.log('Disconnecting from brand:', brandId);
  };

  const handleInviteConnect = (brandId: string) => {
    console.log('Inviting to connect with brand:', brandId);
    setShowInviteModal(false);
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {connectedBrands.map((brand) => (
        <div key={brand.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{brand.name}</h4>
              <p className="text-sm text-gray-500">{brand.category}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(brand.relationshipStatus)}`}>
              {brand.relationshipStatus}
            </span>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Region:</span>
              <span className="text-gray-900">{brand.region}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Orders:</span>
              <span className="text-gray-900">{brand.totalOrders}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Spent:</span>
              <span className="text-gray-900 font-medium">{brand.totalSpent}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Order:</span>
              <span className="text-gray-900">{brand.lastOrder}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleViewBrand(brand.id)}
              className="flex-1 px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer"
            >
              View Brand
            </button>
            <button
              onClick={() => handleDisconnect(brand.id)}
              className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 whitespace-nowrap cursor-pointer"
            >
              Disconnect
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableView = () => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Brand</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Region</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Orders</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Total Spent</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Last Order</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {connectedBrands.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{brand.name}</div>
                      <div className="text-sm text-gray-500">{brand.category}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-900">{brand.region}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(brand.relationshipStatus)}`}>
                    {brand.relationshipStatus}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-900">{brand.totalOrders}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-gray-900">{brand.totalSpent}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-900">{brand.lastOrder}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewBrand(brand.id)}
                      className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDisconnect(brand.id)}
                      className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                    >
                      Disconnect
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Connected Brands</h3>
          <p className="text-sm text-gray-500 mt-1">Manage brand relationships and connections</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-gray-300 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-sm rounded cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-grid-line mr-1"></i>
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 text-sm rounded cursor-pointer ${
                viewMode === 'table' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="ri-list-check mr-1"></i>
              Table
            </button>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line mr-2"></i>
            Invite to Connect
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? renderGridView() : renderTableView()}

      {/* Invite to Connect Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Invite to Connect with Brands</h3>
            <p className="text-gray-600 mb-6">Select brands to invite {buyerData.name} to connect with:</p>
            
            <div className="space-y-4 mb-6">
              {availableBrands.map((brand) => (
                <div key={brand.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{brand.name}</h4>
                      <p className="text-sm text-gray-500">{brand.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {brand.category}
                        </span>
                        <span className="text-xs text-gray-500">{brand.region}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInviteConnect(brand.id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
                  >
                    Send Invite
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}