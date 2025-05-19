import mongoose, { Schema } from 'mongoose';
import { MembershipPeriod } from "../../../MembershipPeriod";

/**
 * The mongoose schema for the MembershipPeriod entity
 * 
 * @author Oscar I. Hernandez V.
 * 
 * @description
 * Schema mapper for the MembershipPeriod entity to a Mongoose Entity. 
 * 
 * Used by the MembershipPeriodRepository
 */

export const membershipPeriodSchema = new Schema<MembershipPeriod>({
  id: {type: Number, required: true},
  uuid: { type: String, required: true},
  membership: { type: Number, required: true},
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  state: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
});

membershipPeriodSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
});

export const MembershipPeriodSchema = mongoose.model('MembershipPeriod', membershipPeriodSchema);