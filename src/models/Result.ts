import mongoose, { Schema, Document } from 'mongoose';

export interface ISubjectMark {
  subject: string;
  fullMarks: number;
  obtained: number;
  letterGrade: string;
  point: number;
}

export interface IResult extends Document {
  roll: string;
  regNo: string;
  studentName: string;
  className: string;
  section: string;
  examType: string;
  gpa: number;
  grade: string;
  marks: ISubjectMark[];
  createdAt: Date;
  updatedAt: Date;
}

const ResultSchema: Schema = new Schema(
  {
    roll: { type: String, required: true, trim: true, index: true },
    regNo: { type: String, default: '', trim: true },
    studentName: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true },
    section: { type: String, default: 'A', trim: true },
    examType: { type: String, required: true, trim: true },
    gpa: { type: Number, required: true },
    grade: { type: String, required: true, trim: true },
    marks: [
      {
        subject: { type: String, required: true },
        fullMarks: { type: Number, default: 100 },
        obtained: { type: Number, required: true },
        letterGrade: { type: String, required: true },
        point: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Result || mongoose.model<IResult>('Result', ResultSchema);
