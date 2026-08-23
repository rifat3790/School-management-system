import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  summary: string;
  content: string;
  createdAt: Date;
}

const NewsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: 'সংবাদ' },
    date: { type: String, required: true },
    author: { type: String, default: 'এডমিন' },
    image: { type: String, default: '' },
    summary: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
