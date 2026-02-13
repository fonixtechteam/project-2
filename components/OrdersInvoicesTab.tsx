
'use client';

import { useState } from 'react';

interface OrdersInvoicesTabProps {
  brandId: string;
}

export default function OrdersInvoicesTab({ brandId }: OrdersInvoicesTabProps) {
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOrderDetails, setShowOrderDetails] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState<string | null>(null);
  const [showTrackingModal, setShowTrackingModal] = useState<string | null>(null);

  const orders = [
    {
      id: 'ORD-2024-001',
      buyer: 'Wellness Beauty Co.',
      buyerLogo: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional&width=32&height=32&seq=buyer-logo-order-1&orientation=squarish',
      date: '2024-01-15',
      totalAmount: '$2,004.00',
      status: 'delivered',
      invoiceId: 'INV-2024-001',
      paymentStatus: 'paid',
      shippingAddress: 'Los Angeles, CA, US',
      orderNotes: 'Rush order for holiday season'
    },
    {
      id: 'ORD-2024-002',
      buyer: 'Beauty Boutique Paris',
      buyerLogo: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics&width=32&height=32&seq=buyer-logo-order-2&orientation=squarish',
      date: '2024-01-12',
      totalAmount: '$2,604.00',
      status: 'processing',
      invoiceId: 'INV-2024-002',
      paymentStatus: 'pending',
      shippingAddress: 'Paris, France',
      orderNotes: 'Standard shipping requested'
    },
    {
      id: 'ORD-2024-003',
      buyer: 'Spa Essentials Pro',
      buyerLogo: 'https://readdy.ai/api/search-image?query=spa%20essentials%20professional%20logo%20calming%20blue%20purple%20design%20relaxation%20wellness&width=32&height=32&seq=buyer-logo-order-3&orientation=squarish',
      date: '2024-01-10',
      totalAmount: '$672.00',
      status: 'shipped',
      invoiceId: 'INV-2024-003',
      paymentStatus: 'paid',
      shippingAddress: 'Sydney, Australia',
      orderNotes: 'Express shipping'
    },
    {
      id: 'ORD-2024-004',
      buyer: 'Pure Skin Solutions',
      buyerLogo: 'https://readdy.ai/api/search-image?query=skincare%20solutions%20company%20logo%20elegant%20blue%20design%20professional%20healthcare%20beauty&width=32&height=32&seq=buyer-logo-order-4&orientation=squarish',
      date: '2024-01-08',
      totalAmount: '$1,002.00',
      status: 'delivered',
      invoiceId: 'INV-2024-004',
      paymentStatus: 'paid',
      shippingAddress: 'Toronto, ON, Canada',
      orderNotes: 'Repeat customer order'
    },
    {
      id: 'ORD-2024-005',
      buyer: 'Natural Glow Ltd',
      buyerLogo: 'https://readdy.ai/api/search-image?query=natural%20glow%20cosmetics%20company%20logo%20organic%20green%20design%20sustainable%20beauty%20brand&width=32&height=32&seq=buyer-logo-order-5&orientation=squarish',
      date: '2024-01-05',
      totalAmount: '$312.00',
      status: 'cancelled',
      invoiceId: 'INV-2024-005',
      paymentStatus: 'refunded',
      shippingAddress: 'London, UK',
      orderNotes: 'Cancelled due to stock issues'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
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
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (orderId: string) => {
    setShowOrderDetails(orderId);
  };

  const handleContactBuyer = (orderId: string) => {
    setShowContactModal(orderId);
  };

  const handleTrackShipment = (orderId: string) => {
    setShowTrackingModal(orderId);
  };

  const sendMessage = () => {
    console.log('Message sent to buyer');
    setShowContactModal(null);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const downloadInvoice = (invoiceId: string) => {
    console.log(`Downloading invoice ${invoiceId}`);
  };

  const getTotalStats = () => {
    const totalRevenue = orders.reduce((sum, order) => 
      sum + parseFloat(order.totalAmount.replace('$', '').replace(',', '')), 0
    );
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'processing').length;

    return { totalRevenue, totalOrders, pendingOrders };
  };

  const stats = getTotalStats();

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Orders & Invoices Management</h3>
            <p className="text-sm text-gray-500 mt-1">Complete order history and invoice management for this brand</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
              <i className="ri-download-line mr-2"></i>
              Export Report
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
              <i className="ri-add-line mr-2"></i>
              Create Order
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">${stats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
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
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.pendingOrders}</div>
                <div className="text-sm text-gray-500">Pending Orders</div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-yellow-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search orders, buyers, or invoice ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          </div>

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
            <option value="year">This Year</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <img
                    src={order.buyerLogo}
                    alt={`${order.buyer} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-gray-900">{order.id}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{order.buyer}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{order.date}</span>
                      <span>•</span>
                      <span>{order.shippingAddress}</span>
                    </div>
                    {order.orderNotes && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500 italic">{order.orderNotes}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900 mb-1">{order.totalAmount}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500">Payment:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                  <button
                    onClick={() => downloadInvoice(order.invoiceId)}
                    className="text-xs text-red-600 hover:text-red-700 font-medium cursor-pointer"
                  >
                    <i className="ri-download-line mr-1"></i>
                    {order.invoiceId}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleViewDetails(order.id)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
                  >
                    <i className="ri-eye-line mr-1"></i>
                    View Details
                  </button>
                  <button 
                    onClick={() => handleContactBuyer(order.id)}
                    className="text-sm text-gray-600 hover:text-gray-700 cursor-pointer"
                  >
                    <i className="ri-chat-3-line mr-1"></i>
                    Contact Buyer
                  </button>
                  <button 
                    onClick={() => handleTrackShipment(order.id)}
                    className="text-sm text-gray-600 hover:text-gray-700 cursor-pointer"
                  >
                    <i className="ri-truck-line mr-1"></i>
                    Track Shipment
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  Invoice: {order.invoiceId} • Total: {order.totalAmount}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
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
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Order Details - {showOrderDetails}</h3>
              <button
                onClick={() => setShowOrderDetails(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                  <p className="text-gray-900">{showOrderDetails}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Delivered</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
                  <p className="text-gray-900">2024-01-15</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                  <p className="text-gray-900 font-semibold">$2,004.00</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                <p className="text-gray-600">123 Beauty Street, Los Angeles, CA 90210, USA</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes</label>
                <p className="text-gray-600">Rush order for holiday season</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Buyer Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Contact Buyer</h3>
              <button
                onClick={() => setShowContactModal(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Enter message subject..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Enter your message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                  maxLength={500}
                />
              </div>
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={() => setShowContactModal(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Track Shipment Modal */}
      {showTrackingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Track Shipment</h3>
              <button
                onClick={() => setShowTrackingModal(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Tracking Number</span>
                  <span className="text-sm font-mono text-gray-900">1Z999AA1234567890</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Carrier</span>
                  <span className="text-sm text-gray-900">UPS</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Delivered</div>
                    <div className="text-xs text-gray-500">Jan 18, 2024 at 2:45 PM</div>
                    <div className="text-xs text-gray-600">Package delivered to front door</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Out for Delivery</div>
                    <div className="text-xs text-gray-500">Jan 18, 2024 at 8:30 AM</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">In Transit</div>
                    <div className="text-xs text-gray-500">Jan 17, 2024 at 11:20 PM</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Shipped</div>
                    <div className="text-xs text-gray-500">Jan 16, 2024 at 4:15 PM</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowTrackingModal(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
                  <i className="ri-external-link-line mr-2"></i>
                  View Full Tracking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
