'use client';

import Sidebar from '../../components/Sidebar';
import InvoiceManagement from './InvoiceManagement';

export default function InvoicesPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <InvoiceManagement />
    </div>
  );
}