'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Image as ImageIcon, Sparkles, User, ShieldCheck, CheckCheck } from 'lucide-react';
import { useToast } from '@/components/Toast';

interface ChatMsg {
  _id: string;
  senderName: string;
  senderRole: string;
  text: string;
  imageUrl?: string;
  createdAt: string;
}

export default function ChatWithManagement() {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [showImageField, setShowImageField] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/chat');
      const data = await res.json();
      if (data.success && data.messages) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Fetch chat error:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Live poll every 3s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !imageUrlInput.trim()) return;

    const payload = {
      senderName: 'শিক্ষার্থী / অভিভাবক',
      senderRole: 'student',
      text: input,
      imageUrl: imageUrlInput
    };

    setInput('');
    setImageUrlInput('');
    setShowImageField(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('বার্তা প্রেরিত হয়েছে!');
        fetchMessages();
      }
    } catch (err) {
      toast.error('বার্তা পাঠাতে ব্যর্থ হয়েছে');
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-5 xl:bottom-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
          aria-label="Chat with Management"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full"></span>
          </div>
          <span className="font-extrabold text-xs hidden sm:inline-block">
            Chat with Management
          </span>
        </button>
      </div>

      {/* Live Chat Window Modal */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 sm:w-[420px] sm:h-[580px] bg-slate-900/90 backdrop-blur-xl sm:rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-slide-in">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 p-4 text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-white border border-white/20">
                <ShieldCheck className="w-6 h-6 text-sky-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Chat with Management</h3>
                <p className="text-[11px] text-blue-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  এডমিন ও শিক্ষক টিম অনলাইনে আছেন
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40 text-xs">
            {messages.map((msg, idx) => {
              const isManagement = msg.senderRole === 'superadmin' || msg.senderRole === 'admin' || msg.senderRole === 'teacher';
              return (
                <div
                  key={msg._id || idx}
                  className={`flex flex-col ${isManagement ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-1 mb-1 text-[10px] text-slate-400">
                    <span className="font-bold">{msg.senderName}</span>
                    <span>•</span>
                    <span className="capitalize text-blue-400 font-semibold">{msg.senderRole}</span>
                  </div>

                  <div
                    className={`max-w-[85%] p-3 rounded-2xl space-y-2 ${
                      isManagement
                        ? 'bg-slate-800 text-white rounded-tl-none border border-slate-700'
                        : 'bg-blue-600 text-white rounded-tr-none shadow-md'
                    }`}
                  >
                    {msg.text && <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
                    {msg.imageUrl && (
                      <div className="rounded-xl overflow-hidden border border-white/20 max-h-48 bg-slate-900">
                        <img src={msg.imageUrl} alt="Shared attachment" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Image Input Preview Row */}
          {showImageField && (
            <div className="p-2 bg-slate-800/90 border-t border-white/10 flex items-center gap-2 text-xs">
              <ImageIcon className="w-4 h-4 text-blue-400 shrink-0" />
              <input
                type="text"
                placeholder="ছবি প্রকাশের লিঙ্ক (URL) দিন..."
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:outline-none"
              />
              <button onClick={() => setShowImageField(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bottom Chat Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-white/10 flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowImageField(!showImageField)}
              className={`p-2 rounded-xl border transition ${
                showImageField ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="ছবি শেয়ার করুন"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="ম্যানেজমেন্টকে সরাসরি লিখুন..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2.5 bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-xl text-xs focus:outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={!input.trim() && !imageUrlInput.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
