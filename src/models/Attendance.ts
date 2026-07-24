import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendanceRecord {
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface IAttendance extends Document {
  date: string; // Format: YYYY-MM-DD
  class: string;
  section: string;
  teacherId: string;
  teacherName: string;
  records: IAttendanceRecord[];
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema: Schema = new Schema(
  {
    date: { type: String, required: true, index: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    teacherId: { type: String, default: '' },
    teacherName: { type: String, default: '' },
    records: [
      {
        studentId: { type: String, required: true },
        studentName: { type: String, required: true },
        status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' },
        remarks: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

// Compound index for quick lookup of class + section + date
AttendanceSchema.index({ date: 1, class: 1, section: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);
