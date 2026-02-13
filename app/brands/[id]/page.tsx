
import BrandManagement from './BrandManagement';
import { use } from 'react';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function BrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <BrandManagement brandId={id} />;
}
