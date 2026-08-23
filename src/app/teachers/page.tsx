'use client';

import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, GraduationCap, Briefcase, Sparkles, Filter, X } from 'lucide-react';

interface TeacherItem {
  _id: string;
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  experience: string;
  email: string;
  phone: string;
  image: string;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTeacher, setActiveTeacher] = useState<TeacherItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/teachers')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.teachers) {
          setTeachers(data.teachers);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const subjects = ['all', 'গণিত', 'পদার্থবিজ্ঞান', 'ইংরেজি', 'বাংলা', 'রসায়ন', 'জীববিজ্ঞান'];

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.designation.toLowerCase().includes(search.toLowerCase());
    const matchesSub = selectedSubject === 'all' || t.subject.includes(selectedSubject);
    return matchesSearch && matchesSub;
  });

  return (
    <div className="py-12 space-y-10 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            আমাদের শিক্ষক প্যানেল (Live Database)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">অভিজ্ঞ শিক্ষক ও শিক্ষিকাবৃন্দ</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            প্রজ্ঞাবান, নিবেদিতপ্রাণ ও মেধানির্ভর শিক্ষক মণ্ডলীর তত্ত্বাবধানে গড়া উন্নত শিক্ষাঙ্গন।
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="শিক্ষক বা বিষয় খুঁজুন..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> বিষয়:
            </span>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedSubject === sub
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub === 'all' ? 'সকল শিক্ষক' : sub}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Cards Grid */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center text-slate-500">ডাটাবেজ থেকে শিক্ষকমণ্ডলীর ডাটা লোডিং হচ্ছে...</div>
        ) : filteredTeachers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
            কোনো শিক্ষক খুঁজে পাওয়া যায়নি!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher._id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative w-28 h-28 mx-auto rounded-3xl overflow-hidden border-4 border-blue-50 shadow-md group-hover:scale-105 transition duration-500">
                    <img
                      src={teacher.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80'}
                      alt={teacher.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {teacher.name}
                    </h3>
                    <p className="text-xs font-bold text-blue-600">{teacher.designation}</p>
                    <p className="text-xs text-slate-500 font-medium">বিষয়: {teacher.subject}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="truncate">{teacher.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>অভিজ্ঞতা: {teacher.experience}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTeacher(teacher)}
                  className="mt-6 w-full py-2.5 bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white font-bold rounded-xl text-xs transition border border-slate-200 hover:border-blue-600"
                >
                  প্রোফাইল দেখুন
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Teacher Profile Modal */}
      {activeTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveTeacher(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <img
                src={activeTeacher.image}
                alt={activeTeacher.name}
                className="w-24 h-24 mx-auto rounded-3xl object-cover border-4 border-blue-100 shadow-md"
              />
              <div>
                <h2 className="text-xl font-bold text-slate-900">{activeTeacher.name}</h2>
                <p className="text-xs font-bold text-blue-600">{activeTeacher.designation}</p>
                <p className="text-xs text-slate-500 mt-0.5">বিষয়: {activeTeacher.subject}</p>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 rounded-2xl text-xs text-slate-700 border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="font-semibold text-slate-500">শিক্ষাগত যোগ্যতা:</span>
                <span className="font-bold text-slate-900">{activeTeacher.qualification}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="font-semibold text-slate-500">অভিজ্ঞতা:</span>
                <span className="font-bold text-slate-900">{activeTeacher.experience}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="font-semibold text-slate-500">ইমেইল:</span>
                <span className="font-bold text-blue-600">{activeTeacher.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-500">ফোন:</span>
                <span className="font-bold text-slate-900">{activeTeacher.phone || 'N/A'}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTeacher(null)}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
