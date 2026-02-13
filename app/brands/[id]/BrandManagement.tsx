
'use client';

import { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import BrandHeader from '../../../components/BrandHeader';
import ProfileTab from '../../../components/ProfileTab';
import BuyersTab from '../../../components/BuyersTab';
import OrdersInvoicesTab from '../../../components/OrdersInvoicesTab';
import ChatsTab from '../../../components/ChatsTab';
import ComplianceTab from '../../../components/ComplianceTab';
import AssetsTab from '../../../components/AssetsTab';
import CatalogTab from '../../../components/CatalogTab';
import BuyerDetailsPanel from '../../../components/BuyerDetailsPanel';

interface BrandManagementProps {
  brandId: string;
}

export default function BrandManagement({ brandId }: BrandManagementProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedBuyer, setSelectedBuyer] = useState<any>(null);
  const [showBuyerDetails, setShowBuyerDetails] = useState(false);

  const brandData = {
    id: brandId,
    name: 'Pure Essence',
    logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20on%20white%20background%20premium%20skincare%20cosmetics&width=80&height=80&seq=brand-logo-header&orientation=squarish',
    description: 'Clean beauty essentials with transparent ingredients and sustainable packaging',
    rating: 4.1,
    readiness: 78,
    complianceStatus: 'Approved',
    totalBuyers: 47,
    activeBuyers: 32,
    totalOrders: 156,
    totalSkus: 24,
    complianceIssues: 2,
    countries: ['US', 'CA', 'FR', 'UK', 'AU']
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'ri-user-line' },
    { id: 'buyers', name: 'Buyers', icon: 'ri-group-line' },
    { id: 'orders', name: 'Orders & Invoices', icon: 'ri-shopping-cart-line' },
    { id: 'compliance', name: 'Compliance', icon: 'ri-shield-check-line' },
    { id: 'catalog', name: 'Catalog', icon: 'ri-price-tag-3-line' },
    { id: 'chats', name: 'Chats', icon: 'ri-chat-3-line' }
  ];

  const handleViewBuyerDetails = (buyer: any) => {
    setSelectedBuyer(buyer);
    setShowBuyerDetails(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab brandId={brandId} />;
      case 'buyers':
        return <BuyersTab brandId={brandId} onViewDetails={handleViewBuyerDetails} />;
      case 'orders':
        return <OrdersInvoicesTab brandId={brandId} />;
      case 'compliance':
        return <ComplianceTab brandId={brandId} />;
      case 'catalog':
        return <CatalogTab brandId={brandId} />;
      case 'chats':
        return <ChatsTab brandId={brandId} />;
      default:
        return <ProfileTab brandId={brandId} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <BrandHeader brandData={brandData} />
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className={`${tab.icon} text-lg`}></i>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {showBuyerDetails && selectedBuyer && (
        <BuyerDetailsPanel 
          buyer={selectedBuyer}
          onClose={() => setShowBuyerDetails(false)}
        />
      )}
    </div>
  );
}
