import mongoose, { Schema } from 'mongoose';
import { Membership } from "../../../Membership";

/**
 * The mongoose schema for the Membership entity
 * 
 * @author Oscar I. Hernandez V.
 * 
 * @description
 * Schema mapper the Membership entity to a Mongoose Entity. 
 * 
 * Used by the MembershipRepository
 */

export const membershipSchema = new Schema<Membership>({
  id: { type: Number, required: true, unique: true },
  uuid: { type: String, required: true, minlength: 5 },
  name: { type: String, required: true, minlength: 5 },
  userId: { type: Number, required: true },
  recurringPrice: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  state: { type: String, required: true },
  assignedBy: {type: String, required: true },
  paymentMethod: { type: String, required: true },
  billingInterval: { type: String, required: true },
  billingPeriods: { type: Number, required: true }
}, {
  timestamps: true,
  versionKey: false
});

membershipSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
});


export const MembershipSchema = mongoose.model('Membership', membershipSchema);