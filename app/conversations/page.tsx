
'use client';

import Sidebar from '../../components/Sidebar';
import ConversationsScreen from './ConversationsScreen';

export default function ConversationsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <ConversationsScreen />
      </div>
    </div>
  );
}
