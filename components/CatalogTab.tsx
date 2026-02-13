
'use client';

import { useState } from 'react';

interface CatalogTabProps {
  brandId: string;
}

export default function CatalogTab({ brandId }: CatalogTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [stockFilter, setStockFilter] = useState(false);
  const [priceRange, setPriceRange] = useState(200);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      id: 1,
      name: 'Nourishing Face Oil',
      category: 'Skincare',
      description: 'Rosehip Oil blend for deep nourishment',
      image: 'https://readdy.ai/api/search-image?query=luxury%20nourishing%20face%20oil%20bottle%20elegant%20glass%20packaging%20golden%20oil%20serum%20premium%20skincare&width=80&height=80&seq=product-face-oil&orientation=squarish',
      packSize: '30ml',
      moq: 36,
      msrp: '$48.00',
      wholesalePrice: '$22.00',
      availability: 'in_stock',
      stockLevel: 245,
      ingredients: 'Rosehip Oil, Jojoba Oil, Vitamin E',
      certifications: ['Organic', 'Cruelty-Free'],
      status: 'approved',
      lastUpdated: '2024-01-10'
    },
    {
      id: 2,
      name: 'Balancing Toner',
      category: 'Skincare',
      description: 'Witch Hazel based toner for balanced skin',
      image: 'https://readdy.ai/api/search-image?query=premium%20balancing%20toner%20bottle%20minimalist%20white%20packaging%20clean%20beauty%20skincare%20product&width=80&height=80&seq=product-toner&orientation=squarish',
      packSize: '120ml',
      moq: 48,
      msrp: '$26.00',
      wholesalePrice: '$16.50',
      availability: 'in_stock',
      stockLevel: 156,
      ingredients: 'Witch Hazel, Rose Water, Glycerin',
      certifications: ['Vegan', 'Natural'],
      status: 'approved',
      lastUpdated: '2024-01-08'
    },
    {
      id: 3,
      name: 'Gentle Micellar Water',
      category: 'Cleansing',
      description: 'Micelles for gentle makeup removal',
      image: 'https://readdy.ai/api/search-image?query=gentle%20micellar%20water%20bottle%20clear%20blue%20packaging%20clean%20minimalist%20design%20skincare%20cleanser&width=80&height=80&seq=product-micellar&orientation=squarish',
      packSize: '200ml',
      moq: 36,
      msrp: '$22.00',
      wholesalePrice: '$14.00',
      availability: 'low_stock',
      stockLevel: 23,
      ingredients: 'Micellar Solution, Glycerin, Panthenol',
      certifications: ['Dermatologist Tested', 'Hypoallergenic'],
      status: 'pending_approval',
      lastUpdated: '2024-01-15'
    },
    {
      id: 4,
      name: 'Hydrating Essence',
      category: 'Skincare',
      description: 'Hyaluronic Acid for deep hydration',
      image: 'https://readdy.ai/api/search-image?query=hydrating%20essence%20serum%20bottle%20elegant%20dropper%20packaging%20hyaluronic%20acid%20skincare%20premium&width=80&height=80&seq=product-essence&orientation=squarish',
      packSize: '100ml',
      moq: 42,
      msrp: '$34.00',
      wholesalePrice: '$19.50',
      availability: 'in_stock',
      stockLevel: 89,
      ingredients: 'Hyaluronic Acid, Niacinamide, Aloe Vera',
      certifications: ['Clinically Tested', 'Fragrance-Free'],
      status: 'approved',
      lastUpdated: '2024-01-05'
    },
    {
      id: 5,
      name: 'Nourishing Lip Balm',
      category: 'Lip Care',
      description: 'Shea Butter enriched lip protection',
      image: 'https://readdy.ai/api/search-image?query=premium%20lip%20balm%20tube%20elegant%20packaging%20shea%20butter%20natural%20lip%20care%20product&width=80&height=80&seq=product-lip-balm&orientation=squarish',
      packSize: '4.5g',
      moq: 72,
      msrp: '$8.00',
      wholesalePrice: '$5.00',
      availability: 'out_of_stock',
      stockLevel: 0,
      ingredients: 'Shea Butter, Coconut Oil, Beeswax',
      certifications: ['Organic', 'Natural'],
      status: 'approved',
      lastUpdated: '2023-12-28'
    },
    {
      id: 6,
      name: 'Moisturizing Body Lotion',
      category: 'Body Care',
      description: 'Coconut Oil based body moisturizer',
      image: 'https://readdy.ai/api/search-image?query=moisturizing%20body%20lotion%20pump%20bottle%20coconut%20oil%20packaging%20white%20elegant%20design%20body%20care&width=80&height=80&seq=product-body-lotion&orientation=squarish',
      packSize: '250ml',
      moq: 24,
      msrp: '$28.00',
      wholesalePrice: '$17.50',
      availability: 'in_stock',
      stockLevel: 67,
      ingredients: 'Coconut Oil, Shea Butter, Vitamin E',
      certifications: ['Vegan', 'Paraben-Free'],
      status: 'approved',
      lastUpdated: '2024-01-12'
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in_stock':
        return 'bg-green-100 text-green-800';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending_approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAvailability = (availability: string) => {
    return availability.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.ingredients.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter;
    const matchesStock = !stockFilter || product.availability === 'in_stock';
    return matchesSearch && matchesCategory && matchesStock;
  });

  const categories = ['All Categories', ...Array.from(new Set(products.map(p => p.category)))];

  const handleApproveProduct = (product: any) => {
    console.log('Approve product:', product.id);
  };

  const handleEditProduct = (product: any) => {
    console.log('Edit product:', product.id);
  };

  const handleArchiveProduct = (product: any) => {
    setSelectedProduct(product);
    setShowArchiveModal(true);
  };

  const confirmArchive = () => {
    console.log('Archive product:', selectedProduct?.id);
    setShowArchiveModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Brand Catalog Management</h3>
          <p className="text-sm text-gray-500 mt-1">Manage all SKUs and products for this brand</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
            <i className="ri-download-line mr-2"></i>
            Export Catalog
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
            <i className="ri-add-line mr-2"></i>
            Add Product
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search products, ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          />
        </div>
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="stockOnly"
            checked={stockFilter}
            onChange={(e) => setStockFilter(e.target.checked)}
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="stockOnly" className="text-sm text-gray-700 whitespace-nowrap">In Stock Only</label>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">MSRP:</span>
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm text-gray-700">${priceRange}</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pack/Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MOQ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSRP</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wholesale Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {product.certifications.slice(0, 2).map((cert, index) => (
                            <span key={index} className="px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{product.packSize}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{product.moq}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{product.msrp}</td>
                  <td className="px-4 py-4 text-sm font-medium text-green-600">{product.wholesalePrice}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(product.availability)}`}>
                        {formatAvailability(product.availability)}
                      </span>
                      <span className="text-xs text-gray-500">({product.stockLevel})</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {formatStatus(product.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-1 text-gray-400 hover:text-blue-600 cursor-pointer"
                        title="Edit Product"
                      >
                        <i className="ri-edit-line w-4 h-4"></i>
                      </button>
                      {product.status === 'pending_approval' && (
                        <button
                          onClick={() => handleApproveProduct(product)}
                          className="p-1 text-gray-400 hover:text-green-600 cursor-pointer"
                          title="Approve SKU"
                        >
                          <i className="ri-check-line w-4 h-4"></i>
                        </button>
                      )}
                      <button
                        onClick={() => handleArchiveProduct(product)}
                        className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
                        title="Archive SKU"
                      >
                        <i className="ri-archive-line w-4 h-4"></i>
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
          Showing {filteredProducts.length} of {products.length} products
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

      {showArchiveModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Archive Product</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to archive "{selectedProduct.name}"? This will remove it from active listings but preserve the data for historical records.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowArchiveModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmArchive}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
              >
                Archive Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
