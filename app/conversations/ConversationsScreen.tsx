
'use client';

import { useState } from 'react';

interface Message {
  id: string;
  sender: string;
  senderType: 'admin' | 'buyer' | 'brand';
  content: string;
  timestamp: string;
  forwarded?: boolean;
  forwardedTo?: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  type: 'buyer' | 'brand' | 'connection' | 'order';
  participants: {
    buyer?: { name: string; company: string; avatar: string; id: string };
    brand?: { name: string; company: string; avatar: string; id: string };
    orderId?: string;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'active' | 'resolved' | 'pending';
  messages: Message[];
}

export default function ConversationsScreen() {
  const [activeTab, setActiveTab] = useState<'buyer' | 'brand' | 'connections' | 'orders'>('buyer');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [messageToForward, setMessageToForward] = useState<Message | null>(null);
  const [forwardTarget, setForwardTarget] = useState<'buyer' | 'brand'>('buyer');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: 'conv-buyer-1',
      type: 'buyer',
      participants: {
        buyer: {
          name: 'Wellness Beauty Co.',
          company: 'Premium Retail Chain',
          avatar: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional%20corporate%20identity&width=40&height=40&seq=buyer-conv-1&orientation=squarish',
          id: 'buyer-001'
        }
      },
      lastMessage: 'Could you help us connect with more organic skincare brands for our Q2 expansion?',
      timestamp: '2024-01-20 14:30',
      unreadCount: 2,
      status: 'active',
      messages: [
        {
          id: 'msg-1',
          sender: 'Sarah Johnson',
          senderType: 'buyer',
          content: 'Hi admin, we are looking to expand our organic skincare product line for Q2. Could you help us connect with more brands in this category? We are particularly interested in brands with clean beauty certifications.',
          timestamp: '2024-01-20 13:45',
          status: 'read'
        },
        {
          id: 'msg-2',
          sender: 'Admin',
          senderType: 'admin',
          content: 'Hello Sarah! I can definitely help you with that expansion. Let me connect you with some of our top organic skincare brands that have clean beauty certifications. I will forward your request to Pure Essence, GreenGlow Botanicals, and Natural Luxe.',
          timestamp: '2024-01-20 14:10',
          status: 'read',
          forwarded: true,
          forwardedTo: 'Pure Essence, GreenGlow Botanicals, Natural Luxe'
        },
        {
          id: 'msg-3',
          sender: 'Sarah Johnson',
          senderType: 'buyer',
          content: 'Perfect! Could you also share their current wholesale pricing and minimum order requirements?',
          timestamp: '2024-01-20 14:30',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'conv-buyer-2',
      type: 'buyer',
      participants: {
        buyer: {
          name: 'Beauty Boutique Paris',
          company: 'European Luxury Retailer',
          avatar: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics%20premium%20brand&width=40&height=40&seq=buyer-conv-2&orientation=squarish',
          id: 'buyer-002'
        }
      },
      lastMessage: 'We need assistance with import regulations for the new product line.',
      timestamp: '2024-01-20 11:20',
      unreadCount: 1,
      status: 'pending',
      messages: [
        {
          id: 'msg-4',
          sender: 'Marie Dubois',
          senderType: 'buyer',
          content: 'Bonjour! We are having some challenges with the import regulations for the new Korean beauty products. Could you assist us with the compliance documentation?',
          timestamp: '2024-01-20 11:20',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'conv-buyer-3',
      type: 'buyer',
      participants: {
        buyer: {
          name: 'Nordic Spa Solutions',
          company: 'Scandinavian Wellness Chain',
          avatar: 'https://readdy.ai/api/search-image?query=nordic%20spa%20solutions%20logo%20minimalist%20scandinavian%20design%20blue%20white%20clean%20wellness%20professional&width=40&height=40&seq=buyer-conv-3&orientation=squarish',
          id: 'buyer-003'
        }
      },
      lastMessage: 'Thank you for the brand recommendations. We would like to schedule meetings with 3 of them.',
      timestamp: '2024-01-19 16:45',
      unreadCount: 0,
      status: 'resolved',
      messages: [
        {
          id: 'msg-15',
          sender: 'Erik Larsson',
          senderType: 'buyer',
          content: 'Thank you for the brand recommendations. We would like to schedule meetings with 3 of them.',
          timestamp: '2024-01-19 16:45',
          status: 'read'
        }
      ]
    },
    {
      id: 'conv-brand-1',
      type: 'brand',
      participants: {
        brand: {
          name: 'Pure Essence',
          company: 'Luxury Skincare Brand',
          avatar: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare%20natural%20elements&width=40&height=40&seq=brand-conv-1&orientation=squarish',
          id: 'brand-001'
        }
      },
      lastMessage: 'We have updated our wholesale pricing structure for Q2 and new product launches.',
      timestamp: '2024-01-20 11:15',
      unreadCount: 0,
      status: 'active',
      messages: [
        {
          id: 'msg-5',
          sender: 'Pure Essence Team',
          senderType: 'brand',
          content: 'Hello admin, we have updated our wholesale pricing structure for Q2 and are launching 3 new products. Could you please notify our connected buyers about the new pricing tiers and product availability?',
          timestamp: '2024-01-20 10:30',
          status: 'read'
        },
        {
          id: 'msg-6',
          sender: 'Admin',
          senderType: 'admin',
          content: 'Thank you for the update! I will immediately forward this information to all your connected buyers and also update the pricing in their dashboards. The new product information will be shared as well.',
          timestamp: '2024-01-20 11:00',
          status: 'read',
          forwarded: true,
          forwardedTo: 'All Connected Buyers (12 retailers)'
        },
        {
          id: 'msg-7',
          sender: 'Pure Essence Team',
          senderType: 'brand',
          content: 'Perfect! Could you also schedule a virtual product showcase for our VIP buyers next week?',
          timestamp: '2024-01-20 11:15',
          status: 'read'
        }
      ]
    },
    {
      id: 'conv-brand-2',
      type: 'brand',
      participants: {
        brand: {
          name: 'GreenGlow Botanicals',
          company: 'Organic Beauty Brand',
          avatar: 'https://readdy.ai/api/search-image?query=green%20botanical%20beauty%20brand%20logo%20natural%20organic%20leaves%20design%20eco%20friendly%20sustainable%20cosmetics&width=40&height=40&seq=brand-conv-2&orientation=squarish',
          id: 'brand-002'
        }
      },
      lastMessage: 'Request for expedited review of our new organic certification.',
      timestamp: '2024-01-20 09:45',
      unreadCount: 1,
      status: 'pending',
      messages: [
        {
          id: 'msg-8',
          sender: 'GreenGlow Team',
          senderType: 'brand',
          content: 'Hi admin, we just received our new USDA Organic certification for our entire face care line. Could you expedite the review process so we can start marketing to organic-focused buyers?',
          timestamp: '2024-01-20 09:45',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'conv-brand-3',
      type: 'brand',
      participants: {
        brand: {
          name: 'Artisan Cosmetics',
          company: 'Handcrafted Beauty Products',
          avatar: 'https://readdy.ai/api/search-image?query=artisan%20cosmetics%20brand%20logo%20handcrafted%20beauty%20natural%20ingredients%20vintage%20style%20professional&width=40&height=40&seq=brand-conv-3&orientation=squarish',
          id: 'brand-003'
        }
      },
      lastMessage: 'We need guidance on platform compliance requirements for international sales.',
      timestamp: '2024-01-18 14:20',
      unreadCount: 2,
      status: 'active',
      messages: [
        {
          id: 'msg-16',
          sender: 'Artisan Team',
          senderType: 'brand',
          content: 'We need guidance on platform compliance requirements for international sales.',
          timestamp: '2024-01-18 14:20',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'conv-connection-1',
      type: 'connection',
      participants: {
        buyer: {
          name: 'Beauty Boutique Paris',
          company: 'European Luxury Retailer',
          avatar: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics%20premium%20brand&width=40&height=40&seq=buyer-conn-1&orientation=squarish',
          id: 'buyer-002'
        },
        brand: {
          name: 'GreenGlow Botanicals',
          company: 'Organic Beauty Brand',
          avatar: 'https://readdy.ai/api/search-image?query=green%20botanical%20beauty%20brand%20logo%20natural%20organic%20leaves%20design%20eco%20friendly%20sustainable%20cosmetics&width=40&height=40&seq=brand-conn-1&orientation=squarish',
          id: 'brand-002'
        }
      },
      lastMessage: 'Brand: We can offer a 15% volume discount for orders over €5,000 plus free shipping.',
      timestamp: '2024-01-20 16:45',
      unreadCount: 1,
      status: 'active',
      messages: [
        {
          id: 'msg-9',
          sender: 'Marie Dubois',
          senderType: 'buyer',
          content: 'We are very interested in your organic face serum line for our Paris locations. Could you provide detailed pricing for bulk orders and information about your sustainability initiatives?',
          timestamp: '2024-01-20 15:30',
          status: 'read'
        },
        {
          id: 'msg-10',
          sender: 'GreenGlow Team',
          senderType: 'brand',
          content: 'Bonjour Marie! Thank you for your interest in our organic line. For bulk orders of 100+ units, we offer competitive pricing. We can offer a 15% volume discount for orders over €5,000 plus complimentary shipping to France.',
          timestamp: '2024-01-20 16:45',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'conv-connection-2',
      type: 'connection',
      participants: {
        buyer: {
          name: 'Wellness Beauty Co.',
          company: 'Premium Retail Chain',
          avatar: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional%20corporate%20identity&width=40&height=40&seq=buyer-conn-2&orientation=squarish',
          id: 'buyer-001'
        },
        brand: {
          name: 'Pure Essence',
          company: 'Luxury Skincare Brand',
          avatar: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare%20natural%20elements&width=40&height=40&seq=brand-conn-2&orientation=squarish',
          id: 'brand-001'
        }
      },
      lastMessage: 'Admin: I have facilitated the partnership introduction and shared the initial pricing information.',
      timestamp: '2024-01-20 13:50',
      unreadCount: 0,
      status: 'active',
      messages: [
        {
          id: 'msg-11',
          sender: 'Sarah Johnson',
          senderType: 'buyer',
          content: 'We are excited about partnering with Pure Essence for our spring collection. Could you help us understand their product line better and coordinate a meeting?',
          timestamp: '2024-01-20 12:15',
          status: 'read'
        },
        {
          id: 'msg-12',
          sender: 'Admin',
          senderType: 'admin',
          content: 'Absolutely! I will coordinate between both parties. Pure Essence has an excellent spring collection that would fit perfectly with your wellness brand positioning.',
          timestamp: '2024-01-20 12:30',
          status: 'read'
        },
        {
          id: 'msg-13',
          sender: 'Pure Essence Team',
          senderType: 'brand',
          content: 'We are thrilled to work with Wellness Beauty Co! We can provide sample products and arrange a virtual meeting to discuss the spring collection and wholesale terms.',
          timestamp: '2024-01-20 13:15',
          status: 'read'
        },
        {
          id: 'msg-14',
          sender: 'Admin',
          senderType: 'admin',
          content: 'I have facilitated the partnership introduction and shared the initial pricing information. Both parties can now proceed with direct discussions.',
          timestamp: '2024-01-20 13:50',
          status: 'read',
          forwarded: true,
          forwardedTo: 'Both Parties'
        }
      ]
    },
    {
      id: 'conv-connection-3',
      type: 'connection',
      participants: {
        buyer: {
          name: 'Nordic Spa Solutions',
          company: 'Scandinavian Wellness Chain',
          avatar: 'https://readdy.ai/api/search-image?query=nordic%20spa%20solutions%20logo%20minimalist%20scandinavian%20design%20blue%20white%20clean%20wellness%20professional&width=40&height=40&seq=buyer-conn-3&orientation=squarish',
          id: 'buyer-003'
        },
        brand: {
          name: 'Artisan Cosmetics',
          company: 'Handcrafted Beauty Products',
          avatar: 'https://readdy.ai/api/search-image?query=artisan%20cosmetics%20brand%20logo%20handcrafted%20beauty%20natural%20ingredients%20vintage%20style%20professional&width=40&height=40&seq=brand-conn-3&orientation=squarish',
          id: 'brand-003'
        }
      },
      lastMessage: 'Buyer: The handcrafted products align perfectly with our spa\'s premium positioning.',
      timestamp: '2024-01-19 12:30',
      unreadCount: 2,
      status: 'pending',
      messages: [
        {
          id: 'msg-17',
          sender: 'Erik Larsson',
          senderType: 'buyer',
          content: 'We are interested in featuring handcrafted beauty products at our Nordic spas. Could you connect us with Artisan Cosmetics to discuss their product range?',
          timestamp: '2024-01-19 10:15',
          status: 'read'
        },
        {
          id: 'msg-18',
          sender: 'Admin',
          senderType: 'admin',
          content: 'Perfect match! Artisan Cosmetics specializes in handcrafted, natural products that would complement your spa services beautifully. Let me facilitate this connection.',
          timestamp: '2024-01-19 10:45',
          status: 'read'
        },
        {
          id: 'msg-19',
          sender: 'Artisan Team',
          senderType: 'brand',
          content: 'We are delighted to connect with Nordic Spa Solutions! Our handcrafted line includes spa-specific products like massage oils, facial treatments, and aromatherapy items.',
          timestamp: '2024-01-19 11:30',
          status: 'read'
        },
        {
          id: 'msg-20',
          sender: 'Erik Larsson',
          senderType: 'buyer',
          content: 'The handcrafted products align perfectly with our spa\'s premium positioning. We would love to schedule a product demonstration and discuss exclusive arrangements for Scandinavia.',
          timestamp: '2024-01-19 12:30',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'conv-connection-4',
      type: 'connection',
      participants: {
        buyer: {
          name: 'Urban Beauty Store',
          company: 'Modern Cosmetics Retailer',
          avatar: 'https://readdy.ai/api/search-image?query=urban%20beauty%20store%20logo%20modern%20city%20cosmetics%20retailer%20contemporary%20design&width=40&height=40&seq=buyer-conn-4&orientation=squarish',
          id: 'buyer-004'
        },
        brand: {
          name: 'TechGlow Innovations',
          company: 'Advanced Skincare Technology',
          avatar: 'https://readdy.ai/api/search-image?query=tech%20glow%20innovations%20logo%20advanced%20skincare%20technology%20modern%20scientific%20design&width=40&height=40&seq=brand-conn-4&orientation=squarish',
          id: 'brand-004'
        }
      },
      lastMessage: 'Brand: Our LED therapy devices are perfect for tech-savvy beauty consumers.',
      timestamp: '2024-01-18 15:20',
      unreadCount: 0,
      status: 'resolved',
      messages: [
        {
          id: 'msg-21',
          sender: 'Alex Chen',
          senderType: 'buyer',
          content: 'We are looking for innovative beauty tech products for our urban millennial customers. Could you connect us with brands offering LED therapy or smart skincare devices?',
          timestamp: '2024-01-18 14:00',
          status: 'read'
        },
        {
          id: 'msg-22',
          sender: 'TechGlow Team',
          senderType: 'brand',
          content: 'Our LED therapy devices and smart skincare analyzers are perfect for tech-savvy beauty consumers. We offer comprehensive training and marketing support.',
          timestamp: '2024-01-18 15:20',
          status: 'read'
        }
      ]
    },
    {
      id: 'conv-order-1',
      type: 'order',
      participants: {
        buyer: {
          name: 'Wellness Beauty Co.',
          company: 'Premium Retail Chain',
          avatar: 'https://readdy.ai/api/search-image?query=modern%20wellness%20beauty%20company%20logo%20clean%20minimalist%20design%20with%20green%20accents%20professional%20corporate%20identity&width=40&height=40&seq=buyer-order-1&orientation=squarish',
          id: 'buyer-001'
        },
        brand: {
          name: 'Pure Essence',
          company: 'Luxury Skincare Brand',
          avatar: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20logo%20elegant%20minimalist%20design%20with%20golden%20accents%20premium%20skincare%20natural%20elements&width=40&height=40&seq=brand-order-1&orientation=squarish',
          id: 'brand-001'
        },
        orderId: 'ORD-2024-001'
      },
      lastMessage: 'Admin: I have expedited your order with Pure Essence. Expect delivery by Thursday.',
      timestamp: '2024-01-20 13:20',
      unreadCount: 1,
      status: 'active',
      messages: [
        {
          id: 'msg-12',
          sender: 'Sarah Johnson',
          senderType: 'buyer',
          content: 'Hi, I need an urgent update on order ORD-2024-001. We have a product launch event scheduled for next week and need the delivery to arrive by Friday.',
          timestamp: '2024-01-20 12:30',
          status: 'read'
        },
        {
          id: 'msg-13',
          sender: 'Admin',
          senderType: 'admin',
          content: 'I understand the urgency of your product launch. Let me immediately contact Pure Essence to expedite the processing and shipping of your order.',
          timestamp: '2024-01-20 12:45',
          status: 'read'
        },
        {
          id: 'msg-14',
          sender: 'Pure Essence Team',
          senderType: 'brand',
          content: 'We can expedite order ORD-2024-001 for rush processing. The order will be shipped via express delivery today and should arrive by Thursday morning.',
          timestamp: '2024-01-20 13:00',
          status: 'read'
        },
        {
          id: 'msg-15',
          sender: 'Admin',
          senderType: 'admin',
          content: 'Great news! I have expedited your order with Pure Essence. Expect delivery by Thursday morning, which gives you a day buffer before your Friday launch event.',
          timestamp: '2024-01-20 13:20',
          status: 'delivered',
          forwarded: true,
          forwardedTo: 'Both Parties'
        }
      ]
    },
    {
      id: 'conv-order-2',
      type: 'order',
      participants: {
        buyer: {
          name: 'Beauty Boutique Paris',
          company: 'European Luxury Retailer',
          avatar: 'https://readdy.ai/api/search-image?query=french%20beauty%20boutique%20logo%20elegant%20parisian%20style%20golden%20accents%20luxury%20cosmetics%20premium%20brand&width=40&height=40&seq=buyer-order-2&orientation=squarish',
          id: 'buyer-002'
        },
        brand: {
          name: 'GreenGlow Botanicals',
          company: 'Organic Beauty Brand',
          avatar: 'https://readdy.ai/api/search-image?query=green%20botanical%20beauty%20brand%20logo%20natural%20organic%20leaves%20design%20eco%20friendly%20sustainable%20cosmetics&width=40&height=40&seq=brand-order-2&orientation=squarish',
          id: 'brand-002'
        },
        orderId: 'ORD-2024-007'
      },
      lastMessage: 'Brand: Order ORD-2024-007 has been shipped with express delivery. Tracking: GG2024007FR.',
      timestamp: '2024-01-19 17:30',
      unreadCount: 0,
      status: 'resolved',
      messages: [
        {
          id: 'msg-13',
          sender: 'Marie Dubois',
          senderType: 'buyer',
          content: 'Bonjour! Could you please provide an update on order ORD-2024-007? Our customers are eagerly waiting for the new organic serum collection.',
          timestamp: '2024-01-19 16:15',
          status: 'read'
        },
        {
          id: 'msg-14',
          sender: 'Admin',
          senderType: 'admin',
          content: 'Let me check with GreenGlow Botanicals on the status of your organic serum order and provide you with a detailed update.',
          timestamp: '2024-01-19 16:30',
          status: 'read'
        },
        {
          id: 'msg-15',
          sender: 'GreenGlow Team',
          senderType: 'brand',
          content: 'Order ORD-2024-007 has been processed and shipped with express delivery. Tracking number: GG2024007FR. Expected delivery: Monday morning to your Paris location.',
          timestamp: '2024-01-19 17:30',
          status: 'read'
        }
      ]
    },
    {
      id: 'conv-order-3',
      type: 'order',
      participants: {
        buyer: {
          name: 'Nordic Spa Solutions',
          company: 'Scandinavian Wellness Chain',
          avatar: 'https://readdy.ai/api/search-image?query=nordic%20spa%20solutions%20logo%20minimalist%20scandinavian%20design%20blue%20white%20clean%20wellness%20professional&width=40&height=40&seq=buyer-order-3&orientation=squarish',
          id: 'buyer-003'
        },
        brand: {
          name: 'Artisan Cosmetics',
          company: 'Handcrafted Beauty Products',
          avatar: 'https://readdy.ai/api/search-image?query=artisan%20cosmetics%20brand%20logo%20handcrafted%20beauty%20natural%20ingredients%20vintage%20style%20professional&width=40&height=40&seq=brand-order-3&orientation=squarish',
          id: 'brand-003'
        },
        orderId: 'ORD-2024-012'
      },
      lastMessage: 'Admin: I am coordinating the replacement of defective items and expediting quality control.',
      timestamp: '2024-01-18 11:45',
      unreadCount: 2,
      status: 'pending',
      messages: [
        {
          id: 'msg-18',
          sender: 'Erik Larsson',
          senderType: 'buyer',
          content: 'We have received order ORD-2024-012, but there seems to be a quality issue with 3 massage oil bottles. The consistency appears different from our previous orders.',
          timestamp: '2024-01-18 10:15',
          status: 'read'
        },
        {
          id: 'msg-19',
          sender: 'Admin',
          senderType: 'admin',
          content: 'I apologize for the quality issue. Let me immediately contact Artisan Cosmetics to investigate this matter and arrange for replacement products.',
          timestamp: '2024-01-18 10:30',
          status: 'read'
        },
        {
          id: 'msg-20',
          sender: 'Artisan Team',
          senderType: 'brand',
          content: 'We sincerely apologize for the quality inconsistency. We will immediately send replacement bottles and implement additional quality control measures for future orders.',
          timestamp: '2024-01-18 11:15',
          status: 'read'
        },
        {
          id: 'msg-21',
          sender: 'Admin',
          senderType: 'admin',
          content: 'I am coordinating the replacement of the defective items and ensuring expedited quality control. The replacement products will be shipped today with express delivery.',
          timestamp: '2024-01-18 11:45',
          status: 'delivered',
          forwarded: true,
          forwardedTo: 'Both Parties'
        }
      ]
    },
    {
      id: 'conv-order-4',
      type: 'order',
      participants: {
        buyer: {
          name: 'Urban Beauty Store',
          company: 'Modern Cosmetics Retailer',
          avatar: 'https://readdy.ai/api/search-image?query=urban%20beauty%20store%20logo%20modern%20city%20cosmetics%20retailer%20contemporary%20design&width=40&height=40&seq=buyer-order-4&orientation=squarish',
          id: 'buyer-004'
        },
        brand: {
          name: 'TechGlow Innovations',
          company: 'Advanced Skincare Technology',
          avatar: 'https://readdy.ai/api/search-image?query=tech%20glow%20innovations%20logo%20advanced%20skincare%20technology%20modern%20scientific%20design&width=40&height=40&seq=brand-order-4&orientation=squarish',
          id: 'brand-004'
        },
        orderId: 'ORD-2024-018'
      },
      lastMessage: 'Buyer: The LED devices are performing excellently. Our customers love the smart features.',
      timestamp: '2024-01-17 14:20',
      unreadCount: 0,
      status: 'resolved',
      messages: [
        {
          id: 'msg-22',
          sender: 'Alex Chen',
          senderType: 'buyer',
          content: 'The LED therapy devices from order ORD-2024-018 are performing excellently. Our customers love the smart features and the results. Thank you for the smooth coordination!',
          timestamp: '2024-01-17 14:20',
          status: 'read'
        }
      ]
    },
    {
      id: 'conv-order-5',
      type: 'order',
      participants: {
        buyer: {
          name: 'Luxury Spa Network',
          company: 'Premium Wellness Centers',
          avatar: 'https://readdy.ai/api/search-image?query=luxury%20spa%20network%20logo%20premium%20wellness%20centers%20elegant%20design%20relaxation&width=40&height=40&seq=buyer-order-5&orientation=squarish',
          id: 'buyer-005'
        },
        brand: {
          name: 'Botanical Bliss',
          company: 'Natural Spa Products',
          avatar: 'https://readdy.ai/api/search-image?query=botanical%20bliss%20brand%20logo%20natural%20spa%20products%20organic%20herbs%20wellness&width=40&height=40&seq=brand-order-5&orientation=squarish',
          id: 'brand-005'
        },
        orderId: 'ORD-2024-025'
      },
      lastMessage: 'Brand: Custom formulation for your spa network is ready. Awaiting final approval.',
      timestamp: '2024-01-16 16:30',
      unreadCount: 1,
      status: 'active',
      messages: [
        {
          id: 'msg-23',
          sender: 'Isabella Martinez',
          senderType: 'buyer',
          content: 'We need custom formulations for our luxury spa treatments. Could you help coordinate a bespoke product line with Botanical Bliss for order ORD-2024-025?',
          timestamp: '2024-01-16 14:00',
          status: 'read'
        },
        {
          id: 'msg-24',
          sender: 'Admin',
          senderType: 'admin',
          content: 'Absolutely! I will coordinate with Botanical Bliss to develop custom formulations that align with your luxury spa brand and treatment protocols.',
          timestamp: '2024-01-16 14:30',
          status: 'read'
        },
        {
          id: 'msg-25',
          sender: 'Botanical Bliss Team',
          senderType: 'brand',
          content: 'The custom formulation samples for your spa network are ready, featuring exclusive botanical extracts. The products are awaiting your final approval before full production.',
          timestamp: '2024-01-16 16:30',
          status: 'delivered'
        }
      ]
    }
  ];

  const tabs = [
    { id: 'buyer', name: 'Buyer Chat', icon: 'ri-user-line', count: conversations.filter(c => c.type === 'buyer').length },
    { id: 'brand', name: 'Brand Chat', icon: 'ri-store-2-line', count: conversations.filter(c => c.type === 'brand').length },
    { id: 'connections', name: 'Connection Chat', icon: 'ri-links-line', count: conversations.filter(c => c.type === 'connection').length },
    { id: 'orders', name: 'Order Chat', icon: 'ri-shopping-cart-line', count: conversations.filter(c => c.type === 'order').length }
  ];

  const filteredConversations = conversations.filter(conv => {
    const tabType = activeTab === 'connections' ? 'connection' : activeTab === 'orders' ? 'order' : activeTab;
    if (conv.type !== tabType) return false;
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      conv.participants.buyer?.name.toLowerCase().includes(searchLower) ||
      conv.participants.buyer?.company.toLowerCase().includes(searchLower) ||
      conv.participants.brand?.name.toLowerCase().includes(searchLower) ||
      conv.participants.brand?.company.toLowerCase().includes(searchLower) ||
      conv.participants.orderId?.toLowerCase().includes(searchLower) ||
      conv.lastMessage.toLowerCase().includes(searchLower)
    );
  });

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    console.log('Sending admin message:', newMessage, 'to conversation:', selectedConversation);
    setNewMessage('');
  };

  const handleForwardMessage = (message: Message) => {
    setMessageToForward(message);
    setShowForwardModal(true);
  };

  const confirmForwardMessage = () => {
    if (!messageToForward) return;

    console.log('Forwarding message:', messageToForward.id, 'to:', forwardTarget);
    setShowForwardModal(false);
    setMessageToForward(null);
  };

  const handleResolveConversation = () => {
    if (!selectedConversation) return;

    console.log('Resolving conversation:', selectedConversation);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'resolved':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return 'ri-check-line text-gray-400';
      case 'delivered':
        return 'ri-check-double-line text-blue-500';
      case 'read':
        return 'ri-check-double-line text-green-500';
      default:
        return 'ri-time-line text-gray-400';
    }
  };

  const renderConversationHeader = (conversation: Conversation) => {
    switch (conversation.type) {
      case 'buyer':
        return (
          <div className="flex items-center gap-4">
            <img
              src={conversation.participants.buyer?.avatar}
              alt={conversation.participants.buyer?.name}
              className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-lg">{conversation.participants.buyer?.name}</h4>
              <p className="text-sm text-gray-600">{conversation.participants.buyer?.company}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Buyer Communication</span>
              </div>
            </div>
          </div>
        );

      case 'brand':
        return (
          <div className="flex items-center gap-4">
            <img
              src={conversation.participants.brand?.avatar}
              alt={conversation.participants.brand?.name}
              className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-lg">{conversation.participants.brand?.name}</h4>
              <p className="text-sm text-gray-600">{conversation.participants.brand?.company}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Brand Communication</span>
              </div>
            </div>
          </div>
        );

      case 'connection':
        return (
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={conversation.participants.buyer?.avatar}
                alt={conversation.participants.buyer?.name}
                className="w-10 h-10 rounded-lg object-cover border-2 border-white shadow-sm"
              />
              <img
                src={conversation.participants.brand?.avatar}
                alt={conversation.participants.brand?.name}
                className="w-10 h-10 rounded-lg object-cover border-2 border-white shadow-sm absolute -right-2 -bottom-1"
              />
            </div>
            <div className="flex-1 ml-3">
              <h4 className="font-semibold text-gray-900 text-lg">
                {conversation.participants.buyer?.name} {''} {conversation.participants.brand?.name}
              </h4>
              <p className="text-sm text-gray-600">Connection Mediation</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Brand-Buyer Connection</span>
              </div>
            </div>
          </div>
        );

      case 'order':
        return (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-white shadow-sm">
              <i className="ri-shopping-cart-line text-blue-600 text-xl"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-lg">Order {conversation.participants.orderId}</h4>
              <p className="text-sm text-gray-600">
                {conversation.participants.buyer?.name} {''} {conversation.participants.brand?.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Order Support</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderConversationListItem = (conversation: Conversation) => {
    const isSelected = selectedConversation === conversation.id;

    return (
      <div
        key={conversation.id}
        onClick={() => setSelectedConversation(conversation.id)}
        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${isSelected ? 'bg-red-50 border-r-4 border-red-500' : ''}`}
      >
        <div className="flex items-start gap-3">
          {conversation.type === 'connection' ? (
            <div className="relative flex-shrink-0">
              <img
                src={conversation.participants.buyer?.avatar}
                alt={conversation.participants.buyer?.name}
                className="w-8 h-8 rounded-lg object-cover border border-white"
              />
              <img
                src={conversation.participants.brand?.avatar}
                alt={conversation.participants.brand?.name}
                className="w-8 h-8 rounded-lg object-cover border border-white absolute -right-1 -bottom-1"
              />
            </div>
          ) : conversation.type === 'order' ? (
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="ri-shopping-cart-line text-blue-600"></i>
            </div>
          ) : (
            <img
              src={conversation.participants.buyer?.avatar || conversation.participants.brand?.avatar}
              alt="Participant"
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium text-gray-900 truncate text-sm">
                {conversation.type === 'buyer' && conversation.participants.buyer?.name}
                {conversation.type === 'brand' && conversation.participants.brand?.name}
                {conversation.type === 'connection' && (
                  <span className="text-xs">
                    {conversation.participants.buyer?.name} {''} {conversation.participants.brand?.name}
                  </span>
                )}
                {conversation.type === 'order' && `Order ${conversation.participants.orderId}`}
              </div>
              <div className="flex items-center gap-2">
                {conversation.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[18px] h-5 flex items-center justify-center font-medium">
                    {conversation.unreadCount}
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {new Date(conversation.timestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            {conversation.type !== 'connection' && (
              <div className="text-xs text-gray-500 mb-1">
                {conversation.participants.buyer?.company || conversation.participants.brand?.company}
              </div>
            )}

            <p className="text-sm text-gray-600 truncate mb-2 leading-relaxed">{conversation.lastMessage}</p>

            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(conversation.status)}`}>
                {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
              </span>
              {conversation.type === 'connection' && (
                <span className="text-xs text-gray-500 bg-green-50 px-2 py-1 rounded-full">Mediated</span>
              )}
              {conversation.type === 'order' && (
                <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded-full">Support</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Conversations</h1>
            <p className="text-gray-600 mt-1">Manage and mediate all platform communications across buyers, brands, connections, and orders</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <i className="ri-shield-check-line text-blue-600"></i>
              <span className="text-sm text-gray-700">Admin Mediated</span>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
              <i className="ri-settings-3-line mr-2"></i>
              Settings
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Tab Navigation */}
          <div className="p-4 border-b border-gray-200">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSelectedConversation(null);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-red-50 text-red-600 border-2 border-red-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`${tab.icon} text-lg`}></i>
                    <span>{tab.name}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    activeTab === tab.id ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map(renderConversationListItem)
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
                <i className="ri-chat-3-line text-4xl text-gray-300 mb-3"></i>
                <h3 className="font-medium text-gray-900 mb-1">No conversations found</h3>
                <p className="text-sm text-center">No active conversations in this category</p>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Chat Management:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li className="flex items-center gap-3">
                      <i className="ri-check-line text-green-500"></i>
                      View complete conversation history
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="ri-check-line text-green-500"></i>
                      Forward messages between parties
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="ri-check-line text-green-500"></i>
                      Admin mediation and direct replies
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="ri-check-line text-green-500"></i>
                      Mark conversations as resolved
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="ri-check-line text-green-500"></i>
                      Real-time message status tracking
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex-1 flex flex-col">
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  {renderConversationHeader(currentConversation)}
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(currentConversation.status)}`}>
                      {currentConversation.status.charAt(0).toUpperCase() + currentConversation.status.slice(1)}
                    </span>
                    <button
                      onClick={handleResolveConversation}
                      className="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-check-line mr-2"></i>
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                {currentConversation.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-lg px-4 py-3 rounded-xl shadow-sm ${message.senderType === 'admin' ? 'bg-red-500 text-white' : message.senderType === 'buyer' ? 'bg-white text-gray-900 border border-blue-200' : 'bg-white text-gray-900 border border-purple-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {message.senderType === 'admin' ? 'Admin' : message.sender}
                          </span>
                          {message.senderType !== 'admin' && (
                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${message.senderType === 'buyer' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                              {message.senderType.charAt(0).toUpperCase() + message.senderType.slice(1)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs opacity-75">
                            {new Date(message.timestamp).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <i className={`${getMessageStatusIcon(message.status)} text-sm`}></i>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed mb-2">{message.content}</p>

                      {message.forwarded && (
                        <div className="text-xs opacity-75 mb-2 p-2 bg-white/10 rounded-lg">
                          <i className="ri-share-forward-line mr-1"></i>
                          <strong>Forwarded to:</strong> {message.forwardedTo}
                        </div>
                      )}

                      {message.senderType !== 'admin' && (
                        <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-200/20">
                          <button
                            onClick={() => handleForwardMessage(message)}
                            className="text-xs font-medium opacity-75 hover:opacity-100 cursor-pointer flex items-center gap-1 hover:underline"
                          >
                            <i className="ri-share-forward-line"></i>
                            Forward Message
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your admin message..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-send-plane-2-line mr-2"></i>
                    Send
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                  <i className="ri-information-line"></i>
                  <span>All messages are moderated by admin and can be forwarded between relevant parties</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center max-w-md">
                <i className="ri-chat-3-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Conversation</h3>
                <p className="text-gray-500 mb-6">Choose a conversation from the {activeTab} tab to start managing communications</p>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Chat Management:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li className="flex items-center gap-3">
                      <i className="ri-check-line text-green-500"></i>
                      View complete conversation history
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="ri-check-line text-green-500"></i>
                      Forward messages between parties
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="ri-check-line text-green-500"></i>
                      Admin mediation and direct replies
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="ri-check-line text-green-500"></i>
                      Mark conversations as resolved
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="ri-check-line text-green-500"></i>
                      Real-time message status tracking
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Forward Message Modal */}
      {showForwardModal && messageToForward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Forward Message</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-900 leading-relaxed">{messageToForward.content}</p>
              <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                <strong>From:</strong> {messageToForward.sender} • {new Date(messageToForward.timestamp).toLocaleString()}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Forward to:</label>
                <div className="space-y-3">
                  {currentConversation?.type === 'buyer' && (
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="forwardTarget"
                        value="brand"
                        checked={forwardTarget === 'brand'}
                        onChange={(e) => setForwardTarget(e.target.value as 'buyer' | 'brand')}
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-900">Connected Brands</span>
                        <p className="text-xs text-gray-500">Forward to all brands connected to this buyer</p>
                      </div>
                    </label>
                  )}
                  {currentConversation?.type === 'brand' && (
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="forwardTarget"
                        value="buyer"
                        checked={forwardTarget === 'buyer'}
                        onChange={(e) => setForwardTarget(e.target.value as 'buyer' | 'brand')}
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-900">Connected Buyers</span>
                        <p className="text-xs text-gray-500">Forward to all buyers connected to this brand</p>
                      </div>
                    </label>
                  )}
                  {(currentConversation?.type === 'connection' || currentConversation?.type === 'order') && (
                    <>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="forwardTarget"
                          value="buyer"
                          checked={forwardTarget === 'buyer'}
                          onChange={(e) => setForwardTarget(e.target.value as 'buyer' | 'brand')}
                          className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <div className="ml-3">
                          <span className="text-sm font-medium text-gray-900">
                            Buyer: {currentConversation.participants.buyer?.name}
                          </span>
                          <p className="text-xs text-gray-500">{currentConversation.participants.buyer?.company}</p>
                        </div>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="forwardTarget"
                          value="brand"
                          checked={forwardTarget === 'brand'}
                          onChange={(e) => setForwardTarget(e.target.value as 'buyer' | 'brand')}
                          className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <div className="ml-3">
                          <span className="text-sm font-medium text-gray-900">
                            Brand: {currentConversation.participants.brand?.name}
                          </span>
                          <p className="text-xs text-gray-500">{currentConversation.participants.brand?.company}</p>
                        </div>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-end mt-6">
              <button
                onClick={() => setShowForwardModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={confirmForwardMessage}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-share-forward-line mr-2"></i>
                Forward Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
