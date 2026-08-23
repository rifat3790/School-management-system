import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  schoolName: string;
  eiin: string;
  code: string;
  established: string;
  slogan: string;
  subSlogan: string;
  phone: string;
  email: string;
  address: string;
  heroImage: string;
  principalName: string;
  principalTitle: string;
  principalMessage: string;
  principalImage: string;
  chairmanName: string;
  chairmanTitle: string;
  chairmanMessage: string;
  chairmanImage: string;
  heroTagline: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  aboutHistory: string;
  missionText: string;
  visionText: string;
  stats: {
    students: string;
    teachers: string;
    passRate: string;
    establishedYear: string;
  };
  socialLinks: {
    facebook: string;
    youtube: string;
    whatsapp: string;
  };
  campusFacilities?: Array<{
    title: string;
    desc: string;
    iconName: string;
    badge: string;
  }>;
  topAchievers?: Array<{
    name: string;
    exam: string;
    gpa: string;
    quote: string;
    image: string;
  }>;
  academicPrograms?: Array<{
    title: string;
    subtitle: string;
    desc: string;
    classRange: string;
    iconName: string;
    image: string;
  }>;
  clubsAndActivities?: Array<{
    name: string;
    category: string;
    desc: string;
    membersCount: string;
    iconName: string;
    image: string;
  }>;
  events?: Array<{
    title: string;
    date: string;
    day: string;
    month: string;
    time: string;
    location: string;
    category: string;
    image: string;
  }>;
  noticesList?: Array<{
    day: string;
    month: string;
    title: string;
    category: string;
    pdfUrl: string;
  }>;
  testimonials?: Array<{
    name: string;
    role: string;
    studentName: string;
    rating: number;
    text: string;
    image: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
    category: string;
  }>;
  updatedAt: Date;
}

const SiteSettingsSchema: Schema = new Schema(
  {
    schoolName: { type: String, default: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল' },
    eiin: { type: String, default: '১৩০৯৫৪' },
    code: { type: String, default: '৪৫২০' },
    established: { type: String, default: '১৯৯৮' },
    slogan: { type: String, default: 'শিক্ষাই জাতির মেরুদণ্ড, সুশিক্ষাই উজ্জ্বল ভবিষ্যতের ভিত্তি' },
    subSlogan: { type: String, default: 'জ্ঞান • শৃঙ্খলা • সাফল্য' },
    phone: { type: String, default: '+৮৮০ ১৭০০-০০০০০' },
    email: { type: String, default: 'info@drmujibrubi.edu.bd' },
    address: { type: String, default: 'কোর্ট রোড, শেরপুর ডিস্ট্রিক্ট, বাংলাদেশ' },
    heroImage: { type: String, default: '' },
    principalName: { type: String, default: 'প্রফেসর মোহাম্মদ আব্দুর রশীদ' },
    principalTitle: { type: String, default: 'প্রধান শিক্ষক' },
    principalMessage: { type: String, default: 'আমাদের ডাঃ মুজিব-রুবি মডেল হাই স্কুলের ওয়েবসাইটে স্বাগতম। আমাদের লক্ষ্য কেবল পাঠ্যপুস্তকভিত্তিক শিক্ষা প্রদান নয়, বরং নৈতিকতা, মানবিক মূল্যবোধ, প্রযুক্তির দক্ষতা এবং নেতৃত্বের গুণাবলী বিকাশের মাধ্যমে একজন আদর্শ নাগরিক গড়ে তোলা। আপনাদের আন্তরিক সহযোগিতা ও স্নেহ আমাদের এগিয়ে যাওয়ার অনুপ্রেরণা।' },
    principalImage: { type: String, default: '' },
    chairmanName: { type: String, default: 'ডাঃ মোজাম্মেল হক' },
    chairmanTitle: { type: String, default: 'প্রতিষ্ঠাতা ও সভাপতি' },
    chairmanMessage: { type: String, default: 'একটি আলোকিত সমাজ গঠনে মানসম্মত শিক্ষার বিকল্প নেই। ডাঃ মুজিব-রুবি মডেল হাই স্কুল ১৯৯৮ সাল থেকে শ্রেষ্ঠত্বের স্বাক্ষর রেখে আসছে।' },
    chairmanImage: { type: String, default: '' },
    heroTagline: { type: String, default: '২০২৬ শিক্ষাবর্ষে ভর্তি চলছে' },
    heroTitleLine1: { type: String, default: 'শিক্ষাই জাতির মেরুদণ্ড' },
    heroTitleLine2: { type: String, default: 'সুশিক্ষাই উজ্জ্বল ভবিষ্যতের ভিত্তি' },
    heroDescription: { type: String, default: 'আমাদের বিদ্যালয় প্রতিটি শিক্ষার্থীর মধ্যে নৈতিক স্তম্ভতার সাথে আধুনিক শিক্ষা, নৈতিক মূল্যবোধ এবং প্রযুক্তির মাধ্যমে আগামী দিনে তুলে ধরছি আগামী প্রজন্মের সেরা, সৃজনশীল ও সামাজিক নেতৃত্ব।' },
    aboutHistory: { type: String, default: 'প্রতিষ্ঠালগ্ন থেকেই আমাদের বিদ্যালয় মানবতা শিক্ষা, সুস্থতা, নৈতিকতা এবং প্রযুক্তিনির্ভর শিক্ষার মাধ্যমে শিক্ষার্থীদের একটি সুন্দর ভবিষ্যৎ গড়ে তুলতে কাজ করে যাচ্ছে।' },
    missionText: { type: String, default: 'গুণগত মানসম্মত শিক্ষা, সুশৃঙ্খল পরিবেশ ও আধুনিক ল্যাব সুবিধার মাধ্যমে আন্তর্জাতিক মানের নাগরিক তৈরি করা।' },
    visionText: { type: String, default: 'প্রযুক্তিনির্ভর ও নৈতিক মূল্যবোধসম্পন্ন স্মার্ট বাংলাদেশ গড়ার নেতৃত্ব দানকারী প্রজন্ম গড়ে তোলা।' },
    stats: {
      students: { type: String, default: '৩,৫০০+' },
      teachers: { type: String, default: '১৪০+' },
      passRate: { type: String, default: '৯৮%' },
      establishedYear: { type: String, default: '৩০+ বছর' }
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com' },
      youtube: { type: String, default: 'https://youtube.com' },
      whatsapp: { type: String, default: 'https://wa.me/8801700000000' }
    },
    campusFacilities: { type: Array, default: [] },
    topAchievers: { type: Array, default: [] },
    academicPrograms: { type: Array, default: [] },
    clubsAndActivities: { type: Array, default: [] },
    events: { type: Array, default: [] },
    noticesList: { type: Array, default: [] },
    testimonials: { type: Array, default: [] },
    classRoutines: { type: Array, default: [] },
    faqs: { type: Array, default: [] },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
