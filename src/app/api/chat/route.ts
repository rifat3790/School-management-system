import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ChatMessage from '@/models/ChatMessage';

export const dynamic = 'force-dynamic';

// In-memory typing tracker keyed by conversationId
const typingTracker: Record<string, {
  userTypingUntil: number;
  adminTypingUntil: number;
}> = {};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get('conversationId');
    const isAdminList = searchParams.get('list') === 'all' || searchParams.get('admin') === 'true';

    await dbConnect();

    // 1. If admin is asking for conversation inbox list
    if (isAdminList) {
      const allMessages = await ChatMessage.find().sort({ createdAt: -1 }).lean();

      const convMap: Record<string, any> = {};

      for (const msg of allMessages) {
        const cId = msg.conversationId || 'general-thread';
        if (!convMap[cId]) {
          const isUser = msg.senderRole === 'user' || msg.senderRole === 'student' || msg.senderRole === 'guest';
          convMap[cId] = {
            conversationId: cId,
            visitorName: isUser ? msg.senderName : 'ব্যবহারকারী',
            visitorContact: msg.senderContact || msg.senderEmail || '',
            lastMessage: msg.text || (msg.imageUrl ? '📷 [ছবি পাঠিয়েছেন]' : ''),
            lastSenderRole: msg.senderRole,
            lastMessageTime: msg.createdAt,
            unreadCount: (!msg.isRead && isUser) ? 1 : 0,
            messagesCount: 1,
            isTyping: (typingTracker[cId]?.userTypingUntil || 0) > Date.now()
          };
        } else {
          convMap[cId].messagesCount += 1;
          const isUser = msg.senderRole === 'user' || msg.senderRole === 'student' || msg.senderRole === 'guest';
          if (!msg.isRead && isUser) {
            convMap[cId].unreadCount += 1;
          }
          if (isUser && convMap[cId].visitorName === 'ব্যবহারকারী') {
            convMap[cId].visitorName = msg.senderName;
            convMap[cId].visitorContact = msg.senderContact || msg.senderEmail || convMap[cId].visitorContact;
          }
        }
      }

      const conversations = Object.values(convMap).sort((a, b) => 
        new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
      );

      return NextResponse.json({
        success: true,
        conversations,
      });
    }

    // 2. If client is asking for messages of a specific conversation
    if (conversationId) {
      const messages = await ChatMessage.find({ conversationId })
        .sort({ createdAt: 1 })
        .limit(100)
        .lean();

      // Check live typing indicators
      const now = Date.now();
      const tracker = typingTracker[conversationId] || { userTypingUntil: 0, adminTypingUntil: 0 };
      const userTyping = (tracker.userTypingUntil || 0) > now;
      const adminTyping = (tracker.adminTypingUntil || 0) > now;

      if (messages.length === 0) {
        return NextResponse.json({
          success: true,
          messages: [
            {
              _id: 'welcome-' + conversationId,
              conversationId,
              senderName: 'স্কুল লাইভ সাপোর্ট',
              senderRole: 'system',
              text: 'আসসালামু আলাইকুম! ডাঃ মুজিব-রুবি মডেল হাই স্কুলের অফিসিয়াল লাইভ সাপোর্টে স্বাগতম। আপনার প্রশ্ন বা বার্তা লিখুন, আমাদের এডমিন ও শিক্ষক প্যানেল দ্রুত উত্তর দেবেন।',
              createdAt: new Date().toISOString()
            }
          ],
          typing: { userTyping, adminTyping }
        });
      }

      return NextResponse.json({
        success: true,
        messages,
        typing: { userTyping, adminTyping }
      });
    }

    // Default fallback: return all recent messages
    const allRecent = await ChatMessage.find().sort({ createdAt: 1 }).limit(100).lean();
    return NextResponse.json({
      success: true,
      messages: allRecent,
    });
  } catch (error: any) {
    console.error('Chat GET Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      action, 
      conversationId = 'general-thread', 
      senderId,
      senderName, 
      senderEmail, 
      senderContact,
      senderRole = 'user', 
      text, 
      imageUrl, 
      isFirstMessage,
      isTyping
    } = body;

    // Handle typing pulse action
    if (action === 'typing') {
      if (!typingTracker[conversationId]) {
        typingTracker[conversationId] = { userTypingUntil: 0, adminTypingUntil: 0 };
      }
      const now = Date.now();
      if (senderRole === 'user') {
        typingTracker[conversationId].userTypingUntil = isTyping ? (now + 3500) : 0;
      } else {
        typingTracker[conversationId].adminTypingUntil = isTyping ? (now + 3500) : 0;
      }
      return NextResponse.json({ success: true, typingTracked: true });
    }

    if (!text && !imageUrl) {
      return NextResponse.json({ success: false, message: 'বার্তা বা ছবি প্রদান করা আবশ্যক' }, { status: 400 });
    }

    await dbConnect();

    // Clear typing indicator on send
    if (typingTracker[conversationId]) {
      if (senderRole === 'user') typingTracker[conversationId].userTypingUntil = 0;
      else typingTracker[conversationId].adminTypingUntil = 0;
    }

    const newMsg = await ChatMessage.create({
      conversationId,
      senderId: senderId || '',
      senderName: senderName || 'শিক্ষার্থী / অভিভাবক',
      senderEmail: senderEmail || '',
      senderContact: senderContact || '',
      senderRole: senderRole || 'user',
      recipientRole: (senderRole === 'admin' || senderRole === 'teacher') ? 'user' : 'management',
      text: text || '',
      imageUrl: imageUrl || '',
      isRead: false
    });

    const responseMessages = [newMsg];

    // If it is the user's first inquiry in this conversation thread, send ONE immediate polite acknowledgement
    if (senderRole === 'user' && isFirstMessage) {
      const userPrevInThread = await ChatMessage.countDocuments({ 
        conversationId, 
        senderRole: 'user' 
      });

      if (userPrevInThread <= 1) {
        const autoAck = await ChatMessage.create({
          conversationId,
          senderName: 'সাপোর্ট ডেস্ক',
          senderRole: 'system',
          recipientRole: 'user',
          text: 'ধন্যবাদ আপনার বার্তার জন্য! আমাদের দায়িত্বপ্রাপ্ত এডমিন ও শিক্ষক প্যানেল খুব শীঘ্রই আপনার সাথে যোগাযোগ করে উত্তর দিচ্ছেন। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।',
          imageUrl: '',
          isRead: false
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
    const conversationId = searchParams.get('conversationId');
    const id = searchParams.get('id');
    
    if (conversationId) {
      await ChatMessage.deleteMany({ conversationId });
      delete typingTracker[conversationId];
      return NextResponse.json({ success: true, message: 'কনভারসেশন ইতিহাস মুছে ফেলা হয়েছে' });
    } else if (id) {
      await ChatMessage.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: 'মেসেজ মুছে ফেলা হয়েছে' });
    } else {
      await ChatMessage.deleteMany({});
      return NextResponse.json({ success: true, message: 'সকল চ্যাট ইতিহাস মুছে ফেলা হয়েছে' });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
