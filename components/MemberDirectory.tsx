
import React, { useState } from 'react';
import { Member } from '../types';
import { Mail, Phone, Search, MoreHorizontal } from 'lucide-react';

interface MemberDirectoryProps {
  members: Member[];
}

const MemberDirectory: React.FC<MemberDirectoryProps> = ({ members }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Member Directory</h2>
          <p className="text-slate-500 text-sm">Our community of {members.length} members.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search members..." 
            className="w-full pl-12 pr-4 py-2.5 md:py-3 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredMembers.map(member => (
          <div key={member.id} className="bg-white p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden ring-4 ring-emerald-50 group-hover:ring-emerald-100 transition-all shrink-0">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <button className="text-slate-300 hover:text-slate-600 p-1">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="mb-4 md:mb-6">
              <h3 className="font-bold text-slate-800 text-base md:text-lg leading-tight truncate">{member.name}</h3>
              <p className="text-emerald-600 font-semibold text-[10px] md:text-xs uppercase mt-1">{member.role}</p>
            </div>

            <div className="space-y-2 md:space-y-3 pt-4 md:pt-6 border-t border-slate-100">
              <a href={`mailto:${member.email}`} className="flex items-center gap-2 md:gap-3 text-slate-500 hover:text-emerald-600 transition-colors text-xs md:text-sm">
                <Mail size={14} className="text-slate-400" />
                <span className="truncate">{member.email}</span>
              </a>
              <a href={`tel:${member.phone}`} className="flex items-center gap-2 md:gap-3 text-slate-500 hover:text-emerald-600 transition-colors text-xs md:text-sm">
                <Phone size={14} className="text-slate-400" />
                <span className="truncate">{member.phone}</span>
              </a>
            </div>

            <button className="w-full mt-4 md:mt-6 py-2 bg-slate-50 text-slate-600 font-bold rounded-xl text-xs md:text-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
              View Profile
            </button>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-slate-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Search size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium">No members found.</p>
        </div>
      )}
    </div>
  );
};

export default MemberDirectory;
