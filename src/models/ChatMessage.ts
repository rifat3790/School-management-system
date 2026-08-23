import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage extends Document {
  senderName: string;
  senderEmail?: string;
  senderRole: string; // 'student' | 'parent' | 'teacher' | 'admin' | 'superadmin' | 'guest' | 'system' | 'user'
  recipientRole?: string;
  text: string;
  imageUrl?: string;
  createdAt: Date;
}

const ChatMessageSchema: Schema = new Schema(
  {
    senderName: { type: String, required: true, default: 'শিক্ষার্থী / অভিভাবক' },
    senderEmail: { type: String, default: 'visitor@drmujibrubi.edu.bd' },
    senderRole: { 
      type: String, 
      default: 'user' 
    },
    recipientRole: { type: String, default: 'management' },
    text: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
