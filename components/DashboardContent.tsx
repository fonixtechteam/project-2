
'use client';

import StatsCard from './StatsCard';
import QuickActions from './QuickActions';
import RecentOrders from './RecentOrders';

export default function DashboardContent() {
  return (
    <div className="flex-1 overflow-auto">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Admin</h1>
            <p className="text-gray-600 italic mt-1">Here's what's happening with your B2B beauty marketplace today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <i className="ri-search-line text-xl"></i>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <i className="ri-user-line text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Brands"
            value="24"
            link="View Brands"
            icon="ri-store-2-line"
            iconBg="bg-red-100"
            iconColor="text-red-600"
          />
          <StatsCard
            title="Registered Buyer"
            value="94"
            link="View Buyers"
            icon="ri-user-line"
            iconBg="bg-red-100"
            iconColor="text-red-600"
          />
          <StatsCard
            title="Total Orders"
            value="224"
            link="View Orders"
            icon="ri-shopping-cart-line"
            iconBg="bg-red-100"
            iconColor="text-red-600"
          />
          <StatsCard
            title="Open POs"
            value="24"
            link="View POs"
            icon="ri-file-list-3-line"
            iconBg="bg-red-100"
            iconColor="text-red-600"
          />
        </div>

        <QuickActions />

        <RecentOrders />
      </main>
    </div>
  );
}
