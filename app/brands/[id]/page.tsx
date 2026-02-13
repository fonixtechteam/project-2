
import BrandManagement from './BrandManagement';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function BrandPage({ params }: { params: { id: string } }) {
  return <BrandManagement brandId={params.id} />;
}
