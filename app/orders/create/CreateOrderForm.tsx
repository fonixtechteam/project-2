'use client';

import { useState } from 'react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  stockLevel: number;
  image: string;
}

interface Buyer {
  id: string;
  name: string;
  company: string;
  logo: string;
  defaultAddress: string;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
  category: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stockLevel: number;
  image: string;
  brand: string;
}

export default function CreateOrderForm() {
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [orderId] = useState(`ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`);
  const [orderStatus, setOrderStatus] = useState('pending');
  const [shippingAddress, setShippingAddress] = useState('');
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [shippingMethod, setShippingMethod] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [taxRate, setTaxRate] = useState(0.08);
  const [shippingCost, setShippingCost] = useState(0);
  
  const [buyerSearch, setBuyerSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [showBuyerSuggestions, setShowBuyerSuggestions] = useState(false);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);

  const buyers: Buyer[] = [
    {
      id: 'buyer-001',
      name: 'Wellness Beauty Co.',
      company: 'Wellness Beauty Co.',
      logo: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional&width=40&height=40&seq=buyer-create-1&orientation=squarish',
      defaultAddress: '123 Beauty Street, Los Angeles, CA 90210, USA'
    },
    {
      id: 'buyer-002',
      name: 'Pure Skin Solutions',
      company: 'Pure Skin Solutions Ltd.',
      logo: 'https://readdy.ai/api/search-image?query=skincare%20solutions%20company%20logo%20elegant%20blue%20design%20professional%20healthcare%20beauty&width=40&height=40&seq=buyer-create-2&orientation=squarish',
      defaultAddress: '456 Health Blvd, Toronto, ON, Canada'
    },
    {
      id: 'buyer-003',
      name: 'Beauty Boutique Paris',
      company: 'Beauty Boutique Paris SARL',
      logo: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics&width=40&height=40&seq=buyer-create-3&orientation=squarish',
      defaultAddress: '45 Rue de la Beauté, Paris, France'
    }
  ];

  const brands: Brand[] = [
    {
      id: 'brand-001',
      name: 'Pure Essence',
      logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare&width=40&height=40&seq=brand-create-1&orientation=squarish',
      category: 'Skincare'
    },
    {
      id: 'brand-002',
      name: 'Botanica Natural',
      logo: 'https://readdy.ai/api/search-image?query=botanical%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics&width=40&height=40&seq=brand-create-2&orientation=squarish',
      category: 'Natural Beauty'
    },
    {
      id: 'brand-003',
      name: 'Luxury Glow',
      logo: 'https://readdy.ai/api/search-image?query=luxury%20glow%20beauty%20brand%20logo%20premium%20golden%20design%20high%20end%20cosmetics%20elegant&width=40&height=40&seq=brand-create-3&orientation=squarish',
      category: 'Premium Cosmetics'
    }
  ];

  const products: Product[] = [
    {
      id: 'prod-001',
      name: 'Nourishing Face Oil',
      sku: 'NFO-001',
      price: 45.00,
      stockLevel: 245,
      image: 'https://readdy.ai/api/search-image?query=luxury%20nourishing%20face%20oil%20bottle%20elegant%20glass%20packaging%20golden%20oil%20serum%20premium%20skincare&width=50&height=50&seq=product-create-1&orientation=squarish',
      brand: 'Pure Essence'
    },
    {
      id: 'prod-002',
      name: 'Hydrating Essence',
      sku: 'HE-002',
      price: 32.00,
      stockLevel: 156,
      image: 'https://readdy.ai/api/search-image?query=hydrating%20essence%20serum%20bottle%20elegant%20dropper%20packaging%20hyaluronic%20acid%20skincare%20premium&width=50&height=50&seq=product-create-2&orientation=squarish',
      brand: 'Pure Essence'
    },
    {
      id: 'prod-003',
      name: 'Gentle Cleanser',
      sku: 'GC-003',
      price: 28.00,
      stockLevel: 89,
      image: 'https://readdy.ai/api/search-image?query=gentle%20cleanser%20bottle%20minimalist%20white%20packaging%20clean%20beauty%20skincare%20product&width=50&height=50&seq=product-create-3&orientation=squarish',
      brand: 'Pure Essence'
    },
    {
      id: 'prod-004',
      name: 'Organic Toner',
      sku: 'OT-004',
      price: 25.00,
      stockLevel: 67,
      image: 'https://readdy.ai/api/search-image?query=organic%20toner%20bottle%20green%20natural%20packaging%20botanical%20skincare%20product&width=50&height=50&seq=product-create-4&orientation=squarish',
      brand: 'Botanica Natural'
    },
    {
      id: 'prod-005',
      name: 'Natural Moisturizer',
      sku: 'NM-005',
      price: 38.00,
      stockLevel: 23,
      image: 'https://readdy.ai/api/search-image?query=natural%20moisturizer%20jar%20cream%20packaging%20organic%20botanical%20skincare%20sustainable&width=50&height=50&seq=product-create-5&orientation=squarish',
      brand: 'Botanica Natural'
    },
    {
      id: 'prod-006',
      name: 'Premium Facial Mask',
      sku: 'PFM-006',
      price: 15.00,
      stockLevel: 198,
      image: 'https://readdy.ai/api/search-image?query=premium%20facial%20mask%20package%20luxury%20gold%20design%20skincare%20treatment%20product&width=50&height=50&seq=product-create-6&orientation=squarish',
      brand: 'Luxury Glow'
    }
  ];

  const filteredBuyers = buyers.filter(buyer =>
    buyer.name.toLowerCase().includes(buyerSearch.toLowerCase()) ||
    buyer.company.toLowerCase().includes(buyerSearch.toLowerCase()) ||
    buyer.id.toLowerCase().includes(buyerSearch.toLowerCase())
  );

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase()) ||
    brand.category.toLowerCase().includes(brandSearch.toLowerCase()) ||
    brand.id.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
     product.sku.toLowerCase().includes(productSearch.toLowerCase())) &&
    (!selectedBrand || product.brand === selectedBrand.name)
  );

  const handleBuyerSelect = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
    setBuyerSearch(buyer.name);
    setShowBuyerSuggestions(false);
    if (useDefaultAddress) {
      setShippingAddress(buyer.defaultAddress);
    }
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setBrandSearch(brand.name);
    setShowBrandSuggestions(false);
  };

  const handleProductSelect = (product: Product) => {
    const existingItem = orderItems.find(item => item.sku === product.sku);
    
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.sku === product.sku
          ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.unitPrice }
          : item
      ));
    } else {
      const newItem: OrderItem = {
        id: `item-${Date.now()}`,
        productName: product.name,
        sku: product.sku,
        quantity: 1,
        unitPrice: product.price,
        totalPrice: product.price,
        stockLevel: product.stockLevel,
        image: product.image
      };
      setOrderItems([...orderItems, newItem]);
    }
    
    setProductSearch('');
    setShowProductSuggestions(false);
  };

  const handleRemoveItem = (itemId: string) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setOrderItems(orderItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.unitPrice }
        : item
    ));
  };

  const handlePriceChange = (itemId: string, newPrice: number) => {
    setOrderItems(orderItems.map(item =>
      item.id === itemId
        ? { ...item, unitPrice: newPrice, totalPrice: item.quantity * newPrice }
        : item
    ));
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + shippingCost - discountAmount;
  };

  const handleSubmitOrder = () => {
    if (!selectedBuyer || !selectedBrand || orderItems.length === 0) {
      alert('Please complete all required fields and add at least one item.');
      return;
    }
    
    const orderData = {
      orderId,
      buyer: selectedBuyer,
      brand: selectedBrand,
      orderDate,
      status: orderStatus,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      shippingMethod,
      trackingNumber,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shippingCost,
      discount: discountAmount,
      total: calculateTotal()
    };
    
    console.log('Creating order:', orderData);
    // Here you would typically send this to your backend
  };

  const handleSaveDraft = () => {
    console.log('Saving order as draft');
  };

  const getStockWarning = (stockLevel: number, quantity: number) => {
    if (stockLevel === 0) return 'Out of stock';
    if (stockLevel < quantity) return `Only ${stockLevel} available`;
    if (stockLevel < 10) return 'Low stock';
    return null;
  };

  return (
    <div className="flex-1 overflow-auto">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Create New Order</h1>
            <p className="text-gray-600 mt-1">Add a new order to the system with detailed product information</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/orders"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Orders
            </Link>
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-draft-line mr-2"></i>
              Save Draft
            </button>
            <button
              onClick={handleSubmitOrder}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>
              Create Order
            </button>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Order Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Information</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
                  <input
                    type="text"
                    value={orderId}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Date</label>
                  <input
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="confirmed">Confirmed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Buyer Selection */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Buyer Selection</h2>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Buyer</label>
                <input
                  type="text"
                  value={buyerSearch}
                  onChange={(e) => {
                    setBuyerSearch(e.target.value);
                    setShowBuyerSuggestions(true);
                  }}
                  onFocus={() => setShowBuyerSuggestions(true)}
                  placeholder="Search by buyer name, company, or ID..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                
                {showBuyerSuggestions && buyerSearch && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredBuyers.map((buyer) => (
                      <button
                        key={buyer.id}
                        onClick={() => handleBuyerSelect(buyer)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left cursor-pointer"
                      >
                        <img
                          src={buyer.logo}
                          alt={`${buyer.name} logo`}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{buyer.name}</div>
                          <div className="text-sm text-gray-500">{buyer.company}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Brand Selection */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Brand Selection</h2>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Brand</label>
                <input
                  type="text"
                  value={brandSearch}
                  onChange={(e) => {
                    setBrandSearch(e.target.value);
                    setShowBrandSuggestions(true);
                  }}
                  onFocus={() => setShowBrandSuggestions(true)}
                  placeholder="Search by brand name, category, or ID..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                
                {showBrandSuggestions && brandSearch && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredBrands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => handleBrandSelect(brand)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left cursor-pointer"
                      >
                        <img
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{brand.name}</div>
                          <div className="text-sm text-gray-500">{brand.category}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Selection */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Items</h2>
              
              <div className="relative mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Products</label>
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => {
                    setProductSearch(e.target.value);
                    setShowProductSuggestions(true);
                  }}
                  onFocus={() => setShowProductSuggestions(true)}
                  placeholder="Search products by name or SKU..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  disabled={!selectedBrand}
                />
                
                {!selectedBrand && (
                  <p className="text-sm text-gray-500 mt-1">Please select a brand first to add products</p>
                )}
                
                {showProductSuggestions && productSearch && selectedBrand && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">SKU: {product.sku} • ${product.price.toFixed(2)}</div>
                          <div className="text-xs text-gray-500">
                            Stock: {product.stockLevel}
                            {product.stockLevel < 10 && product.stockLevel > 0 && (
                              <span className="text-yellow-600 ml-1">(Low Stock)</span>
                            )}
                            {product.stockLevel === 0 && (
                              <span className="text-red-600 ml-1">(Out of Stock)</span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Items List */}
              {orderItems.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Selected Items ({orderItems.length})</h3>
                  
                  {orderItems.map((item) => {
                    const stockWarning = getStockWarning(item.stockLevel, item.quantity);
                    
                    return (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          
                          <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                            <div>
                              <div className="font-medium text-gray-900">{item.productName}</div>
                              <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                              {stockWarning && (
                                <div className={`text-xs mt-1 ${stockWarning.includes('Out of stock') ? 'text-red-600' : stockWarning.includes('Low') ? 'text-yellow-600' : 'text-orange-600'}`}>
                                  {stockWarning}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Unit Price</label>
                              <input
                                type="number"
                                step="0.01"
                                value={item.unitPrice}
                                onChange={(e) => handlePriceChange(item.id, parseFloat(e.target.value) || 0)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Total Price</label>
                              <div className="font-medium text-gray-900">${item.totalPrice.toFixed(2)}</div>
                            </div>
                            
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-2 text-gray-400 hover:text-red-600 cursor-pointer"
                                title="Remove Item"
                              >
                                <i className="ri-delete-bin-line text-lg"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Shipping Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Details</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      id="useDefaultAddress"
                      checked={useDefaultAddress}
                      onChange={(e) => {
                        setUseDefaultAddress(e.target.checked);
                        if (e.target.checked && selectedBuyer) {
                          setShippingAddress(selectedBuyer.defaultAddress);
                        }
                      }}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor="useDefaultAddress" className="text-sm font-medium text-gray-700">
                      Use buyer's default address
                    </label>
                  </div>
                  
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    rows={3}
                    placeholder="Enter shipping address..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                    disabled={useDefaultAddress}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Method</label>
                    <select
                      value={shippingMethod}
                      onChange={(e) => {
                        setShippingMethod(e.target.value);
                        // Auto-calculate shipping cost based on method
                        const costs = { 'standard': 15, 'express': 35, 'overnight': 65, 'international': 85 };
                        setShippingCost(costs[e.target.value as keyof typeof costs] || 0);
                        // Auto-calculate estimated delivery
                        const today = new Date();
                        const deliveryDays = { 'standard': 5, 'express': 2, 'overnight': 1, 'international': 10 };
                        const deliveryDate = new Date(today);
                        deliveryDate.setDate(today.getDate() + (deliveryDays[e.target.value as keyof typeof deliveryDays] || 5));
                        setEstimatedDelivery(deliveryDate.toISOString().split('T')[0]);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="">Select shipping method</option>
                      <option value="standard">Standard Shipping (5-7 days) - $15</option>
                      <option value="express">Express Shipping (2-3 days) - $35</option>
                      <option value="overnight">Overnight Delivery - $65</option>
                      <option value="international">International Shipping - $85</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Delivery</label>
                    <input
                      type="date"
                      value={estimatedDelivery}
                      onChange={(e) => setEstimatedDelivery(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number (Optional)</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number if available..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Select payment method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                    <option value="wire_transfer">Wire Transfer</option>
                    <option value="check">Check</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({orderItems.length} items):</span>
                  <span className="font-medium text-gray-900">${calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-gray-900">${shippingCost.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax ({(taxRate * 100).toFixed(0)}%):</span>
                  <span className="font-medium text-gray-900">${calculateTax().toFixed(2)}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-green-600">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total:</span>
                    <span className="text-lg font-semibold text-gray-900">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => {
                        if (promoCode === 'SAVE10') {
                          setDiscountAmount(calculateSubtotal() * 0.1);
                        }
                      }}
                      className="px-3 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manual Discount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Order Status */}
            {selectedBuyer && selectedBrand && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">Order Details</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <img src={selectedBuyer.logo} alt="Buyer" className="w-6 h-6 rounded object-cover" />
                    <div>
                      <div className="font-medium text-gray-900">{selectedBuyer.name}</div>
                      <div className="text-gray-500">{selectedBuyer.company}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <img src={selectedBrand.logo} alt="Brand" className="w-6 h-6 rounded object-cover" />
                    <div>
                      <div className="font-medium text-gray-900">{selectedBrand.name}</div>
                      <div className="text-gray-500">{selectedBrand.category}</div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="text-gray-900">{orderDate}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-gray-900 capitalize">{orderStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}