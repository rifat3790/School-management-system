import mongoose, { Schema, Document } from 'mongoose';

export interface INotice extends Document {
  title: string;
  category: 'একাডেমিক' | 'ভর্তি' | 'পরীক্ষা' | 'ছুটি' | 'জরুরি' | 'ইভেন্ট';
  date: string;
  pdfUrl?: string;
  isImportant: boolean;
  content: string;
  createdAt: Date;
}

const NoticeSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { 
      type: String, 
      enum: ['একাডেমিক', 'ভর্তি', 'পরীক্ষা', 'ছুটি', 'জরুরি', 'ইভেন্ট'], 
      default: 'একাডেমিক' 
    },
    date: { type: String, required: true },
    pdfUrl: { type: String, default: '#' },
    isImportant: { type: Boolean, default: false },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);
