'use client';

import React, { useState } from 'react';
import { SCHOOL_INFO } from '@/data/schoolData';
import { MapPin, Phone, Mail, MessageSquare, Facebook, Send, CheckCircle2, Sparkles, Clock } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 space-y-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-secondary-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            যোগাযোগ পোর্টাল
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">আমাদের সাথে যোগাযোগ করুন</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            ভর্তি, তথ্য বা যেকোনো পরামর্শের জন্য সরাসরি কল করুন বা সরাসরি মেসেজ পাঠান।
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-heading">প্রধান যোগাযোগ মাধ্যম</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">ক্যাম্পাসের ঠিকানা</strong>
                    <span className="text-paragraph">{SCHOOL_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <Phone className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">ফোন হেল্পলাইন</strong>
                    <span className="text-paragraph">{SCHOOL_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <Mail className="w-6 h-6 text-secondary-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">অফিসিয়াল ইমেইল</strong>
                    <span className="text-paragraph">{SCHOOL_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <Clock className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">অফিস চলাকালীন সময়</strong>
                    <span className="text-paragraph">রবিবার - বৃহস্পতিবার (সকাল ৮:০০ - বিকেল ৪:০০)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Chat Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://wa.me/8801712345678"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-md transition-transform active:scale-95 text-xs sm:text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp চ্যাট
              </a>

              <a
                href="#"
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-700 text-white font-bold py-3.5 rounded-2xl shadow-md transition-transform active:scale-95 text-xs sm:text-sm"
              >
                <Facebook className="w-4 h-4" />
                Messenger
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form & Google Map Embed (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <h3 className="text-xl font-bold text-heading">অনলাইন বার্তা পাঠান</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">আপনার নাম *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="আপনার পূর্ণ নাম"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">ফোন নম্বর *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="01712345678"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">বার্তা বিষয়বস্তু *</label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="এখানে আপনার বার্তা বা প্রশ্ন লিখুন..."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-transform flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    বার্তা পাঠান
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-3 py-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold text-heading">বার্তা সফলভাবে পাঠানো হয়েছে!</h3>
                  <p className="text-xs text-paragraph">
                    আমাদের তথ্য কর্মকর্তা শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                  </p>
                </div>
              )}
            </div>

            {/* Google Maps Simulation View */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-64 relative bg-slate-200">
              <iframe
                title="School Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430137!2d90.3910801!3d23.7508581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad332b71%3A0xf650a316238b693!2sDhaka!5e0!3m2!1sen!2sbd!4v1650000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
