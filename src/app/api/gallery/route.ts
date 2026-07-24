import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Gallery from '@/models/Gallery';

export async function GET() {
  try {
    await dbConnect();
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, gallery });
  } catch (error: any) {
    console.error('Gallery fetch error:', error);
    const mockGallery = [
      {
        _id: 'g1',
        title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক অনুষ্ঠান ২০২৪',
        category: 'ক্রীড়া',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80'
      },
      {
        _id: 'g2',
        title: 'আধুনিক কম্পিউটার ও রোবোটিক্স ল্যাব উদ্বোধন',
        category: 'বিজ্ঞান মেলা',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80'
      },
      {
        _id: 'g3',
        title: 'আন্তঃস্কুল ফুটবল টুর্নামেন্টে চ্যাম্পিয়ন ট্রফি অর্জন',
        category: 'ক্রীড়া',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80'
      },
      {
        _id: 'g4',
        title: 'বিজ্ঞান ও প্রযুক্তি মেলা এবং মেধা অন্বেষণ',
        category: 'বিজ্ঞান মেলা',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80'
      }
    ];
    return NextResponse.json({ success: true, gallery: mockGallery });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await Gallery.create(body);
    return NextResponse.json({ success: true, gallery: item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, ...updateData } = await req.json();
    const item = await Gallery.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, gallery: item });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });

    await Gallery.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Item deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
