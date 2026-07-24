import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  donorName: string;
  donorType: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  phone: string;
  message?: string;
  date: string;
  isApproved: boolean;
  createdAt: Date;
}

const DonationSchema: Schema = new Schema(
  {
    donorName: { type: String, required: true },
    donorType: { type: String, default: 'প্রাক্তন শিক্ষার্থী / শুভানুধ্যায়ী' },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'bKash Merchant' },
    transactionId: { type: String, default: '' },
    phone: { type: String, required: true },
    message: { type: String, default: '' },
    date: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
