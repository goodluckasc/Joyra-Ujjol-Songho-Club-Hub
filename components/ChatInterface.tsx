
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Member } from '../types';
import { Send, Smile, Paperclip, Phone, Video, Search, MoreVertical } from 'lucide-react';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  currentUser: Member;
  onSendMessage: (text: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, currentUser, onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#e5ddd5] relative overflow-hidden">
      {/* Chat Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')` }}
      />

      {/* Header */}
      <header className="bg-[#075e54] text-white p-2 md:p-3 flex items-center justify-between shadow-md z-10 shrink-0">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-900 font-bold overflow-hidden ring-2 ring-emerald-300 shrink-0">
             <img src="https://picsum.photos/seed/club/100" alt="Club" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm md:text-base truncate">JUS Main Group</h3>
            <p className="text-[10px] md:text-[11px] text-emerald-100/80 truncate">Ariful, Rahat, and others</p>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6 mr-1 md:mr-2">
          <button className="hover:text-emerald-200 hidden md:block"><Video size={20} /></button>
          <button className="hover:text-emerald-200"><Phone size={18} /></button>
          <button className="hover:text-emerald-200"><MoreVertical size={20} /></button>
        </div>
      </header>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3 z-10 scroll-smooth">
        <div className="flex justify-center my-2 md:my-4">
          <span className="bg-[#dcf8c6] text-[#555] text-[10px] md:text-[11px] px-2 md:px-3 py-0.5 md:py-1 rounded shadow-sm font-semibold uppercase">Today</span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] md:max-w-[65%] rounded-lg px-2 py-1 md:px-3 md:py-1.5 shadow-sm relative ${
                  isMe ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'
                }`}
              >
                {!isMe && (
                  <p className="text-[10px] md:text-[11px] font-bold text-emerald-700 mb-0.5">{msg.senderName}</p>
                )}
                <p className="text-slate-800 text-xs md:text-sm leading-snug">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  <p className="text-[8px] md:text-[9px] text-slate-500 uppercase tracking-tighter">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {isMe && <span className="text-blue-500 text-[9px] md:text-[10px]">✓✓</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f2f5] p-2 md:p-3 z-10 flex items-center gap-2 md:gap-3 shrink-0">
        <div className="flex items-center gap-2 md:gap-3 text-slate-500 px-1 md:px-2">
          <button className="hover:text-emerald-600 hidden md:block"><Smile size={24} /></button>
          <button className="hover:text-emerald-600"><Paperclip size={20} className="rotate-45" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 flex gap-2 md:gap-3">
          <input 
            type="text" 
            placeholder="Type a message" 
            className="flex-1 bg-white px-3 md:px-4 py-2 md:py-2.5 rounded-full border-none shadow-sm text-xs md:text-sm focus:outline-none placeholder:text-slate-400"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button 
            type="submit"
            className="w-10 h-10 md:w-12 md:h-12 bg-[#075e54] text-white rounded-full flex items-center justify-center hover:bg-[#128c7e] transition-colors shadow-lg active:scale-95 disabled:opacity-50 shrink-0"
            disabled={!inputText.trim()}
          >
            <Send size={18} className="md:ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
