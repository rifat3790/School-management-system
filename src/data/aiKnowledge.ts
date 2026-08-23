export interface AIMessage {
  sender: 'bot' | 'user' | 'admin';
  text: string;
  time: string;
  imageUrl?: string;
}

export const AI_QUICK_PROMPTS = [
  '২০২৬ শিক্ষাবর্ষে ভর্তি প্রক্রিয়া',
  'অনলাইন রেজাল্ট দেখার নিয়ম',
  'ক্লাস ও পরীক্ষার সময়সূচি',
  'স্কুলের ঠিকানা ও হেল্পলাইন',
  'বেতন ও ফি পরিশোধের নিয়ম',
  'ডিজিটাল লাইব্রেরি ও বুক ইস্যু'
];

export function generateAIResponse(userText: string): string {
  const query = userText.toLowerCase().trim();

  // 1. Greetings
  if (
    query.includes('সালাম') || 
    query.includes('আসসালামু') || 
    query.includes('hello') || 
    query.includes('hi') || 
    query.includes('hey') || 
    query.includes('নমস্কার') ||
    query.includes('কেমন')
  ) {
    return 'ওয়ালাইকুম আসসালাম! ডাঃ মুজিব-রুবি মডেল হাই স্কুলের লাইভ স্মার্ট সাপোর্ট সেন্টারে স্বাগতম। আমি আপনাকে কীভাবে সাহায্য করতে পারি? ভর্তি, রেজাল্ট, পরীক্ষার রুটিন, নোটিশ বা যেকোনো বিষয়ে প্রশ্ন করুন।';
  }

  // 2. Admission & Fees
  if (
    query.includes('ভর্তি') || 
    query.includes('আবেদন') || 
    query.includes('admission') || 
    query.includes('এপ্লাই') || 
    query.includes('ফরম')
  ) {
    return '🎓 ২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ থেকে ৯ম শ্রেণীতে অনলাইন ভর্তি আবেদন চলমান রয়েছে!\n\n📌 আবেদনের নিয়ম:\n১. ওয়েবসাইটের "ভর্তি" মেনু থেকে "অনলাইন ভর্তি ফরম" পূরণ করুন।\n২. শিক্ষার্থীর জন্ম সনদ ও পাসপোর্ট সাইজ ছবি আপলোড করুন।\n৩. bKash বা Nagad-এর মাধ্যমে আবেদন ফি প্রদান করে সাবমিট করুন।\n\nবিস্তারিত জানতে ন্যাভবারের "ভর্তি" পেজ ভিজিট করুন।';
  }

  // 3. Results & Marksheet
  if (
    query.includes('রেজাল্ট') || 
    query.includes('ফলাফল') || 
    query.includes('মার্কশীট') || 
    query.includes('পাস') || 
    query.includes('জিপিএ') || 
    query.includes('result') || 
    query.includes('grade')
  ) {
    return '📊 ডিজিটাল পরীক্ষার ফলাফল ও মার্কশীট দেখার নিয়ম:\n\n১. ওয়েবসাইটের ন্যাভবার থেকে "ফলাফল" (Result) মেনুতে যান।\n২. শিক্ষার্থীর ক্লাস এবং রোল নম্বর (যেমন: 101, 102 ইত্যাদি) লিখুন।\n৩. পরীক্ষা সিলেক্ট করে "ফলাফল দেখুন" বাটনে ক্লিক করলেই বিষয়ভিত্তিক গ্রেড ও জিপিএ মার্কশীট চলে আসবে।';
  }

  // 4. Routine, Classes & Exams
  if (
    query.includes('রুটিন') || 
    query.includes('ক্লাস') || 
    query.includes('সময়সূচি') || 
    query.includes('পরীক্ষা') || 
    query.includes('routine') || 
    query.includes('time')
  ) {
    return '⏰ ক্লাস ও পরীক্ষার সময়সূচি:\n\n• সকাল শিফট/নিয়মিত ক্লাস: সকাল ০৮:৩০ টা থেকে দুপুর ০২:১৫ টা পর্যন্ত।\n• ১ম সাময়িক ও অর্ধ-বার্ষিক পরীক্ষার রুটিন "একাডেমিক" এবং "নোটিশ" পেজে পিডিএফ আকারে দেওয়া আছে।\n• ৬ষ্ঠ থেকে ১০ম শ্রেণীর বিষয়ভিত্তিক রুটিন দেখতে "একাডেমিক" পাতায় যান।';
  }

  // 5. Notices & Holidays
  if (
    query.includes('নোটিশ') || 
    query.includes('ছুটি') || 
    query.includes('বিজ্ঞপ্তি') || 
    query.includes('বন্ধ') || 
    query.includes('notice')
  ) {
    return '📢 সাম্প্রতিক নোটিশ ও ছুটির তালিকা:\n\nস্কুলের সকল জরুরি নোটিশ, ছুটির বিজ্ঞপ্তি ও পরীক্ষার সার্কুলার "নোটিশ" পেজে নিয়মিত আপডেট করা হয়। সর্বশেষ নোটিশগুলো হোমপেজের নোটিশ বোর্ডেও স্ক্রল হচ্ছে।';
  }

  // 6. Principal, Chairman & Administration
  if (
    query.includes('প্রধান শিক্ষক') || 
    query.includes('প্রিন্সিপাল') || 
    query.includes('হেডমাস্টার') || 
    query.includes('অধ্যক্ষ') || 
    query.includes('রশীদ')
  ) {
    return '👨‍🏫 আমাদের প্রধান শিক্ষক:\n\nপ্রফেসর মোহাম্মদ আব্দুর রশীদ (প্রধান শিক্ষক)\nডাঃ মুজিব-রুবি মডেল হাই স্কুল\nফোন: +৮৮০ ১৭০০-০০০০০\nইমেইল: principal@drmujibrubi.edu.bd\n\nবাণী ও বিস্তারিত তথ্যের জন্য "আমাদের সম্পর্কে" পেজ দেখুন।';
  }

  if (query.includes('সভাপতি') || query.includes('চেয়ারম্যান') || query.includes('মোজাম্মেল')) {
    return '🏛️ আমাদের পরিচালনা পর্ষদের সভাপতি:\n\nডাঃ মোজাম্মেল হক (প্রতিষ্ঠাতা ও সভাপতি)\nডাঃ মুজিব-রুবি মডেল হাই স্কুল\n\nবিস্তারিত জানতে "আমাদের সম্পর্কে" পেজ ভিজিট করুন।';
  }

  // 7. Teachers & Faculty
  if (
    query.includes('শিক্ষক') || 
    query.includes('মাস্টার') || 
    query.includes('স্যার') || 
    query.includes('ম্যাডাম') || 
    query.includes('teacher') || 
    query.includes('faculty')
  ) {
    return '👨‍🏫 শিক্ষকবৃন্দ:\n\nআমাদের প্রতিষ্ঠানে অভিজ্ঞ ও মেধানির্ভর শিক্ষক-শিক্ষিকাবৃন্দ পাঠদান করেন। সকল শিক্ষকের তালিকা, বিভাগ ও পদবী দেখতে "শিক্ষকবৃন্দ" (Teachers) পেজে যান।';
  }

  // 8. Contact, Address & Location
  if (
    query.includes('ঠিকানা') || 
    query.includes('যোগাযোগ') || 
    query.includes('ফোন') || 
    query.includes('মোবাইল') || 
    query.includes('কোথায়') || 
    query.includes('contact') || 
    query.includes('location') || 
    query.includes('email')
  ) {
    return '📍 বিদ্যালয়ের যোগাযোগের ঠিকানা:\n\nডাঃ মুজিব-রুবি মডেল হাই স্কুল\nকোর্ট রোড, শেরপুর ডিস্ট্রিক্ট, বাংলাদেশ\n\n📞 হটলাইন: +৮৮০ ১৭০০-০০০০০\n✉️ ইমেইল: info@drmujibrubi.edu.bd\n🌐 ওয়েবসাইট: www.drmujibrubi.edu.bd\n\nসরাসরি মেসেজ পাঠাতে "যোগাযোগ" পেজের ফর্ম ব্যবহার করুন।';
  }

  // 9. Fees, Tuition & Payment
  if (
    query.includes('ফি') || 
    query.includes('টাকা') || 
    query.includes('বেতন') || 
    query.includes('পেমেন্ট') || 
    query.includes('বিকাশ') || 
    query.includes('নগদ') || 
    query.includes('fee') || 
    query.includes('payment')
  ) {
    return '💳 ফি ও বেতন পরিশোধ:\n\nবিদ্যালয়ের মাসিক বেতন ও পরীক্ষার ফি বিকাশ/নগদ বা স্কুলের হিসাব শাখায় জমা দেওয়া যায়। শিক্ষার্থী বা অভিভাবক পোর্টালে লগইন করে ফি রশিদ ও বকেয়া স্ট্যাটাস চেক করতে পারবেন।';
  }

  // 10. Login & Portals
  if (
    query.includes('লগইন') || 
    query.includes('পাসওয়ার্ড') || 
    query.includes('ড্যাশবোর্ড') || 
    query.includes('আইডি') || 
    query.includes('login') || 
    query.includes('portal')
  ) {
    return '🔐 ডিজিটাল পোর্টাল লগইন:\n\nওয়েবসাইটের উপরে ডানপাশে "লগইন" বাটনে ক্লিক করে শিক্ষার্থী, অভিভাবক, শিক্ষক বা এডমিন হিসেবে নিজ নিজ একাউন্টে প্রবেশ করতে পারেন। পাসওয়ার্ড ভুলে গেলে "পাসওয়ার্ড রিসেট" অপশন ব্যবহার করুন।';
  }

  // 11. Library & Books
  if (
    query.includes('লাইব্রেরি') || 
    query.includes('বই') || 
    query.includes('library') || 
    query.includes('book')
  ) {
    return '📚 ডিজিটাল লাইব্রেরি:\n\nআমাদের লাইব্রেরিতে একাডেমিক, বিজ্ঞান, সাহিত্য ও রেফারেন্স বই রয়েছে। শিক্ষার্থীরা "লাইব্রেরি" পেজে গিয়ে বই সার্চ করতে ও বুক ইস্যু রিকোয়েস্ট পাঠাতে পারে।';
  }

  // 12. Alumni & Donations
  if (query.includes('অ্যালুমনি') || query.includes('অনুদান') || query.includes('alumni') || query.includes('donation')) {
    return '🎓 অ্যালুমনি ও প্রাক্তন শিক্ষার্থী ফোরাম:\n\nপ্রাক্তন শিক্ষার্থীরা "অ্যালুমনি" পেজে গিয়ে নিজেদের ব্যাচ অনুযায়ী রেজিস্ট্রেশন করতে পারেন এবং বিদ্যালয়ের উন্নয়ন তহবিলে অনুদান পাঠাতে পারেন।';
  }

  // Default intelligent fallback
  return `আপনার বার্তার জন্য ধন্যবাদ! ডাঃ মুজিব-রুবি মডেল হাই স্কুল সংক্রান্ত যেকোনো সুনির্দিষ্ট তথ্য যেমন—ভর্তি প্রক্রিয়া, রেজাল্ট, পরীক্ষার রুটিন, নোটিশ বা শিক্ষকদের তথ্য জানতে প্রশ্ন করুন। এছাড়া জরুরি প্রয়োজনে কল করুন: +৮৮০ ১৭০০-০০০০০।`;
}
