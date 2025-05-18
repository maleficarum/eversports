import { Type } from '@sinclair/typebox';

/**
 * Schema for validating membership HTTP request payloads
 * 
 * @typedef {Object} MembershipRequestSchema
 * @property {string} name - Member's full name (min 5 chars)
 * @property {number} user - User ID associated with membership
 * @property {number} recurringPrice - Recurring payment amount (min 1)
 * @property {string} validFrom - Start date (ISO 8601 format)
 * @property {string} validUntil - End date (ISO 8601 format)
 * @property {string} state - Membership state (min 5 chars)
 * @property {string} paymentMethod - Payment method (min 5 chars)
 * @property {string} billingInterval - Billing frequency (min 5 chars)
 * @property {number} billingPeriods - Number of billing cycles (min 1)
 *
 * @example
 * // Valid payload example
 * {
 *   name: "Oscar Hernandez",
 *   user: 123,
 *   recurringPrice: 15.99,
 *   validFrom: "2023-01-01T00:00:00Z",
 *   validUntil: "2023-12-31T00:00:00Z",
 *   state: "active",
 *   paymentMethod: "cash",
 *   billingInterval: "monthly",
 *   billingPeriods: 12
 * }
 */

export const membershipRequestSchema = Type.Object({
  name: Type.String({ 
    minLength: 5,
    errorMessage: {
      type: "missingMandatoryFields",
      minLength: "missingMandatoryFields"
    }
  }),
  //user: Type.Number(),
  recurringPrice: Type.Number({
    minimum: 1,
    errorMessage: {
      type: "negativeRecurringPrice",
      minimum: "negativeRecurringPrice"
    }
  }),
  validFrom: Type.String({ format: 'date-time' }),
  //validUntil: Type.String({ format: 'date-time' }),
  /*state: Type.String({ 
    minLength: 5,
    errorMessage: {
      type: "missingMandatoryFields",
      minLength: "missingMandatoryFields"
    }
  }),*/
  paymentMethod: Type.String({ 
    minLength: 4,
    errorMessage: {
      type: "missingMandatoryFields",
      minLength: "missingMandatoryFields"
    }
  }),
  billingInterval: Type.String({ 
    minLength: 3,
    errorMessage: {
      type: "missingMandatoryFields",
      minLength: "missingMandatoryFields"
    } }),
  billingPeriods: Type.Number({ 
    minimum: 1,
    errorMessage: {
      type: "negativeBillingPeriods",
      minimum: "negativeBillingPeriods"
    }})
}, {
  errorMessage: {
    required: {
      _: " ",
      name: "missingMandatoryFields",
      recurringPrice: "missingMandatoryFields",
      state: "missingMandatoryFields",
      paymentMethod: "missingMandatoryFields",
      billingInterval: "missingMandatoryFields",
      billingPeriods: "missingMandatoryFields"
    }
  }
});
