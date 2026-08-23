'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  Bot, 
  User, 
  Paperclip, 
  Loader2, 
  CheckCheck, 
  Headphones, 
  ShieldCheck, 
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { generateAIResponse, AI_QUICK_PROMPTS } from '@/data/aiKnowledge';

interface ChatMsg {
  _id: string;
  senderName: string;
  senderRole: string; // 'user' | 'bot' | 'admin' | 'superadmin'
  text: string;
  imageUrl?: string;
  createdAt: string;
}

export default function ChatWithManagement() {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [attachedImage, setAttachedImage] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      _id: 'welcome-1',
      senderName: 'স্মার্ট স্কুল সহকারী',
      senderRole: 'bot',
      text: 'আসসালামু আলাইকুম! ডাঃ মুজিব-রুবি মডেল হাই স্কুলের লাইভ হেল্পডেস্কে স্বাগতম। ভর্তি, ফলাফল, ক্লাস রুটিন, পরীক্ষার সময়সূচি বা যেকোনো বিষয়ে প্রশ্ন করুন।',
      createdAt: new Date().toISOString()
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Periodic poll for admin replies
  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/chat');
      const data = await res.json();
      if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
        // Merge with existing ensuring no duplicates
        setMessages((prev) => {
          const prevIds = new Set(prev.map((m) => m._id));
          const newItems = data.messages.filter((m: any) => !prevIds.has(m._id));
          if (newItems.length === 0) return prev;
          return [...prev, ...newItems];
        });
      }
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Handle direct file upload from device (into MongoDB Media)
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('শুধুমাত্র ছবি ফাইল আপলোড করা যাবে');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('ফাইলের সাইজ ১০MB এর নিচে হতে হবে');
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        setAttachedImage(data.url);
        toast.success('ছবি যুক্ত করা হয়েছে');
      } else {
        toast.error(data.message || 'ছবি আপলোড করতে সমস্যা হয়েছে');
      }
    } catch (err) {
      toast.error('ছবি আপলোড ব্যর্থ হয়েছে');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    const image = attachedImage;

    if (!text && !image) return;

    const userMessageId = 'msg-' + Date.now();
    const userMsg: ChatMsg = {
      _id: userMessageId,
      senderName: 'শিক্ষার্থী / অভিভাবক',
      senderRole: 'user',
      text: text,
      imageUrl: image,
      createdAt: new Date().toISOString()
    };

    // Immediately show in UI
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setAttachedImage('');

    // Save to Database
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userMsg),
    }).catch(() => {});

    // Show live typing response
    setIsTyping(true);

    const typingDelay = Math.min(Math.max(text.length * 20, 500), 1200);

    setTimeout(async () => {
      const botResponse = generateAIResponse(text || 'ছবি পাঠিয়েছেন');
      const botMessageId = 'bot-' + Date.now();
      const botMsg: ChatMsg = {
        _id: botMessageId,
        senderName: 'স্মার্ট স্কুল সহকারী',
        senderRole: 'bot',
        text: botResponse,
        createdAt: new Date().toISOString()
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // Save bot response to backend
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(botMsg),
      }).catch(() => {});
    }, typingDelay);
  };

  return (
    <>
      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-5 xl:bottom-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-900 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/30"
          aria-label="Chat with Management"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full"></span>
          </div>
          <span className="font-extrabold text-xs tracking-wide">
            লাইভ চ্যাট ও সাপোর্ট
          </span>
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B2545] via-blue-900 to-indigo-900 text-white p-4 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-sky-300">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B2545]"></span>
              </div>
              <div>
                <h3 className="font-black text-sm leading-tight flex items-center gap-1.5 text-white">
                  স্মার্ট লাইভ হেল্পডেস্ক
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                </h3>
                <p className="text-[11px] text-sky-200 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  তাৎক্ষণিক উত্তর ও ম্যানেজমেন্ট সাপোর্ট
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="bg-blue-50/70 border-b border-blue-100 p-2.5 overflow-x-auto flex items-center gap-1.5 no-scrollbar shrink-0">
            {AI_QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1 bg-white hover:bg-blue-600 hover:text-white text-blue-800 font-bold text-[11px] rounded-full border border-blue-200/80 shadow-2xs whitespace-nowrap transition-all duration-200 shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
            {messages.map((msg, idx) => {
              const isUser = msg.senderRole === 'user';
              const isAdmin = msg.senderRole === 'admin' || msg.senderRole === 'superadmin';

              return (
                <div
                  key={msg._id || idx}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-xs text-white ${
                      isAdmin ? 'bg-amber-600' : 'bg-blue-700'
                    }`}>
                      {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                  )}

                  <div className={`max-w-[82%] space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
                    {/* Sender Tag */}
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 px-1">
                      {isAdmin ? (
                        <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          👑 স্কুল কর্তৃপক্ষ
                        </span>
                      ) : isUser ? (
                        <span className="text-blue-700">আপনি</span>
                      ) : (
                        <span className="text-blue-700">স্মার্ট সহকারী</span>
                      )}
                      <span>
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
                          : ''}
                      </span>
                    </div>

                    {/* Message Body */}
                    <div
                      className={`rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-blue-700 text-white rounded-tr-xs'
                          : isAdmin
                          ? 'bg-amber-50 text-slate-900 border border-amber-200 rounded-tl-xs'
                          : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                      }`}
                    >
                      {/* Attached Image if any */}
                      {msg.imageUrl && (
                        <div className="mb-2 rounded-xl overflow-hidden border border-white/20 max-w-[220px]">
                          <img
                            src={msg.imageUrl}
                            alt="Attached File"
                            className="w-full h-auto object-cover max-h-48"
                          />
                        </div>
                      )}

                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Live Animated Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500">সহকারী উত্তর লিখছেন</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Attached Image Preview before sending */}
          {attachedImage && (
            <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 overflow-hidden">
                <img src={attachedImage} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-slate-300" />
                <span className="text-xs font-bold text-slate-700 truncate">ছবি সংযুক্ত হয়েছে</span>
              </div>
              <button
                type="button"
                onClick={() => setAttachedImage('')}
                className="p-1 text-rose-600 hover:bg-rose-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="p-2.5 rounded-xl text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition border border-slate-200"
              title="ছবি বা ডকুমেন্ট সংযুক্ত করুন"
            >
              {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> : <Paperclip className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="যেকোনো প্রশ্ন বাংলায় লিখুন..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-600 text-slate-900 placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={!input.trim() && !attachedImage}
              className="p-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:hover:bg-blue-700 text-white rounded-xl shadow-md transition shrink-0"
              title="পাঠান"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
