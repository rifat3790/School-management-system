import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Gallery from '@/models/Gallery';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, gallery });
  } catch (error: any) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json({ success: false, gallery: [], message: error.message }, { status: 500 });
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
