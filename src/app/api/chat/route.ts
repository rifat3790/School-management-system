import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ChatMessage from '@/models/ChatMessage';

export const dynamic = 'force-dynamic';

const initialWelcomeMessage = {
  _id: 'welcome-init',
  senderName: 'স্কুল লাইভ সাপোর্ট',
  senderRole: 'system',
  text: 'আসসালামু আলাইকুম! ডাঃ মুজিব-রুবি মডেল হাই স্কুলের লাইভ হেল্পডেস্কে স্বাগতম। আপনার যেকোনো প্রশ্ন বা বার্তা লিখুন। আমাদের এডমিন ও শিক্ষক প্যানেল লাইভ পর্যবেক্ষণ করছেন।',
  imageUrl: '',
  createdAt: new Date().toISOString()
};

export async function GET() {
  try {
    await dbConnect();
    const messages = await ChatMessage.find().sort({ createdAt: 1 }).limit(150).lean();
    
    if (messages.length === 0) {
      return NextResponse.json({
        success: true,
        messages: [initialWelcomeMessage],
      });
    }

    return NextResponse.json({
      success: true,
      messages: messages,
    });
  } catch (error: any) {
    console.error('Chat GET Error:', error);
    return NextResponse.json({
      success: true,
      messages: [initialWelcomeMessage],
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { _id, senderName, senderEmail, senderRole, text, imageUrl, isFirstMessage } = body;

    if (!text && !imageUrl) {
      return NextResponse.json({ success: false, message: 'বার্তা বা ছবি প্রদান করা আবশ্যক' }, { status: 400 });
    }

    await dbConnect();

    const newMsg = await ChatMessage.create({
      senderName: senderName || 'শিক্ষার্থী / অভিভাবক',
      senderEmail: senderEmail || 'visitor@drmujibrubi.edu.bd',
      senderRole: senderRole || 'user',
      recipientRole: (senderRole === 'admin' || senderRole === 'teacher') ? 'user' : 'management',
      text: text || '',
      imageUrl: imageUrl || '',
    });

    const responseMessages = [newMsg];

    // If it is the user's first inquiry, send ONE immediate polite acknowledgement
    if (senderRole === 'user' && isFirstMessage) {
      const userPrevCount = await ChatMessage.countDocuments({ senderRole: 'user' });
      if (userPrevCount <= 1) {
        const autoAck = await ChatMessage.create({
          senderName: 'সাপোর্ট ডেস্ক',
          senderRole: 'system',
          recipientRole: 'user',
          text: 'ধন্যবাদ আপনার বার্তার জন্য! আমাদের দায়িত্বপ্রাপ্ত এডমিন ও শিক্ষক প্যানেল খুব শীঘ্রই আপনার সাথে যোগাযোগ করে উত্তর দিচ্ছেন। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।',
          imageUrl: '',
        });
        responseMessages.push(autoAck);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: newMsg,
      allNew: responseMessages 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Chat POST Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'মেসেজ পাঠানো ব্যর্থ হয়েছে' }, { status: 500 });
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
    
    return NextResponse.json({ success: true, message: 'চ্যাট ইতিহাস সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
