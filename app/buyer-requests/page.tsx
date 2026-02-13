'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import BuyerRequestDetails from '../../components/BuyerRequestDetails';

export default function BuyerRequestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBuyer, setSelectedBuyer] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const buyers = [
    {
      id: '1',
      buyerName: 'Sarah Johnson',
      companyName: 'Wellness Beauty Co.',
      location: 'Los Angeles, CA, US',
      registrationDate: '2024-01-15',
      status: 'Pending',
      email: 'sarah@wellnessbeauty.com',
      phone: '+1 (555) 123-4567',
      businessType: 'Beauty Retailer',
      website: 'https://wellnessbeauty.com',
      fullAddress: '123 Beauty Street, Los Angeles, CA 90210, USA',
      marketsServed: ['United States', 'Canada'],
      locations: 3,
      registrationNumber: 'CA-REG-2024-001',
      gstVat: 'US-VAT-456789',
      documents: [
        { name: 'Business Registration', type: 'PDF', size: '2.4 MB', status: 'Verified' },
        { name: 'Tax Certificate', type: 'PDF', size: '1.8 MB', status: 'Pending' }
      ],
      currentBrands: ['Pure Essence', 'Botanica Natural'],
      primaryContact: {
        name: 'Sarah Johnson',
        role: 'CEO & Founder',
        email: 'sarah@wellnessbeauty.com',
        phone: '+1 (555) 123-4567'
      },
      teamMembers: [
        { name: 'Michael Chen', role: 'Procurement Manager', email: 'michael@wellnessbeauty.com' },
        { name: 'Lisa Park', role: 'Operations Director', email: 'lisa@wellnessbeauty.com' }
      ],
      hierarchy: {
        type: 'Parent Company',
        organizationName: 'Wellness Beauty Group',
        industry: 'Beauty & Personal Care',
        subEntities: ['Wellness Beauty Co.', 'Natural Glow Division']
      },
      adminNotes: 'Strong financial background, excellent references from existing suppliers.'
    },
    {
      id: '2',
      buyerName: 'Michael Torres',
      companyName: 'Urban Spa Solutions',
      location: 'New York, NY, US',
      registrationDate: '2024-01-12',
      status: 'Approved',
      email: 'michael@urbanspa.com',
      phone: '+1 (555) 987-6543',
      businessType: 'Spa & Wellness',
      website: 'https://urbanspa.com',
      fullAddress: '456 Wellness Ave, New York, NY 10001, USA',
      marketsServed: ['United States', 'Mexico'],
      locations: 5,
      registrationNumber: 'NY-REG-2024-002',
      gstVat: 'US-VAT-789123',
      documents: [
        { name: 'Business License', type: 'PDF', size: '1.9 MB', status: 'Verified' },
        { name: 'Insurance Certificate', type: 'PDF', size: '2.1 MB', status: 'Verified' }
      ],
      currentBrands: ['Luxury Glow', 'Fresh Start Wellness'],
      primaryContact: {
        name: 'Michael Torres',
        role: 'Managing Director',
        email: 'michael@urbanspa.com',
        phone: '+1 (555) 987-6543'
      },
      teamMembers: [
        { name: 'Emma Rodriguez', role: 'Buyer', email: 'emma@urbanspa.com' }
      ],
      hierarchy: {
        type: 'Independent',
        organizationName: 'Urban Spa Solutions',
        industry: 'Spa & Wellness',
        subEntities: []
      },
      adminNotes: 'Approved - excellent compliance record and strong market presence.'
    },
    {
      id: '3',
      buyerName: 'Marie Dubois',
      companyName: 'Boutique Belle Paris',
      location: 'Paris, FR',
      registrationDate: '2024-01-10',
      status: 'Rejected',
      email: 'marie@boutiquebelle.fr',
      phone: '+33 1 42 86 59 30',
      businessType: 'Luxury Retailer',
      website: 'https://boutiquebelle.fr',
      fullAddress: '78 Rue de Rivoli, 75001 Paris, France',
      marketsServed: ['France', 'Belgium', 'Switzerland'],
      locations: 2,
      registrationNumber: 'FR-REG-2024-003',
      gstVat: 'FR-VAT-321654',
      documents: [
        { name: 'EU Business Registration', type: 'PDF', size: '3.2 MB', status: 'Issues' },
        { name: 'VAT Certificate', type: 'PDF', size: '1.5 MB', status: 'Pending' }
      ],
      currentBrands: [],
      primaryContact: {
        name: 'Marie Dubois',
        role: 'Owner',
        email: 'marie@boutiquebelle.fr',
        phone: '+33 1 42 86 59 30'
      },
      teamMembers: [
        { name: 'Pierre Martin', role: 'Store Manager', email: 'pierre@boutiquebelle.fr' }
      ],
      hierarchy: {
        type: 'Parent Company',
        organizationName: 'Belle Group',
        industry: 'Luxury Retail',
        subEntities: ['Boutique Belle Paris', 'Belle Online']
      },
      adminNotes: 'Rejected - incomplete documentation and compliance issues with EU regulations.',
      rejectionReason: 'Incomplete business registration documents and missing VAT compliance certificates.'
    },
    {
      id: '4',
      buyerName: 'James Wilson',
      companyName: 'Natural Glow Ltd',
      location: 'London, UK',
      registrationDate: '2024-01-08',
      status: 'Pending',
      email: 'james@naturalglow.co.uk',
      phone: '+44 20 7946 0958',
      businessType: 'Health & Beauty',
      website: 'https://naturalglow.co.uk',
      fullAddress: '12 Oxford Street, London W1C 1AP, UK',
      marketsServed: ['United Kingdom', 'Ireland'],
      locations: 1,
      registrationNumber: 'UK-REG-2024-004',
      gstVat: 'GB-VAT-987654',
      documents: [
        { name: 'Companies House Registration', type: 'PDF', size: '2.7 MB', status: 'Verified' },
        { name: 'VAT Registration', type: 'PDF', size: '1.3 MB', status: 'Verified' }
      ],
      currentBrands: ['Botanica Natural'],
      primaryContact: {
        name: 'James Wilson',
        role: 'Director',
        email: 'james@naturalglow.co.uk',
        phone: '+44 20 7946 0958'
      },
      teamMembers: [],
      hierarchy: {
        type: 'Independent',
        organizationName: 'Natural Glow Ltd',
        industry: 'Health & Beauty',
        subEntities: []
      },
      adminNotes: 'Under review - all documents verified, awaiting final compliance check.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = buyer.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || buyer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (buyer: any) => {
    setSelectedBuyer(buyer);
    setShowDetails(true);
  };

  const statusCounts = {
    all: buyers.length,
    Pending: buyers.filter(b => b.status === 'Pending').length,
    Approved: buyers.filter(b => b.status === 'Approved').length,
    Rejected: buyers.filter(b => b.status === 'Rejected').length
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Registered Buyers</h1>
                <p className="text-gray-600 mt-1">Review and manage buyer registration requests</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
                <i className="ri-download-line mr-2"></i>
                Export List
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-line text-gray-600 text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-2xl font-bold text-yellow-600">{statusCounts.Pending}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <i className="ri-time-line text-yellow-600 text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-green-600">{statusCounts.Approved}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-checkbox-circle-line text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">{statusCounts.Rejected}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className="ri-close-circle-line text-red-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search by buyer name or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Buyer Information</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Company</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Location</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Registration Date</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBuyers.map((buyer) => (
                    <tr key={buyer.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {buyer.buyerName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{buyer.buyerName}</div>
                            <div className="text-sm text-gray-500">{buyer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-gray-900">{buyer.companyName}</div>
                          <div className="text-sm text-gray-500">{buyer.businessType}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700">{buyer.location}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700">{buyer.registrationDate}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(buyer.status)}`}>
                          {buyer.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleViewDetails(buyer)}
                          className="px-3 py-1 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50 whitespace-nowrap cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {filteredBuyers.length} of {buyers.length} buyer requests
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm text-white bg-red-600 rounded cursor-pointer">
                  1
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer">
                  2
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDetails && selectedBuyer && (
        <BuyerRequestDetails 
          buyer={selectedBuyer}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}