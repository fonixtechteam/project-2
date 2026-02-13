'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface BuyerAnalyticsTabProps {
  buyerData: any;
}

export default function BuyerAnalyticsTab({ buyerData }: BuyerAnalyticsTabProps) {
  
  const monthlyOrdersData = [
    { month: 'Jul', orders: 12, value: 8500 },
    { month: 'Aug', orders: 18, value: 12200 },
    { month: 'Sep', orders: 15, value: 9800 },
    { month: 'Oct', orders: 22, value: 15400 },
    { month: 'Nov', orders: 28, value: 18900 },
    { month: 'Dec', orders: 35, value: 24600 },
    { month: 'Jan', orders: 42, value: 28300 }
  ];

  const brandPerformanceData = [
    { brand: 'Pure Essence', orders: 28, revenue: 18500, growth: 15.3 },
    { brand: 'Botanica Natural', orders: 22, revenue: 14200, growth: 8.7 },
    { brand: 'Luxury Glow', orders: 18, revenue: 12800, growth: 22.1 },
    { brand: 'Organic Bliss', orders: 15, revenue: 9600, growth: -5.2 },
    { brand: 'Clean Beauty', orders: 12, revenue: 7200, growth: 12.8 }
  ];

  const categoryDistribution = [
    { name: 'Skincare', value: 45, color: '#ef4444' },
    { name: 'Haircare', value: 25, color: '#f97316' },
    { name: 'Makeup', value: 20, color: '#eab308' },
    { name: 'Fragrance', value: 10, color: '#22c55e' }
  ];

  const topProducts = [
    { 
      name: 'Hydrating Face Serum', 
      brand: 'Pure Essence', 
      orders: 45, 
      revenue: '$6,750',
      image: 'https://readdy.ai/api/search-image?query=hydrating%20face%20serum%20bottle%20elegant%20clean%20beauty%20skincare%20product%20white%20background%20professional&width=40&height=40&seq=prod1&orientation=squarish'
    },
    { 
      name: 'Organic Shampoo', 
      brand: 'Botanica Natural', 
      orders: 38, 
      revenue: '$4,560',
      image: 'https://readdy.ai/api/search-image?query=organic%20shampoo%20bottle%20natural%20green%20botanical%20haircare%20product%20white%20background%20professional&width=40&height=40&seq=prod2&orientation=squarish'
    },
    { 
      name: 'Anti-Aging Cream', 
      brand: 'Luxury Glow', 
      orders: 32, 
      revenue: '$8,960',
      image: 'https://readdy.ai/api/search-image?query=anti%20aging%20cream%20jar%20luxury%20gold%20premium%20skincare%20product%20white%20background%20professional&width=40&height=40&seq=prod3&orientation=squarish'
    },
    { 
      name: 'Vitamin C Toner', 
      brand: 'Clean Beauty', 
      orders: 28, 
      revenue: '$3,360',
      image: 'https://readdy.ai/api/search-image?query=vitamin%20c%20toner%20bottle%20bright%20orange%20clean%20beauty%20skincare%20product%20white%20background%20professional&width=40&height=40&seq=prod4&orientation=squarish'
    }
  ];

  const kpiMetrics = [
    {
      title: 'Monthly Orders',
      value: '42',
      change: '+18.5%',
      trend: 'up',
      color: 'blue',
      icon: 'ri-shopping-cart-line'
    },
    {
      title: 'Average Order Value',
      value: '$674',
      change: '+12.3%',
      trend: 'up',
      color: 'green',
      icon: 'ri-money-dollar-circle-line'
    },
    {
      title: 'Reorder Rate',
      value: '68%',
      change: '+5.2%',
      trend: 'up',
      color: 'purple',
      icon: 'ri-repeat-line'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.8',
      change: '+0.3',
      trend: 'up',
      color: 'orange',
      icon: 'ri-star-line'
    }
  ];

  const getKpiColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getKpiBgColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      purple: 'bg-purple-100',
      orange: 'bg-orange-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getKpiBgColor(metric.color)}`}>
                <i className={`${metric.icon} ${getKpiColor(metric.color)}`}></i>
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <i className={`ri-arrow-${metric.trend}-line`}></i>
                <span>{metric.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Orders Chart */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Monthly Orders & Revenue</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 pr-8">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Distribution by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {categoryDistribution.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-700">{category.name}</span>
                <span className="text-sm font-medium text-gray-900">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Performance */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Brand Performance</h3>
            <button className="text-sm text-red-600 hover:text-red-700 cursor-pointer">
              View All Brands
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brandPerformanceData.map((brand, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{brand.brand}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {brand.orders}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${brand.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1 text-sm ${
                      brand.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <i className={`ri-arrow-${brand.growth >= 0 ? 'up' : 'down'}-line`}></i>
                      <span>{Math.abs(brand.growth)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(brand.orders * 2, 100)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Top Performing Products</h3>
            <button className="text-sm text-red-600 hover:text-red-700 cursor-pointer">
              View All Products
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600">{product.orders} orders</span>
                    <span className="text-sm font-medium text-green-600">{product.revenue}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}