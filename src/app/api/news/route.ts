import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import News from '@/models/News';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const news = await News.find().sort({ createdAt: -1 });
    const sanitized = news.map((n: any) => {
      const obj = n.toObject ? n.toObject() : n;
      if (obj.image && obj.image.includes('unsplash.com')) obj.image = '';
      return obj;
    });
    return NextResponse.json({ success: true, news: sanitized });
  } catch (error: any) {
    console.error('News fetch error:', error);
    return NextResponse.json({ success: false, news: [], message: error.message }, { status: 500 });
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

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, ...updateData } = await req.json();
    const item = await News.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, news: item });
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
