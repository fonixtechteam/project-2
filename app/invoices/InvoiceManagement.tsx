'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InvoiceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    method: 'Credit Card',
    transactionId: '',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [reminderMessage, setReminderMessage] = useState('');

  const orders = [
    {
      id: 'ORD-2024-001',
      invoiceNumber: 'INV-2024-001',
      buyer: {
        name: 'Wellness Beauty Co.',
        logo: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional&width=40&height=40&seq=buyer-invoice-1&orientation=squarish',
        contactPerson: 'Sarah Johnson',
        email: 'sarah@wellnessbeauty.com',
        id: 'buyer-001'
      },
      brand: {
        name: 'Pure Essence',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare&width=40&height=40&seq=brand-invoice-1&orientation=squarish',
        id: 'brand-001'
      },
      orderDate: '2024-01-15',
      invoiceDate: '2024-01-15',
      dueDate: '2024-01-30',
      paidDate: '2024-01-28',
      items: [
        { name: 'Nourishing Face Oil', sku: 'NFO-001', quantity: 25, unitPrice: 45.00, totalPrice: 1125.00 },
        { name: 'Hydrating Essence', sku: 'HE-002', quantity: 30, unitPrice: 32.00, totalPrice: 960.00 },
        { name: 'Gentle Cleanser', sku: 'GC-003', quantity: 20, unitPrice: 28.00, totalPrice: 560.00 }
      ],
      subtotal: 2645.00,
      tax: 211.60,
      shipping: 25.00,
      discount: 0,
      totalValue: 2881.60,
      paymentStatus: 'paid',
      invoiceStatus: 'paid',
      orderStatus: 'completed',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-456789123',
      amountPaid: 2881.60,
      amountRemaining: 0,
      remindersSent: 0
    },
    {
      id: 'ORD-2024-002',
      invoiceNumber: 'INV-2024-002',
      buyer: {
        name: 'Beauty Boutique Paris',
        logo: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics&width=40&height=40&seq=buyer-invoice-2&orientation=squarish',
        contactPerson: 'Marie Dubois',
        email: 'marie@beautyboutiqueparis.com',
        id: 'buyer-002'
      },
      brand: {
        name: 'Botanica Natural',
        logo: 'https://readdy.ai/api/search-image?query=botanical%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics&width=40&height=40&seq=brand-invoice-2&orientation=squarish',
        id: 'brand-002'
      },
      orderDate: '2024-01-12',
      invoiceDate: '2024-01-12',
      dueDate: '2024-01-27',
      paidDate: null,
      items: [
        { name: 'Organic Toner', sku: 'OT-004', quantity: 40, unitPrice: 25.00, totalPrice: 1000.00 },
        { name: 'Natural Moisturizer', sku: 'NM-005', quantity: 35, unitPrice: 38.00, totalPrice: 1330.00 }
      ],
      subtotal: 2330.00,
      tax: 0,
      shipping: 0,
      discount: 0,
      totalValue: 2330.00,
      paymentStatus: 'pending',
      invoiceStatus: 'pending',
      orderStatus: 'shipped',
      paymentMethod: null,
      transactionId: null,
      amountPaid: 0,
      amountRemaining: 2330.00,
      remindersSent: 1
    },
    {
      id: 'ORD-2024-003',
      invoiceNumber: 'INV-2024-003',
      buyer: {
        name: 'Spa Essentials Pro',
        logo: 'https://readdy.ai/api/search-image?query=spa%20essentials%20professional%20logo%20calming%20blue%20purple%20design%20relaxation%20wellness&width=40&height=40&seq=buyer-invoice-3&orientation=squarish',
        contactPerson: 'David Chen',
        email: 'david@spaessentialspro.com',
        id: 'buyer-003'
      },
      brand: {
        name: 'Luxury Glow',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20glow%20beauty%20brand%20logo%20premium%20golden%20design%20high%20end%20cosmetics%20elegant&width=40&height=40&seq=brand-invoice-3&orientation=squarish',
        id: 'brand-003'
      },
      orderDate: '2024-01-10',
      invoiceDate: '2024-01-10',
      dueDate: '2024-01-05',
      paidDate: null,
      items: [
        { name: 'Premium Facial Mask', sku: 'PFM-006', quantity: 50, unitPrice: 15.00, totalPrice: 750.00 },
        { name: 'Anti-Aging Serum', sku: 'AAS-007', quantity: 25, unitPrice: 65.00, totalPrice: 1625.00 }
      ],
      subtotal: 2375.00,
      tax: 0,
      shipping: 0,
      discount: 0,
      totalValue: 2375.00,
      paymentStatus: 'overdue',
      invoiceStatus: 'overdue',
      orderStatus: 'completed',
      paymentMethod: null,
      transactionId: null,
      amountPaid: 0,
      amountRemaining: 2375.00,
      remindersSent: 3
    },
    {
      id: 'ORD-2024-004',
      invoiceNumber: null,
      buyer: {
        name: 'Pure Skin Solutions',
        logo: 'https://readdy.ai/api/search-image?query=skincare%20solutions%20company%20logo%20elegant%20blue%20design%20professional%20healthcare%20beauty&width=40&height=40&seq=buyer-invoice-4&orientation=squarish',
        contactPerson: 'Anna Rodriguez',
        email: 'anna@pureskinsolutions.com',
        id: 'buyer-004'
      },
      brand: {
        name: 'Pure Essence',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare&width=40&height=40&seq=brand-invoice-4&orientation=squarish',
        id: 'brand-001'
      },
      orderDate: '2024-01-08',
      invoiceDate: null,
      dueDate: null,
      paidDate: null,
      items: [
        { name: 'Vitamin C Serum', sku: 'VCS-008', quantity: 30, unitPrice: 42.00, totalPrice: 1260.00 },
        { name: 'Night Repair Cream', sku: 'NRC-009', quantity: 20, unitPrice: 55.00, totalPrice: 1100.00 }
      ],
      subtotal: 2360.00,
      tax: 188.80,
      shipping: 15.00,
      discount: 50.00,
      totalValue: 2513.80,
      paymentStatus: 'unpaid',
      invoiceStatus: 'not_generated',
      orderStatus: 'completed',
      paymentMethod: null,
      transactionId: null,
      amountPaid: 0,
      amountRemaining: 2513.80,
      remindersSent: 0
    },
    {
      id: 'ORD-2024-005',
      invoiceNumber: 'INV-2024-005',
      buyer: {
        name: 'Natural Glow Ltd',
        logo: 'https://readdy.ai/api/search-image?query=natural%20glow%20cosmetics%20company%20logo%20organic%20green%20design%20sustainable%20beauty%20brand&width=40&height=40&seq=buyer-invoice-5&orientation=squarish',
        contactPerson: 'James Wilson',
        email: 'james@naturalglow.ltd',
        id: 'buyer-005'
      },
      brand: {
        name: 'Botanica Natural',
        logo: 'https://readdy.ai/api/search-image?query=botanical%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics&width=40&height=40&seq=brand-invoice-5&orientation=squarish',
        id: 'brand-002'
      },
      orderDate: '2024-01-05',
      invoiceDate: '2024-01-05',
      dueDate: '2024-01-20',
      paidDate: '2024-01-15',
      items: [
        { name: 'Herbal Face Wash', sku: 'HFW-010', quantity: 60, unitPrice: 18.00, totalPrice: 1080.00 }
      ],
      subtotal: 1080.00,
      tax: 86.40,
      shipping: 15.00,
      discount: 50.00,
      totalValue: 1131.40,
      paymentStatus: 'partially_paid',
      invoiceStatus: 'partially_paid',
      orderStatus: 'completed',
      paymentMethod: 'Bank Transfer',
      transactionId: 'BT-789123456',
      amountPaid: 800.00,
      amountRemaining: 331.40,
      remindersSent: 1
    }
  ];

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'partially_paid':
        return 'bg-orange-100 text-orange-800';
      case 'not_generated':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatInvoiceStatus = (status: string) => {
    switch (status) {
      case 'not_generated':
        return 'Not Generated';
      case 'partially_paid':
        return 'Partially Paid';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.invoiceNumber && order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesOrderStatus = orderStatusFilter === 'all' || order.orderStatus === orderStatusFilter;
    const matchesPaymentStatus = paymentStatusFilter === 'all' || order.paymentStatus === paymentStatusFilter;
    const matchesInvoiceStatus = invoiceStatusFilter === 'all' || order.invoiceStatus === invoiceStatusFilter;
    return matchesSearch && matchesOrderStatus && matchesPaymentStatus && matchesInvoiceStatus;
  });

  const getInvoiceStats = () => {
    const totalInvoices = orders.filter(o => o.invoiceNumber).length;
    const paidInvoices = orders.filter(o => o.invoiceStatus === 'paid').length;
    const overdueInvoices = orders.filter(o => o.invoiceStatus === 'overdue').length;
    const pendingAmount = orders
      .filter(o => ['pending', 'overdue', 'partially_paid'].includes(o.invoiceStatus))
      .reduce((sum, order) => sum + order.amountRemaining, 0);

    return { totalInvoices, paidInvoices, overdueInvoices, pendingAmount };
  };

  const stats = getInvoiceStats();

  const handleViewInvoice = (order: any) => {
    setSelectedInvoice(order);
    setShowInvoiceModal(true);
  };

  const handleMarkAsPaid = (order: any) => {
    setSelectedInvoice(order);
    setPaymentDetails({
      amount: order.amountRemaining.toString(),
      method: 'Credit Card',
      transactionId: '',
      paymentDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowPaymentModal(true);
  };

  const handleSendReminder = (order: any) => {
    setSelectedInvoice(order);
    setReminderMessage(`Dear ${order.buyer.contactPerson},\n\nThis is a friendly reminder that your invoice ${order.invoiceNumber} for $${order.totalValue.toFixed(2)} is ${order.invoiceStatus === 'overdue' ? 'overdue' : 'pending payment'}.\n\nPlease process the payment at your earliest convenience.\n\nThank you for your business.`);
    setShowReminderModal(true);
  };

  const handleGenerateInvoice = (order: any) => {
    setSelectedInvoice(order);
    setShowGenerateModal(true);
  };

  const handleDownloadInvoice = (order: any) => {
    console.log('Downloading invoice:', order.invoiceNumber);
  };

  const handleSendInvoice = (order: any) => {
    console.log('Sending invoice:', order.invoiceNumber, 'to:', order.buyer.email);
  };

  const handlePaymentSubmit = () => {
    console.log('Processing payment:', paymentDetails);
    setShowPaymentModal(false);
    setPaymentDetails({ amount: '', method: 'Credit Card', transactionId: '', paymentDate: '', notes: '' });
  };

  const handleReminderSubmit = () => {
    console.log('Sending reminder to:', selectedInvoice?.buyer.email);
    setShowReminderModal(false);
    setReminderMessage('');
  };

  const handleGenerateSubmit = () => {
    console.log('Generating invoice for order:', selectedInvoice?.id);
    setShowGenerateModal(false);
  };

  const isOverdue = (dueDate: string | null) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="flex-1 overflow-auto">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600 mt-1">View, manage, and retrieve invoice information based on Order ID</p>
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
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
              <i className="ri-file-add-line mr-2"></i>
              Bulk Generate
            </button>
          </div>
        </div>
      </header>

      <main className="p-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats.totalInvoices}</div>
                <div className="text-sm text-gray-500">Total Invoices</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-bill-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-green-600">{stats.paidInvoices}</div>
                <div className="text-sm text-gray-500">Paid Invoices</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-double-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-red-600">{stats.overdueInvoices}</div>
                <div className="text-sm text-gray-500">Overdue Invoices</div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-alarm-warning-line text-red-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-orange-600">${stats.pendingAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Pending Amount</div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-orange-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search by Order ID, Invoice Number, Buyer, or Brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <select
              value={orderStatusFilter}
              onChange={(e) => setOrderStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">All Order Status</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">All Payment Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="partially_paid">Partially Paid</option>
            </select>

            <select
              value={invoiceStatusFilter}
              onChange={(e) => setInvoiceStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">All Invoice Status</option>
              <option value="not_generated">Not Generated</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="partially_paid">Partially Paid</option>
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

        {/* Orders/Invoices List */}
        {viewMode === 'table' ? (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Order ID</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Buyer / Brand</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Invoice Number</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Order Date</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Total Value</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Invoice Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <Link
                          href={`/orders/${order.id}`}
                          className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          {order.id}
                        </Link>
                        <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${getOrderStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.buyer.logo}
                            alt={`${order.buyer.name} logo`}
                            className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <Link
                              href={`/buyers/${order.buyer.id}`}
                              className="font-medium text-red-600 hover:text-red-700 cursor-pointer block truncate"
                            >
                              {order.buyer.name}
                            </Link>
                            <div className="text-xs text-gray-500 truncate">via {order.brand.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {order.invoiceNumber ? (
                          <button
                            onClick={() => handleViewInvoice(order)}
                            className="font-medium text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            {order.invoiceNumber}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleGenerateInvoice(order)}
                            className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                          >
                            Generate Invoice
                          </button>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700">{order.orderDate}</div>
                        {order.dueDate && (
                          <div className={`text-xs mt-1 ${isOverdue(order.dueDate) ? 'text-red-600' : 'text-gray-500'}`}>
                            Due: {order.dueDate}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">${order.totalValue.toFixed(2)}</div>
                        {order.amountRemaining > 0 && (
                          <div className="text-xs text-orange-600 mt-1">
                            Remaining: ${order.amountRemaining.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInvoiceStatusColor(order.invoiceStatus)}`}>
                          {formatInvoiceStatus(order.invoiceStatus)}
                        </span>
                        {order.remindersSent > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            {order.remindersSent} reminder(s) sent
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {order.invoiceNumber ? (
                            <>
                              <button
                                onClick={() => handleViewInvoice(order)}
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                title="View Invoice"
                              >
                                <i className="ri-eye-line text-lg"></i>
                              </button>
                              <button
                                onClick={() => handleDownloadInvoice(order)}
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                title="Download Invoice"
                              >
                                <i className="ri-download-line text-lg"></i>
                              </button>
                              {['pending', 'overdue', 'partially_paid'].includes(order.invoiceStatus) && (
                                <>
                                  <button
                                    onClick={() => handleMarkAsPaid(order)}
                                    className="w-8 h-8 flex items-center justify-center text-green-400 hover:text-green-600 cursor-pointer"
                                    title="Mark as Paid"
                                  >
                                    <i className="ri-money-dollar-circle-line text-lg"></i>
                                  </button>
                                  <button
                                    onClick={() => handleSendReminder(order)}
                                    className="w-8 h-8 flex items-center justify-center text-yellow-400 hover:text-yellow-600 cursor-pointer"
                                    title="Send Reminder"
                                  >
                                    <i className="ri-notification-line text-lg"></i>
                                  </button>
                                </>
                              )}
                            </>
                          ) : (
                            <button
                              onClick={() => handleGenerateInvoice(order)}
                              className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 whitespace-nowrap cursor-pointer"
                            >
                              Generate
                            </button>
                          )}
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
                  <div>
                    <Link
                      href={`/orders/${order.id}`}
                      className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      {order.id}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">
                      {order.invoiceNumber ? (
                        <button
                          onClick={() => handleViewInvoice(order)}
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          {order.invoiceNumber}
                        </button>
                      ) : (
                        <span className="text-gray-400">No invoice generated</span>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInvoiceStatusColor(order.invoiceStatus)}`}>
                    {formatInvoiceStatus(order.invoiceStatus)}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={order.buyer.logo}
                    alt={`${order.buyer.name} logo`}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <Link
                      href={`/buyers/${order.buyer.id}`}
                      className="text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      {order.buyer.name}
                    </Link>
                    <div className="text-xs text-gray-500">via {order.brand.name}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Order Date</div>
                    <div className="font-medium text-gray-900">{order.orderDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Total Value</div>
                    <div className="font-bold text-gray-900">${order.totalValue.toFixed(2)}</div>
                  </div>
                </div>

                {order.amountRemaining > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-orange-700">
                      <i className="ri-money-dollar-circle-line text-sm"></i>
                      <span className="text-sm font-medium">Remaining: ${order.amountRemaining.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  {order.invoiceNumber ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewInvoice(order)}
                        className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 whitespace-nowrap cursor-pointer"
                      >
                        View Invoice
                      </button>
                      {['pending', 'overdue', 'partially_paid'].includes(order.invoiceStatus) && (
                        <button
                          onClick={() => handleMarkAsPaid(order)}
                          className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 whitespace-nowrap cursor-pointer"
                        >
                          Mark Paid
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleGenerateInvoice(order)}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                    >
                      Generate Invoice
                    </button>
                  )}
                  
                  <div className="flex items-center gap-1">
                    {order.invoiceNumber && (
                      <>
                        <button
                          onClick={() => handleDownloadInvoice(order)}
                          className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                          title="Download"
                        >
                          <i className="ri-download-line"></i>
                        </button>
                        {['pending', 'overdue', 'partially_paid'].includes(order.invoiceStatus) && (
                          <button
                            onClick={() => handleSendReminder(order)}
                            className="p-2 text-yellow-400 hover:text-yellow-600 cursor-pointer"
                            title="Send Reminder"
                          >
                            <i className="ri-notification-line"></i>
                          </button>
                        )}
                      </>
                    )}
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

      {/* Invoice Detail Modal */}
      {showInvoiceModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Invoice Details</h3>
                  <p className="text-sm text-gray-500">{selectedInvoice.invoiceNumber}</p>
                </div>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Invoice Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Invoice Summary</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                    <p className="text-gray-900">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                    <Link
                      href={`/orders/${selectedInvoice.id}`}
                      className="text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      {selectedInvoice.id}
                    </Link>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                    <input
                      type="date"
                      value={selectedInvoice.invoiceDate}
                      className="text-gray-900 border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={selectedInvoice.dueDate || ''}
                      className="text-gray-900 border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Product Name</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">SKU</th>
                        <th className="text-center py-2 px-3 text-sm font-medium text-gray-700">Quantity</th>
                        <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">Unit Price</th>
                        <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">Total Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedInvoice.items.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="py-3 px-3 text-sm text-gray-900">{item.name}</td>
                          <td className="py-3 px-3 text-sm text-gray-500">{item.sku}</td>
                          <td className="py-3 px-3 text-sm text-gray-900 text-center">{item.quantity}</td>
                          <td className="py-3 px-3 text-sm text-gray-900 text-right">${item.unitPrice.toFixed(2)}</td>
                          <td className="py-3 px-3 text-sm text-gray-900 text-right font-medium">${item.totalPrice.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-900">${selectedInvoice.subtotal.toFixed(2)}</span>
                    </div>
                    {selectedInvoice.shipping > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="text-gray-900">${selectedInvoice.shipping.toFixed(2)}</span>
                      </div>
                    )}
                    {selectedInvoice.tax > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax:</span>
                        <span className="text-gray-900">${selectedInvoice.tax.toFixed(2)}</span>
                      </div>
                    )}
                    {selectedInvoice.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount:</span>
                        <span className="text-green-600">-${selectedInvoice.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                      <span className="text-gray-900">Total Amount:</span>
                      <span className="text-gray-900">${selectedInvoice.totalValue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Payment Information</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getInvoiceStatusColor(selectedInvoice.invoiceStatus)}`}>
                      {formatInvoiceStatus(selectedInvoice.invoiceStatus)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select
                      value={selectedInvoice.paymentMethod || ''}
                      className="border border-gray-300 rounded px-2 py-1 text-sm pr-8"
                    >
                      <option value="">Select Method</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Check">Check</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
                    <p className="text-gray-900">${selectedInvoice.amountPaid.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount Remaining</label>
                    <p className={`font-medium ${selectedInvoice.amountRemaining > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      ${selectedInvoice.amountRemaining.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDownloadInvoice(selectedInvoice)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-download-line mr-2"></i>
                  Download PDF
                </button>
                <button
                  onClick={() => handleSendInvoice(selectedInvoice)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-mail-send-line mr-2"></i>
                  Send Invoice
                </button>
                {['pending', 'overdue', 'partially_paid'].includes(selectedInvoice.invoiceStatus) && (
                  <>
                    <button
                      onClick={() => {
                        setShowInvoiceModal(false);
                        handleMarkAsPaid(selectedInvoice);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-money-dollar-circle-line mr-2"></i>
                      Mark as Paid
                    </button>
                    <button
                      onClick={() => {
                        setShowInvoiceModal(false);
                        handleSendReminder(selectedInvoice);
                      }}
                      className="px-4 py-2 text-sm font-medium text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-50 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-notification-line mr-2"></i>
                      Send Reminder
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mark as Paid Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Record Payment</h3>
            <p className="text-gray-600 mb-4">
              Record payment for invoice {selectedInvoice.invoiceNumber}
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={paymentDetails.amount}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  value={paymentDetails.method}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, method: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Check">Check</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                <input
                  type="text"
                  value={paymentDetails.transactionId}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionId: e.target.value })}
                  placeholder="Enter transaction ID..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                <input
                  type="date"
                  value={paymentDetails.paymentDate}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={paymentDetails.notes}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, notes: e.target.value })}
                  rows={3}
                  placeholder="Add payment notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  maxLength={200}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-check-line mr-2"></i>
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Reminder Modal */}
      {showReminderModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Send Payment Reminder</h3>
            <p className="text-gray-600 mb-4">
              Send a payment reminder to {selectedInvoice.buyer.contactPerson} for invoice {selectedInvoice.invoiceNumber}:
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Message</label>
                <textarea
                  value={reminderMessage}
                  onChange={(e) => setReminderMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  maxLength={500}
                />
              </div>
              <div className="text-xs text-gray-500">
                Previous reminders sent: {selectedInvoice.remindersSent}
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => setShowReminderModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReminderSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Invoice Modal */}
      {showGenerateModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Invoice</h3>
            <p className="text-gray-600 mb-4">
              Generate invoice for order {selectedInvoice.id}:
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  defaultValue={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8">
                  <option value="net15">Net 15 days</option>
                  <option value="net30">Net 30 days</option>
                  <option value="net45">Net 45 days</option>
                  <option value="net60">Net 60 days</option>
                  <option value="due_on_receipt">Due on receipt</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-file-add-line mr-2"></i>
                Generate Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}