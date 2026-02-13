
export default function QuickActions() {
  const actions = [
    {
      title: 'Approve Users',
      description: 'Review pending registrations',
      icon: 'ri-user-add-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Review SKUs',
      description: 'Validate product listings',
      icon: 'ri-price-tag-3-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'Confirm Orders',
      description: 'Process order approvals',
      icon: 'ri-shopping-cart-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'Respond to Tickets',
      description: 'Handle support requests',
      icon: 'ri-customer-service-2-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      title: 'Add System Alert',
      description: 'Broadcast platform notice',
      icon: 'ri-notification-3-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-left hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 ${action.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <i className={`${action.icon} text-lg ${action.iconColor}`}></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
