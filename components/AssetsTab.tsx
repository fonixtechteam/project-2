'use client';

import { useState } from 'react';

interface AssetsTabProps {
  brandId: string;
}

export default function AssetsTab({ brandId }: AssetsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const assetCategories = [
    { id: 'all', name: 'All Assets', count: 47 },
    { id: 'product_images', name: 'Product Images', count: 28 },
    { id: 'marketing', name: 'Marketing Materials', count: 12 },
    { id: 'logos', name: 'Logos & Branding', count: 5 },
    { id: 'certificates', name: 'Certificates', count: 2 }
  ];

  const assets = [
    {
      id: 1,
      name: 'Premium Serum Product Shot',
      category: 'product_images',
      type: 'image',
      format: 'PNG',
      size: '2.4 MB',
      dimensions: '1920x1080',
      uploadDate: '2024-01-15',
      status: 'approved',
      thumbnail: 'https://readdy.ai/api/search-image?query=premium%20luxury%20skincare%20serum%20bottle%20product%20photography%20white%20background%20professional%20studio%20lighting&width=200&height=200&seq=asset-1&orientation=squarish',
      tags: ['serum', 'product', 'premium', 'skincare']
    },
    {
      id: 2,
      name: 'Brand Logo Primary',
      category: 'logos',
      type: 'image',
      format: 'SVG',
      size: '45 KB',
      dimensions: '500x200',
      uploadDate: '2024-01-10',
      status: 'approved',
      thumbnail: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20golden%20accents%20premium%20cosmetics&width=200&height=200&seq=asset-2&orientation=squarish',
      tags: ['logo', 'branding', 'primary']
    },
    {
      id: 3,
      name: 'Moisturizer Collection',
      category: 'product_images',
      type: 'image',
      format: 'JPG',
      size: '3.1 MB',
      dimensions: '2048x1536',
      uploadDate: '2024-01-12',
      status: 'pending',
      thumbnail: 'https://readdy.ai/api/search-image?query=moisturizer%20cream%20collection%20beauty%20products%20elegant%20packaging%20white%20background%20studio%20photography&width=200&height=200&seq=asset-3&orientation=squarish',
      tags: ['moisturizer', 'collection', 'skincare']
    },
    {
      id: 4,
      name: 'Social Media Banner',
      category: 'marketing',
      type: 'image',
      format: 'PNG',
      size: '1.8 MB',
      dimensions: '1200x628',
      uploadDate: '2024-01-08',
      status: 'approved',
      thumbnail: 'https://readdy.ai/api/search-image?query=social%20media%20banner%20beauty%20brand%20promotion%20elegant%20design%20pink%20background%20skincare%20products&width=200&height=200&seq=asset-4&orientation=squarish',
      tags: ['social', 'banner', 'marketing', 'promotion']
    },
    {
      id: 5,
      name: 'Product Catalog PDF',
      category: 'marketing',
      type: 'document',
      format: 'PDF',
      size: '8.5 MB',
      dimensions: 'A4',
      uploadDate: '2024-01-05',
      status: 'approved',
      thumbnail: 'https://readdy.ai/api/search-image?query=product%20catalog%20cover%20page%20professional%20beauty%20cosmetics%20brochure%20elegant%20design&width=200&height=200&seq=asset-5&orientation=squarish',
      tags: ['catalog', 'pdf', 'products', 'brochure']
    },
    {
      id: 6,
      name: 'FDA Certificate',
      category: 'certificates',
      type: 'document',
      format: 'PDF',
      size: '1.2 MB',
      dimensions: 'Letter',
      uploadDate: '2023-12-20',
      status: 'approved',
      thumbnail: 'https://readdy.ai/api/search-image?query=FDA%20certificate%20document%20official%20government%20seal%20professional%20business%20certification&width=200&height=200&seq=asset-6&orientation=squarish',
      tags: ['certificate', 'fda', 'official', 'compliance']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type: string, format: string) => {
    if (type === 'image') {
      return 'ri-image-line text-blue-500';
    } else if (format === 'PDF') {
      return 'ri-file-pdf-line text-red-500';
    } else {
      return 'ri-file-line text-gray-500';
    }
  };

  const filteredAssets = assets.filter(asset => 
    selectedCategory === 'all' || asset.category === selectedCategory
  );

  const toggleAssetSelection = (assetId: number) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for assets:`, selectedAssets);
    setSelectedAssets([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Brand Assets</h3>
          <p className="text-sm text-gray-500 mt-1">Manage digital assets, images, and marketing materials</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedAssets.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{selectedAssets.length} selected</span>
              <button
                onClick={() => handleBulkAction('approve')}
                className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded hover:bg-green-100 whitespace-nowrap cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 whitespace-nowrap cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => handleBulkAction('download')}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 whitespace-nowrap cursor-pointer"
              >
                Download
              </button>
            </div>
          )}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:text-gray-900'} cursor-pointer`}
            >
              <i className="ri-grid-line"></i>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm border-l border-gray-300 ${viewMode === 'list' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:text-gray-900'} cursor-pointer`}
            >
              <i className="ri-list-check"></i>
            </button>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-upload-line mr-2"></i>
            Upload Assets
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-64 bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-1">
            {assetCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAssets.map((asset) => (
                <div key={asset.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={selectedAssets.includes(asset.id)}
                        onChange={() => toggleAssetSelection(asset.id)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <i className={`${getFileIcon(asset.type, asset.format)} text-lg bg-white p-1 rounded`}></i>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h5 className="font-medium text-gray-900 text-sm truncate">{asset.name}</h5>
                    <p className="text-xs text-gray-500 mt-1">{asset.format} • {asset.size}</p>
                    <p className="text-xs text-gray-400 mt-1">{asset.uploadDate}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-wrap gap-1">
                        {asset.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                        {asset.tags.length > 2 && (
                          <span className="text-xs text-gray-400">+{asset.tags.length - 2}</span>
                        )}
                      </div>
                      <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                        <i className="ri-more-2-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm w-8">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Asset</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Upload Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedAssets.includes(asset.id)}
                          onChange={() => toggleAssetSelection(asset.id)}
                          className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={asset.thumbnail}
                            alt={asset.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{asset.name}</div>
                            <div className="text-xs text-gray-500">{asset.dimensions}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <i className={getFileIcon(asset.type, asset.format)}></i>
                          <span className="text-sm text-gray-700">{asset.format}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{asset.size}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{asset.uploadDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-blue-600 cursor-pointer">
                            <i className="ri-download-line"></i>
                          </button>
                          <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                            <i className="ri-eye-line"></i>
                          </button>
                          <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                            <i className="ri-more-2-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload New Assets</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8">
                  <option value="product_images">Product Images</option>
                  <option value="marketing">Marketing Materials</option>
                  <option value="logos">Logos & Branding</option>
                  <option value="certificates">Certificates</option>
                </select>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
                <p className="text-sm text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                <p className="text-xs text-gray-500">Supports: JPG, PNG, PDF, SVG (Max 10MB)</p>
                <button className="mt-3 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer">
                  Choose Files
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
                Upload Assets
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}