import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ChatMessage from '@/models/ChatMessage';

export const dynamic = 'force-dynamic';

// In-memory fallback array for live messaging when DB lookup has DNS delay
const memoryChat: any[] = [
  {
    _id: 'c1',
    senderName: 'স্মার্ট স্কুল সহকারী',
    senderRole: 'bot',
    text: 'আসসালামু আলাইকুম! ডাঃ মুজিব-রুবি মডেল হাই স্কুলের লাইভ হেল্পডেস্কে স্বাগতম। ভর্তি, ফি, রুটিন বা যেকোনো বিষয়ে কোনো প্রশ্ন থাকলে বার্তা লিখুন বা ছবি শেয়ার করুন।',
    imageUrl: '',
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    await dbConnect();
    const messages = await ChatMessage.find().sort({ createdAt: 1 }).limit(100);
    return NextResponse.json({
      success: true,
      messages: messages.length > 0 ? messages : memoryChat,
    });
  } catch (error: any) {
    console.error('Chat GET Error:', error);
    return NextResponse.json({
      success: true,
      messages: memoryChat,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id, senderName, senderEmail, senderRole, text, imageUrl } = body;

    if (!text && !imageUrl) {
      return NextResponse.json({ success: false, message: 'বার্তা বা ছবি প্রদান করা আবশ্যক' }, { status: 400 });
    }

    const msgObj = {
      _id: _id || ('chat-' + Date.now()),
      senderName: senderName || 'শিক্ষার্থী/অভিভাবক',
      senderEmail: senderEmail || 'user@drmujibrubi.edu.bd',
      senderRole: senderRole || 'user',
      recipientRole: senderRole === 'admin' ? 'user' : 'management',
      text: text || '',
      imageUrl: imageUrl || '',
      createdAt: new Date().toISOString()
    };

    try {
      await dbConnect();
      const savedMsg = await ChatMessage.create(msgObj);
      memoryChat.push(savedMsg);
      return NextResponse.json({ success: true, message: savedMsg }, { status: 201 });
    } catch (dbErr) {
      memoryChat.push(msgObj);
      return NextResponse.json({ success: true, message: msgObj }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
      await ChatMessage.findByIdAndDelete(id);
    } else {
      await ChatMessage.deleteMany({});
    }
    return NextResponse.json({ success: true, message: 'চ্যাট ইতিহাস মুছে ফেলা হয়েছে' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
