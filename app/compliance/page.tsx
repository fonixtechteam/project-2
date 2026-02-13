
'use client';

import { Suspense } from 'react';
import ComplianceManagement from './ComplianceManagement';

export default function CompliancePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-gray-500">Loading...</div></div>}>
      <ComplianceManagement />
    </Suspense>
  );
}
