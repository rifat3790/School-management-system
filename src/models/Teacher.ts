import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  experience: string;
  email: string;
  phone: string;
  image: string;
  createdAt: Date;
}

const TeacherSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    subject: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, default: '৫+ বছর' },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    image: { type: String, default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80' },
  },
  { timestamps: true }
);

export default mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);
