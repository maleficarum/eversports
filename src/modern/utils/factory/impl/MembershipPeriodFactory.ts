import { MembershipBillingInterval } from "../../../model/Membership";
import { MembershipPeriod, MembershipPeriodState } from "../../../model/MembershipPeriod";
import { IEntityFactory } from "../IEntityFactory";
import { BunyanLoggerFactory } from "./BunyanLoggerFactory";
import { v4 as uuidv4 } from 'uuid';

/**
 * Membership period factory to construct a period according the given membership and the business rules
 * 
 * @author Oscar I Hernandez V
 */
export class MembershipPeriodFactory implements IEntityFactory {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly logger: any = BunyanLoggerFactory.getInstance().createLogger({
        name: 'MembershipPeriodFactory'
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createEntity(membership: Record<string, any>): object {
        return Array.from({ length: membership.billingPeriods }, (_, index) =>
            this.createSinglePeriod(membership, index + 1)
        );
    }

    /**
    * Creates a single membership period
    * @param membership Membership parameters
    * @param periodNumber Sequential period number (1-based index)
    * @returns Generated MembershipPeriod
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private createSinglePeriod( membership: Record<string, any>, periodNumber: number): MembershipPeriod {
        const periodEndDate = this.calculatePeriodEndDate(
            new Date(membership.validFrom),
            membership.billingInterval
        );

        return {
            id: periodNumber,
            uuid: uuidv4(),
            membership: 0, // To be assigned in repository
            start: new Date(membership.validFrom),
            end: periodEndDate,
            state: MembershipPeriodState.PLANNED
        };
    }

    /**
    * Calculates the end date for a period based on billing interval
    * @param startDate Period start date
    * @param interval Billing interval type
    * @returns Calculated end date
    */
    private calculatePeriodEndDate(startDate: Date, interval: MembershipBillingInterval): Date {
        const endDate = new Date(startDate);

        switch (interval) {
            case MembershipBillingInterval.MONTHLY:
                endDate.setMonth(startDate.getMonth() + 1);
                break;
            case MembershipBillingInterval.YEARLY:
                endDate.setFullYear(startDate.getFullYear() + 1);
                break;
            case MembershipBillingInterval.WEEKLY:
                endDate.setDate(startDate.getDate() + 7);
                break;
            default:
                throw { statusCode: 400, message: "invalidMemershipInterval" };//This shouln't happen here. The validator performs an evaluation
        }

        return endDate;
    }
}