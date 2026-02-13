
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BillingManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showMarkPaidModal, setShowMarkPaidModal] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    transactionId: '',
    paymentDate: '',
    paymentMethod: '',
    notes: ''
  });

  const invoices = [
    {
      id: 'INV-2024-001',
      invoiceId: 'INV-2024-001',
      orderId: 'ORD-2024-001',
      buyerName: 'Wellness Beauty Co.',
      buyerCompany: 'Wellness Beauty Co.',
      buyerLogo: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional&width=40&height=40&seq=buyer-billing-1&orientation=squarish',
      brandName: 'Pure Essence',
      buyer: {
        name: 'Wellness Beauty Co.',
        company: 'Wellness Beauty Co.',
        logo: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional&width=40&height=40&seq=buyer-billing-1&orientation=squarish',
        contactPerson: 'Sarah Johnson',
        email: 'sarah@wellnessbeauty.com',
        phone: '+1 (555) 123-4567',
        id: 'buyer-001'
      },
      brand: {
        name: 'Pure Essence',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare&width=40&height=40&seq=brand-billing-1&orientation=squarish'
      },
      invoiceDate: '2024-01-15',
      dueDate: '2024-01-30',
      paidDate: '2024-01-28',
      amount: 2881.60,
      paymentStatus: 'paid',
      invoiceStatus: 'paid',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-456789123',
      items: [
        { name: 'Nourishing Face Oil', quantity: 25, unitPrice: 45.00, totalPrice: 1125.00 },
        { name: 'Hydrating Essence', quantity: 30, unitPrice: 32.00, totalPrice: 960.00 },
        { name: 'Gentle Cleanser', quantity: 20, unitPrice: 28.00, totalPrice: 560.00 }
      ],
      subtotal: 2645.00,
      tax: 211.60,
      shipping: 25.00,
      discount: 0,
      remindersSent: 0
    },
    {
      id: 'INV-2024-002',
      invoiceId: 'INV-2024-002',
      orderId: 'ORD-2024-002',
      buyerName: 'Beauty Boutique Paris',
      buyerCompany: 'Beauty Boutique Paris',
      buyerLogo: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics&width=40&height=40&seq=buyer-billing-2&orientation=squarish',
      brandName: 'Botanica Natural',
      buyer: {
        name: 'Beauty Boutique Paris',
        company: 'Beauty Boutique Paris',
        logo: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics&width=40&height=40&seq=buyer-billing-2&orientation=squarish',
        contactPerson: 'Marie Dubois',
        email: 'marie@beautyboutiqueparis.com',
        phone: '+33 1 23 45 67 89',
        id: 'buyer-002'
      },
      brand: {
        name: 'Botanica Natural',
        logo: 'https://readdy.ai/api/search-image?query=botanical%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics&width=40&height=40&seq=brand-billing-2&orientation=squarish'
      },
      invoiceDate: '2024-01-12',
      dueDate: '2024-01-27',
      paidDate: null,
      amount: 2330.00,
      paymentStatus: 'pending',
      invoiceStatus: 'sent',
      paymentMethod: null,
      transactionId: null,
      items: [
        { name: 'Organic Toner', quantity: 40, unitPrice: 25.00, totalPrice: 1000.00 },
        { name: 'Natural Moisturizer', quantity: 35, unitPrice: 38.00, totalPrice: 1330.00 }
      ],
      subtotal: 2330.00,
      tax: 0,
      shipping: 0,
      discount: 0,
      remindersSent: 1
    },
    {
      id: 'INV-2024-003',
      invoiceId: 'INV-2024-003',
      orderId: 'ORD-2024-003',
      buyerName: 'Spa Essentials Pro',
      buyerCompany: 'Spa Essentials Pro',
      buyerLogo: 'https://readdy.ai/api/search-image?query=spa%20essentials%20professional%20logo%20calming%20blue%20purple%20design%20relaxation%20wellness&width=40&height=40&seq=buyer-billing-3&orientation=squarish',
      brandName: 'Luxury Glow',
      buyer: {
        name: 'Spa Essentials Pro',
        company: 'Spa Essentials Pro',
        logo: 'https://readdy.ai/api/search-image?query=spa%20essentials%20professional%20logo%20calming%20blue%20purple%20design%20relaxation%20wellness&width=40&height=40&seq=buyer-billing-3&orientation=squarish',
        contactPerson: 'David Chen',
        email: 'david@spaessentialspro.com',
        phone: '+61 2 1234 5678',
        id: 'buyer-003'
      },
      brand: {
        name: 'Luxury Glow',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20glow%20beauty%20brand%20logo%20premium%20golden%20design%20high%20end%20cosmetics%20elegant&width=40&height=40&seq=brand-billing-3&orientation=squarish'
      },
      invoiceDate: '2024-01-10',
      dueDate: '2024-01-05',
      paidDate: null,
      amount: 2375.00,
      paymentStatus: 'overdue',
      invoiceStatus: 'overdue',
      paymentMethod: null,
      transactionId: null,
      items: [
        { name: 'Premium Facial Mask', quantity: 50, unitPrice: 15.00, totalPrice: 750.00 },
        { name: 'Anti-Aging Serum', quantity: 25, unitPrice: 65.00, totalPrice: 1625.00 }
      ],
      subtotal: 2375.00,
      tax: 0,
      shipping: 0,
      discount: 0,
      remindersSent: 3
    },
    {
      id: 'INV-2024-004',
      invoiceId: 'INV-2024-004',
      orderId: 'ORD-2024-004',
      buyerName: 'Pure Skin Solutions',
      buyerCompany: 'Pure Skin Solutions',
      buyerLogo: 'https://readdy.ai/api/search-image?query=skincare%20solutions%20company%20logo%20elegant%20blue%20design%20professional%20healthcare%20beauty&width=40&height=40&seq=buyer-billing-4&orientation=squarish',
      brandName: 'Pure Essence',
      buyer: {
        name: 'Pure Skin Solutions',
        company: 'Pure Skin Solutions',
        logo: 'https://readdy.ai/api/search-image?query=skincare%20solutions%20company%20logo%20elegant%20blue%20design%20professional%20healthcare%20beauty&width=40&height=40&seq=buyer-billing-4&orientation=squarish',
        contactPerson: 'Anna Rodriguez',
        email: 'anna@pureskinsolutions.com',
        phone: '+1 (416) 555-0123',
        id: 'buyer-004'
      },
      brand: {
        name: 'Pure Essence',
        logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare&width=40&height=40&seq=brand-billing-4&orientation=squarish'
      },
      invoiceDate: '2024-01-08',
      dueDate: '2024-01-23',
      paidDate: null,
      amount: 2360.00,
      paymentStatus: 'unpaid',
      invoiceStatus: 'generated',
      paymentMethod: null,
      transactionId: null,
      items: [
        { name: 'Vitamin C Serum', quantity: 30, unitPrice: 42.00, totalPrice: 1260.00 },
        { name: 'Night Repair Cream', quantity: 20, unitPrice: 55.00, totalPrice: 1100.00 }
      ],
      subtotal: 2360.00,
      tax: 0,
      shipping: 0,
      discount: 0,
      remindersSent: 0
    },
    {
      id: 'INV-2024-005',
      invoiceId: 'INV-2024-005',
      orderId: 'ORD-2024-005',
      buyerName: 'Natural Glow Ltd',
      buyerCompany: 'Natural Glow Ltd',
      buyerLogo: 'https://readdy.ai/api/search-image?query=natural%20glow%20cosmetics%20company%20logo%20organic%20green%20design%20sustainable%20beauty%20brand&width=40&height=40&seq=buyer-billing-5&orientation=squarish',
      brandName: 'Botanica Natural',
      buyer: {
        name: 'Natural Glow Ltd',
        company: 'Natural Glow Ltd',
        logo: 'https://readdy.ai/api/search-image?query=natural%20glow%20cosmetics%20company%20logo%20organic%20green%20design%20sustainable%20beauty%20brand&width=40&height=40&seq=buyer-billing-5&orientation=squarish',
        contactPerson: 'James Wilson',
        email: 'james@naturalglow.ltd',
        phone: '+44 20 1234 5678',
        id: 'buyer-005'
      },
      brand: {
        name: 'Botanica Natural',
        logo: 'https://readdy.ai/api/search-image?query=botanical%20natural%20brand%20logo%20green%20leaf%20design%20organic%20beauty%20sustainable%20cosmetics&width=40&height=40&seq=brand-billing-5&orientation=squarish'
      },
      invoiceDate: '2024-01-05',
      dueDate: '2024-01-20',
      paidDate: '2024-01-15',
      amount: 1565.60,
      paymentStatus: 'partially_paid',
      invoiceStatus: 'partially_paid',
      paymentMethod: 'Bank Transfer',
      transactionId: 'BT-789123456',
      items: [
        { name: 'Herbal Face Wash', quantity: 60, unitPrice: 18.00, totalPrice: 1080.00 }
      ],
      subtotal: 1080.00,
      tax: 86.40,
      shipping: 15.00,
      discount: 50.00,
      remindersSent: 1,
      partialPayments: [
        { amount: 800.00, date: '2024-01-15', method: 'Bank Transfer', transactionId: 'BT-789123456' }
      ]
    }
  ];

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'partially_paid':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'generated':
        return 'bg-gray-100 text-gray-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'partially_paid':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPaymentStatus = paymentStatusFilter === 'all' || invoice.paymentStatus === paymentStatusFilter;
    const matchesInvoiceStatus = invoiceStatusFilter === 'all' || invoice.invoiceStatus === invoiceStatusFilter;
    return matchesSearch && matchesPaymentStatus && matchesInvoiceStatus;
  });

  const getBillingStats = () => {
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(i => i.paymentStatus === 'paid').length;
    const overdueInvoices = invoices.filter(i => i.paymentStatus === 'overdue').length;
    const totalRevenue = invoices
      .filter(i => i.paymentStatus === 'paid')
      .reduce((sum, invoice) => sum + invoice.amount, 0);
    const pendingAmount = invoices
      .filter(i => ['pending', 'unpaid', 'overdue'].includes(i.paymentStatus))
      .reduce((sum, invoice) => sum + invoice.amount, 0);

    return { totalInvoices, paidInvoices, overdueInvoices, totalRevenue, pendingAmount };
  };

  const stats = getBillingStats();

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  const handleSendReminder = (invoice: any) => {
    setSelectedInvoice(invoice);
    setReminderMessage(`Dear ${invoice.buyer.contactPerson},\n\nThis is a friendly reminder that your invoice ${invoice.id} for $${invoice.amount.toFixed(2)} is ${invoice.paymentStatus === 'overdue' ? 'overdue' : 'pending payment'}.\n\nPlease process the payment at your earliest convenience.\n\nThank you for your business.`);
    setShowReminderModal(true);
  };

  const handleMarkAsPaid = (invoice: any) => {
    setSelectedInvoice(invoice);
    setPaymentDetails({
      transactionId: '',
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'Credit Card',
      notes: ''
    });
    setShowMarkPaidModal(true);
  };

  const handleSendReminderSubmit = () => {
    console.log('Sending reminder to:', selectedInvoice?.buyer.email);
    console.log('Message:', reminderMessage);
    setShowReminderModal(false);
    setReminderMessage('');
  };

  const handleMarkPaidSubmit = () => {
    console.log('Marking invoice as paid:', selectedInvoice?.id);
    console.log('Payment details:', paymentDetails);
    setShowMarkPaidModal(false);
    setPaymentDetails({ transactionId: '', paymentDate: '', paymentMethod: '', notes: '' });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Downloading invoice:', invoiceId);
  };

  const handleSendInvoice = (invoice: any) => {
    console.log('Sending invoice:', invoice.id, 'to:', invoice.buyer.email);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date().toISOString().split('T')[0] > dueDate;
  };

  const formatPaymentStatus = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'unpaid':
        return 'Unpaid';
      case 'overdue':
        return 'Overdue';
      case 'partially_paid':
        return 'Partially Paid';
      default:
        return status;
    }
  };

  const formatInvoiceStatus = (status: string) => {
    switch (status) {
      case 'generated':
        return 'Generated';
      case 'sent':
        return 'Sent';
      case 'paid':
        return 'Paid';
      case 'overdue':
        return 'Overdue';
      case 'partially_paid':
        return 'Partially Paid';
      default:
        return status;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Billing & Invoices</h1>
            <p className="text-gray-600 mt-1">Manage invoices, track payments, and billing history across your marketplace</p>
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
              Generate Invoice
            </button>
          </div>
        </div>
      </header>

      <main className="p-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-6 mb-8">
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
                <div className="text-2xl font-semibold text-green-600">${stats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
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

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search by Invoice ID, Buyer, or Order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">All Payment Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="unpaid">Unpaid</option>
              <option value="overdue">Overdue</option>
              <option value="partially_paid">Partially Paid</option>
            </select>

            <select
              value={invoiceStatusFilter}
              onChange={(e) => setInvoiceStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">All Invoice Status</option>
              <option value="generated">Generated</option>
              <option value="sent">Sent</option>
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

        {/* Invoices List */}
        {viewMode === 'table' ? (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Invoice ID</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Buyer / Brand</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Order ID</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Invoice Date</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Amount</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Payment Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleViewInvoice(invoice)}
                          className="font-medium text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          {invoice.invoiceId}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={invoice.buyerLogo}
                            alt={`${invoice.buyerName} logo`}
                            className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 truncate">{invoice.buyerName}</div>
                            <div className="text-sm text-gray-500 truncate">{invoice.buyerCompany}</div>
                            <div className="text-xs text-red-600 truncate">via {invoice.brandName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleViewOrder(invoice.orderId)}
                          className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          {invoice.orderId}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700">{invoice.invoiceDate}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{invoice.amount}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(invoice.paymentStatus)}`}>
                          {invoice.paymentStatus}
                        </span>
                        {invoice.paymentStatus === 'Overdue' && (
                          <div className="text-xs text-red-600 mt-1">
                            Due: {invoice.dueDate}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewInvoice(invoice)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                            title="View Invoice"
                          >
                            <i className="ri-eye-line text-lg"></i>
                          </button>
                          <button
                            onClick={() => handleDownloadInvoice(invoice)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                            title="Download Invoice"
                          >
                            <i className="ri-download-line text-lg"></i>
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
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <button
                      onClick={() => handleViewInvoice(invoice)}
                      className="font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      {invoice.invoiceId}
                    </button>
                    <div className="text-sm text-gray-500 mt-1">
                      Order: <Link href={`/orders/${invoice.orderId}`} className="text-blue-600 hover:text-blue-700 cursor-pointer">{invoice.orderId}</Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(invoice.paymentStatus)}`}>
                      {invoice.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={invoice.buyerLogo}
                    alt={`${invoice.buyerName} logo`}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <Link
                      href={`/buyers/${invoice.buyer.id}`}
                      className="text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      {invoice.buyerName}
                    </Link>
                    <div className="text-xs text-gray-500">{invoice.buyerCompany}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Invoice Date</div>
                    <div className="font-medium text-gray-900">{invoice.invoiceDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Amount</div>
                    <div className="font-bold text-gray-900">${invoice.amount.toFixed(2)}</div>
                  </div>
                </div>

                {isOverdue(invoice.dueDate) && invoice.paymentStatus !== 'paid' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-red-700">
                      <i className="ri-alarm-warning-line text-sm"></i>
                      <span className="text-sm font-medium">Overdue since {invoice.dueDate}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleViewInvoice(invoice)}
                    className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer"
                  >
                    View Details
                  </button>
                  <div className="flex items-center gap-1">
                    {invoice.invoiceStatus === 'generated' && (
                      <button
                        onClick={() => handleSendInvoice(invoice)}
                        className="p-2 text-blue-400 hover:text-blue-600 cursor-pointer"
                        title="Send Invoice"
                      >
                        <i className="ri-mail-send-line"></i>
                      </button>
                    )}
                    {['pending', 'unpaid', 'overdue'].includes(invoice.paymentStatus) && (
                      <>
                        <button
                          onClick={() => handleSendReminder(invoice)}
                          className="p-2 text-yellow-400 hover:text-yellow-600 cursor-pointer"
                          title="Send Reminder"
                        >
                          <i className="ri-notification-line"></i>
                        </button>
                        <button
                          onClick={() => handleMarkAsPaid(invoice)}
                          className="p-2 text-green-400 hover:text-green-600 cursor-pointer"
                          title="Mark as Paid"
                        >
                          <i className="ri-check-line"></i>
                        </button>
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
            Showing {filteredInvoices.length} of {invoices.length} invoices
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
                  <p className="text-sm text-gray-500">{selectedInvoice.id}</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice ID</label>
                    <p className="text-gray-900">{selectedInvoice.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                    <Link
                      href={`/orders/${selectedInvoice.orderId}`}
                      className="text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      {selectedInvoice.orderId}
                    </Link>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                    <p className="text-gray-900">{selectedInvoice.invoiceDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <p className={`${isOverdue(selectedInvoice.dueDate) && selectedInvoice.paymentStatus !== 'paid' ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                      {selectedInvoice.dueDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buyer Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Buyer Information</h4>
                <div className="flex items-start gap-4">
                  <img
                    src={selectedInvoice.buyer.logo}
                    alt={`${selectedInvoice.buyer.name} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <Link
                      href={`/buyers/${selectedInvoice.buyer.id}`}
                      className="text-lg font-medium text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      {selectedInvoice.buyerName}
                    </Link>
                    <div className="space-y-1 mt-2">
                      <div className="text-sm text-gray-600">
                        <i className="ri-user-line mr-2"></i>
                        {selectedInvoice.buyer.contactPerson}
                      </div>
                      <div className="text-sm text-gray-600">
                        <i className="ri-mail-line mr-2"></i>
                        {selectedInvoice.buyer.email}
                      </div>
                      <div className="text-sm text-gray-600">
                        <i className="ri-phone-line mr-2"></i>
                        {selectedInvoice.buyer.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Payment Information</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(selectedInvoice.paymentStatus)}`}>
                      {formatPaymentStatus(selectedInvoice.paymentStatus)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <p className="text-gray-900">{selectedInvoice.paymentMethod || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                    <p className="text-gray-900 font-mono text-sm">{selectedInvoice.transactionId || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                    <p className="text-gray-900">{selectedInvoice.paidDate || 'Not paid'}</p>
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
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Product</th>
                        <th className="text-center py-2 px-3 text-sm font-medium text-gray-700">Quantity</th>
                        <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">Unit Price</th>
                        <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedInvoice.items.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="py-3 px-3 text-sm text-gray-900">{item.name}</td>
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
                      <span className="text-gray-900">Total:</span>
                      <span className="text-gray-900">${selectedInvoice.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partial Payments */}
              {selectedInvoice.partialPayments && selectedInvoice.partialPayments.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Payment History</h4>
                  <div className="space-y-3">
                    {selectedInvoice.partialPayments.map((payment: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">${payment.amount.toFixed(2)}</div>
                          <div className="text-sm text-gray-600">{payment.method} • {payment.date}</div>
                        </div>
                        <div className="text-sm text-gray-600 font-mono">{payment.transactionId}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDownloadInvoice(selectedInvoice.id)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-download-line mr-2"></i>
                  Download PDF
                </button>
                {selectedInvoice.invoiceStatus === 'generated' && (
                  <button
                    onClick={() => handleSendInvoice(selectedInvoice)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-mail-send-line mr-2"></i>
                    Send Invoice
                  </button>
                )}
                {['pending', 'unpaid', 'overdue'].includes(selectedInvoice.paymentStatus) && (
                  <>
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
                    <button
                      onClick={() => {
                        setShowInvoiceModal(false);
                        handleMarkAsPaid(selectedInvoice);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-check-line mr-2"></i>
                      Mark as Paid
                    </button>
                  </>
                )}
              </div>
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
              Send a payment reminder to {selectedInvoice.buyer.contactPerson} for invoice {selectedInvoice.id}:
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Message</label>
                <textarea
                  value={reminderMessage}
                  onChange={(e) => setReminderMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
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
                onClick={handleSendReminderSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark as Paid Modal */}
      {showMarkPaidModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mark Invoice as Paid</h3>
            <p className="text-gray-600 mb-4">
              Mark invoice {selectedInvoice.id} for ${selectedInvoice.amount.toFixed(2)} as paid:
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                <input
                  type="text"
                  value={paymentDetails.transactionId}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, transactionId: e.target.value })}
                  placeholder="Enter transaction ID..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                <input
                  type="date"
                  value={paymentDetails.paymentDate}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  value={paymentDetails.paymentMethod}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Check">Check</option>
                  <option value="Cash">Cash</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={paymentDetails.notes}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, notes: e.target.value })}
                  rows={3}
                  placeholder="Add any additional notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                  maxLength={200}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => setShowMarkPaidModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkPaidSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-check-line mr-2"></i>
                Mark as Paid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
