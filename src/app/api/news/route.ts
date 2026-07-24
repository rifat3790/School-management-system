import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import News from '@/models/News';
import { NEWS_LIST } from '@/data/schoolData';

export async function GET() {
  try {
    await dbConnect();
    const news = await News.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, news });
  } catch (error: any) {
    console.error('News fetch error:', error);
    const mockNews = NEWS_LIST.map(n => ({
      _id: n.id,
      title: n.title,
      category: n.category,
      date: n.date,
      author: n.author,
      image: n.image,
      summary: n.summary,
      content: n.summary
    }));
    return NextResponse.json({ success: true, news: mockNews });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = await News.create(body);
    return NextResponse.json({ success: true, news: item }, { status: 201 });
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

    await News.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'News deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
