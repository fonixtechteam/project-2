'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import OrderManagement from './OrderManagement';

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <OrderManagement />
    </div>
  );
}