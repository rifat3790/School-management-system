import mongoose, { Schema, Document } from 'mongoose';

export interface IIdCard extends Document {
  userId?: string;
  userEmail: string;
  cardType: 'student' | 'teacher';
  name: string;
  studentId?: string;
  teacherId?: string;
  className?: string;
  roll?: string;
  section?: string;
  session?: string;
  bloodGroup: string;
  dob?: string;
  phone?: string;
  emergencyContact?: string;
  designation?: string;
  department?: string;
  joiningDate?: string;
  photoUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const IdCardSchema: Schema = new Schema(
  {
    userId: { type: String },
    userEmail: { type: String, required: true, index: true },
    cardType: { type: String, enum: ['student', 'teacher'], required: true },
    name: { type: String, required: true },
    studentId: { type: String },
    teacherId: { type: String },
    className: { type: String },
    roll: { type: String },
    section: { type: String },
    session: { type: String, default: '২০২৬' },
    bloodGroup: { type: String, default: 'B+' },
    dob: { type: String },
    phone: { type: String },
    emergencyContact: { type: String },
    designation: { type: String },
    department: { type: String },
    joiningDate: { type: String },
    photoUrl: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    adminNotes: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.models.IdCard || mongoose.model<IIdCard>('IdCard', IdCardSchema);
