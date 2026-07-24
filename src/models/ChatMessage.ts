import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage extends Document {
  senderName: string;
  senderEmail: string;
  senderRole: 'student' | 'parent' | 'teacher' | 'admin' | 'superadmin' | 'guest';
  recipientRole: string; // 'management'
  text: string;
  imageUrl?: string;
  createdAt: Date;
}

const ChatMessageSchema: Schema = new Schema(
  {
    senderName: { type: String, required: true, default: 'শিক্ষার্থী / অভিভাবক' },
    senderEmail: { type: String, default: 'guest@school.edu.bd' },
    senderRole: { 
      type: String, 
      enum: ['student', 'parent', 'teacher', 'admin', 'superadmin', 'guest'], 
      default: 'guest' 
    },
    recipientRole: { type: String, default: 'management' },
    text: { type: String, required: true },
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
