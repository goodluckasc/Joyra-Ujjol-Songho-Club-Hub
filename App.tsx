
import React, { useState, useEffect } from 'react';
import { AppView, Member, ClubEvent, ChatMessage } from './types';
import { INITIAL_MEMBERS, INITIAL_EVENTS, INITIAL_MESSAGES } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EventList from './components/EventList';
import MemberDirectory from './components/MemberDirectory';
import ChatInterface from './components/ChatInterface';
import AdminPanel from './components/AdminPanel';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('joyra_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });
  const [events, setEvents] = useState<ClubEvent[]>(() => {
    const saved = localStorage.getItem('joyra_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('joyra_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [currentUser] = useState<Member>(INITIAL_MEMBERS[1]); // Fixed to the "Admin" for demo purposes
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    localStorage.setItem('joyra_members', JSON.stringify(members));
    localStorage.setItem('joyra_events', JSON.stringify(events));
    localStorage.setItem('joyra_messages', JSON.stringify(messages));
  }, [members, events, messages]);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeView]);

  const toggleRSVP = (eventId: string) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const isAttending = event.attendees.includes(currentUser.id);
        return {
          ...event,
          attendees: isAttending 
            ? event.attendees.filter(id => id !== currentUser.id)
            : [...event.attendees, currentUser.id]
        };
      }
      return event;
    }));
  };

  const addMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const renderContent = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return <Dashboard events={events} members={members} setActiveView={setActiveView} />;
      case AppView.EVENTS:
        return <EventList events={events} currentUser={currentUser} onRSVP={toggleRSVP} />;
      case AppView.MEMBERS:
        return <MemberDirectory members={members} />;
      case AppView.CHAT:
        return <ChatInterface messages={messages} currentUser={currentUser} onSendMessage={addMessage} />;
      case AppView.ADMIN:
        return (
          <AdminPanel 
            members={members} 
            events={events} 
            setEvents={setEvents} 
            setMembers={setMembers} 
          />
        );
      default:
        return <Dashboard events={events} members={members} setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f0f2f5] text-slate-900 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 w-8 h-8 rounded-lg flex items-center justify-center text-slate-900 text-sm font-bold">JUS</span>
            <h1 className="text-lg font-bold text-slate-900">Joyra Club</h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto relative bg-[#f0f2f5]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
