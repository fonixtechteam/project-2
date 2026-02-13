
'use client';

import Sidebar from '../../../components/Sidebar';
import CreateOrderForm from './CreateOrderForm';

export default function CreateOrderPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <CreateOrderForm />
    </div>
  );
}
