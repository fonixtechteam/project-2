'use client';

import { useState } from 'react';

interface BuyerActivityTabProps {
  buyerData: any;
}

export default function BuyerActivityTab({ buyerData }: BuyerActivityTabProps) {
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'approval',
      title: 'Buyer Account Approved',
      description: 'Account approved by Jennifer Martinez after document verification',
      timestamp: '2024-01-15 14:30:22',
      user: 'Jennifer Martinez',
      userRole: 'Admin',
      details: {
        status: 'approved',
        previousStatus: 'pending',
        reason: 'All documents verified successfully'
      }
    },
    {
      id: 2,
      type: 'order',
      title: 'Order Placed',
      description: 'Order #ORD-2024-156 placed for Pure Essence products',
      timestamp: '2024-01-15 10:15:45',
      user: 'Sarah Johnson',
      userRole: 'Buyer',
      details: {
        orderId: 'ORD-2024-156',
        brand: 'Pure Essence',
        amount: '$2,450.00',
        items: 12
      }
    },
    {
      id: 3,
      type: 'document',
      title: 'Document Uploaded',
      description: 'GST Registration certificate uploaded and pending review',
      timestamp: '2024-01-10 16:42:18',
      user: 'Sarah Johnson',
      userRole: 'Buyer',
      details: {
        documentType: 'GST Registration',
        fileName: 'gst-registration-2024.pdf',
        fileSize: '1.8 MB',
        status: 'pending'
      }
    },
    {
      id: 4,
      type: 'connection',
      title: 'Brand Connection Approved',
      description: 'Connection request to Luxury Glow brand approved',
      timestamp: '2024-01-08 11:20:33',
      user: 'Michael Rodriguez',
      userRole: 'Brand Manager',
      details: {
        brand: 'Luxury Glow',
        connectionType: 'Premium Partnership',
        approvedBy: 'Michael Rodriguez'
      }
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment Received',
      description: 'Payment of $1,890.00 received for invoice #INV-2024-089',
      timestamp: '2024-01-08 09:15:27',
      user: 'System',
      userRole: 'Automated',
      details: {
        invoiceId: 'INV-2024-089',
        amount: '$1,890.00',
        paymentMethod: 'Bank Transfer',
        status: 'completed'
      }
    },
    {
      id: 6,
      type: 'edit',
      title: 'Profile Updated',
      description: 'Company address information updated',
      timestamp: '2024-01-05 14:55:12',
      user: 'Sarah Johnson',
      userRole: 'Buyer',
      details: {
        fieldsChanged: ['address', 'phone', 'contact_person'],
        changedBy: 'Sarah Johnson'
      }
    },
    {
      id: 7,
      type: 'message',
      title: 'Message Sent',
      description: 'Inquiry sent to Botanica Natural regarding bulk pricing',
      timestamp: '2024-01-03 13:28:44',
      user: 'Sarah Johnson',
      userRole: 'Buyer',
      details: {
        recipient: 'Botanica Natural',
        subject: 'Bulk Pricing Inquiry',
        messageType: 'inquiry'
      }
    },
    {
      id: 8,
      type: 'team',
      title: 'Team Member Added',
      description: 'David Kim added to marketing team with catalog access',
      timestamp: '2024-01-01 10:30:15',
      user: 'Sarah Johnson',
      userRole: 'Buyer',
      details: {
        memberName: 'David Kim',
        role: 'Marketing Coordinator',
        permissions: ['catalog_access'],
        inviteStatus: 'sent'
      }
    }
  ];

  const activityTypes = [
    { value: 'all', label: 'All Activities', icon: 'ri-list-check-2', count: activities.length },
    { value: 'approval', label: 'Approvals', icon: 'ri-check-line', count: activities.filter(a => a.type === 'approval').length },
    { value: 'order', label: 'Orders', icon: 'ri-shopping-cart-line', count: activities.filter(a => a.type === 'order').length },
    { value: 'document', label: 'Documents', icon: 'ri-file-line', count: activities.filter(a => a.type === 'document').length },
    { value: 'connection', label: 'Connections', icon: 'ri-links-line', count: activities.filter(a => a.type === 'connection').length },
    { value: 'payment', label: 'Payments', icon: 'ri-money-dollar-circle-line', count: activities.filter(a => a.type === 'payment').length },
    { value: 'edit', label: 'Profile Edits', icon: 'ri-edit-line', count: activities.filter(a => a.type === 'edit').length },
    { value: 'message', label: 'Messages', icon: 'ri-message-line', count: activities.filter(a => a.type === 'message').length },
    { value: 'team', label: 'Team Changes', icon: 'ri-team-line', count: activities.filter(a => a.type === 'team').length }
  ];

  const getActivityIcon = (type: string) => {
    const icons = {
      approval: 'ri-check-line text-green-600',
      order: 'ri-shopping-cart-line text-blue-600',
      document: 'ri-file-line text-purple-600',
      connection: 'ri-links-line text-orange-600',
      payment: 'ri-money-dollar-circle-line text-green-600',
      edit: 'ri-edit-line text-gray-600',
      message: 'ri-message-line text-blue-600',
      team: 'ri-team-line text-purple-600'
    };
    return icons[type as keyof typeof icons] || 'ri-information-line text-gray-600';
  };

  const getActivityBgColor = (type: string) => {
    const colors = {
      approval: 'bg-green-100',
      order: 'bg-blue-100',
      document: 'bg-purple-100',
      connection: 'bg-orange-100',
      payment: 'bg-green-100',
      edit: 'bg-gray-100',
      message: 'bg-blue-100',
      team: 'bg-purple-100'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  const filteredActivities = activities.filter(activity => {
    if (filterType !== 'all' && activity.type !== filterType) return false;
    if (filterDate !== 'all') {
      const activityDate = new Date(activity.timestamp);
      const now = new Date();
      switch (filterDate) {
        case 'today':
          return activityDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return activityDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return activityDate >= monthAgo;
        default:
          return true;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Activity Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {activityTypes.slice(0, 6).map((type) => (
          <div key={type.value} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <i className={`${type.icon} text-gray-600`}></i>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{type.count}</p>
            <p className="text-sm text-gray-600">{type.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter by Type:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {activityTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} ({type.count})
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter by Date:</label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer">
              <i className="ri-download-line mr-2"></i>
              Export Log
            </button>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Activity Timeline</h3>
            <div className="text-sm text-gray-500">
              Showing {filteredActivities.length} of {activities.length} activities
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {filteredActivities.map((activity, index) => {
              const { date, time } = formatTimestamp(activity.timestamp);
              return (
                <div key={activity.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityBgColor(activity.type)}`}>
                      <i className={getActivityIcon(activity.type)}></i>
                    </div>
                    {index < filteredActivities.length - 1 && (
                      <div className="w-px h-16 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500 ml-4">
                        <div>{date}</div>
                        <div>{time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <i className="ri-user-line"></i>
                        <span>{activity.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="ri-shield-line"></i>
                        <span>{activity.userRole}</span>
                      </div>
                    </div>
                    
                    {/* Activity Details */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {Object.entries(activity.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}:
                            </span>
                            <span className="font-medium text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-file-list-line text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Activities Found</h3>
              <p className="text-gray-500">No activities match your current filter criteria.</p>
            </div>
          )}
          
          {filteredActivities.length > 0 && (
            <div className="text-center pt-6 border-t border-gray-200">
              <button className="px-6 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 whitespace-nowrap cursor-pointer">
                Load More Activities
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}