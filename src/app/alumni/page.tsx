'use client';

import React, { useState, useEffect } from 'react';
import { HeartHandshake, Sparkles, UserPlus, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/Toast';

interface AlumniItem {
  _id?: string;
  name: string;
  batch: string;
  profession: string;
  organization: string;
  image: string;
  story: string;
}

export default function AlumniPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'stories' | 'register' | 'donation'>('stories');
  const [regSuccess, setRegSuccess] = useState(false);
  const [stories, setStories] = useState<AlumniItem[]>([]);
  const [loadingStories, setLoadingStories] = useState(true);

  const [form, setForm] = useState({
    name: '',
    batch: '২০১৫',
    profession: '',
    organization: '',
    phone: '',
    email: '',
  });

  const [donationsList, setDonationsList] = useState<any[]>([]);
  const [donationForm, setDonationForm] = useState({
    donorName: '',
    donorType: 'প্রাক্তন শিক্ষার্থী (অ্যালুমনি)',
    amount: '',
    phone: '',
    transactionId: '',
    message: ''
  });
  const [donationSubmitted, setDonationSubmitted] = useState(false);

  useEffect(() => {
    // 1. Fetch Alumni Stories from MongoDB
    fetch('/api/alumni')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.stories) {
          setStories(data.stories);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingStories(false));

    // 2. Fetch Donations from MongoDB
    fetch('/api/donations')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.donations) {
          setDonationsList(data.donations.filter((d: any) => d.isApproved));
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/alumni', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          batch: `এসএসসি ব্যাচ ${form.batch}`,
          profession: form.profession || 'প্রফেশনাল',
          organization: form.organization || 'প্রতিষ্ঠান',
          story: `${form.name} ডাঃ মুজিব-রুবি মডেল হাই স্কুলের প্রাক্তন শিক্ষার্থী হিসেবে সফলতার সাথে কাজ করে যাচ্ছেন।`,
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
          isFeatured: false
        })
      });
      setRegSuccess(true);
      toast.success('রেজিস্ট্রেশন সফলভাবে জমা হয়েছে!');
    } catch (err) {
      toast.error('রেজিস্ট্রেশন জমা দিতে সমস্যা হয়েছে');
    }
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationForm.donorName || !donationForm.amount || !donationForm.phone) {
      toast.error('অনুরোধ করে নাম, অনুদানের পরিমাণ ও ফোন নম্বর প্রদান করুন');
      return;
    }

    try {
      await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName: donationForm.donorName,
          donorType: donationForm.donorType,
          amount: Number(donationForm.amount),
          paymentMethod: 'bKash / Nagad',
          transactionId: donationForm.transactionId || 'TXN-ONLINE',
          phone: donationForm.phone,
          message: donationForm.message,
          date: new Date().toLocaleDateString('bn-BD'),
          isApproved: false
        })
      });
      setDonationSubmitted(true);
      toast.success('আপনার অনুদানের আবেদন সফলভাবে জমা হয়েছে! এডমিন প্যানেল থেকে এপ্রুভালের পর তালিকায় যুক্ত হবে।');
    } catch (err) {
      toast.error('জমা দিতে সমস্যা হয়েছে');
    }
  };

  return (
    <div className="py-12 space-y-10 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            প্রাক্তন শিক্ষার্থী নেটওয়ার্ক (Live Database)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">অ্যালুমনি অ্যাসোসিয়েশন পোর্টাল</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            প্রতিষ্ঠালগ্ন থেকে বর্তমান সময় পর্যন্ত সকল ব্যাচের প্রাক্তন শিক্ষার্থীদের মিলনমেলা ও নেটওয়ার্ক।
          </p>
        </div>
      </section>

      {/* Tabs Switcher */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          {[
            { id: 'stories', label: 'সাফল্যের গল্প' },
            { id: 'register', label: 'অ্যালুমনি রেজিস্ট্রেশন' },
            { id: 'donation', label: 'স্কুল ফান্ড ডোনেশন' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === t.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Stories Tab */}
      {activeTab === 'stories' && (
        <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          {loadingStories ? (
            <div className="py-20 text-center text-slate-500">অ্যালুমনি গল্প লোড হচ্ছে...</div>
          ) : stories.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
              কোনো অ্যালুমনি গল্প পাওয়া যায়নি!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stories.map((story) => (
                <div
                  key={story._id || story.name}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={story.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'}
                      alt={story.name}
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
                    />
                    <div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {story.batch}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{story.name}</h3>
                      <p className="text-xs text-slate-600">{story.profession} — <strong className="text-slate-800">{story.organization}</strong></p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                    "{story.story}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Register Tab */}
      {activeTab === 'register' && (
        <section className="max-w-2xl mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            {!regSuccess ? (
              <form onSubmit={handleRegSubmit} className="space-y-4 text-xs sm:text-sm">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  প্রাক্তন শিক্ষার্থী নিবন্ধন ফরম
                </h3>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="যেমন: রেজওয়ান আহমেদ"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">এসএসসি পাসের বছর (ব্যাচ) *</label>
                  <input
                    type="text"
                    required
                    value={form.batch}
                    onChange={(e) => setForm({ ...form, batch: e.target.value })}
                    placeholder="যেমন: ২০১২"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">বর্তমান পেশা</label>
                    <input
                      type="text"
                      value={form.profession}
                      onChange={(e) => setForm({ ...form, profession: e.target.value })}
                      placeholder="যেমন: সফটওয়্যার ইঞ্জিনিয়ার"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">প্রতিষ্ঠানের নাম</label>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="যেমন: টেক কোম্পানি"
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="01700-000000"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform"
                >
                  রেজিস্ট্রেশন জমা দিন
                </button>
              </form>
            ) : (
              <div className="text-center space-y-3 py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">নিবন্ধন সফল হয়েছে!</h3>
                <p className="text-xs text-slate-600">
                  আপনার তথ্য ডাটাবেজে অন্তর্ভুক্ত করা হয়েছে।
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Donation Tab */}
      {activeTab === 'donation' && (
        <section className="max-w-5xl mx-auto px-4 lg:px-8 space-y-10">
          
          {/* Donation Form Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <HeartHandshake className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-2xl font-bold text-slate-900">স্কুল উন্নয়ন ও স্কলারশিপ ফান্ডে অনুদান প্রদান</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                মেধাবী ও অসচ্ছল শিক্ষার্থীদের শিক্ষাবৃত্তি এবং ল্যাব সম্প্রসারণে অনুদান প্রদান করুন। মার্চেন্ট bKash/Nagad: <strong className="text-blue-600 font-mono">01952321390</strong>
              </p>
            </div>

            {!donationSubmitted ? (
              <form onSubmit={handleDonationSubmit} className="space-y-4 max-w-2xl mx-auto text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">অনুগৃহীত দাতার নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: ইঞ্জিনিয়ার রেজওয়ান হোসেন"
                      value={donationForm.donorName}
                      onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">পরিচয় / পরিচয়সূচক পদবী</label>
                    <select
                      value={donationForm.donorType}
                      onChange={(e) => setDonationForm({ ...donationForm, donorType: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                    >
                      <option value="প্রাক্তন শিক্ষার্থী (অ্যালুমনি)">প্রাক্তন শিক্ষার্থী (অ্যালুমনি)</option>
                      <option value="অভিভাবক ও শুভানুধ্যায়ী">অভিভাবক ও শুভানুধ্যায়ী</option>
                      <option value="শিক্ষক ও পরিচালনা পর্ষদ">শিক্ষক ও পরিচালনা পর্ষদ</option>
                      <option value="কর্পোরেট প্রতিষ্ঠান">কর্পোরেট প্রতিষ্ঠান</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">অনুদানের পরিমাণ (টাকা) *</label>
                    <input
                      type="number"
                      required
                      placeholder="যেমন: ৫০০০০"
                      value={donationForm.amount}
                      onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">মোবাইল নম্বর (যোগাযোগের জন্য) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="01700-000000"
                      value={donationForm.phone}
                      onChange={(e) => setDonationForm({ ...donationForm, phone: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">bKash / Nagad ট্রানজেকশন আইডি (TrxID)</label>
                    <input
                      type="text"
                      placeholder="যেমন: TXN-99881122"
                      value={donationForm.transactionId}
                      onChange={(e) => setDonationForm({ ...donationForm, transactionId: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">উৎসাহমূলক বা শুভকামনা বার্তা (ঐচ্ছিক)</label>
                    <textarea
                      rows={2}
                      placeholder="প্রতিষ্ঠানের অগ্রযাত্রা কামনায় আপনার মেসেজ লিখুন..."
                      value={donationForm.message}
                      onChange={(e) => setDonationForm({ ...donationForm, message: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold rounded-xl shadow-md hover:opacity-95 transition"
                >
                  অনুদানের তথ্য জমা দিন
                </button>
              </form>
            ) : (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 text-xs">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">আপনার অনুদানের তথ্য সফলভাবে জমা হয়েছে!</h4>
                <p className="text-slate-600">এডমিন প্যানেল থেকে এপ্রুভ হওয়ার পর নিচে প্রকাশ্যে শুভানুধ্যায়ী সম্মাননা তালিকায় আপনার নাম দেখা যাবে।</p>
                <button
                  onClick={() => setDonationSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  পুনরায় অনুদান প্রদান করুন
                </button>
              </div>
            )}
          </div>

          {/* Approved Donors Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200">
                  সম্মাননা গ্যালারি (Donors Wall)
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">অনুমোদিত দাতা ও শুভানুধ্যায়ী তালিকা</h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                মোট অনুমোদনপ্রাপ্ত: {donationsList.length} জন
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">দাতার নাম</th>
                    <th className="p-3">পরিচয় / ক্যাটাগরি</th>
                    <th className="p-3">অনুদানের পরিমাণ</th>
                    <th className="p-3">তারিখ</th>
                    <th className="p-3">শুভকামনা বার্তা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {donationsList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-500 italic">
                        এখনো কোনো অনুদান অনুমোদিত হয়নি।
                      </td>
                    </tr>
                  ) : (
                    donationsList.map((d: any) => (
                      <tr key={d._id || d.id} className="hover:bg-slate-50 transition font-medium text-slate-800">
                        <td className="p-3 font-bold text-slate-900">{d.donorName}</td>
                        <td className="p-3"><span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full font-bold text-[10px]">{d.donorType}</span></td>
                        <td className="p-3 font-mono font-bold text-emerald-600 text-sm">৳ {Number(d.amount || 0).toLocaleString('bn-BD')}</td>
                        <td className="p-3 text-slate-500">{d.date}</td>
                        <td className="p-3 text-slate-600 italic">{d.message || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </section>
      )}
    </div>
  );
}
