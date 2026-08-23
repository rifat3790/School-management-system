import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage extends Document {
  conversationId: string;
  senderId?: string;
  senderName: string;
  senderEmail?: string;
  senderContact?: string;
  senderRole: string; // 'user' | 'student' | 'parent' | 'teacher' | 'admin' | 'superadmin' | 'guest' | 'system'
  recipientRole?: string;
  text: string;
  imageUrl?: string;
  isRead?: boolean;
  createdAt: Date;
}

const ChatMessageSchema: Schema = new Schema(
  {
    conversationId: { type: String, required: true, index: true, default: 'general-thread' },
    senderId: { type: String, default: '' },
    senderName: { type: String, required: true, default: 'শিক্ষার্থী / অভিভাবক' },
    senderEmail: { type: String, default: '' },
    senderContact: { type: String, default: '' },
    senderRole: { 
      type: String, 
      default: 'user' 
    },
    recipientRole: { type: String, default: 'management' },
    text: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
