'use client';

import { useState } from 'react';

interface BuyerOverviewTabProps {
  buyerData: any;
}

export default function BuyerOverviewTab({ buyerData }: BuyerOverviewTabProps) {
  const [notes, setNotes] = useState('Strong partnership potential. Excellent payment history and growing market presence in the wellness beauty sector.');

  const companySnapshot = {
    businessType: 'Beauty Retailer',
    marketsServed: ['United States', 'Canada', 'Mexico'],
    website: 'https://wellnessbeauty.com',
    employees: '25-50',
    established: '2018',
    parentCompany: 'Wellness Beauty Group',
    subEntities: ['Wellness Beauty Co.', 'Natural Glow Division', 'Eco Beauty Labs']
  };

  const primaryContact = {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    email: 'sarah@wellnessbeauty.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/sarahjohnson'
  };

  const hierarchy = {
    type: 'Parent Company',
    organizationName: 'Wellness Beauty Group',
    industry: 'Beauty & Personal Care',
    subEntities: [
      { name: 'Wellness Beauty Co.', type: 'Retail Division', status: 'Active' },
      { name: 'Natural Glow Division', type: 'Product Line', status: 'Active' },
      { name: 'Eco Beauty Labs', type: 'R&D Division', status: 'Planning' }
    ]
  };

  const latestActivity = [
    {
      date: '2024-01-15',
      type: 'order',
      description: 'Placed order #ORD-2024-156 for Pure Essence products',
      amount: '$2,450'
    },
    {
      date: '2024-01-12',
      type: 'message',
      description: 'Sent message regarding bulk pricing inquiry',
      brand: 'Botanica Natural'
    },
    {
      date: '2024-01-10',
      type: 'payment',
      description: 'Payment received for invoice #INV-2024-089',
      amount: '$1,890'
    },
    {
      date: '2024-01-08',
      type: 'connection',
      description: 'Connected with new brand: Luxury Glow',
      status: 'approved'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return 'ri-shopping-cart-line text-blue-500';
      case 'message':
        return 'ri-message-line text-green-500';
      case 'payment':
        return 'ri-money-dollar-circle-line text-green-500';
      case 'connection':
        return 'ri-links-line text-purple-500';
      default:
        return 'ri-information-line text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Company Snapshot */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-blue-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Company Snapshot</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <p className="text-gray-900">{companySnapshot.businessType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Established</label>
                <p className="text-gray-900">{companySnapshot.established}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <a href={companySnapshot.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                {companySnapshot.website}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employees</label>
                <p className="text-gray-900">{companySnapshot.employees}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Company</label>
                <p className="text-gray-900">{companySnapshot.parentCompany}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Markets Served</label>
              <div className="flex flex-wrap gap-2">
                {companySnapshot.marketsServed.map((market, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {market}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Contact */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-line text-green-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Primary Contact</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {primaryContact.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{primaryContact.name}</h4>
                <p className="text-sm text-gray-500">{primaryContact.role}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <i className="ri-mail-line text-gray-400"></i>
                <a href={`mailto:${primaryContact.email}`} className="text-gray-900 hover:text-red-600">
                  {primaryContact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-phone-line text-gray-400"></i>
                <a href={`tel:${primaryContact.phone}`} className="text-gray-900 hover:text-red-600">
                  {primaryContact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <i className="ri-linkedin-line text-gray-400"></i>
                <a href={`https://${primaryContact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-red-600">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hierarchy */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-organization-chart text-purple-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Hierarchy Management</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <p className="text-gray-900">{hierarchy.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <p className="text-gray-900">{hierarchy.industry}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <p className="text-gray-900">{hierarchy.organizationName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sub-entities</label>
              <div className="space-y-2">
                {hierarchy.subEntities.map((entity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium text-gray-900">{entity.name}</p>
                      <p className="text-sm text-gray-500">{entity.type}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      entity.status === 'Active' ? 'bg-green-100 text-green-800' :
                      entity.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {entity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Latest Activity */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-orange-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Latest Activity</h3>
          </div>
          <div className="space-y-4">
            {latestActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border">
                  <i className={getActivityIcon(activity.type)}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">{activity.date}</p>
                    {activity.amount && (
                      <span className="text-xs font-medium text-green-600">{activity.amount}</span>
                    )}
                    {activity.brand && (
                      <span className="text-xs text-gray-500">• {activity.brand}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 cursor-pointer">
            View All Activity
          </button>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <i className="ri-sticky-note-line text-gray-600"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Internal Notes</h3>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Add internal notes about this buyer..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          maxLength={1000}
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">{notes.length}/1000 characters</p>
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
}