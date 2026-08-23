'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  User, 
  Paperclip, 
  Loader2, 
  ShieldCheck, 
  RefreshCw,
  Image as ImageIcon,
  UserCheck,
  Sparkles,
  Phone,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useToast } from '@/components/Toast';

interface ChatMsg {
  _id: string;
  conversationId?: string;
  senderName: string;
  senderRole: string; // 'user' | 'system' | 'admin' | 'superadmin' | 'teacher'
  text: string;
  imageUrl?: string;
  createdAt: string;
}

interface VisitorInfo {
  name: string;
  contact: string;
}

const QUICK_PROMPTS = [
  '২০২৬ শিক্ষাবর্ষে ভর্তি প্রক্রিয়া কী?',
  'পরীক্ষার ফলাফল ও মার্কশীট দেখার নিয়ম',
  'অনলাইন বেতন ও ফি পরিশোধ পদ্ধতি',
  'প্রধান শিক্ষকের সাথে সাক্ষাতের সময়'
];

export default function ChatWithManagement() {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [attachedImage, setAttachedImage] = useState('');
  
  // Visitor Identity & Session State
  const [conversationId, setConversationId] = useState<string>('');
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null);
  const [guestNameInput, setGuestNameInput] = useState('');
  const [guestContactInput, setGuestContactInput] = useState('');
  const [hasSentFirstMsg, setHasSentFirstMsg] = useState(false);

  // Live Typing States
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [messages, setMessages] = useState<ChatMsg[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isAdminTyping]);

  // 1. Initialize Visitor Identity & Session on Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if logged-in user exists
      let storedConvId = localStorage.getItem('school_chat_conv_id');
      const savedVisitor = localStorage.getItem('school_chat_visitor_info');

      if (!storedConvId) {
        storedConvId = 'conv_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
        localStorage.setItem('school_chat_conv_id', storedConvId);
      }
      setConversationId(storedConvId);

      if (savedVisitor) {
        try {
          const parsed = JSON.parse(savedVisitor);
          if (parsed && parsed.name) {
            setVisitorInfo(parsed);
          }
        } catch (e) {}
      }
    }
  }, []);

  // 2. Fetch Messages and Typing Status periodically (Every 1.5s for real-time responsiveness)
  const fetchMessagesAndTyping = async () => {
    if (!conversationId) return;

    try {
      const res = await fetch(`/api/chat?conversationId=${conversationId}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
        if (data.typing) {
          setIsAdminTyping(Boolean(data.typing.adminTyping));
        }
      }
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    if (isOpen && conversationId && visitorInfo) {
      fetchMessagesAndTyping();
      const interval = setInterval(fetchMessagesAndTyping, 1500);
      return () => clearInterval(interval);
    }
  }, [isOpen, conversationId, visitorInfo]);

  // 3. Emit Typing Signal
  const handleTypingPulse = () => {
    if (!conversationId) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'typing',
        conversationId,
        senderRole: 'user',
        isTyping: true
      })
    }).catch(() => {});

    typingTimeoutRef.current = setTimeout(() => {
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'typing',
          conversationId,
          senderRole: 'user',
          isTyping: false
        })
      }).catch(() => {});
    }, 3000);
  };

  // 4. Handle Visitor Registration Form
  const handleRegisterVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestNameInput.trim()) {
      toast.error('অনুগ্রহ করে আপনার নাম লিখুন');
      return;
    }

    const info: VisitorInfo = {
      name: guestNameInput.trim(),
      contact: guestContactInput.trim() || 'কোনো নম্বর দেওয়া হয়নি'
    };

    setVisitorInfo(info);
    if (typeof window !== 'undefined') {
      localStorage.setItem('school_chat_visitor_info', JSON.stringify(info));
    }
    toast.success(`স্বাগতম, ${info.name}! আপনি এখন সরাসরি লাইভ চ্যাট করতে পারবেন।`);
  };

  // 5. Handle Direct Image Upload
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
        toast.success('ছবি সংযুক্ত করা হয়েছে');
      } else {
        toast.error(data.message || 'ছবি আপলোড করতে সমস্যা হয়েছে');
      }
    } catch (err) {
      toast.error('ছবি আপলোড ব্যর্থ হয়েছে');
    } finally {
      setUploadingImage(false);
    }
  };

  // 6. Handle Send Message
  const handleSendMessage = async (textToSend?: string) => {
    if (!visitorInfo) return;

    const text = (textToSend || input).trim();
    const image = attachedImage;

    if (!text && !image) return;

    const isFirst = !hasSentFirstMsg;
    setHasSentFirstMsg(true);

    const userMessageId = 'msg-' + Date.now();
    const userMsg: ChatMsg = {
      _id: userMessageId,
      conversationId,
      senderName: visitorInfo.name,
      senderRole: 'user',
      text: text,
      imageUrl: image,
      createdAt: new Date().toISOString()
    };

    // Immediately show in UI
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setAttachedImage('');

    // Clear typing pulse
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'typing',
        conversationId,
        senderRole: 'user',
        isTyping: false
      })
    }).catch(() => {});

    // Save to backend and fetch fresh response
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          senderName: visitorInfo.name,
          senderContact: visitorInfo.contact,
          senderRole: 'user',
          text,
          imageUrl: image,
          isFirstMessage: isFirst
        }),
      });

      const data = await res.json();
      if (data.success && data.allNew && Array.isArray(data.allNew) && data.allNew.length > 1) {
        const ackMsg = data.allNew[1];
        setMessages((prev) => {
          if (prev.some(m => m._id === ackMsg._id)) return prev;
          return [...prev, ackMsg];
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-full shadow-2xl hover:shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="লাইভ চ্যাট খুলুন"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-xs font-black tracking-wide">লাইভ চ্যাট ও সাপোর্ট</span>
        </button>
      </div>

      {/* Main Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[620px] h-[86vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 p-4 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-white relative">
                <ShieldCheck className="w-6 h-6 text-blue-300" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <h3 className="font-black text-sm text-white flex items-center gap-1.5">
                  স্কুল লাইভ হেল্পডেস্ক
                </h3>
                <p className="text-[11px] text-blue-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {visitorInfo ? `কানেক্টেড: ${visitorInfo.name}` : 'লাইভ সাপোর্ট অনলাইন'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {visitorInfo && (
                <button
                  onClick={fetchMessagesAndTyping}
                  title="রিফ্রেশ"
                  className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* If visitor is not identified yet, show friendly registration form */}
          {!visitorInfo ? (
            <div className="flex-1 p-6 flex flex-col justify-center bg-slate-50 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <User className="w-7 h-7" />
                </div>
                <h4 className="font-black text-slate-900 text-base">চ্যাট শুরু করার পূর্বে আপনার তথ্য দিন</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  আপনার চ্যাটটি ব্যক্তিগত ও নিরাপদ থাকবে। আমাদের কর্তৃপক্ষ সরাসরি আপনাকে উত্তর পাঠাতে পারবে।
                </p>
              </div>

              <form onSubmit={handleRegisterVisitor} className="space-y-3.5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোঃ রাফসান আহমেদ"
                    value={guestNameInput}
                    onChange={(e) => setGuestNameInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ফোন নম্বর বা ইমেইল (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    placeholder="যেমন: 017XXXXXXXX বা user@mail.com"
                    value={guestContactInput}
                    onChange={(e) => setGuestContactInput(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>চ্যাট শুরু করুন</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <Lock className="w-3.5 h-3.5" /> আপনার বার্তাটি অন্য কোনো সাধারণ ভিজিটর দেখতে পারবে না
              </div>
            </div>
          ) : (
            <>
              {/* Quick Prompts Bar */}
              <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] font-bold border border-slate-200 hover:border-blue-300 shrink-0 shadow-2xs transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
                {messages.map((msg, index) => {
                  const isUser = msg.senderRole === 'user';
                  const isAdmin = msg.senderRole === 'admin' || msg.senderRole === 'superadmin';
                  const isTeacher = msg.senderRole === 'teacher';
                  const isSystem = msg.senderRole === 'system';

                  return (
                    <div
                      key={msg._id || index}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                          isAdmin 
                            ? 'bg-blue-600 text-white' 
                            : isTeacher 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-indigo-600 text-white'
                        }`}>
                          {isAdmin ? (
                            <ShieldCheck className="w-4 h-4" />
                          ) : isTeacher ? (
                            <UserCheck className="w-4 h-4" />
                          ) : (
                            <Sparkles className="w-4 h-4" />
                          )}
                        </div>
                      )}

                      <div className={`max-w-[82%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                        {/* Sender Tag */}
                        <div className={`flex items-center gap-1.5 text-[10px] ${isUser ? 'justify-end text-slate-500' : 'text-slate-600'}`}>
                          {isAdmin && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded-full border border-blue-200">
                              👑 স্কুল কর্তৃপক্ষ
                            </span>
                          )}
                          {isTeacher && (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full border border-emerald-200">
                              👨‍🏫 শিক্ষক প্যানেল
                            </span>
                          )}
                          {isSystem && (
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-bold rounded-full border border-indigo-200">
                              🏢 সাপোর্ট ডেস্ক
                            </span>
                          )}
                          {isUser && <span className="font-bold">আপনি</span>}
                          <span>
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                            isUser
                              ? 'bg-blue-600 text-white rounded-tr-xs font-medium'
                              : isAdmin
                              ? 'bg-blue-50 text-slate-900 border border-blue-200 rounded-tl-xs'
                              : isTeacher
                              ? 'bg-emerald-50 text-slate-900 border border-emerald-200 rounded-tl-xs'
                              : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                          }`}
                        >
                          {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}

                          {msg.imageUrl && (
                            <div className="mt-2 rounded-xl overflow-hidden border border-black/10 bg-black/5">
                              <img
                                src={msg.imageUrl}
                                alt="Attachment"
                                className="max-h-48 w-full object-cover cursor-pointer hover:opacity-95"
                                onClick={() => window.open(msg.imageUrl, '_blank')}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {isUser && (
                        <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Admin Live Typing Bouncing Indicator */}
                {isAdminTyping && (
                  <div className="flex gap-2.5 items-center text-xs text-blue-700 bg-blue-50/80 p-2.5 rounded-2xl border border-blue-200 animate-pulse w-fit">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span className="font-bold">কর্তৃপক্ষ উত্তর লিখছেন...</span>
                    <span className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Attached Image Preview */}
              {attachedImage && (
                <div className="px-4 py-2 bg-blue-50/80 border-t border-blue-100 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img src={attachedImage} alt="Preview" className="w-8 h-8 rounded-lg object-cover border border-blue-200" />
                    <span className="text-[11px] font-bold text-blue-900 truncate">ছবি সংযুক্ত হয়েছে</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedImage('')}
                    className="p-1 hover:bg-blue-100 text-blue-700 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Input Box */}
              <div className="p-3 bg-white border-t border-slate-200 shrink-0">
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

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition shrink-0"
                    title="ছবি সংযুক্ত করুন"
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    ) : (
                      <Paperclip className="w-5 h-5" />
                    )}
                  </button>

                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      handleTypingPulse();
                    }}
                    placeholder="আপনার বার্তা বা প্রশ্ন লিখুন..."
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600 transition"
                  />

                  <button
                    type="submit"
                    disabled={(!input.trim() && !attachedImage) || uploadingImage}
                    className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl shadow-md transition shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
