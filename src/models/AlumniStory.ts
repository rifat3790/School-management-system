import mongoose, { Schema, Document } from 'mongoose';

export interface IAlumniStory extends Document {
  name: string;
  batch: string;
  profession: string;
  organization: string;
  image: string;
  story: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AlumniStorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    batch: { type: String, required: true, trim: true },
    profession: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    image: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' },
    story: { type: String, required: true },
    isFeatured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.AlumniStory || mongoose.model<IAlumniStory>('AlumniStory', AlumniStorySchema);
