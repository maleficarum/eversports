import mongoose, { Schema } from 'mongoose';
import { Membership } from "../Membership";

export const membershipSchema = new Schema<Membership>({
  name: { type: String, required: true },
  user: { type: Number, required: true, unique: true },
  recurringPrice: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  state: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  billingInterval: { type: String, required: true },
  billingPeriods: { type: Number, required: true }
}, {
  timestamps: true
});

export const MembershipSchema = mongoose.model('Membership', membershipSchema);