import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin' | 'superadmin';
export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface IUser extends Document {
  uid: string; // Firebase Auth UID or generated ID
  name: string;
  email: string;
  phone?: string;
  tempPassword?: string;
  resetCode?: string;
  resetRequested?: boolean;
  role: UserRole;
  requestedRole: UserRole;
  status: UserStatus;
  details?: {
    studentId?: string;
    class?: string;
    section?: string;
    subject?: string;
    designation?: string;
    childStudentId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    tempPassword: { type: String, default: '123456' },
    resetCode: { type: String, default: '' },
    resetRequested: { type: Boolean, default: false },
    role: { 
      type: String, 
      enum: ['student', 'teacher', 'parent', 'admin', 'superadmin'], 
      default: 'student' 
    },
    requestedRole: { 
      type: String, 
      enum: ['student', 'teacher', 'parent', 'admin', 'superadmin'], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    details: {
      studentId: String,
      class: String,
      section: String,
      subject: String,
      designation: String,
      childStudentId: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
