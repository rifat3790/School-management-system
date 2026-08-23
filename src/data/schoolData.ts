export interface Teacher {
  id: string;
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  experience: string;
  email: string;
  phone: string;
  image: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'একাডেমিক' | 'পরীক্ষা' | 'ভর্তি' | 'ইভেন্ট' | 'জরুরি';
  isPinned?: boolean;
  isImportant?: boolean;
  content: string;
  pdfUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'past';
  description: string;
  image: string;
}

export interface ClassAcademic {
  className: string;
  classTeacher: string;
  totalStudents: number;
  subjects: { code: string; name: string; teacher: string; marks: number }[];
  routine: { day: string; periods: { time: string; subject: string; teacher: string }[] }[];
  syllabusUrl: string;
}

export interface StudentResult {
  roll: string;
  regNo: string;
  studentName: string;
  className: string;
  section: string;
  examType: string;
  year: string;
  gpa: number;
  grade: string;
  marks: { subject: string; fullMarks: number; obtained: number; letterGrade: string; point: number }[];
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: string;
  classLevel: string;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
  location: string;
}

export interface AlumniStory {
  id: string;
  name: string;
  batch: string;
  profession: string;
  organization: string;
  story: string;
  image: string;
}

export const SCHOOL_INFO = {
  name: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
  nameEng: 'Dr. Mujib-Rubi Model High School',
  sloganPrimary: 'শিক্ষাই শক্তি, প্রযুক্তিই ভবিষ্যৎ',
  sloganSecondary: 'জ্ঞান • শৃঙ্খলা • সাফল্য',
  estYear: 1995,
  eiin: '134568',
  schoolCode: '4021',
  phone: '+880 1712-345678',
  email: 'info@mujibrubi-school.edu.bd',
  address: 'কলেজ রোড, মডেল টাউন, ঢাকা - ১২১৫, বাংলাদেশ',
  stats: {
    students: 1250,
    teachers: 45,
    passRate: 98.5,
    aPlusRate: 42.0,
    classrooms: 32,
    computerLabs: 2,
    scienceLabs: 3,
  },
  principal: {
    name: 'ড. মোহাম্মদ আবদুর রউফ',
    designation: 'প্রধান শিক্ষক (পিএইচডি, ঢাকা বিশ্ববিদ্যালয়)',
    message: 'আমাদের লক্ষ্য শুধুমাত্র সনদ প্রদান করা নয়, বরং প্রতিটি শিক্ষার্থীকে নৈতিক মূল্যবোধ ও আধুনিক প্রযুক্তিতে দক্ষ সুনাগরিক হিসেবে গড়ে তোলা। আমরা মানসম্মত শিক্ষা ও সহ-পাঠ্যক্রমিক কার্যক্রমের মাধ্যমে শিক্ষার্থীদের সুপ্ত প্রতিভার বিকাশ ঘটাতে প্রতিশ্রুতিবদ্ধ।',
    image: '',
    signature: 'ড. রউফ',
  },
  chairman: {
    name: 'প্রকৌশলী এ কে এম সামসুল হক',
    designation: 'সভাপতি, ব্যবস্থাপনা কমিটি',
    message: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল অত্র অঞ্চলের অন্যতম সেরা শিক্ষাপ্রতিষ্ঠান হিসেবে আত্মপ্রকাশ করেছে। স্মার্ট ডিজিটাল ক্লাসরুম এবং আন্তর্জাতিক মানের ল্যাবরেটরির মাধ্যমে আমরা ভবিষ্যতের নতুন উদ্ভাবক তৈরি করছি।',
    image: '',
  }
};

export const TEACHERS_LIST: Teacher[] = [
  {
    id: 't-1',
    name: 'ড. মোহাম্মদ আবদুর রউফ',
    designation: 'প্রধান শিক্ষক',
    subject: 'পদার্থবিজ্ঞান',
    qualification: 'বিএসসি (সম্মান), এমএসসি, পিএইচডি (ঢাবি)',
    experience: '২২ বছর',
    email: 'principal@mujibrubi-school.edu.bd',
    phone: '+880 1711-100200',
    image: '',
  },
  {
    id: 't-2',
    name: 'মোছাঃ রেজোয়ানা বেগম',
    designation: 'সহকারী প্রধান শিক্ষক',
    subject: 'গণিত',
    qualification: 'বিএসসি, এমএসসি (গণিত, জাবি)',
    experience: '১৮ বছর',
    email: 'rezwana@mujibrubi-school.edu.bd',
    phone: '+880 1712-200300',
    image: '',
  },
  {
    id: 't-3',
    name: 'আহমেদ জিয়াউল করিম',
    designation: 'সিনিয়র শিক্ষক',
    subject: 'বাংলা সাহিত্য',
    qualification: 'বিএ (সম্মান), এমএ (বাংলা, ঢাবি)',
    experience: '১৫ বছর',
    email: 'ziaul.karim@mujibrubi-school.edu.bd',
    phone: '+880 1713-300400',
    image: '',
  },
  {
    id: 't-4',
    name: 'মোরশেদ আলম শিকদার',
    designation: 'সিনিয়র শিক্ষক',
    subject: 'ইংরেজি',
    qualification: 'এমএ (ইংরেজি, রাবি)',
    experience: '১২ বছর',
    email: 'morshed.english@mujibrubi-school.edu.bd',
    phone: '+880 1714-400500',
    image: '',
  },
  {
    id: 't-5',
    name: 'নুসরাত জাহান তানিয়া',
    designation: 'সহকারী শিক্ষক',
    subject: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)',
    qualification: 'বিএসসি ইন সিএসই (বুয়েট)',
    experience: '৮ বছর',
    email: 'nusrat.ict@mujibrubi-school.edu.bd',
    phone: '+880 1715-500600',
    image: '',
  },
  {
    id: 't-6',
    name: 'ড. সায়মা চৌধুরী',
    designation: 'সিনিয়র শিক্ষক',
    subject: 'রসায়ন বিজ্ঞান',
    qualification: 'এমএসসি, পিএইচডি (রসায়ন)',
    experience: '১০ বছর',
    email: 'sayma.chem@mujibrubi-school.edu.bd',
    phone: '+880 1716-600700',
    image: '',
  },
  {
    id: 't-7',
    name: 'কাজী মাহমুদুল হাসান',
    designation: 'সহকারী শিক্ষক',
    subject: 'জীববিজ্ঞান',
    qualification: 'এমএসসি (উদ্ভিদবিজ্ঞান, ঢাবি)',
    experience: '৭ বছর',
    email: 'mahmud.bio@mujibrubi-school.edu.bd',
    phone: '+880 1717-700800',
    image: '',
  },
  {
    id: 't-8',
    name: 'ফাতেমা ইয়াসমিন',
    designation: 'সহকারী শিক্ষক',
    subject: 'বাংলাদেশ ও বিশ্বপরিচয়',
    qualification: 'এমএ (ইতিহাস, চবি)',
    experience: '৯ বছর',
    email: 'fatema.bgw@mujibrubi-school.edu.bd',
    phone: '+880 1718-800900',
    image: '',
  }
];

export const NOTICES_LIST: Notice[] = [
  {
    id: 'n-1',
    title: '২০২৬ শিক্ষাবর্ষের অর্ধবার্ষিক পরীক্ষার সময়সূচি প্রকাশ',
    date: '২০ মে, ২০২৬',
    category: 'পরীক্ষা',
    isPinned: true,
    content: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলের ৬ষ্ঠ থেকে ১০ম শ্রেণীর সকল শিক্ষার্থীদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী ১৫ জুন ২০২৬ থেকে অর্ধবার্ষিক পরীক্ষা শুরু হবে। বিস্তারিত সময়সূচি ডাউনলোড করুন।',
    pdfUrl: '#',
  },
  {
    id: 'n-2',
    title: 'অনলাইন ভর্তি ২০২৬ - ২য় অপেক্ষমাণ তালিকা প্রকাশ',
    date: '১৮ মে, ২০২৬',
    category: 'ভর্তি',
    isPinned: true,
    content: '৬ষ্ঠ ও ৯ম শ্রেণীতে ভর্তির ১ম তালিকায় উত্তীর্ণ শিক্ষার্থীদের ভর্তি সম্পন্ন হয়েছে। শূন্য আসনে ২য় অপেক্ষমাণ তালিকা থেকে ভর্তি আগামী ২৫ মে পর্যন্ত চলবে।',
    pdfUrl: '#',
  },
  {
    id: 'n-3',
    title: 'বার্ষিক বিজ্ঞান মেলা ও রোবোটিক্স প্রদর্শনী সংক্রান্ত বিজ্ঞপ্তি',
    date: '১২ মে, ২০২৬',
    category: 'ইভেন্ট',
    isPinned: false,
    content: 'আগামী ৫ জুন স্কুলের বিজ্ঞানাগারে দিনব্যাপী বার্ষিক বিজ্ঞান মেলা অনুষ্ঠিত হবে। ইচ্ছুক দলগুলোকে ৩০ মে এর মধ্যে আইসিটি শিক্ষকের কাছে নাম নিবন্ধনের নির্দেশ দেওয়া গেল।',
    pdfUrl: '#',
  },
  {
    id: 'n-4',
    title: 'পবিত্র ঈদুল ফিতর উপলক্ষে স্কুল ছুটির বিজ্ঞপ্তি',
    date: '০১ মে, ২০২৬',
    category: 'জরুরি',
    isPinned: false,
    content: 'আগামী ১০ মে থেকে ১৮ মে পর্যন্ত স্কুল বন্ধ থাকবে। ১৯ মে রবিবার থেকে যথারীতি ক্লাস পরিচালিত হবে।',
    pdfUrl: '#',
  },
  {
    id: 'n-5',
    title: 'ডিজিটাল আইডেন্টিটি কার্ড বিতরণ ও বায়োমেট্রিক রেজিস্ট্রেশন',
    date: '২৫ এপ্রিল, ২০২৬',
    category: 'একাডেমিক',
    isPinned: false,
    content: 'সকল নতুন ভর্তি হওয়া ছাত্র-ছাত্রীদের স্মার্ট আইডি কার্ড আগামী সপ্তাহ থেকে প্রদান করা হবে।',
    pdfUrl: '#',
  }
];

export const NEWS_LIST: NewsItem[] = [
  {
    id: 'news-1',
    title: 'জাতীয় বিজ্ঞান অলিম্পিয়াডে ডাঃ মুজিব-রুবি মডেল হাই স্কুলের চ্যারা চ্যাম্পিয়ন',
    date: '১৫ মে, ২০২৬',
    category: 'সাফল্য',
    author: 'আইসিটি ক্লাব',
    summary: 'জাতীয় রোবোটিক্স ও বিজ্ঞান মেলায় আমাদের ৯ম শ্রেণীর শিক্ষার্থীরা ১ম স্থান অধিকার করে স্বর্ণপদক অর্জন করেছে।',
    content: 'বাংলাদেশ বিজ্ঞান একাডেমি কর্তৃক আয়োজিত ২৫তম জাতীয় বিজ্ঞান অলিম্পিয়াডে সারা দেশের ৫০০টি স্কুলের সাথে প্রতিযোগিতা করে ডাঃ মুজিব-রুবি মডেল হাই স্কুলের "স্মার্ট এগ্রো রোবট" প্রজেক্ট ১ম স্থান অধিকার করেছে। বিজয়ী শিক্ষার্থীদের স্কুলের পক্ষ থেকে সম্মাননা স্মারক দেওয়া হয়।',
    image: '',
    tags: ['বিজ্ঞান', 'অলিম্পিয়াড', 'সাফল্য', 'রোবোটিক্স'],
  },
  {
    id: 'news-2',
    title: 'সকল ক্লাসরুমে ইন্টারেক্টিভ স্মার্ট ডিজিটাল বোর্ড স্থাপন সম্পন্ন',
    date: '১০ মে, ২০২৬',
    category: 'ক্যাম্পাস',
    author: 'মিডিয়া সেল',
    summary: 'আধুনিক প্রযুক্তিনির্ভর শিক্ষার অংশ হিসেবে প্রতিটি ক্লাসরুমে ইনস্টল করা হয়েছে ৪র্থ প্রজন্মের ইন্টারেক্টিভ ডিসপ্লে।',
    content: 'শিক্ষার্থীদের ভিজ্যুয়াল ও প্রযুক্তিগত মান বাড়াতে স্কুলের ৩২টি শ্রেণীকক্ষেই ৭৫ ইঞ্চি ৪কে ইন্টারেক্টিভ ডিজিটাল টাচ বোর্ড স্থাপন করা হয়েছে। এর ফলে শিক্ষার্থীরা সহজেই থ্রিডি এনিমেশন ও সিমুলেশনের মাধ্যমে কঠিন বিষয় বুঝতে পারবে।',
    image: '',
    tags: ['ডিজিটাল', 'স্মার্ট ক্লাসরুম', 'প্রযুক্তি'],
  },
  {
    id: 'news-3',
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও পুরস্কার বিতরণী উৎসব ২০২৬',
    date: '২৮ এপ্রিল, ২০২৬',
    category: 'খেলাধুলা',
    author: 'স্পোর্টস ক্লাব',
    summary: 'স্কুল মাঠে অনুষ্ঠিত হলো জমকালো বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক পরিবেশনা।',
    content: 'তিন দিনব্যাপী বার্ষিক ক্রীড়া প্রতিযোগিতায় প্রায় ৮০০ শিক্ষার্থী দৌড়, লাফ, ফুটবল ও ক্রিকেটে অংশগ্রহণ করে। বিজয়ীদের হাতে ট্রফি তুলে দেন স্থানীয় সংসদ সদস্য ও পরিচালনা পর্ষদের সদস্যবৃন্দ।',
    image: '',
    tags: ['ক্রীড়া', 'পুরস্কার', 'উৎসব'],
  }
];

export const EVENTS_LIST: EventItem[] = [
  {
    id: 'e-1',
    title: 'বার্ষিক বিজ্ঞান ও রোবোটিক্স ফেয়ার ২০২৬',
    date: '০৫ জুন, ২০২৬',
    time: 'সকাল ০৯:০০ - বিকেল ০৪:০০',
    venue: 'স্কুল মিলনায়তন ও সায়েন্স ল্যাব',
    status: 'upcoming',
    description: 'শিক্ষার্থীদের ৫০টির বেশি উদ্ভাবনী প্রযুক্তি প্রজেক্ট প্রদর্শনী এবং লাইভ রোবট রেসিং প্রতিযোগিতা।',
    image: '',
  },
  {
    id: 'e-2',
    title: 'প্রাক্তন শিক্ষার্থী প্রীতি পুনর্মিলনী (Alumni Reunion)',
    date: '২৫ জুন, ২০২৬',
    time: 'বিকেল ০৩:০০ - রাত ০৯:০০',
    venue: 'ক্যাম্পাস গ্রাউন্ড',
    status: 'upcoming',
    description: '১৯৯৫ সাল থেকে ২০২৫ সালের সকল ব্যাচের প্রাক্তন শিক্ষার্থীদের মিলনমেলা ও সাংস্কৃতিক সন্ধ্যা।',
    image: '',
  },
  {
    id: 'e-3',
    title: 'আন্তর্জাতিক মাতৃভাষা দিবস উদ্যাপন',
    date: '২১ ফেব্রুয়ারি, ২০২৬',
    time: 'সকাল ০৬:৩০',
    venue: 'স্কুল শহীদ মিনার',
    status: 'past',
    description: 'প্রভাতফেরি, পুষ্পস্তবক অর্পণ এবং "ভাষাশহীদ ও আমাদের অঙ্গীকার" বিষয়ক আলোচনা সভা।',
    image: '',
  }
];

export const CLASS_ACADEMIC_DATA: Record<string, ClassAcademic> = {
  'class-6': {
    className: '৬ষ্ঠ শ্রেণী (Class 6)',
    classTeacher: 'আহমেদ জিয়াউল করিম',
    totalStudents: 240,
    subjects: [
      { code: '101', name: 'বাংলা', teacher: 'আহমেদ জিয়াউল করিম', marks: 100 },
      { code: '102', name: 'ইংরেজি', teacher: 'মোরশেদ আলম শিকদার', marks: 100 },
      { code: '103', name: 'গণিত', teacher: 'মোছাঃ রেজোয়ানা বেগম', marks: 100 },
      { code: '104', name: 'বিজ্ঞান', teacher: 'ড. সায়মা চৌধুরী', marks: 100 },
      { code: '105', name: 'ডিজিটাল প্রযুক্তি (ICT)', teacher: 'নুসরাত জাহান তানিয়া', marks: 50 },
      { code: '106', name: 'বাংলাদেশ ও বিশ্বপরিচয়', teacher: 'ফাতেমা ইয়াসমিন', marks: 100 },
    ],
    routine: [
      {
        day: 'রবিবার',
        periods: [
          { time: '০৯:০০ - ০৯:৪৫', subject: 'বাংলা', teacher: 'আহমেদ জিয়াউল করিম' },
          { time: '০৯:৪৫ - ১০:৩০', subject: 'গণিত', teacher: 'মোছাঃ রেজোয়ানা বেগম' },
          { time: '১০:৩০ - ১১:১৫', subject: 'ইংরেজি', teacher: 'মোরশেদ আলম শিকদার' },
          { time: '১১:৪৫ - ১২:৩০', subject: 'বিজ্ঞান', teacher: 'ড. সায়মা চৌধুরী' },
        ]
      },
      {
        day: 'সোমবার',
        periods: [
          { time: '০৯:০০ - ০৯:৪৫', subject: 'ডিজিটাল প্রযুক্তি', teacher: 'নুসরাত জাহান তানিয়া' },
          { time: '০৯:৪৫ - ১০:৩০', subject: 'বিজ্ঞান', teacher: 'ড. সায়মা চৌধুরী' },
          { time: '১০:৩০ - ১১:১৫', subject: 'বাংলা', teacher: 'আহমেদ জিয়াউল করিম' },
          { time: '১১:৪৫ - ১২:৩০', subject: 'গণিত', teacher: 'মোছাঃ রেজোয়ানা বেগম' },
        ]
      }
    ],
    syllabusUrl: '#'
  },
  'class-9': {
    className: '৯ম শ্রেণী (Class 9 - বিজ্ঞান বিভাগ)',
    classTeacher: 'নুসরাত জাহান তানিয়া',
    totalStudents: 220,
    subjects: [
      { code: '301', name: 'পদার্থবিজ্ঞান', teacher: 'ড. মোহাম্মদ আবদুর রউফ', marks: 100 },
      { code: '302', name: 'রসায়ন', teacher: 'ড. সায়মা চৌধুরী', marks: 100 },
      { code: '303', name: 'উচ্চতর গণিত', teacher: 'মোছাঃ রেজোয়ানা বেগম', marks: 100 },
      { code: '304', name: 'জীববিজ্ঞান', teacher: 'কাজী মাহমুদুল হাসান', marks: 100 },
      { code: '305', name: 'আইসিটি', teacher: 'নুসরাত জাহান তানিয়া', marks: 50 },
    ],
    routine: [
      {
        day: 'রবিবার',
        periods: [
          { time: '০৯:০০ - ০৯:৪৫', subject: 'পদার্থবিজ্ঞান', teacher: 'ড. মোহাম্মদ আবদুর রউফ' },
          { time: '০৯:৪৫ - ১০:৩০', subject: 'উচ্চতর গণিত', teacher: 'মোছাঃ রেজোয়ানা বেগম' },
          { time: '১০:৩০ - ১১:১৫', subject: 'রসায়ন', teacher: 'ড. সায়মা চৌধুরী' },
          { time: '১১:৪৫ - ১২:৩০', subject: 'জীববিজ্ঞান', teacher: 'কাজী মাহমুদুল হাসান' },
        ]
      }
    ],
    syllabusUrl: '#'
  }
};

export const MOCK_RESULTS: Record<string, StudentResult> = {
  '101': {
    roll: '101',
    regNo: '2026900101',
    studentName: 'রাফসান আহমেদ',
    className: '১০ম শ্রেণী',
    section: 'ক (বিজ্ঞান)',
    examType: 'বার্ষিক পরীক্ষা ২০২৫',
    year: '২০২৫',
    gpa: 5.00,
    grade: 'A+',
    marks: [
      { subject: 'বাংলা', fullMarks: 100, obtained: 88, letterGrade: 'A+', point: 5.00 },
      { subject: 'ইংরেজি', fullMarks: 100, obtained: 85, letterGrade: 'A+', point: 5.00 },
      { subject: 'উচ্চতর গণিত', fullMarks: 100, obtained: 95, letterGrade: 'A+', point: 5.00 },
      { subject: 'পদার্থবিজ্ঞান', fullMarks: 100, obtained: 92, letterGrade: 'A+', point: 5.00 },
      { subject: 'রসায়ন', fullMarks: 100, obtained: 90, letterGrade: 'A+', point: 5.00 },
      { subject: 'জীববিজ্ঞান', fullMarks: 100, obtained: 86, letterGrade: 'A+', point: 5.00 },
      { subject: 'আইসিটি', fullMarks: 50, obtained: 48, letterGrade: 'A+', point: 5.00 },
    ]
  },
  '102': {
    roll: '102',
    regNo: '2026900102',
    studentName: 'সাদিয়া সুলতানা মিমি',
    className: '১০ম শ্রেণী',
    section: 'ক (বিজ্ঞান)',
    examType: 'বার্ষিক পরীক্ষা ২০২৫',
    year: '২০২৫',
    gpa: 4.86,
    grade: 'A',
    marks: [
      { subject: 'বাংলা', fullMarks: 100, obtained: 82, letterGrade: 'A+', point: 5.00 },
      { subject: 'ইংরেজি', fullMarks: 100, obtained: 78, letterGrade: 'A', point: 4.00 },
      { subject: 'উচ্চতর গণিত', fullMarks: 100, obtained: 90, letterGrade: 'A+', point: 5.00 },
      { subject: 'পদার্থবিজ্ঞান', fullMarks: 100, obtained: 85, letterGrade: 'A+', point: 5.00 },
      { subject: 'রসায়ন', fullMarks: 100, obtained: 80, letterGrade: 'A+', point: 5.00 },
      { subject: 'জীববিজ্ঞান', fullMarks: 100, obtained: 79, letterGrade: 'A', point: 4.00 },
      { subject: 'আইসিটি', fullMarks: 50, obtained: 46, letterGrade: 'A+', point: 5.00 },
    ]
  }
};

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'b-1',
    title: 'পদার্থবিজ্ঞানের প্রথম পাঠ',
    author: 'ড. জামিলুর রেজা চৌধুরী',
    category: 'বিজ্ঞান ও গবেষণা',
    classLevel: '৯ম-১০ম শ্রেণী',
    isbn: '978-984-9001-12',
    totalCopies: 15,
    availableCopies: 9,
    location: 'সেলফ A-03',
  },
  {
    id: 'b-2',
    title: 'পাইথন দিয়ে প্রোগ্রামিং শেখা',
    author: 'তামিম শাহরিয়ার সুবিন',
    category: 'কম্পিউটার ও আইসিটি',
    classLevel: 'সকল শ্রেণী',
    isbn: '978-984-9002-45',
    totalCopies: 20,
    availableCopies: 14,
    location: 'সেলফ B-01',
  },
  {
    id: 'b-3',
    title: 'সঞ্চয়িতা',
    author: 'রবীন্দ্রনাথ ঠাকুর',
    category: 'বাংলা সাহিত্য',
    classLevel: 'সকল শ্রেণী',
    isbn: '978-984-9003-88',
    totalCopies: 10,
    availableCopies: 4,
    location: 'সেলফ C-05',
  },
  {
    id: 'b-4',
    title: 'উচ্চতর গণিত শর্টকাট টেকনিক',
    author: 'মোছাঃ রেজোয়ানা বেগম',
    category: 'গণিত',
    classLevel: '৯ম-১০ম শ্রেণী',
    isbn: '978-984-9004-99',
    totalCopies: 25,
    availableCopies: 18,
    location: 'সেলফ A-08',
  }
];

export const ALUMNI_STORIES: AlumniStory[] = [
  {
    id: 'a-1',
    name: 'প্রকৌশলী তানভীর হোসেন',
    batch: 'এসএসসি ২০০৫ ব্যাচ',
    profession: 'সফটওয়্যার আর্কিটেক্ট',
    organization: 'গুগল (Google, USA)',
    story: 'ডাঃ মুজিব-রুবি হাই স্কুলের আইসিটি ল্যাব থেকেই আমার প্রোগ্রামিংয়ের হাতেখড়ি। এখানকার শিক্ষকদের নিবিড় পরিচর্যা আজ আমাকে আন্তর্জাতিক পর্যায়ে সাফল্যের শিখরে পৌঁছাতে সাহায্য করেছে।',
    image: '',
  },
  {
    id: 'a-2',
    name: 'ড. ফারহানা শারমিন',
    batch: 'এসএসসি ২০১০ ব্যাচ',
    profession: 'সহকারী অধ্যাপক ও চিকিৎসা বিজ্ঞানী',
    organization: 'বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়',
    story: 'স্কুলের সায়েন্স ল্যাবের ব্যবহারিক শিক্ষা এবং বিজ্ঞান মেলায় অংশ নেওয়ার অভিজ্ঞতাই আমাকে চিকিৎসাবিজ্ঞানে গবেষণায় অনুপ্রাণিত করেছিল।',
    image: '',
  }
];

export const FAQ_LIST = [
  {
    question: 'অনলাইনে কীভাবে ভর্তি আবেদন করব?',
    answer: 'ওয়েবসাইটের "ভর্তি" মেনুতে গিয়ে "আবেদন করুন" বাটনে ক্লিক করে অনলাইনে ফর্মটি পূরণ করুন। প্রয়োজনীয় ফটো ও জন্ম সনদ আপলোড করে ফি জমা দিলেই আবেদন প্রক্রিয়া সম্পন্ন হবে।',
  },
  {
    question: 'অনলাইন রেজাল্ট কীভাবে দেখা যায়?',
    answer: 'ন্যাভবারের "ফলাফল" বাটন অথবা হোমপেজের "ফলাফল দেখুন" অপশনে ক্লিক করে শিক্ষার্থীর রোল ও রেজিস্ট্রেশন নম্বর দিলেই সম্পূর্ণ ডিজিটাল মার্কশীট পেয়ে যাবেন।',
  },
  {
    question: 'স্কুলের ক্লাস সময়সূচি কত?',
    answer: 'স্কুলের নিয়মিত ক্লাস সকাল ৮:৩০ থেকে শুরু হয়ে দুপুর ২:১৫ পর্যন্ত পরিচালিত হয়।',
  },
  {
    question: 'অভিভাবক কীভাবে ড্যাশবোর্ডে লগইন করবেন?',
    answer: 'লগইন পেজে গিয়ে "অভিভাবক" অপশন সিলেক্ট করুন এবং শিক্ষার্থীর রোল ও মোবাইল নম্বর দিয়ে লগইন করুন।',
  }
];
