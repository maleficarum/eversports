import { MembershipBillingInterval, MembershipState } from "../../../model/Membership";
import { DateValidator } from "../../validators/DateValidator";
import { IValidator } from "../../validators/IValidator";
import { IEntityFactory } from "../IEntityFactory";
import { BunyanLoggerFactory } from "./BunyanLoggerFactory";
import { ClassRegistry } from "./ClassRegistry";
import { v4 as uuidv4 } from 'uuid';

/**
 * Factory class for creating Membership entities with proper validation and default values.
 * Implements the IEntityFactory interface to ensure consistent entity creation.
 * 
 * @author Oscar I. Hernandez V.
 * @implements {IEntityFactory}
 */

export class MembershipFactory implements IEntityFactory {

    private readonly MODULE_NAME = 'MembershipFactory';
    private membershipValidator: IValidator;
    private readonly dateValidator: DateValidator = new DateValidator();
    private readonly DEFAULT_USER_ID = 2000;
    private readonly DEFAULT_ASSIGNED_BY = "Admin";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly logger: any = BunyanLoggerFactory.getInstance().createLogger({
        name: this.MODULE_NAME
    });

    constructor() {
        this.membershipValidator = ClassRegistry.create<IValidator>("MembershipValidator", undefined);
    }

    /**
     * Creates a new Membership entity with validated data and calculated fields.
     * 
     * @param {Record<string, any>} membershipData - Raw membership data to be processed
     * @returns {object} The created membership entity with all required fields
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createEntity(membership: Record<string, any>): object {
        this.membershipValidator.isValid(membership);

        this.logger.debug("Membership received data is valid; trying to create new Membership in the system.");

        membership.validFrom = this.determineValidFromDate(membership.validFrom);
        membership.id = 0;
        membership.uuid = uuidv4();
        membership.userId = this.DEFAULT_USER_ID;
        membership.assignedBy = this.DEFAULT_ASSIGNED_BY;

        membership.validUntil = this.calculateValidUntilDate(
            membership.validFrom,
            membership.billingInterval,
            membership.billingPeriods
        );

        membership.state = this.determineMembershipState(
            membership.validFrom,
            membership.validUntil
        );

        return membership;
    }

    /**
     * Determines the valid from date, using the provided date if valid or current date as fallback.
     * 
     * @param {string} [validFrom] - Optional date string to validate and use
     * @returns {Date} The determined valid from date
     */
    private determineValidFromDate(validFrom: string): Date {
        if (this.dateValidator.isValid({ date: validFrom })) {
            this.logger.debug(`Using provided 'validFrom' date: ${validFrom}`);
            return new Date(validFrom);
        }

        return new Date();
    }

    /**
     * Calculates the valid until date based on billing interval and periods.
     * 
     * @param {Date} validFrom - Starting date for calculation
     * @param {MembershipBillingInterval} billingInterval - Billing frequency
     * @param {number} billingPeriods - Number of billing periods
     * @returns {Date} The calculated expiration date
     */
    private calculateValidUntilDate(validFrom: Date, billingInterval: MembershipBillingInterval, billingPeriods: number): Date {
        const validUntil = new Date(validFrom);

        switch (billingInterval) {
            case MembershipBillingInterval.WEEKLY:
                validUntil.setDate(validFrom.getDate() + billingPeriods * 7);
                break;
            case MembershipBillingInterval.MONTHLY:
                validUntil.setMonth(validFrom.getMonth() + billingPeriods);
                break;
            case MembershipBillingInterval.YEARLY:
                validUntil.setFullYear(validFrom.getFullYear() + billingPeriods);
                break;
        }

        this.logger.debug(`Calculated validUntil date: ${validUntil}`);
        return validUntil;
    }

    /**
     * Determines the membership state based on date comparison with current date.
     * 
     * @param {Date} validFrom - Membership start date
     * @param {Date} validUntil - Membership end date
     * @returns {MembershipState} The appropriate state (PENDING/ACTIVE/EXPIRED)
     */
    private determineMembershipState(validFrom: Date, validUntil: Date): MembershipState {
        const today = new Date();

        if (validFrom > today) return MembershipState.PENDING;
        if (validUntil < today) return MembershipState.EXPIRED;
        return MembershipState.ACTIVE;
    }

}