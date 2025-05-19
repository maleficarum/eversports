import { IValidator } from "./IValidator";
import { createMembershipLimits } from './rules/membership.create.rule';
import { MembershipBillingInterval, MembershipPaymentMethods } from "../../model/Membership";
import { BunyanLoggerFactory } from "../factory/impl/BunyanLoggerFactory";

/**
 * Validates membership data against business rules and requirements.
 * Implements IValidator interface to ensure consistent validation behavior.
 * Throws validation errors with status codes when business rules are violated.
 */
export class MembershipValidator implements IValidator {

    private readonly logger: any = BunyanLoggerFactory.getInstance().createLogger({
        name: 'MembershipValidator'
    });

    /**
    * @enum {string}
    * @readonly
    * @description Error message codes for different validation failures
    */    
    static readonly ERROR_MESSAGES = {
        CASH_PRICE_BELOW_MINIMUM: 'cashPriceBelow100',
        MONTHLY_BILLING_EXCEEDS_MAX: 'billingPeriodsMoreThan12Months',
        MONTHLY_BILLING_BELOW_MIN: 'billingPeriodsLessThan6Months',
        YEARLY_BILLING_BELOW_MIN: 'billingPeriodsLessThan3Years',
        YEARLY_BILLING_EXCEEDS_MAX: 'billingPeriodsMoreThan10Years',
        INVALID_BILLING_INTERVAL: 'invalidBillingInterval'
    };

    /**
     * Validates membership data against business rules
     * @param membership - The membership data to validate
     * @returns true if validation passes
     * @throws {ValidationError} If validation fails with statusCode and message
     */
    isValid(membership: Record<string, any>): true {
        this.validatePaymentMethod(membership);
        this.validateBillingInterval(membership);
        return true;
    }

    /**
    * Validates payment method specific rules
    *
    * @param {Record<string, any>} membership - Membership data containing payment info
    */
    private validatePaymentMethod(membership: Record<string, any>): void {
        const { recurringPrice, paymentMethod } = membership;
        const { recurringPriceMinimumForCashPaymentMethod } = createMembershipLimits;

        if (paymentMethod === MembershipPaymentMethods.CASH && 
            recurringPrice > recurringPriceMinimumForCashPaymentMethod) {
            this.logger.error('Invalid membership recurring prices', { recurringPrice, paymentMethod });
            throw { statusCode: 400, message: MembershipValidator.ERROR_MESSAGES.CASH_PRICE_BELOW_MINIMUM };
        }
    }

    /**
    * Validates billing interval type and delegates to specific interval validators

    * @param {Record<string, any>} membership - Membership data containing billing info
    */    
    private validateBillingInterval(membership: Record<string, any>): void {
        const { billingInterval, billingPeriods } = membership;

        switch (billingInterval) {
            case MembershipBillingInterval.MONTHLY:
                this.validateMonthlyBilling(billingPeriods);
                break;
            case MembershipBillingInterval.YEARLY:
                this.validateYearlyBilling(billingPeriods);
                break;
            default:
                this.logger.error('Invalid billing interval', { billingInterval });
                throw { statusCode: 400, message: MembershipValidator.ERROR_MESSAGES.INVALID_BILLING_INTERVAL };
        }
    }

    /**
     * Validates monthly billing information.
     * @param billingPeriods  Memberahip billing periods to be validated
     */
    private validateMonthlyBilling(billingPeriods: number): void {
        const { minimumBillingInterval, maximumBillingInterval } = createMembershipLimits.montlyBillingInterval;

        if (billingPeriods > maximumBillingInterval) {
            this.logger.error('Monthly billing periods exceed maximum', { billingPeriods, maximum: maximumBillingInterval });
            throw { statusCode: 400, message: MembershipValidator.ERROR_MESSAGES.MONTHLY_BILLING_EXCEEDS_MAX };
        }

        if (billingPeriods < minimumBillingInterval) {
            this.logger.error('Monthly billing periods below minimum', { billingPeriods, minimum: minimumBillingInterval });
            throw { statusCode: 400, message: MembershipValidator.ERROR_MESSAGES.MONTHLY_BILLING_BELOW_MIN };
        }
    }

    /**
     * Validates yearly billing information.
     * @param billingPeriods  Memberahip billing periods to be validated
     */    
    private validateYearlyBilling(billingPeriods: number): void {
        const { minimumBillingInterval, maximumBillingInterval } = 
            createMembershipLimits.yearlyBillingInterval;

        if (billingPeriods < minimumBillingInterval) {
            this.logger.error('Yearly billing periods below minimum', { billingPeriods, minimum: minimumBillingInterval });
            throw { statusCode: 400, message: MembershipValidator.ERROR_MESSAGES.YEARLY_BILLING_BELOW_MIN };
        }

        if (billingPeriods > maximumBillingInterval) {
            this.logger.error('Yearly billing periods exceed maximum', { billingPeriods, maximum: maximumBillingInterval });
            throw { statusCode: 400, message: MembershipValidator.ERROR_MESSAGES.YEARLY_BILLING_EXCEEDS_MAX };
        }
    }
}