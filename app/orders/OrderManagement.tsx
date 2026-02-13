
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const orders = [
    {
      id: 'ORD-2024-001',
      buyer: {
        name: 'Wellness Beauty Co.',
        logo: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional&width=40&height=40&seq=buyer-order-1&orientation=squarish',
        contactPerson: 'Sarah Johnson',
        id: 'buyer-001'
      },
      brand: {
        name: 'Pure Essence',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare&width=40&height=40&seq=brand-order-1&orientation=squarish',
        id: 'brand-001'
      },
      orderDate: '2024-01-15',
      items: [
        { name: 'Nourishing Face Oil', quantity: 25, sku: 'NFO-001', unitPrice: 45.00, totalPrice: 1125.00 },
        { name: 'Hydrating Essence', quantity: 30, sku: 'HE-002', unitPrice: 32.00, totalPrice: 960.00 },
        { name: 'Gentle Cleanser', quantity: 20, sku: 'GC-003', unitPrice: 28.00, totalPrice: 560.00 }
      ],
      totalItems: 75,
      totalValue: '$2,645.00',
      paymentStatus: 'paid',
      orderStatus: 'shipped',
      shippingAddress: '123 Beauty Street, Los Angeles, CA 90210, USA',
      trackingNumber: 'UPS123456789',
      shippingMethod: 'Express Shipping',
      invoiceId: 'INV-2024-001',
      priority: 'normal'
    },
    {
      id: 'ORD-2024-002',
      buyer: {
        name: 'Beauty Boutique Paris',
        logo: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics&width=40&height=40&seq=buyer-order-2&orientation=squarish',
        contactPerson: 'Marie Dubois',
        id: 'buyer-002'
      },
      brand: {
        name: 'Botanica Natural',
        logo: 'https://readdy.ai/api/search-image?query=botanical%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics&width=40&height=40&seq=brand-order-2&orientation=squarish',
        id: 'brand-002'
      },
      orderDate: '2024-01-12',
      items: [
        { name: 'Organic Toner', quantity: 40, sku: 'OT-004', unitPrice: 25.00, totalPrice: 1000.00 },
        { name: 'Natural Moisturizer', quantity: 35, sku: 'NM-005', unitPrice: 38.00, totalPrice: 1330.00 }
      ],
      totalItems: 75,
      totalValue: '$2,330.00',
      paymentStatus: 'pending',
      orderStatus: 'processing',
      shippingAddress: '45 Rue de la Beauté, Paris, France',
      trackingNumber: null,
      shippingMethod: 'Standard Shipping',
      invoiceId: null,
      priority: 'high'
    },
    {
      id: 'ORD-2024-003',
      buyer: {
        name: 'Spa Essentials Pro',
        logo: 'https://readdy.ai/api/search-image?query=spa%20essentials%20professional%20logo%20calming%20blue%20purple%20design%20relaxation%20wellness&width=40&height=40&seq=buyer-order-3&orientation=squarish',
        contactPerson: 'David Chen',
        id: 'buyer-003'
      },
      brand: {
        name: 'Luxury Glow',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20glow%20beauty%20brand%20logo%20premium%20golden%20design%20high%20end%20cosmetics%20elegant&width=40&height=40&seq=brand-order-3&orientation=squarish',
        id: 'brand-003'
      },
      orderDate: '2024-01-10',
      items: [
        { name: 'Premium Facial Mask', quantity: 50, sku: 'PFM-006', unitPrice: 15.00, totalPrice: 750.00 },
        { name: 'Anti-Aging Serum', quantity: 25, sku: 'AAS-007', unitPrice: 65.00, totalPrice: 1625.00 }
      ],
      totalItems: 75,
      totalValue: '$2,375.00',
      paymentStatus: 'paid',
      orderStatus: 'completed',
      shippingAddress: '789 Wellness Ave, Sydney, Australia',
      trackingNumber: 'FDX987654321',
      shippingMethod: 'Express Shipping',
      invoiceId: 'INV-2024-003',
      priority: 'normal'
    },
    {
      id: 'ORD-2024-004',
      buyer: {
        name: 'Pure Skin Solutions',
        logo: 'https://readdy.ai/api/search-image?query=skincare%20solutions%20company%20logo%20elegant%20blue%20design%20professional%20healthcare%20beauty&width=40&height=40&seq=buyer-order-4&orientation=squarish',
        contactPerson: 'Anna Rodriguez',
        id: 'buyer-004'
      },
      brand: {
        name: 'Pure Essence',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare&width=40&height=40&seq=brand-order-4&orientation=squarish',
        id: 'brand-001'
      },
      orderDate: '2024-01-08',
      items: [
        { name: 'Vitamin C Serum', quantity: 30, sku: 'VCS-008', unitPrice: 42.00, totalPrice: 1260.00 },
        { name: 'Night Repair Cream', quantity: 20, sku: 'NRC-009', unitPrice: 55.00, totalPrice: 1100.00 }
      ],
      totalItems: 50,
      totalValue: '$2,360.00',
      paymentStatus: 'unpaid',
      orderStatus: 'pending',
      shippingAddress: '456 Health Blvd, Toronto, ON, Canada',
      trackingNumber: null,
      shippingMethod: 'Standard Shipping',
      invoiceId: 'INV-2024-004',
      priority: 'urgent'
    },
    {
      id: 'ORD-2024-005',
      buyer: {
        name: 'Natural Glow Ltd',
        logo: 'https://readdy.ai/api/search-image?query=natural%20glow%20cosmetics%20company%20logo%20organic%20green%20design%20sustainable%20beauty%20brand&width=40&height=40&seq=buyer-order-5&orientation=squarish',
        contactPerson: 'James Wilson',
        id: 'buyer-005'
      },
      brand: {
        name: 'Botanica Natural',
        logo: 'https://readdy.ai/api/search-image?query=botanical%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics&width=40&height=40&seq=brand-order-5&orientation=squarish',
        id: 'brand-002'
      },
      orderDate: '2024-01-05',
      items: [
        { name: 'Herbal Face Wash', quantity: 60, sku: 'HFW-010', unitPrice: 18.00, totalPrice: 1080.00 }
      ],
      totalItems: 60,
      totalValue: '$1,080.00',
      paymentStatus: 'paid',
      orderStatus: 'cancelled',
      shippingAddress: '321 Green Street, London, UK',
      trackingNumber: null,
      shippingMethod: 'Standard Shipping',
      invoiceId: 'INV-2024-005',
      priority: 'normal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleMarkAsShipped = (orderId: string) => {
    console.log('Marking order as shipped:', orderId);
  };

  const handleMarkAsCompleted = (orderId: string) => {
    console.log('Marking order as completed:', orderId);
  };

  const handleCancelOrder = (orderId: string) => {
    console.log('Cancelling order:', orderId);
  };

  const handleSendNotification = (orderId: string) => {
    console.log('Sending notification for order:', orderId);
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
    const shippedOrders = orders.filter(o => o.orderStatus === 'shipped').length;
    const totalValue = orders.reduce((sum, order) => 
      sum + parseFloat(order.totalValue.replace('$', '').replace(',', '')), 0
    );

    return { totalOrders, pendingOrders, shippedOrders, totalValue };
  };

  const stats = getOrderStats();

  return (
    <div className="flex-1 overflow-auto">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
            <p className="text-gray-600 mt-1">Manage and track all buyer orders across your marketplace</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
            >
              <i className={`${viewMode === 'table' ? 'ri-layout-grid-line' : 'ri-table-line'} mr-2`}></i>
              {viewMode === 'table' ? 'Grid View' : 'Table View'}
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
              <i className="ri-download-line mr-2"></i>
              Export Report
            </button>
            <Link
              href="/orders/create"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>
              Create Order
            </Link>
          </div>
        </div>
      </header>

      <main className="p-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</div>
                <div className="text-sm text-gray-500">Total Orders</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-shopping-cart-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.pendingOrders}</div>
                <div className="text-sm text-gray-500">Pending Orders</div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-orange-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.shippedOrders}</div>
                <div className="text-sm text-gray-500">Shipped Orders</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-truck-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-green-600">${stats.totalValue.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Order Value</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search by Order ID, Buyer, or Brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="unpaid">Unpaid</option>
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
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {viewMode === 'table' ? (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Buyer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Brand</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Payment</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{order.id}</span>
                          {order.priority === 'urgent' && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                              URGENT
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.buyer.logo}
                            alt={`${order.buyer.name} logo`}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div>
                            <button className="text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer">
                              {order.buyer.name}
                            </button>
                            <div className="text-xs text-gray-500">{order.buyer.contactPerson}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.brand.logo}
                            alt={`${order.brand.name} logo`}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <button className="text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer">
                            {order.brand.name}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{order.orderDate}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/orders/${order.id}`}
                            className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            title="View Details"
                          >
                            <i className="ri-eye-line"></i>
                          </Link>
                          {order.orderStatus === 'processing' && (
                            <button
                              onClick={() => handleMarkAsShipped(order.id)}
                              className="p-2 text-blue-400 hover:text-blue-600 cursor-pointer"
                              title="Mark as Shipped"
                            >
                              <i className="ri-truck-line"></i>
                            </button>
                          )}
                          {order.orderStatus === 'shipped' && (
                            <button
                              onClick={() => handleMarkAsCompleted(order.id)}
                              className="p-2 text-green-400 hover:text-green-600 cursor-pointer"
                              title="Mark as Completed"
                            >
                              <i className="ri-check-line"></i>
                            </button>
                          )}
                          <button
                            onClick={() => handleSendNotification(order.id)}
                            className="p-2 text-yellow-400 hover:text-yellow-600 cursor-pointer"
                            title="Send Notification"
                          >
                            <i className="ri-notification-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    {order.priority === 'urgent' && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                        URGENT
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.buyer.logo}
                      alt={`${order.buyer.name} logo`}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div>
                      <button className="text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer">
                        {order.buyer.name}
                      </button>
                      <div className="text-xs text-gray-500">{order.buyer.contactPerson}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={order.brand.logo}
                      alt={`${order.brand.name} logo`}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <button className="text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer">
                      {order.brand.name}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Order Date</div>
                    <div className="font-medium text-gray-900">{order.orderDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Payment</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <Link
                    href={`/orders/${order.id}`}
                    className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer"
                  >
                    View Details
                  </Link>
                  <div className="flex items-center gap-2">
                    {order.orderStatus === 'processing' && (
                      <button
                        onClick={() => handleMarkAsShipped(order.id)}
                        className="p-2 text-blue-400 hover:text-blue-600 cursor-pointer"
                        title="Mark as Shipped"
                      >
                        <i className="ri-truck-line"></i>
                      </button>
                    )}
                    {order.orderStatus === 'shipped' && (
                      <button
                        onClick={() => handleMarkAsCompleted(order.id)}
                        className="p-2 text-green-400 hover:text-green-600 cursor-pointer"
                        title="Mark as Completed"
                      >
                        <i className="ri-check-line"></i>
                      </button>
                    )}
                    <button
                      onClick={() => handleSendNotification(order.id)}
                      className="p-2 text-yellow-400 hover:text-yellow-600 cursor-pointer"
                      title="Send Notification"
                    >
                      <i className="ri-notification-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {filteredOrders.length} of {orders.length} orders
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
      </main>
    </div>
  );
}
