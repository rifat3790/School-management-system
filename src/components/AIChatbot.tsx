'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, MessageCircle, HelpCircle, User, RefreshCw } from 'lucide-react';
import { AIMessage, AI_QUICK_PROMPTS, generateAIResponse } from '@/data/aiKnowledge';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      sender: 'bot',
      text: `আসসালামু আলাইকুম! আমি বিদ্যালয়ের স্মার্ট এআই সহকারী। ভর্তি, রেজাল্ট, ক্লাস রুটিন বা নোটিশ যেকোনো বিষয়ে আপনার প্রশ্ন করুন।`,
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: AIMessage = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponseText = generateAIResponse(text);
      const botMsg: AIMessage = {
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-5 z-40 flex items-center gap-2 bg-gradient-to-r from-primary-600 via-primary to-secondary-500 text-white font-bold px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group border border-white/30"
        aria-label="Open Bengali AI Assistant"
      >
        <div className="relative">
          <Bot className="w-6 h-6 animate-bounce" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white animate-ping" />
        </div>
        <span className="hidden sm:inline text-sm font-semibold">স্মার্ট এআই সাহায্য</span>
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-700 via-primary to-secondary-600 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  স্কুল এআই সহকারী
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[11px] text-slate-200">বাংলায় যেকোনো প্রশ্ন করুন</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs md:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-primary-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs pl-2">
                <Bot className="w-4 h-4 text-primary animate-spin" />
                <span>উত্তর প্রস্তুত করা হচ্ছে...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {AI_QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-primary-50 hover:text-primary text-[11px] font-medium text-slate-600 transition-colors border border-slate-200"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="এখানে বাংলায় লিখুন..."
              className="flex-1 px-3.5 py-2 text-xs md:text-sm bg-slate-100 rounded-full border border-slate-200 focus:outline-none focus:border-primary"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim()}
              className="p-2.5 bg-primary text-white rounded-full hover:bg-primary-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
