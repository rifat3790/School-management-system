import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SiteSettings from '@/models/SiteSettings';
import Notice from '@/models/Notice';
import Teacher from '@/models/Teacher';
import News from '@/models/News';
import Gallery from '@/models/Gallery';
import { TEACHERS_LIST, NOTICES_LIST, NEWS_LIST } from '@/data/schoolData';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Seed Site Settings
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create({
        schoolName: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুল',
        eiin: '১৩০৯৫৪',
        code: '৪৫২০',
        established: '১৯৯৮',
        slogan: 'শিক্ষাই শক্তি, প্রযুক্তিই ভবিষ্যৎ',
        subSlogan: 'জ্ঞান • শৃঙ্খলা • সাফল্য',
        phone: '+৮৮০ ১৭০০-০০০০০',
        email: 'info@drmujibrubi.edu.bd',
        address: 'কোর্ট রোড, শেরপুর ডিস্ট্রিক্ট, বাংলাদেশ',
        principalName: 'প্রফেসর মোহাম্মদ আব্দুর রশীদ',
        principalTitle: 'প্রধান শিক্ষক',
        principalMessage: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলে আমরা প্রতিটি শিক্ষার্থীর ভেতরের সুপ্ত মেধা ও সম্ভাবনা জাগ্রত করতে প্রতিশ্রুতিবদ্ধ। আমাদের লক্ষ্য শুধুমাত্র পুঁথিগত বিদ্যা নয়, বরং আধুনিক বিজ্ঞান ও প্রযুক্তি নির্ভর শিক্ষা প্রদানের মাধ্যমে শিক্ষার্থীদের বিশ্বমানের নাগরিক হিসেবে গড়ে তোলা।',
        chairmanName: 'ডাঃ মোজাম্মেল হক',
        chairmanTitle: 'প্রতিষ্ঠাতা ও সভাপতি',
        chairmanMessage: 'একটি আলোকিত সমাজ গঠনে মানসম্মত আধুনিক শিক্ষার কোনো বিকল্প নেই। আমাদের স্কুলটি ১৯৯৮ সাল থেকে অত্যন্ত নিষ্ঠা ও সুনামের সাথে শেরপুর জেলার শিক্ষাঙ্গনে অন্যতম সেরা স্থান ধরে রেখেছে।',
        heroTagline: 'শিক্ষাই শক্তি',
        heroTitleLine1: 'প্রযুক্তিই ভবিষ্যৎ',
        heroTitleLine2: 'জ্ঞান • শৃঙ্খলা • সাফল্য',
        heroDescription: 'ডাঃ মুজিব-রুবি মডেল হাই স্কুলে আমরা আধুনিক শিক্ষা, নৈতিক মূল্যবোধ এবং প্রযুক্তিনির্ভর ভবিষ্যৎ গড়ার প্রত্যয়ে প্রতিশ্রুতিবদ্ধ।',
        stats: {
          students: '২,৮৮০+',
          teachers: '৯৫+',
          passRate: '২১৫+',
          establishedYear: '১৯৯৮'
        },
        socialLinks: {
          facebook: 'https://facebook.com',
          youtube: 'https://youtube.com',
          whatsapp: 'https://wa.me/8801700000000'
        }
      });
    }

    // 2. Seed Notices
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      const noticeDocs = NOTICES_LIST.map(n => ({
        title: n.title,
        category: n.category,
        date: n.date,
        pdfUrl: n.pdfUrl || '#',
        isImportant: (n as any).isImportant || false,
        content: n.title + ' সম্পর্কিত বিস্তারিত অফিসিয়াল বিজ্ঞপ্তি পোর্টালে প্রকাশ করা হয়েছে। সকল সংশ্লিষ্টদের নিয়ম মেনে কাজ করার অনুরোধ করা হচ্ছে।'
      }));
      await Notice.insertMany(noticeDocs);
    }

    // 3. Seed Teachers
    const teacherCount = await Teacher.countDocuments();
    if (teacherCount === 0) {
      const teacherDocs = TEACHERS_LIST.map(t => ({
        name: t.name,
        designation: t.designation,
        subject: t.subject,
        qualification: t.qualification,
        experience: t.experience,
        email: t.email,
        phone: t.phone,
        image: t.image
      }));
      await Teacher.insertMany(teacherDocs);
    }

    // 4. Seed News
    const newsCount = await News.countDocuments();
    if (newsCount === 0) {
      const newsDocs = NEWS_LIST.map(nw => ({
        title: nw.title,
        category: nw.category,
        date: nw.date,
        author: nw.author,
        image: nw.image,
        summary: nw.summary,
        content: nw.summary + ' এই অনুষ্ঠানটি সফল করার জন্য পরিচালনা পর্ষদ ও সকল শিক্ষকদের প্রতি অশেষ ধন্যবাদ জানানো হচ্ছে।'
      }));
      await News.insertMany(newsDocs);
    }

    // 5. Seed Gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany([
        {
          title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক অনুষ্ঠান ২০২৪',
          category: 'ক্রীড়া',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80'
        },
        {
          title: 'আধুনিক কম্পিউটার ও রোবোটিক্স ল্যাব উদ্বোধন',
          category: 'বিজ্ঞান মেলা',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80'
        },
        {
          title: 'আন্তঃস্কুল ফুটবল টুর্নামেন্টে চ্যাম্পিয়ন ট্রফি অর্জন',
          category: 'ক্রীড়া',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80'
        },
        {
          title: 'বিজ্ঞান ও প্রযুক্তি মেলা এবং মেধা অন্বেষণ',
          category: 'বিজ্ঞান মেলা',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80'
        },
        {
          title: 'মহান স্বাধীনতা দিবস ও বিজয় দিবস উদযাপন',
          category: 'সাংস্কৃতিক',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80'
        },
        {
          title: 'এসএসসি পরীক্ষার্থীদের বিদায় সংবর্ধনা ও মিলাদ মাহফিল',
          category: 'পুরস্কার বিতরণ',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80'
        }
      ]);
    }

    return NextResponse.json({
      success: true,
      message: 'MongoDB Seeded Successfully with initial data!'
    });
  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
