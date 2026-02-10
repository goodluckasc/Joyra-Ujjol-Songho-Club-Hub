
import React from 'react';
import { ClubEvent, Member } from '../types';
import { Calendar, MapPin, CheckCircle2, Circle } from 'lucide-react';

interface EventListProps {
  events: ClubEvent[];
  currentUser: Member;
  onRSVP: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, currentUser, onRSVP }) => {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <header className="mb-8 md:mb-10 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Club Events</h2>
        <p className="text-slate-500 mt-2 text-sm md:text-lg">Our latest gatherings and activities.</p>
      </header>

      <div className="space-y-6 md:space-y-12">
        {events.map((event) => {
          const isAttending = event.attendees.includes(currentUser.id);
          const dateObj = new Date(event.date);
          
          return (
            <div key={event.id} className="flex flex-col md:flex-row gap-4 md:gap-8 bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full md:w-72 h-40 md:h-48 rounded-2xl overflow-hidden shrink-0">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] md:text-sm uppercase tracking-wider mb-2">
                    <Calendar size={14} />
                    {dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 truncate">{event.title}</h3>
                  <p className="text-slate-600 text-xs md:text-sm mb-4 leading-relaxed line-clamp-3">{event.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-[10px] md:text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate max-w-[150px]">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      {event.attendees.length} Going
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 md:mt-8 md:pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex -space-x-2 overflow-hidden">
                    {event.attendees.slice(0, 4).map((id, i) => (
                      <img 
                        key={i} 
                        className="inline-block h-6 w-6 md:h-8 md:w-8 rounded-full ring-2 ring-white" 
                        src={`https://picsum.photos/seed/${id}/64`} 
                        alt="Attendee" 
                      />
                    ))}
                    {event.attendees.length > 4 && (
                      <div className="flex items-center justify-center h-6 w-6 md:h-8 md:w-8 rounded-full bg-slate-100 ring-2 ring-white text-[8px] md:text-[10px] font-bold text-slate-500">
                        +{event.attendees.length - 4}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => onRSVP(event.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 md:px-6 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                      isAttending 
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20'
                    }`}
                  >
                    {isAttending ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    {isAttending ? 'Going' : 'RSVP'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventList;
