
'use client';

import { useState } from 'react';

interface ProfileTabProps {
  brandId: string;
}

export default function ProfileTab({ brandId }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');

  const brandProfile = {
    id: brandId,
    name: 'Pure Essence',
    legalEntity: 'Pure Essence Beauty LLC',
    website: 'https://pureessencebeauty.com',
    contactInfo: {
      email: 'contact@pureessencebeauty.com',
      phone: '+1 (555) 123-4567',
      address: '123 Beauty Boulevard, Los Angeles, CA 90210',
      contactPerson: 'Sarah Mitchell',
      title: 'Brand Manager'
    },
    marketsServed: ['United States', 'Canada', 'United Kingdom', 'France', 'Germany'],
    bio: 'Pure Essence is a clean beauty brand dedicated to creating effective, sustainable skincare products using only the finest natural ingredients. Founded in 2019, we specialize in minimalist formulations that deliver maximum results while maintaining our commitment to environmental responsibility and ethical sourcing.',
    logo: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20on%20white%20background%20premium%20skincare%20cosmetics&width=120&height=120&seq=brand-profile-logo&orientation=squarish',
    categories: ['Skincare', 'Body Care', 'Lip Care'],
    onboardingDate: '2023-08-15',
    assignedManager: {
      name: 'Michael Rodriguez',
      email: 'michael.r@synergyhub.com',
      phone: '+1 (555) 987-6543'
    },
    status: 'Active',
    tier: 'Premium',
    lastActivity: '2024-01-15'
  };

  const [formData, setFormData] = useState(brandProfile);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleApproval = (action: 'approve' | 'reject') => {
    setApprovalAction(action);
    setShowApprovalModal(true);
  };

  const confirmApproval = () => {
    console.log(`${approvalAction} brand profile`);
    setShowApprovalModal(false);
  };

  const handleDeactivate = () => {
    console.log('Deactivate brand');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Brand Profile Details</h3>
          <p className="text-sm text-gray-500 mt-1">Complete brand information and management settings</p>
        </div>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <>
              <button
                onClick={() => handleDeactivate()}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-pause-circle-line mr-2"></i>
                Deactivate
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-edit-line mr-2"></i>
                Edit Profile
              </button>
              <button
                onClick={() => handleApproval('approve')}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-check-line mr-2"></i>
                Approve Profile
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Basic Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Legal Entity</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.legalEntity}
                    onChange={(e) => setFormData({ ...formData, legalEntity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{formData.legalEntity}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 font-medium">
                    {formData.website}
                  </a>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {formData.status}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {formData.tier}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Contact Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.contactInfo.contactPerson}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      contactInfo: { ...formData.contactInfo, contactPerson: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{formData.contactInfo.contactPerson}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.contactInfo.title}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      contactInfo: { ...formData.contactInfo, title: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{formData.contactInfo.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      contactInfo: { ...formData.contactInfo, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{formData.contactInfo.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      contactInfo: { ...formData.contactInfo, phone: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{formData.contactInfo.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    value={formData.contactInfo.address}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      contactInfo: { ...formData.contactInfo, address: e.target.value }
                    })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                ) : (
                  <p className="text-gray-900">{formData.contactInfo.address}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Brand Description</h4>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                maxLength={500}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Brand Logo</h4>
            <div className="flex items-center justify-center w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg mx-auto mb-4">
              <img
                src={formData.logo}
                alt="Brand Logo"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {isEditing && (
              <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <i className="ri-upload-line mr-2"></i>
                Upload New Logo
              </button>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category, index) => (
                <span key={index} className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Markets Served</h4>
            <div className="space-y-2">
              {formData.marketsServed.map((market, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={`https://readdy.ai/api/search-image?query=$%7Bmarket%7D%20country%20flag%20icon%20simple%20clean%20design&width=20&height=14&seq=market-flag-${index}&orientation=landscape`}
                    alt={`${market} flag`}
                    className="w-5 h-3.5 rounded-sm object-cover"
                  />
                  <span className="text-sm text-gray-700">{market}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Account Manager</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {formData.assignedManager.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{formData.assignedManager.name}</div>
                  <div className="text-sm text-gray-500">Account Manager</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="mb-1">
                  <i className="ri-mail-line mr-2"></i>
                  {formData.assignedManager.email}
                </div>
                <div>
                  <i className="ri-phone-line mr-2"></i>
                  {formData.assignedManager.phone}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-base font-medium text-gray-900 mb-4">Timeline</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Onboarding Date:</span>
                <span className="text-gray-900">{formData.onboardingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Activity:</span>
                <span className="text-gray-900">{formData.lastActivity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm {approvalAction === 'approve' ? 'Approval' : 'Rejection'}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to {approvalAction} the brand profile for {formData.name}? 
              This action will {approvalAction === 'approve' ? 'activate' : 'deactivate'} the brand account.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmApproval}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 whitespace-nowrap cursor-pointer ${
                  approvalAction === 'approve' ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                Yes, {approvalAction === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
