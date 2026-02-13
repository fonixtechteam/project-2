'use client';

import { useState } from 'react';

interface BuyerAddressesTabProps {
  buyerData: any;
}

export default function BuyerAddressesTab({ buyerData }: BuyerAddressesTabProps) {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    type: '',
    name: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
    isDefault: false
  });

  const addresses = [
    {
      id: 1,
      type: 'Billing',
      name: 'Sarah Johnson',
      company: 'Wellness Beauty Co.',
      address1: '1234 Business Park Drive',
      address2: 'Suite 200',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      email: 'sarah@wellnessbeauty.com',
      isDefault: true,
      createdDate: '2023-03-15'
    },
    {
      id: 2,
      type: 'Shipping',
      name: 'Wellness Beauty Warehouse',
      company: 'Wellness Beauty Co.',
      address1: '5678 Distribution Center',
      address2: 'Dock 15',
      city: 'Long Beach',
      state: 'CA',
      zipCode: '90805',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      email: 'warehouse@wellnessbeauty.com',
      isDefault: true,
      createdDate: '2023-03-20'
    },
    {
      id: 3,
      type: 'Shipping',
      name: 'East Coast Distribution',
      company: 'Wellness Beauty Co.',
      address1: '9876 Commerce Boulevard',
      address2: 'Building C',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'United States',
      phone: '+1 (555) 456-7890',
      email: 'eastcoast@wellnessbeauty.com',
      isDefault: false,
      createdDate: '2023-08-10'
    },
    {
      id: 4,
      type: 'Warehouse',
      name: 'Primary Storage Facility',
      company: 'Wellness Beauty Co.',
      address1: '2468 Storage Way',
      address2: 'Unit 50-60',
      city: 'Ontario',
      state: 'CA',
      zipCode: '91761',
      country: 'United States',
      phone: '+1 (555) 321-0987',
      email: 'storage@wellnessbeauty.com',
      isDefault: true,
      createdDate: '2023-06-05'
    }
  ];

  const addressTypes = ['Billing', 'Shipping', 'Warehouse'];
  const countries = ['United States', 'Canada', 'Mexico'];
  const usStates = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Billing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipping':
        return 'bg-green-100 text-green-800';
      case 'Warehouse':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Billing':
        return 'ri-bill-line text-blue-600';
      case 'Shipping':
        return 'ri-truck-line text-green-600';
      case 'Warehouse':
        return 'ri-building-line text-purple-600';
      default:
        return 'ri-map-pin-line text-gray-600';
    }
  };

  const handleAddAddress = () => {
    console.log('Adding new address:', newAddress);
    setNewAddress({
      type: '',
      name: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      email: '',
      isDefault: false
    });
    setShowAddAddress(false);
  };

  const handleEditAddress = (address: any) => {
    setEditingAddress(address.id);
    setNewAddress(address);
    setShowAddAddress(true);
  };

  const handleDeleteAddress = (addressId: number) => {
    console.log('Deleting address:', addressId);
  };

  const handleSetDefault = (addressId: number, type: string) => {
    console.log('Setting default address:', addressId, type);
  };

  return (
    <div className="space-y-6">
      {/* Address Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-bill-line text-blue-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {addresses.filter(a => a.type === 'Billing').length}
              </p>
              <p className="text-sm text-blue-700">Billing</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-truck-line text-green-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {addresses.filter(a => a.type === 'Shipping').length}
              </p>
              <p className="text-sm text-green-700">Shipping</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-purple-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {addresses.filter(a => a.type === 'Warehouse').length}
              </p>
              <p className="text-sm text-purple-700">Warehouse</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-map-pin-line text-orange-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{addresses.length}</p>
              <p className="text-sm text-orange-700">Total Addresses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Addresses List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Addresses</h3>
            <button
              onClick={() => setShowAddAddress(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>
              Add Address
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {addresses.map((address) => (
            <div key={address.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <i className={getTypeIcon(address.type)}></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(address.type)}`}>
                        {address.type}
                      </span>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer"
                    title="Edit"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  {!address.isDefault && (
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-red-600 hover:text-red-900 text-sm cursor-pointer"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="font-medium text-gray-900">{address.name}</p>
                  <p className="text-sm text-gray-600">{address.company}</p>
                </div>
                
                <div className="text-sm text-gray-900">
                  <p>{address.address1}</p>
                  {address.address2 && <p>{address.address2}</p>}
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.country}</p>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <i className="ri-phone-line"></i>
                      <span>{address.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="ri-mail-line"></i>
                      <span>{address.email}</span>
                    </div>
                  </div>
                </div>
                
                {!address.isDefault && (
                  <div className="pt-2">
                    <button
                      onClick={() => handleSetDefault(address.id, address.type)}
                      className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      Set as Default {address.type}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4 max-h-screen overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-map-pin-add-line text-red-600"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                <select
                  value={newAddress.type}
                  onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  <option value="">Select type</option>
                  {addressTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={newAddress.company}
                  onChange={(e) => setNewAddress({...newAddress, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                <input
                  type="text"
                  value={newAddress.address1}
                  onChange={(e) => setNewAddress({...newAddress, address1: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Street address"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2 (Optional)</label>
                <input
                  type="text"
                  value={newAddress.address2}
                  onChange={(e) => setNewAddress({...newAddress, address2: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter city"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                <select
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  <option value="">Select state</option>
                  {usStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter ZIP code"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  <option value="">Select country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newAddress.email}
                  onChange={(e) => setNewAddress({...newAddress, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Email address"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newAddress.isDefault}
                    onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Set as default {newAddress.type} address</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddAddress(false);
                  setEditingAddress(null);
                  setNewAddress({
                    type: '',
                    name: '',
                    company: '',
                    address1: '',
                    address2: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                    phone: '',
                    email: '',
                    isDefault: false
                  });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                disabled={!newAddress.type || !newAddress.name || !newAddress.address1 || !newAddress.city}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {editingAddress ? 'Update Address' : 'Add Address'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}