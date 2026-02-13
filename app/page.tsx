
'use client';

import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <DashboardContent />
    </div>
  );
}
