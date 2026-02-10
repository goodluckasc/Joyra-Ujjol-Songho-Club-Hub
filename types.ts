
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  EVENTS = 'EVENTS',
  MEMBERS = 'MEMBERS',
  CHAT = 'CHAT',
  ADMIN = 'ADMIN'
}

export interface Member {
  id: string;
  name: string;
  role: 'President' | 'Secretary' | 'Treasurer' | 'Member' | 'Volunteer';
  email: string;
  phone: string;
  avatar: string;
  joinedAt: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: string[]; // array of member IDs
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ClubState {
  members: Member[];
  events: ClubEvent[];
  messages: ChatMessage[];
  currentUser: Member;
  isAdmin: boolean;
}
