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
    bgGradient: string;
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
    time: string;
    location: string;
    category: string;
    image: string;
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
    slogan: { type: String, default: 'শিক্ষাই শক্তি, প্রযুক্তিই ভবিষ্যৎ' },
    subSlogan: { type: String, default: 'জ্ঞান • শৃঙ্খলা • সাফল্য' },
    phone: { type: String, default: '+৮৮০ ১৭০০-০০০০০' },
    email: { type: String, default: 'info@drmujibrubi.edu.bd' },
    address: { type: String, default: 'কোর্ট রোড, শেরপুর ডিস্ট্রিক্ট, বাংলাদেশ' },
    heroImage: { type: String, default: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&q=80' },
    principalName: { type: String, default: 'প্রফেসর মোহাম্মদ আব্দুর রশীদ' },
    principalTitle: { type: String, default: 'প্রধান শিক্ষক' },
    principalMessage: { type: String, default: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলে আমরা প্রতিটি শিক্ষার্থীর ভেতরের সুপ্ত মেধা ও সম্ভাবনা জাগ্রত করতে প্রতিশ্রুতিবদ্ধ।' },
    principalImage: { type: String, default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
    chairmanName: { type: String, default: 'ডাঃ মোজাম্মেল হক' },
    chairmanTitle: { type: String, default: 'প্রতিষ্ঠাতা ও সভাপতি' },
    chairmanMessage: { type: String, default: 'একটি আলোকিত সমাজ গঠনে মানসম্মত আধুনিক শিক্ষার কোনো বিকল্প নেই।' },
    chairmanImage: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
    heroTagline: { type: String, default: 'শিক্ষাই শক্তি' },
    heroTitleLine1: { type: String, default: 'প্রযুক্তিই ভবিষ্যৎ' },
    heroTitleLine2: { type: String, default: 'মেধা ও শৃঙ্খলা' },
    heroDescription: { type: String, default: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলে আমরা আধুনিক শিক্ষা, নৈতিক মূল্যবোধ এবং প্রযুক্তিনির্ভর ভবিষ্যৎ গড়ার প্রত্যয়ে প্রতিশ্রুতিবদ্ধ।' },
    aboutHistory: { type: String, default: '১৯৯৮ সালে প্রতিষ্ঠিত ডাঃ মুজিব-রুবি মডেল হাই স্কুল শেরপুর জেলার প্রাচীনতম ও শ্রেষ্ঠতম ডিজিটাল শিক্ষাঙ্গন।' },
    missionText: { type: String, default: 'আধুনিক প্রযুক্তিনির্ভর শিক্ষা ও নৈতিক মূল্যবোধের সমন্বয়ে আন্তর্জাতিক মানের মেধা বিকাশ।' },
    visionText: { type: String, default: 'স্মার্ট বাংলাদেশ গড়ার লক্ষ্যে দক্ষ, বিজ্ঞ ও চরিত্রবান ভবিষ্যৎ প্রজন্ম তৈরি করা।' },
    stats: {
      students: { type: String, default: '২,৮৮০+' },
      teachers: { type: String, default: '৯৫+' },
      passRate: { type: String, default: '২১৫+' },
      establishedYear: { type: String, default: '১৯৯৮' }
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
    testimonials: { type: Array, default: [] },
    faqs: { type: Array, default: [] }
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

