
'use client';

import { useState } from 'react';
import BrandInformation from './BrandInformation';
import TermsConditions from './TermsConditions';
import DocumentReview from './DocumentReview';

export default function BrandRequestContent() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: 'Brand Information', step: '1 of 3' },
    { id: 1, name: 'Terms & Conditions', step: '2 of 3' },
    { id: 2, name: 'Document Review', step: '3 of 3' }
  ];

  const brandData = {
    name: "Luxe Beauty Co.",
    website: "https://luxebeauty.com",
    legalEntity: "Luxe Beauty Corporation Ltd.",
    contactEmail: "hello@luxebeauty.com",
    contactPhone: "+1 (555) 123-4567",
    contactPerson: "Sarah Johnson",
    bio: "Premium skincare brand focused on natural ingredients and sustainable practices. We create luxury beauty products that deliver exceptional results while being environmentally conscious.",
    status: "pending",
    submittedDate: "2024-01-15"
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <BrandInformation brandData={brandData} />;
      case 1:
        return <TermsConditions brandData={brandData} />;
      case 2:
        return <DocumentReview brandData={brandData} />;
      default:
        return <BrandInformation brandData={brandData} />;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Brand Request Review</h1>
            <p className="text-gray-600 mt-1">{brandData.name} - Submitted on {brandData.submittedDate}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium">Under Review</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{tab.name}</span>
                    <span className="text-xs text-gray-400">{tab.step}</span>
                  </div>
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
  );
}
