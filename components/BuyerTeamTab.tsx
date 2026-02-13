'use client';

import { useState } from 'react';

interface BuyerTeamTabProps {
  buyerData: any;
}

export default function BuyerTeamTab({ buyerData }: BuyerTeamTabProps) {
  const [showAddMember, setShowAddMember] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
    department: ''
  });

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@wellnessbeauty.com',
      role: 'CEO & Founder',
      department: 'Executive',
      status: 'Active',
      joinDate: '2023-03-15',
      lastActivity: '2024-01-15',
      permissions: ['Full Access', 'Order Management', 'Financial'],
      isPrimary: true,
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@wellnessbeauty.com',
      role: 'Procurement Manager',
      department: 'Operations',
      status: 'Active',
      joinDate: '2023-05-20',
      lastActivity: '2024-01-14',
      permissions: ['Order Management', 'Catalog Access'],
      isPrimary: false,
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      email: 'emma@wellnessbeauty.com',
      role: 'Finance Director',
      department: 'Finance',
      status: 'Active',
      joinDate: '2023-04-10',
      lastActivity: '2024-01-13',
      permissions: ['Financial', 'Reporting'],
      isPrimary: false,
      avatar: 'ER'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david@wellnessbeauty.com',
      role: 'Marketing Coordinator',
      department: 'Marketing',
      status: 'Pending',
      joinDate: '2024-01-10',
      lastActivity: null,
      permissions: ['Catalog Access'],
      isPrimary: false,
      avatar: 'DK'
    }
  ];

  const roles = [
    'CEO & Founder',
    'Procurement Manager',
    'Finance Director',
    'Marketing Coordinator',
    'Operations Manager',
    'Sales Representative',
    'Product Manager',
    'Quality Assurance'
  ];

  const departments = [
    'Executive',
    'Operations',
    'Finance',
    'Marketing',
    'Sales',
    'Product Development',
    'Quality Assurance',
    'Customer Service'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMember = () => {
    console.log('Adding new member:', newMember);
    setNewMember({ name: '', email: '', role: '', department: '' });
    setShowAddMember(false);
  };

  const handleResendInvite = (memberId: number) => {
    setSelectedMember(memberId);
    setShowInviteModal(true);
  };

  const confirmResendInvite = () => {
    console.log('Resending invite to member:', selectedMember);
    setShowInviteModal(false);
    setSelectedMember(null);
  };

  const handleRemoveMember = (memberId: number) => {
    console.log('Removing member:', memberId);
  };

  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-team-line text-blue-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{teamMembers.length}</p>
              <p className="text-sm text-blue-700">Total Members</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-green-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {teamMembers.filter(m => m.status === 'Active').length}
              </p>
              <p className="text-sm text-green-700">Active</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-yellow-600"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {teamMembers.filter(m => m.status === 'Pending').length}
              </p>
              <p className="text-sm text-yellow-700">Pending</p>
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
                {[...new Set(teamMembers.map(m => m.department))].length}
              </p>
              <p className="text-sm text-purple-700">Departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
            <button
              onClick={() => setShowAddMember(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>
              Add Member
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role & Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {member.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{member.name}</p>
                          {member.isPrimary && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{member.role}</p>
                      <p className="text-sm text-gray-500">{member.department}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {member.joinDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {member.lastActivity || 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {member.status === 'Pending' && (
                        <button
                          onClick={() => handleResendInvite(member.id)}
                          className="text-blue-600 hover:text-blue-900 text-sm cursor-pointer"
                          title="Resend Invite"
                        >
                          <i className="ri-mail-send-line"></i>
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer" title="Edit">
                        <i className="ri-edit-line"></i>
                      </button>
                      {!member.isPrimary && (
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600 hover:text-red-900 text-sm cursor-pointer"
                          title="Remove"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Permission Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Full Access</h4>
            <p className="text-sm text-gray-600">Complete system access including admin functions</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Order Management</h4>
            <p className="text-sm text-gray-600">Create, modify, and track orders</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Financial</h4>
            <p className="text-sm text-gray-600">View invoices, payments, and financial reports</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Catalog Access</h4>
            <p className="text-sm text-gray-600">Browse products and brand catalogs</p>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-add-line text-blue-600"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Add Team Member</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  <option value="">Select role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={newMember.department}
                  onChange={(e) => setNewMember({...newMember, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddMember(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                disabled={!newMember.name || !newMember.email || !newMember.role || !newMember.department}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resend Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-mail-send-line text-blue-600"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Resend Invitation</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to resend the invitation to this team member?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmResendInvite}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap cursor-pointer"
              >
                Resend Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}