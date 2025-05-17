import 'jest-extended'
import 'jest-extended/all';
/**
 * Represent the schema tha should be enforced among all the test cases that involves
 * schema validation
 */
//TODO: Verify the inserted data into mongo for the proper format
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?)?$/;

export const membershipSchema = {
  membership: {
    id: expect.any(Number),
    uuid: expect.any(String),
    name: expect.any(String),
    userId: expect.any(Number),
    recurringPrice: expect.any(Number),
    validFrom: expect.stringMatching(ISO_DATE_REGEX),
    validUntil: expect.stringMatching(ISO_DATE_REGEX),
    state: expect.any(String),
    assignedBy: expect.any(String),
    paymentMethod: expect.toBeOneOf([expect.any(String), null]),
    billingInterval: expect.any(String),
    billingPeriods: expect.any(Number)
  },
  periods: expect.arrayContaining([
    expect.objectContaining({
      id: expect.any(Number),
      uuid: expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i),
      membership: expect.any(Number),
      start: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
      end: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
      state: expect.any(String)
    })
  ])
};

/*
export const membershipSchema = {
  membership: {
    id: expect.any(Number),
    uuid: expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i),
    name: expect.any(String),
    userId: expect.any(Number),
    recurringPrice: expect.any(Number),
    validFrom: expect.stringMatching(ISO_DATE_REGEX),
    validUntil: expect.stringMatching(ISO_DATE_REGEX),
    state: expect.stringMatching(/^(active|inactive|expired)$/),
    assignedBy: expect.any(String),
    paymentMethod: expect.stringMatching(/^(credit card|paypal|bank transfer|cash|null)$/),
    billingInterval: expect.stringMatching(/^(monthly|yearly|quarterly)$/),
    billingPeriods: expect.any(Number)
  },
  periods: expect.arrayContaining([])
};*/