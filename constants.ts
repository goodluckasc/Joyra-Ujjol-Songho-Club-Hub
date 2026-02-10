
import { Member, ClubEvent, ChatMessage } from './types';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Ariful Islam',
    role: 'President',
    email: 'ariful@joyra.com',
    phone: '+880 1711-223344',
    avatar: 'https://picsum.photos/seed/m1/200',
    joinedAt: '2022-01-15'
  },
  {
    id: 'm2',
    name: 'Joyra Admin',
    role: 'Secretary',
    email: 'admin@joyra.com',
    phone: '+880 1711-556677',
    avatar: 'https://picsum.photos/seed/m2/200',
    joinedAt: '2022-01-15'
  },
  {
    id: 'm3',
    name: 'Rahat Kabir',
    role: 'Treasurer',
    email: 'rahat@joyra.com',
    phone: '+880 1711-889900',
    avatar: 'https://picsum.photos/seed/m3/200',
    joinedAt: '2023-05-20'
  },
  {
    id: 'm4',
    name: 'Sumaiya Akter',
    role: 'Member',
    email: 'sumaiya@joyra.com',
    phone: '+880 1811-112233',
    avatar: 'https://picsum.photos/seed/m4/200',
    joinedAt: '2024-02-10'
  }
];

export const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: 'e1',
    title: 'Annual General Meeting',
    description: 'The main gathering of the year to discuss club progress and future planning.',
    date: '2024-12-25T10:00:00',
    location: 'Main Hall, Joyra Building',
    attendees: ['m1', 'm2', 'm3'],
    imageUrl: 'https://picsum.photos/seed/e1/800/400'
  },
  {
    id: 'e2',
    title: 'Winter Food Festival',
    description: 'Celebrating the flavors of the season with home-cooked meals by our members.',
    date: '2025-01-12T16:00:00',
    location: 'Club Grounds',
    attendees: ['m1', 'm4'],
    imageUrl: 'https://picsum.photos/seed/e2/800/400'
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg1',
    senderId: 'm1',
    senderName: 'Ariful Islam',
    text: 'Welcome to the Joyra Ujjol Songho digital hub!',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'msg2',
    senderId: 'm3',
    senderName: 'Rahat Kabir',
    text: 'Excited for the next event. When is the budget meeting?',
    timestamp: new Date(Date.now() - 1800000).toISOString()
  }
];
