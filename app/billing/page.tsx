
'use client';

import Sidebar from '../../components/Sidebar';
import BillingManagement from './BillingManagement';

export default function BillingPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <BillingManagement />
      </div>
    </div>
  );
}
