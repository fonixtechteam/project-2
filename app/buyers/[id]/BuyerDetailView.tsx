'use client';

import { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import BuyerDetailHeader from '../../../components/BuyerDetailHeader';
import BuyerOverviewTab from '../../../components/BuyerOverviewTab';
import BuyerBrandsTab from '../../../components/BuyerBrandsTab';
import BuyerOrdersTab from '../../../components/BuyerOrdersTab';
import BuyerConversationsTab from '../../../components/BuyerConversationsTab';
import BuyerDocumentsTab from '../../../components/BuyerDocumentsTab';
import BuyerTeamTab from '../../../components/BuyerTeamTab';
import BuyerAddressesTab from '../../../components/BuyerAddressesTab';
import BuyerAnalyticsTab from '../../../components/BuyerAnalyticsTab';
import BuyerActivityTab from '../../../components/BuyerActivityTab';

interface BuyerDetailViewProps {
  buyerId: string;
}

export default function BuyerDetailView({ buyerId }: BuyerDetailViewProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showStickyActions, setShowStickyActions] = useState(false);

  const buyerData = {
    id: buyerId,
    name: 'Wellness Beauty Co.',
    company: 'Wellness Beauty Group',
    logo: 'https://readdy.ai/api/search-image?query=wellness%20beauty%20company%20logo%20modern%20clean%20design%20with%20green%20accents%20professional%20branding%20corporate&width=80&height=80&seq=buyer-detail-logo&orientation=squarish',
    email: 'sarah@wellnessbeauty.com',
    contactPerson: 'Sarah Johnson',
    country: 'US',
    countryName: 'United States',
    status: 'Active',
    tier: 'VIP',
    totalOrders: 24,
    lifetimeSpend: '$45,230',
    connectedBrands: 3,
    openInvoices: 2,
    businessType: 'Beauty Retailer',
    website: 'https://wellnessbeauty.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-03-15',
    lastActivity: '2024-01-15',
    accountManager: 'Jennifer Martinez'
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'ri-dashboard-line' },
    { id: 'brands', name: 'Brands', icon: 'ri-price-tag-3-line' },
    { id: 'orders', name: 'Orders & Invoices', icon: 'ri-shopping-cart-line' },
    { id: 'conversations', name: 'Conversations', icon: 'ri-chat-3-line' },
    { id: 'documents', name: 'Documents & Compliance', icon: 'ri-file-shield-line' },
    { id: 'team', name: 'Team', icon: 'ri-team-line' },
    { id: 'addresses', name: 'Addresses', icon: 'ri-map-pin-line' },
    { id: 'analytics', name: 'Analytics', icon: 'ri-bar-chart-line' },
    { id: 'activity', name: 'Activity Log', icon: 'ri-history-line' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <BuyerOverviewTab buyerData={buyerData} />;
      case 'brands':
        return <BuyerBrandsTab buyerData={buyerData} />;
      case 'orders':
        return <BuyerOrdersTab buyerData={buyerData} />;
      case 'conversations':
        return <BuyerConversationsTab buyerData={buyerData} />;
      case 'documents':
        return <BuyerDocumentsTab buyerData={buyerData} />;
      case 'team':
        return <BuyerTeamTab buyerData={buyerData} />;
      case 'addresses':
        return <BuyerAddressesTab buyerData={buyerData} />;
      case 'analytics':
        return <BuyerAnalyticsTab buyerData={buyerData} />;
      case 'activity':
        return <BuyerActivityTab buyerData={buyerData} />;
      default:
        return <BuyerOverviewTab buyerData={buyerData} />;
    }
  };

  const handleApprove = () => {
    console.log('Approving buyer:', buyerId);
  };

  const handleDeactivate = () => {
    console.log('Deactivating buyer:', buyerId);
  };

  const handleSave = () => {
    console.log('Saving buyer changes:', buyerId);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <BuyerDetailHeader buyerData={buyerData} />
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6 overflow-x-auto">
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

        {/* Sticky Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="ri-save-line"></i>
              <span>Unsaved changes</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
              >
                Save Changes
              </button>
              {buyerData.status === 'Pending' && (
                <button
                  onClick={handleApprove}
                  className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
                >
                  Approve Buyer
                </button>
              )}
              {buyerData.status === 'Active' && (
                <button
                  onClick={handleDeactivate}
                  className="px-6 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
                >
                  Deactivate
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}