
'use client';

export default function ComplianceStats() {
  const stats = [
    {
      title: 'Total Documents',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: 'ri-file-list-3-line',
      color: 'blue',
    },
    {
      title: 'Pending Review',
      value: '89',
      change: '+5',
      changeType: 'neutral',
      icon: 'ri-time-line',
      color: 'yellow',
    },
    {
      title: 'Approved Documents',
      value: '1,098',
      change: '+18%',
      changeType: 'positive',
      icon: 'ri-check-line',
      color: 'green',
    },
    {
      title: 'Expiring Soon',
      value: '23',
      change: '+3',
      changeType: 'negative',
      icon: 'ri-alarm-warning-line',
      color: 'orange',
    },
    {
      title: 'Rejected Documents',
      value: '37',
      change: '-8%',
      changeType: 'negative',
      icon: 'ri-close-line',
      color: 'red',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600';
      case 'yellow':
        return 'bg-yellow-50 text-yellow-600';
      case 'green':
        return 'bg-green-50 text-green-600';
      case 'orange':
        return 'bg-orange-50 text-orange-600';
      case 'red':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(
                stat.color
              )}`}
            >
              <i className={`${stat.icon} text-xl`}></i>
            </div>
            <div className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
              {stat.change}
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
