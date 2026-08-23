import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Notice from '@/models/Notice';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const notices = await Notice.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, notices });
  } catch (error: any) {
    console.error('Notices fetch error:', error);
    return NextResponse.json({ success: false, notices: [], message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const notice = await Notice.create(body);
    return NextResponse.json({ success: true, notice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, ...updateData } = await req.json();
    const notice = await Notice.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, notice });
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

    await Notice.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Notice deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
