import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import AlumniStory from '@/models/AlumniStory';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const stories = await AlumniStory.find().sort({ createdAt: -1 });
    const sanitized = stories.map((s: any) => {
      const obj = s.toObject ? s.toObject() : s;
      if (obj.image && obj.image.includes('unsplash.com')) obj.image = '';
      return obj;
    });
    return NextResponse.json({ success: true, stories: sanitized });
  } catch (error: any) {
    console.error('Alumni stories fetch error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const story = await AlumniStory.create(body);
    return NextResponse.json({ success: true, story }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, _id, ...updateData } = await req.json();
    const targetId = id || _id;
    const story = await AlumniStory.findByIdAndUpdate(targetId, updateData, { new: true });
    return NextResponse.json({ success: true, story });
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

    await AlumniStory.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Story deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
