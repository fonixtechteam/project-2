
'use client';

import Sidebar from '../../components/Sidebar';
import BrandRequestContent from '../../components/BrandRequestContent';

export default function BrandRequestsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <BrandRequestContent />
    </div>
  );
}
