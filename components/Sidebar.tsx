
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [currentPath, setCurrentPath] = useState('');
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      setPathname(pathname);
    }
  }, []);

  const menuItems = [
    {
      category: 'Overview',
      items: [
        { name: 'Dashboard', icon: 'ri-dashboard-3-line', active: true, href: '/' }
      ]
    },
    {
      category: '',
      items: [
        { name: 'Access Request', icon: 'ri-user-add-line', active: false, href: '/access-requests', badge: '2' },
        { name: 'Connections', icon: 'ri-links-line', active: false, href: '/connections', badge: '3' }
      ]
    },
    {
      category: 'Brand',
      items: [
        { name: 'Brand Request', icon: 'ri-store-2-line', active: false, href: '/brand-requests' },
        { name: 'Brands', icon: 'ri-price-tag-3-line', active: false, href: '/brands' }
      ]
    },
    {
      category: 'Buyer',
      items: [
        { name: 'Buyer Request', icon: 'ri-user-search-line', active: false, href: '/buyer-requests' },
        { name: 'Buyers', icon: 'ri-group-line', active: false, href: '/buyers' }
      ]
    },
    {
      category: 'Business Operations',
      items: [
        { name: 'Orders', icon: 'ri-shopping-cart-line', badge: '19', active: false, href: '/orders' },
        { name: 'Billing & Invoices', icon: 'ri-file-list-3-line', active: false, href: '/billing' },
        { name: 'Compliance Center', icon: 'ri-shield-check-line', badge: '1', active: false, href: '/compliance' },
        { name: 'Conversations', icon: 'ri-chat-3-line', badge: '1', active: false, href: '/conversations' }
      ]
    },
    {
      category: 'Account',
      items: [
        { name: 'Settings', icon: 'ri-settings-3-line', active: false, href: '/settings' },
        { name: 'Help & Support', icon: 'ri-question-line', active: false, href: '/support' }
      ]
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-['Pacifico'] text-gray-800">Synergy</div>
          <div className="text-sm text-gray-500 font-medium">DIGITAL</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        <Link
          href="/"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname === '/'
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-dashboard-line mr-3 text-lg"></i>
          Dashboard
        </Link>

        <Link
          href="/orders"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname.startsWith('/orders')
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-shopping-cart-line mr-3 text-lg"></i>
          Orders
        </Link>

        <Link
          href="/billing"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname.startsWith('/billing')
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-file-list-3-line mr-3 text-lg"></i>
          Billing & Invoices
        </Link>

        <Link
          href="/buyers"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname.startsWith('/buyers')
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-user-line mr-3 text-lg"></i>
          Buyers
        </Link>

        <Link
          href="/brands"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname.startsWith('/brands')
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-store-line mr-3 text-lg"></i>
          Brands
        </Link>

        <Link
          href="/connections"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname.startsWith('/connections')
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-link-line mr-3 text-lg"></i>
          Connections
        </Link>

        <Link
          href="/compliance"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname.startsWith('/compliance')
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-shield-check-line mr-3 text-lg"></i>
          Compliance
        </Link>

        <Link
          href="/conversations"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname.startsWith('/conversations')
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-chat-3-line mr-3 text-lg"></i>
          Conversations
        </Link>

        <Link
          href="/brand-requests"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname.startsWith('/brand-requests')
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-file-list-3-line mr-3 text-lg"></i>
          Brand Requests
        </Link>

        <Link
          href="/buyer-requests"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname.startsWith('/buyer-requests')
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-user-add-line mr-3 text-lg"></i>
          Buyer Requests
        </Link>

        <Link
          href="/access-requests"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            pathname.startsWith('/access-requests')
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <i className="ri-key-line mr-3 text-lg"></i>
          Access Requests
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">John Doe</div>
            <div className="text-xs text-gray-500">Synergy Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
