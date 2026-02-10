
import React from 'react';
import { ClubEvent, Member, AppView } from '../types';
import { Calendar, Users, MessageSquare, ArrowUpRight, TrendingUp } from 'lucide-react';

interface DashboardProps {
  events: ClubEvent[];
  members: Member[];
  setActiveView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ events, members, setActiveView }) => {
  const upcomingEvents = events.slice(0, 2);
  const totalRSVPs = events.reduce((acc, curr) => acc + curr.attendees.length, 0);

  const stats = [
    { label: 'Total Members', value: members.length, icon: <Users className="text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'Active Events', value: events.length, icon: <Calendar className="text-emerald-500" />, bg: 'bg-emerald-50' },
    { label: 'Total RSVPs', value: totalRSVPs, icon: <TrendingUp className="text-orange-500" />, bg: 'bg-orange-50' },
    { label: 'Messages', value: '42', icon: <MessageSquare className="text-purple-500" />, bg: 'bg-purple-50' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Welcome back, Admin</h2>
        <p className="text-slate-500 mt-1 text-sm md:text-base">Here's what's happening at Joyra Ujjol Songho today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center text-center md:text-left md:items-center gap-3 md:gap-4">
            <div className={`p-3 md:p-4 rounded-xl ${stat.bg} shrink-0`}>
              {React.cloneElement(stat.icon as React.ReactElement, { size: 20 })}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] md:text-sm font-medium text-slate-500 uppercase md:normal-case">{stat.label}</p>
              <h3 className="text-lg md:text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Upcoming Events</h3>
            <button 
              onClick={() => setActiveView(AppView.EVENTS)}
              className="text-emerald-600 text-xs md:text-sm font-semibold flex items-center gap-1 hover:underline"
            >
              View all <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                <div className="h-32 md:h-40 relative">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow-sm">
                    <p className="text-[10px] font-bold text-emerald-700">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <h4 className="font-bold text-slate-800 mb-1 md:mb-2 truncate text-sm md:text-base">{event.title}</h4>
                  <p className="text-slate-500 text-xs md:text-sm line-clamp-2 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] md:text-xs text-slate-400">{event.attendees.length} members attending</span>
                    <button 
                      onClick={() => setActiveView(AppView.EVENTS)}
                      className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 md:px-3 md:py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Members Sidebar */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg md:text-xl font-bold text-slate-800">New Members</h3>
            <button 
              onClick={() => setActiveView(AppView.MEMBERS)}
              className="text-emerald-600 text-xs md:text-sm font-semibold flex items-center gap-1 hover:underline"
            >
              Directory <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
            {members.slice(0, 5).map(member => (
              <div key={member.id} className="p-3 md:p-4 flex items-center gap-3 md:gap-4 hover:bg-slate-50 transition-colors">
                <img src={member.avatar} alt={member.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-xs md:text-sm text-slate-800 truncate">{member.name}</h5>
                  <p className="text-[10px] md:text-xs text-slate-500">{member.role}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
