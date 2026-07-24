import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ContactMessage from '@/models/ContactMessage';

export async function GET() {
  try {
    await dbConnect();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    console.error('Contact fetch error:', error);
    return NextResponse.json({ success: true, messages: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const message = await ContactMessage.create(body);
    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, status } = await req.json();
    const message = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, message });
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

    await ContactMessage.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Message deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
