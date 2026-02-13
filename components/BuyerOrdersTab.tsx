'use client';

import { useState } from 'react';

interface BuyerOrdersTabProps {
  buyerData: any;
}

export default function BuyerOrdersTab({ buyerData }: BuyerOrdersTabProps) {
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDrawer, setShowOrderDrawer] = useState(false);

  const orders = [
    {
      id: 'ORD-2024-156',
      brand: 'Pure Essence',
      brandLogo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare&width=40&height=40&seq=brand-order-1&orientation=squarish',
      date: '2024-01-15',
      items: ['Nourishing Face Oil', 'Hydrating Essence', 'Gentle Cleanser'],
      itemCount: 3,
      total: '$2,450.00',
      status: 'Delivered',
      invoice: {
        id: 'INV-2024-156',
        status: 'Paid',
        dueDate: '2024-01-30',
        paidDate: '2024-01-28'
      },
      shipping: {
        address: '123 Beauty Street, Los Angeles, CA 90210',
        method: 'Express Shipping',
        tracking: 'UPS123456789'
      }
    },
    {
      id: 'ORD-2024-142',
      brand: 'Botanica Natural',
      brandLogo: 'https://readdy.ai/api/search-image?query=botanical%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics&width=40&height=40&seq=brand-order-2&orientation=squarish',
      date: '2024-01-12',
      items: ['Organic Toner', 'Natural Moisturizer'],
      itemCount: 2,
      total: '$1,890.00',
      status: 'Shipped',
      invoice: {
        id: 'INV-2024-142',
        status: 'Paid',
        dueDate: '2024-01-27',
        paidDate: '2024-01-25'
      },
      shipping: {
        address: '123 Beauty Street, Los Angeles, CA 90210',
        method: 'Standard Shipping',
        tracking: 'FDX987654321'
      }
    },
    {
      id: 'ORD-2024-128',
      brand: 'Pure Essence',
      brandLogo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare&width=40&height=40&seq=brand-order-3&orientation=squarish',
      date: '2024-01-08',
      items: ['Vitamin C Serum', 'Night Repair Cream', 'Eye Treatment', 'Lip Balm'],
      itemCount: 4,
      total: '$3,200.00',
      status: 'Processing',
      invoice: {
        id: 'INV-2024-128',
        status: 'Pending',
        dueDate: '2024-01-23',
        paidDate: null
      },
      shipping: {
        address: '123 Beauty Street, Los Angeles, CA 90210',
        method: 'Express Shipping',
        tracking: null
      }
    },
    {
      id: 'ORD-2023-445',
      brand: 'Luxury Glow',
      brandLogo: 'https://readdy.ai/api/search-image?query=luxury%20glow%20beauty%20brand%20logo%20premium%20golden%20design%20high%20end%20cosmetics%20elegant&width=40&height=40&seq=brand-order-4&orientation=squarish',
      date: '2023-12-20',
      items: ['Premium Facial Mask'],
      itemCount: 1,
      total: '$890.00',
      status: 'Delivered',
      invoice: {
        id: 'INV-2023-445',
        status: 'Paid',
        dueDate: '2024-01-04',
        paidDate: '2024-01-02'
      },
      shipping: {
        address: '123 Beauty Street, Los Angeles, CA 90210',
        method: 'Standard Shipping',
        tracking: 'UPS445667788'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === '30days' && new Date(order.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === '90days' && new Date(order.date) >= new Date(Date.now() - 90 * 24 * 60 * 60 * 1000));
    return matchesStatus && matchesDate;
  });

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDrawer(true);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Downloading invoice:', invoiceId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Orders & Invoices</h3>
          <p className="text-sm text-gray-500 mt-1">Track orders and manage invoices for this buyer</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
          >
            <option value="all">All Time</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
          >
            <option value="all">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Brand</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Items</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Invoice</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.brandLogo}
                        alt={`${order.brand} logo`}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <span className="text-sm text-gray-900">{order.brand}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{order.date}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <span className="text-sm text-gray-900">{order.itemCount} items</span>
                      <div className="text-xs text-gray-500 mt-1">
                        {order.items.slice(0, 2).join(', ')}
                        {order.items.length > 2 && ` +${order.items.length - 2} more`}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{order.total}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-900">{order.invoice.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInvoiceStatusColor(order.invoice.status)}`}>
                          {order.invoice.status}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDownloadInvoice(order.invoice.id)}
                        className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        Download
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleViewOrder(order)}
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
      </div>

      {/* Order Details Drawer */}
      {showOrderDrawer && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
                  <p className="text-sm text-gray-500">{selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => setShowOrderDrawer(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
                    <p className="text-gray-900">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedOrder.brandLogo}
                        alt={`${selectedOrder.brand} logo`}
                        className="w-6 h-6 rounded object-cover"
                      />
                      <span className="text-gray-900">{selectedOrder.brand}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                    <p className="text-gray-900 font-medium">{selectedOrder.total}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">{item}</span>
                      <span className="text-sm text-gray-500">Qty: 1</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Shipping Information</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                    <p className="text-gray-900">{selectedOrder.shipping.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Method</label>
                    <p className="text-gray-900">{selectedOrder.shipping.method}</p>
                  </div>
                  {selectedOrder.shipping.tracking && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                      <p className="text-gray-900 font-mono">{selectedOrder.shipping.tracking}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Invoice Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Invoice Information</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Invoice ID:</span>
                    <span className="text-gray-900">{selectedOrder.invoice.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInvoiceStatusColor(selectedOrder.invoice.status)}`}>
                      {selectedOrder.invoice.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Due Date:</span>
                    <span className="text-gray-900">{selectedOrder.invoice.dueDate}</span>
                  </div>
                  {selectedOrder.invoice.paidDate && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Paid Date:</span>
                      <span className="text-gray-900">{selectedOrder.invoice.paidDate}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownloadInvoice(selectedOrder.invoice.id)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-download-line mr-2"></i>
                  Download Invoice
                </button>
                {selectedOrder.shipping.tracking && (
                  <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 whitespace-nowrap cursor-pointer">
                    <i className="ri-truck-line mr-2"></i>
                    Track Package
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}