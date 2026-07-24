'use client';

import React, { useState } from 'react';
import { MOCK_RESULTS, StudentResult, SCHOOL_INFO } from '@/data/schoolData';
import { Search, Award, Printer, Download, Sparkles, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function ResultPage() {
  const toast = useToast();
  const [roll, setRoll] = useState('');
  const [regNo, setRegNo] = useState('');
  const [examTerm, setExamTerm] = useState('বার্ষিক পরীক্ষা (Annual)');
  const [selectedClass, setSelectedClass] = useState('১০ম শ্রেণী');
  const [searchedResult, setSearchedResult] = useState<StudentResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = MOCK_RESULTS[roll.trim()] || null;
    if (found) {
      setSearchedResult({
        ...found,
        examType: examTerm
      });
      toast.success(`${examTerm}-এর রেজাল্ট সফলভাবে লোড হয়েছে!`);
    } else {
      setSearchedResult(null);
      toast.error('উক্ত রোল নম্বরের কোনো পরীক্ষার ফলাফল পাওয়া যায়নি!');
    }
  };

  return (
    <div className="py-12 space-y-10 bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-[1536px] mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
            <Award className="w-3.5 h-3.5" />
            মাল্টি-টার্ম অনলাইন রেজাল্ট পোর্টাল (Multi-Term Result System)
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">১ম, ২য়, ৩য় কোয়ার্টার, অর্ধ-বার্ষিকী ও বার্ষিক ফলাফল</h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            পরীক্ষার টার্ম, শ্রেণী ও রোল টাইপ করে সরাসরি প্রাতিষ্ঠানিক ডিজিটাল মার্কশীট তৈরি করুন।
          </p>
        </div>
      </section>

      {/* Result Search Form */}
      <section className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-slate-900 text-center flex items-center justify-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            পরীক্ষার টার্ম ও রোল সিলেক্ট করুন
          </h2>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1">পরীক্ষার নাম / টার্ম (Term)</label>
              <select
                value={examTerm}
                onChange={(e) => setExamTerm(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none font-bold text-slate-800"
              >
                <option value="১ম কোয়ার্টার পরীক্ষা ২০২৬">১ম কোয়ার্টার পরীক্ষা (1st Quarter)</option>
                <option value="২য় কোয়ার্টার পরীক্ষা ২০২৬">২য় কোয়ার্টার পরীক্ষা (2nd Quarter)</option>
                <option value="৩য় কোয়ার্টার পরীক্ষা ২০২৬">৩য় কোয়ার্টার পরীক্ষা (3rd Quarter)</option>
                <option value="অর্ধ-বার্ষিকী পরীক্ষা ২০২৬">অর্ধ-বার্ষিকী পরীক্ষা (Half-Yearly)</option>
                <option value="বার্ষিক পরীক্ষা ২০২৬">বার্ষিক পরীক্ষা (Annual)</option>
                <option value="নির্বাচনী / টেস্ট পরীক্ষা ২০২৬">নির্বাচনী / টেস্ট পরীক্ষা (Test Exam)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">শ্রেণী (Class)</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none font-bold text-slate-800"
              >
                <option value="১০ম শ্রেণী">১০ম শ্রেণী</option>
                <option value="৯ম শ্রেণী">৯ম শ্রেণী</option>
                <option value="৮ম শ্রেণী">৮ম শ্রেণী</option>
                <option value="৭ম শ্রেণী">৭ম শ্রেণী</option>
                <option value="৬ষ্ঠ শ্রেণী">৬ষ্ঠ শ্রেণী</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">শিক্ষার্থীর রোল নম্বর *</label>
              <input
                type="text"
                required
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="ট্রাই করুন: 101 অথবা 102"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">রেজিস্ট্রেশন নম্বর (ঐচ্ছিক)</label>
              <input
                type="text"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder="রেজিস্ট্রেশন (যেমন: 2026900101)"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none font-mono"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                ফলাফল ও মার্কশীট অনুসন্ধান করুন
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Result Display Section */}
      {hasSearched && (
        <section className="max-w-4xl mx-auto px-4 lg:px-8">
          {searchedResult ? (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl space-y-8 print:p-0 print:border-none print:shadow-none">
              
              {/* Header Official Seal */}
              <div className="text-center border-b border-slate-200 pb-6 space-y-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
                  অফিশিয়াল অনুমোদিত ডিজিটাল একাডেমিক রেকর্ড
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{SCHOOL_INFO.name}</h2>
                <p className="text-xs text-slate-500">{SCHOOL_INFO.address} | EIIN: {SCHOOL_INFO.eiin}</p>
                <div className="pt-2">
                  <span className="px-4 py-1.5 bg-blue-600 text-white font-extrabold text-sm rounded-xl inline-block shadow-md">
                    {searchedResult.examType}
                  </span>
                </div>
              </div>

              {/* Student Metadata Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block">শিক্ষার্থীর নাম</span>
                  <strong className="text-slate-900 font-bold">{searchedResult.studentName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">শ্রেণী ও শাখা</span>
                  <strong className="text-slate-900 font-bold">{searchedResult.className} ({searchedResult.section})</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">রোল ও রেজিঃ</span>
                  <strong className="text-slate-900 font-mono font-bold">{searchedResult.roll} / {searchedResult.regNo}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">ফলাফল / GPA</span>
                  <strong className="text-emerald-600 font-bold text-base">GPA {searchedResult.gpa.toFixed(2)} ({searchedResult.grade})</strong>
                </div>
              </div>

              {/* Subject Marks Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-200 text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-3 border-r border-slate-200">বিষয়</th>
                      <th className="p-3 border-r border-slate-200 text-center">পূর্ণমান</th>
                      <th className="p-3 border-r border-slate-200 text-center">প্রাপ্ত নম্বর</th>
                      <th className="p-3 border-r border-slate-200 text-center">লেটার গ্রেড</th>
                      <th className="p-3 text-center">গ্রেড পয়েন্ট (GP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {searchedResult.marks.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 border-r border-slate-200 font-bold text-slate-900">{m.subject}</td>
                        <td className="p-3 border-r border-slate-200 text-center font-mono">{m.fullMarks}</td>
                        <td className="p-3 border-r border-slate-200 text-center font-mono font-bold text-blue-600">{m.obtained}</td>
                        <td className="p-3 border-r border-slate-200 text-center font-bold text-emerald-600">{m.letterGrade}</td>
                        <td className="p-3 text-center font-mono font-bold">{m.point.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Printable Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 print:hidden">
                <span className="text-xs text-slate-500">স্বাক্ষরিত: পরীক্ষা নিয়ন্ত্রক ও প্রধান শিক্ষক</span>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" /> মার্কশীট প্রিন্ট করুন
                </button>
              </div>

            </div>
          ) : null}
        </section>
      )}
    </div>
  );
}
