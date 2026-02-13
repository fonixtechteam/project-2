
import { Suspense, use } from 'react';
import OrderDetailView from './OrderDetailView';

interface OrderPageProps {
  params: Promise<{ id: string }>;
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

function OrderPageContent({ id }: { id: string }) {
  return <OrderDetailView orderId={id} />;
}

export default function OrderPage({ params }: OrderPageProps) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <OrderPageContent id={id} />
    </Suspense>
  );
}