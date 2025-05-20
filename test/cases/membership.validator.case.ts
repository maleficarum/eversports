import { Membership } from '../../src/modern/model/Membership';
import { HttpErrorHandler } from '../../src/modern/utils/error.handler';
import { IValidator } from '../../src/modern/utils/validators/IValidator';
import { MembershipValidator } from '../../src/modern/utils/validators/MembershipValidator';
import { loadTestJson } from './helpers/loadTestPayload.helper'

export const membershipCreationValidatorTestCase = () => {

  const EXPECTED_HTTP_ERROR_CODE = 400;
  const membershipValidator: IValidator = new MembershipValidator();

  describe("Cash method validation", () => {

    beforeAll(async () => { });

    afterAll(async () => { });

    it('should validate recurring price gt 100 for cash mayment method', () => {
      const membership = loadTestJson(__dirname, 'cashPriceBelow100.json');

      try {
        membershipValidator.isValid(membership);
      } catch (error) {
        expect((error as HttpErrorHandler).message).toEqual(MembershipValidator.ERROR_MESSAGES.CASH_PRICE_BELOW_MINIMUM);
        expect((error as HttpErrorHandler).statusCode).toEqual(EXPECTED_HTTP_ERROR_CODE);
      }

    });
  });

  describe("Monthly billing interval validation", () => {

    beforeAll(async () => { });

    afterAll(async () => { });

    it('should validate billing period gt 12 for monthly billing interval', () => {
      const membership = loadTestJson(__dirname, 'billingPeriodsMoreThan12Months.json');

      try{
        membershipValidator.isValid(membership);
      } catch(error) {
        expect((error as HttpErrorHandler).message).toEqual(MembershipValidator.ERROR_MESSAGES.MONTHLY_BILLING_EXCEEDS_MAX);
        expect((error as HttpErrorHandler).statusCode).toEqual(EXPECTED_HTTP_ERROR_CODE);
      }
    });

  it('should validate billing period lt 6 for monthly billing interval', () => {
      const membership = loadTestJson(__dirname, 'billingPeriodsLessThan6Months.json');

      try{
        membershipValidator.isValid(membership);
      } catch(error) {
        expect((error as HttpErrorHandler).message).toEqual(MembershipValidator.ERROR_MESSAGES.MONTHLY_BILLING_BELOW_MIN);
        expect((error as HttpErrorHandler).statusCode).toEqual(EXPECTED_HTTP_ERROR_CODE);
      }
    });    
  });

  describe("Yearly billing interval validation", () => {

    beforeAll(async () => { });

    afterAll(async () => { });

    it('should validate billing period gt 10 years', () => {
      const membership = loadTestJson(__dirname, 'billingPeriodsMoreThan10Years.json');

      try{
        membershipValidator.isValid(membership);
      } catch(error) {
        expect((error as HttpErrorHandler).message).toEqual(MembershipValidator.ERROR_MESSAGES.YEARLY_BILLING_EXCEEDS_MAX);
        expect((error as HttpErrorHandler).statusCode).toEqual(EXPECTED_HTTP_ERROR_CODE);
      }
    });

  it('should validate billing period lt 3 years', () => {
      const membership = loadTestJson(__dirname, 'billingPeriodsLessThan3Years.json');

      try{
        membershipValidator.isValid(membership);
      } catch(error) {
        expect((error as HttpErrorHandler).message).toEqual(MembershipValidator.ERROR_MESSAGES.YEARLY_BILLING_BELOW_MIN);
        expect((error as HttpErrorHandler).statusCode).toEqual(EXPECTED_HTTP_ERROR_CODE);
      }
    });    
  });  

  describe('should fail for invalid billing period', () => {
    //TODO: Shouln't fail. The implementation is work in progress.
  });
};