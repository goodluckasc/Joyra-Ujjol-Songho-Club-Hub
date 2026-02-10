
import React, { useState } from 'react';
import { ClubEvent, Member } from '../types';
import { geminiService } from '../services/geminiService';
import { Plus, Trash2, Edit3, Wand2, RefreshCw, CheckCircle } from 'lucide-react';

interface AdminPanelProps {
  members: Member[];
  events: ClubEvent[];
  setEvents: React.Dispatch<React.SetStateAction<ClubEvent[]>>;
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ members, events, setEvents, setMembers }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'members'>('events');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleCreateEvent = async () => {
    if (!newEventTitle) return;
    
    setIsGenerating(true);
    const description = await geminiService.generateEventDescription(newEventTitle);
    
    const newEvent: ClubEvent = {
      id: `e${Date.now()}`,
      title: newEventTitle,
      description,
      date: new Date(Date.now() + 86400000 * 7).toISOString(),
      location: 'Club Hall',
      attendees: [],
      imageUrl: `https://picsum.photos/seed/${Date.now()}/800/400`
    };

    setEvents(prev => [newEvent, ...prev]);
    setNewEventTitle('');
    setIsGenerating(false);
  };

  const deleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  const syncData = () => {
    setIsSyncing(true);
    // Simulate Firebase sync
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Admin Control</h2>
          <p className="text-slate-500 text-sm">Manage your club ecosystem efficiently.</p>
        </div>
        <button 
          onClick={syncData}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-700 transition-all active:scale-95"
        >
          <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Syncing...' : 'Force Sync'}
        </button>
      </div>

      <div className="flex gap-1 p-1 bg-slate-200 rounded-2xl w-full md:w-fit mb-8 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('events')}
          className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'events' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Manage Events
        </button>
        <button 
          onClick={() => setActiveTab('members')}
          className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'members' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Manage Members
        </button>
      </div>

      {activeTab === 'events' ? (
        <div className="space-y-6">
          {/* Quick Create */}
          <div className="bg-emerald-50 border border-emerald-100 p-4 md:p-6 rounded-3xl">
            <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2 text-sm md:text-base">
              <Plus size={18} />
              Quick Event Creator (AI)
            </h4>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Event title..." 
                className="flex-1 px-4 py-3 rounded-2xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
              <button 
                onClick={handleCreateEvent}
                disabled={isGenerating || !newEventTitle}
                className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all disabled:opacity-50 text-sm whitespace-nowrap"
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} />}
                Create
              </button>
            </div>
            <p className="text-[10px] md:text-xs text-emerald-600/70 mt-3">* AI generates description automatically.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Event Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">RSVPs</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map(event => (
                  <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={event.imageUrl} alt="" className="w-10 h-8 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate max-w-[150px]">{event.title}</p>
                          <p className="text-[10px] text-slate-500">{event.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {event.attendees.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-1 whitespace-nowrap">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><Edit3 size={16} /></button>
                      <button onClick={() => deleteEvent(event.id)} className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Member</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 text-sm truncate">{member.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-md ${
                      member.role === 'President' ? 'bg-purple-100 text-purple-700' :
                      member.role === 'Secretary' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-medium">
                      <CheckCircle size={12} /> Verified
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1 whitespace-nowrap">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><Edit3 size={16} /></button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
