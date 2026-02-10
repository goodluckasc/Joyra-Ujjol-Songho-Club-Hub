
import React from 'react';
import { AppView } from '../types';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  ShieldCheck,
  LogOut,
  UserCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isAdmin, setIsAdmin, onClose }) => {
  const menuItems = [
    { view: AppView.DASHBOARD, icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { view: AppView.EVENTS, icon: <Calendar size={20} />, label: 'Events' },
    { view: AppView.MEMBERS, icon: <Users size={20} />, label: 'Members' },
    { view: AppView.CHAT, icon: <MessageSquare size={20} />, label: 'Messages' },
  ];

  if (isAdmin) {
    menuItems.push({ view: AppView.ADMIN, icon: <ShieldCheck size={20} />, label: 'Admin Panel' });
  }

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-full flex flex-col border-r border-slate-800 shadow-xl overflow-y-auto">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="bg-emerald-500 w-8 h-8 rounded-lg flex items-center justify-center text-slate-900 text-sm font-bold">JUS</span>
          Joyra Club
        </h1>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.view}
            onClick={() => {
              setActiveView(item.view);
              if (onClose) onClose();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === item.view 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900 font-bold overflow-hidden shrink-0">
             <img src="https://picsum.photos/seed/admin/100" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">Joyra Admin</p>
            <p className="text-xs text-slate-400 truncate">Secretary</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors"
          >
            <UserCircle size={18} />
            <span>Switch Role</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-500/10 transition-colors">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
