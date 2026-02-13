
import { Suspense } from 'react';
import OrderDetailView from './OrderDetailView';

interface OrderPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return [
    { id: 'ORD-2024-001' },
    { id: 'ORD-2024-002' },
    { id: 'ORD-2024-003' },
    { id: 'ORD-2024-004' },
    { id: 'ORD-2024-005' },
  ];
}

function OrderPageContent({ params }: { params: { id: string } }) {
  return <OrderDetailView orderId={params.id} />;
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <OrderPageContent params={params} />
    </Suspense>
  );
}