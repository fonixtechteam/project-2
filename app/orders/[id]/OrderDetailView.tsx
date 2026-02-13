
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';

interface OrderDetailViewProps {
  orderId: string;
}

export default function OrderDetailView({ orderId }: OrderDetailViewProps) {
  const [activeTab, setActiveTab] = useState('summary');
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [activeChatTab, setActiveChatTab] = useState('brand');

  // Mock order data - in real app, this would come from API/database
  const orderData = {
    id: orderId,
    buyer: {
      name: 'Wellness Beauty Co.',
      logo: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional&width=80&height=80&seq=buyer-detail-1&orientation=squarish',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@wellnessbeauty.com',
      phone: '+1 (555) 123-4567',
      id: 'buyer-001'
    },
    brand: {
      name: 'Pure Essence',
      logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare&width=80&height=80&seq=brand-detail-1&orientation=squarish',
      id: 'brand-001'
    },
    orderDate: '2024-01-15',
    items: [
      { 
        name: 'Nourishing Face Oil', 
        quantity: 25, 
        sku: 'NFO-001', 
        unitPrice: 45.00, 
        totalPrice: 1125.00,
        image: 'https://readdy.ai/api/search-image?query=luxury%20nourishing%20face%20oil%20bottle%20elegant%20glass%20packaging%20golden%20oil%20serum%20premium%20skincare%20product&width=80&height=80&seq=product-detail-1&orientation=squarish'
      },
      { 
        name: 'Hydrating Essence', 
        quantity: 30, 
        sku: 'HE-002', 
        unitPrice: 32.00, 
        totalPrice: 960.00,
        image: 'https://readdy.ai/api/search-image?query=hydrating%20essence%20serum%20bottle%20elegant%20dropper%20packaging%20hyaluronic%20acid%20skincare%20premium%20product&width=80&height=80&seq=product-detail-2&orientation=squarish'
      },
      { 
        name: 'Gentle Cleanser', 
        quantity: 20, 
        sku: 'GC-003', 
        unitPrice: 28.00, 
        totalPrice: 560.00,
        image: 'https://readdy.ai/api/search-image?query=gentle%20cleanser%20bottle%20minimalist%20white%20packaging%20clean%20beauty%20skincare%20product%20premium%20design&width=80&height=80&seq=product-detail-3&orientation=squarish'
      }
    ],
    subtotal: 2645.00,
    tax: 211.60,
    shippingCost: 25.00,
    discount: 0,
    totalValue: 2881.60,
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    orderStatus: 'shipped',
    shippingAddress: '123 Beauty Street, Los Angeles, CA 90210, USA',
    trackingNumber: 'UPS123456789',
    shippingMethod: 'Express Shipping',
    estimatedDelivery: '2024-01-18',
    invoiceId: 'INV-2024-001',
    priority: 'normal',
    notes: 'Customer requested expedited processing due to upcoming product launch.',
    timeline: [
      {
        date: '2024-01-15',
        time: '10:30 AM',
        status: 'Order Placed',
        description: 'Order was successfully placed by Wellness Beauty Co.',
        icon: 'ri-shopping-cart-line',
        color: 'text-blue-600'
      },
      {
        date: '2024-01-15',
        time: '11:15 AM',
        status: 'Payment Confirmed',
        description: 'Payment of $2,881.60 was successfully processed',
        icon: 'ri-money-dollar-circle-line',
        color: 'text-green-600'
      },
      {
        date: '2024-01-15',
        time: '2:45 PM',
        status: 'Order Confirmed',
        description: 'Order confirmed and sent to Pure Essence for processing',
        icon: 'ri-check-line',
        color: 'text-green-600'
      },
      {
        date: '2024-01-16',
        time: '9:20 AM',
        status: 'Processing Started',
        description: 'Brand has started processing the order',
        icon: 'ri-settings-line',
        color: 'text-yellow-600'
      },
      {
        date: '2024-01-16',
        time: '4:30 PM',
        status: 'Order Shipped',
        description: 'Order has been shipped via Express Shipping (UPS123456789)',
        icon: 'ri-truck-line',
        color: 'text-blue-600'
      }
    ]
  };

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

  const handleMarkAsShipped = () => {
    console.log('Marking order as shipped:', orderId);
    setShowShippingModal(false);
  };

  const handleMarkAsCompleted = () => {
    console.log('Marking order as completed:', orderId);
  };

  const handleCancelOrder = () => {
    console.log('Cancelling order:', orderId);
    setShowCancelModal(false);
  };

  const handleSendNotification = () => {
    console.log('Sending notification for order:', orderId);
    setShowNotificationModal(false);
  };

  const handleDownloadInvoice = () => {
    console.log('Downloading invoice:', orderData.invoiceId);
  };

  const handleCreateInvoice = () => {
    console.log('Creating invoice for order:', orderId);
  };

  const tabs = [
    { id: 'summary', name: 'Order Summary', icon: 'ri-file-list-3-line' },
    { id: 'shipping', name: 'Shipping & Delivery', icon: 'ri-truck-line' },
    { id: 'payment', name: 'Payment & Billing', icon: 'ri-money-dollar-circle-line' },
    { id: 'communications', name: 'Communications', icon: 'ri-chat-3-line' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-8">
            {/* Order Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Order Information</h3>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(orderData.orderStatus)}`}>
                      {orderData.orderStatus.charAt(0).toUpperCase() + orderData.orderStatus.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Order ID</label>
                        <p className="text-lg font-mono text-gray-900">{orderData.id}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Order Date</label>
                        <p className="text-gray-900">{new Date(orderData.orderDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Estimated Delivery</label>
                        <p className="text-gray-900">{new Date(orderData.estimatedDelivery).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Total Items</label>
                        <p className="text-lg font-semibold text-gray-900">{orderData.items.length} Products</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Total Quantity</label>
                        <p className="text-gray-900">{orderData.items.reduce((sum, item) => sum + item.quantity, 0)} Units</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Order Value</label>
                        <p className="text-xl font-bold text-green-600">${orderData.totalValue.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Payment Status Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Payment Status</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(orderData.paymentStatus)}`}>
                      {orderData.paymentStatus.charAt(0).toUpperCase() + orderData.paymentStatus.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium text-gray-900">{orderData.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Invoice ID:</span>
                      {orderData.invoiceId ? (
                        <button
                          onClick={handleDownloadInvoice}
                          className="font-medium text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          {orderData.invoiceId}
                        </button>
                      ) : (
                        <button
                          onClick={handleCreateInvoice}
                          className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          Create Invoice
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Priority & Notes */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Order Notes</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{orderData.notes}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Items ({orderData.items.length})</h3>
              
              <div className="space-y-4">
                {orderData.items.map((item, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">${item.totalPrice.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">Total Price</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6">
                          <div className="bg-white rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900">{item.quantity}</div>
                            <div className="text-sm text-gray-500">Quantity</div>
                          </div>
                          <div className="bg-white rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900">${item.unitPrice.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">Unit Price</div>
                          </div>
                          <div className="bg-white rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">${item.totalPrice.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">Total</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total Breakdown */}
              <div className="bg-gray-50 rounded-xl p-6 mt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Total Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-medium">${orderData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span className="font-medium">${orderData.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax:</span>
                    <span className="font-medium">${orderData.tax.toFixed(2)}</span>
                  </div>
                  {orderData.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span className="font-medium">-${orderData.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total:</span>
                      <span>${orderData.totalValue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer and Brand Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Buyer Information</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={orderData.buyer.logo}
                    alt={`${orderData.buyer.name} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-3">
                    <div>
                      <Link 
                        href={`/buyers/${orderData.buyer.id}`}
                        className="text-lg font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        {orderData.buyer.name}
                      </Link>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-user-line"></i>
                        <span>{orderData.buyer.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-mail-line"></i>
                        <span>{orderData.buyer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-phone-line"></i>
                        <span>{orderData.buyer.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Brand Information</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={orderData.brand.logo}
                    alt={`${orderData.brand.name} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-3">
                    <div>
                      <Link 
                        href={`/brands/${orderData.brand.id}`}
                        className="text-lg font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        {orderData.brand.name}
                      </Link>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-price-tag-3-line"></i>
                        <span>Premium Skincare Brand</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-award-line"></i>
                        <span>Verified Partner</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Delivery Address</label>
                  <p className="text-gray-900 leading-relaxed">{orderData.shippingAddress}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Shipping Method</label>
                    <p className="text-gray-900">{orderData.shippingMethod}</p>
                  </div>
                  {orderData.trackingNumber && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Tracking Number</label>
                      <p className="font-mono text-gray-900">{orderData.trackingNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-8">
            {/* Shipping Status Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Shipping Status</h3>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(orderData.orderStatus)}`}>
                  {orderData.orderStatus.charAt(0).toUpperCase() + orderData.orderStatus.slice(1)}
                </span>
              </div>
              
              {orderData.trackingNumber && (
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Tracking Number</div>
                      <div className="font-mono text-lg text-blue-600">{orderData.trackingNumber}</div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 whitespace-nowrap cursor-pointer">
                      <i className="ri-external-link-line mr-2"></i>
                      Track Package
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Shipping Information</h4>
                  {editMode !== 'shipping' && (
                    <button
                      onClick={() => setEditMode('shipping')}
                      className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      <i className="ri-edit-line mr-1"></i>
                      Edit Details
                    </button>
                  )}
                </div>
                
                {editMode === 'shipping' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                      <input
                        type="text"
                        value={trackingNumber || orderData.trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Method</label>
                      <select
                        value={shippingMethod || orderData.shippingMethod}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                      >
                        <option value="Standard Shipping">Standard Shipping</option>
                        <option value="Express Shipping">Express Shipping</option>
                        <option value="Next Day Delivery">Next Day Delivery</option>
                        <option value="International Shipping">International Shipping</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setEditMode(null)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditMode(null)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Shipping Method</label>
                      <p className="text-gray-900">{orderData.shippingMethod}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Shipping Cost</label>
                      <p className="text-gray-900">${orderData.shippingCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Estimated Delivery</label>
                      <p className="text-gray-900">{new Date(orderData.estimatedDelivery).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Delivery Address</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 leading-relaxed whitespace-pre-line">{orderData.shippingAddress}</p>
                </div>
                <button className="mt-4 text-sm text-red-600 hover:text-red-700 cursor-pointer">
                  <i className="ri-map-pin-line mr-1"></i>
                  View on Map
                </button>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Timeline</h3>
              <div className="space-y-6">
                {orderData.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${event.color}`}>
                      <i className={`${event.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{event.status}</h4>
                          <div className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </div>
                        </div>
                        <p className="text-gray-700">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-8">
            {/* Payment Overview */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Overview</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">${orderData.totalValue.toFixed(2)}</div>
                  <div className="text-sm text-green-700 mt-1">Total Amount</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-semibold text-blue-600">{orderData.paymentMethod}</div>
                  <div className="text-sm text-blue-700 mt-1">Payment Method</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(orderData.paymentStatus)}`}>
                    {orderData.paymentStatus.charAt(0).toUpperCase() + orderData.paymentStatus.slice(1)}
                  </span>
                  <div className="text-sm text-gray-700 mt-1">Payment Status</div>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-6">Payment Breakdown</h4>
              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal ({orderData.items.length} items):</span>
                  <span className="font-medium text-gray-900">${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping & Handling:</span>
                  <span className="font-medium text-gray-900">${orderData.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax (8%):</span>
                  <span className="font-medium text-gray-900">${orderData.tax.toFixed(2)}</span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-green-600">-${orderData.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                    <span className="text-lg font-bold text-gray-900">${orderData.totalValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Invoice Information</h4>
              <div className="flex items-center justify-between">
                <div>
                  {orderData.invoiceId ? (
                    <div>
                      <p className="text-gray-600">Invoice ID</p>
                      <p className="font-mono text-lg text-gray-900">{orderData.invoiceId}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No invoice generated yet</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {orderData.invoiceId ? (
                    <button
                      onClick={handleDownloadInvoice}
                      className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-download-line mr-2"></i>
                      Download Invoice
                    </button>
                  ) : (
                    <button
                      onClick={handleCreateInvoice}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-file-add-line mr-2"></i>
                      Generate Invoice
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'communications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Order Communications</h3>
              <button
                onClick={() => setShowNotificationModal(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-message-line mr-2"></i>
                Send Message
              </button>
            </div>

            {/* Chat Tabs */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveChatTab('brand')}
                    className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                      activeChatTab === 'brand'
                        ? 'bg-red-50 text-red-600 border-b-2 border-red-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <i className="ri-store-line mr-2"></i>
                    Chat with Brand
                  </button>
                  <button
                    onClick={() => setActiveChatTab('buyer')}
                    className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                      activeChatTab === 'buyer'
                        ? 'bg-red-50 text-red-600 border-b-2 border-red-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <i className="ri-user-line mr-2"></i>
                    Chat with Buyer
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeChatTab === 'brand' ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={orderData.brand.logo}
                        alt={orderData.brand.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{orderData.brand.name}</h4>
                        <p className="text-sm text-gray-500">Brand Representative</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-4 max-h-80 overflow-y-auto">
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg p-3 max-w-xs">
                          <div className="text-xs text-gray-500 mb-1">Pure Essence Team • 10:30 AM</div>
                          <p className="text-sm text-gray-900">Hello! Your order has been confirmed and we're preparing it for shipment.</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-red-500 text-white rounded-lg p-3 max-w-xs">
                          <div className="text-xs text-red-100 mb-1">Admin • 11:00 AM</div>
                          <p className="text-sm">Thank you for the update. Please keep me informed about the shipping status.</p>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg p-3 max-w-xs">
                          <div className="text-xs text-gray-500 mb-1">Pure Essence Team • 4:30 PM</div>
                          <p className="text-sm text-gray-900">Order has been shipped! Tracking number: UPS123456789</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                      <input
                        type="text"
                        placeholder="Type your message to the brand..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                      <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
                        <i className="ri-send-plane-line"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={orderData.buyer.logo}
                        alt={orderData.buyer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{orderData.buyer.name}</h4>
                        <p className="text-sm text-gray-500">{orderData.buyer.contactPerson}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-4 max-h-80 overflow-y-auto">
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg p-3 max-w-xs">
                          <div className="text-xs text-gray-500 mb-1">Sarah Johnson • 9:15 AM</div>
                          <p className="text-sm text-gray-900">Hi, I placed an order yesterday. Could you please confirm the status?</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-red-500 text-white rounded-lg p-3 max-w-xs">
                          <div className="text-xs text-red-100 mb-1">Admin • 9:45 AM</div>
                          <p className="text-sm">Hello Sarah! Your order is confirmed and currently being processed by the brand.</p>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg p-3 max-w-xs">
                          <div className="text-xs text-gray-500 mb-1">Sarah Johnson • 5:00 PM</div>
                          <p className="text-sm text-gray-900">Great! Thank you for the update.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                      <input
                        type="text"
                        placeholder="Type your message to the buyer..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                      <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
                        <i className="ri-send-plane-line"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/orders"
                  className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-xl"></i>
                </Link>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Order Details</h1>
                  <p className="text-gray-600 mt-1">{orderData.id} • {orderData.buyer.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
                  <i className="ri-printer-line mr-2"></i>
                  Print Order
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
                  <i className="ri-download-line mr-2"></i>
                  Export
                </button>
                {orderData.orderStatus === 'processing' && (
                  <button
                    onClick={() => setShowShippingModal(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-truck-line mr-2"></i>
                    Mark as Shipped
                  </button>
                )}
                {orderData.orderStatus === 'shipped' && (
                  <button
                    onClick={handleMarkAsCompleted}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-check-line mr-2"></i>
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {renderTabContent()}
        </div>
      </div>

      {/* Modals remain the same as before but simplified */}
      {showShippingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mark Order as Shipped</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Method</label>
                <select
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  <option value="Standard Shipping">Standard Shipping</option>
                  <option value="Express Shipping">Express Shipping</option>
                  <option value="Next Day Delivery">Next Day Delivery</option>
                  <option value="International Shipping">International Shipping</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => setShowShippingModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkAsShipped}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
              >
                Mark as Shipped
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Send Notification</h3>
            <p className="text-gray-600 mb-4">Send a notification to the buyer about this order:</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  rows={4}
                  placeholder="Enter notification message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  maxLength={500}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNotification}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
