import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  category: string;
  isbn: string;
  classLevel: string;
  location: string;
  availableCopies: number;
  totalCopies: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    isbn: { type: String, default: '', trim: true },
    classLevel: { type: String, default: 'সকল শ্রেণী', trim: true },
    location: { type: String, default: 'র্যাক-১', trim: true },
    availableCopies: { type: Number, default: 1, min: 0 },
    totalCopies: { type: Number, default: 1, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
