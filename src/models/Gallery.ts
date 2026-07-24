import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  category: 'ক্যাম্পাস' | 'ক্রীড়া' | 'বিজ্ঞান মেলা' | 'সাংস্কৃতিক' | 'পুরস্কার বিতরণ';
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { 
      type: String, 
      enum: ['ক্যাম্পাস', 'ক্রীড়া', 'বিজ্ঞান মেলা', 'সাংস্কৃতিক', 'পুরস্কার বিতরণ'], 
      default: 'ক্যাম্পাস' 
    },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    url: { type: String, required: true },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
