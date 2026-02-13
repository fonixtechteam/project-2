
export default function RecentOrders() {
  const orders = [
    {
      type: 'user',
      icon: 'ri-user-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'ZaraCo requests access to SkinGuru',
      description: 'Brand partnership request pending approval',
      category: 'Retailer Requests',
      time: '13m ago'
    },
    {
      type: 'order',
      icon: 'ri-shopping-cart-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      title: 'Order #SP-2024-1156 Confirmed',
      description: 'Summit Sports confirmed their order for 150 units of Trail Runner Pro',
      category: 'Orders',
      time: '45m ago'
    },
    {
      type: 'message',
      icon: 'ri-message-3-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'New Message from Alpine Gear Co.',
      description: 'Question about bulk pricing for Q2 seasonal order',
      category: 'Conversations',
      time: '2h ago'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        <button className="text-red-600 text-sm font-medium hover:text-red-700">
          View All
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {orders.map((order, index) => (
          <div key={index} className={`p-6 ${index !== orders.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 ${order.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <i className={`${order.icon} text-lg ${order.iconColor}`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{order.title}</h3>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{order.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{order.category}</span>
                  <span>•</span>
                  <span>{order.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
