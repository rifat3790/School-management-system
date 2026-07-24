import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmission extends Document {
  studentName: string;
  fatherName: string;
  motherName: string;
  phone: string;
  classApply: string;
  birthCertNo: string;
  address: string;
  photoUrl?: string;
  birthCertUrl?: string;
  paymentStatus: 'paid' | 'pay_later';
  paymentTxId?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const AdmissionSchema: Schema = new Schema(
  {
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    phone: { type: String, required: true },
    classApply: { type: String, required: true },
    birthCertNo: { type: String, required: true },
    address: { type: String, required: true },
    photoUrl: { type: String, default: '' },
    birthCertUrl: { type: String, default: '' },
    paymentStatus: { type: String, enum: ['paid', 'pay_later'], default: 'pay_later' },
    paymentTxId: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.models.Admission || mongoose.model<IAdmission>('Admission', AdmissionSchema);
