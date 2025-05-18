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

    private readonly logger: any = BunyanLoggerFactory.getInstance().createLogger({
        name: 'MembershipPeriodFactory'
    });

    createEntity(membership: Record<string, any>): object {
        return Array.from({ length: membership.billingPeriods }, (_, index) =>
            this.createSinglePeriod(membership, index + 1)
        );
    }

 /**
     * Creates a single membership period
     * @private
     * @param membership Membership parameters
     * @param periodNumber Sequential period number (1-based index)
     * @returns Generated MembershipPeriod
     */
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
     * @private
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

    /*
        createEntity(membership: Record<string, any>): object {
            const membershipPeriods: Array<MembershipPeriod> = [];
    
            for(let i = 0 ; i < membership.billingPeriods ; i++) {
                const perdiodValidUntil = new Date(membership.validFrom);
    
                if(membership.billingInterval === MembershipBillingInterval.MONTHLY) {
                    perdiodValidUntil.setMonth(membership.validFrom.getMonth() + 1);
                }
                if(membership.billingInterval === MembershipBillingInterval.YEARLY) {
                    perdiodValidUntil.setMonth(membership.validFrom.getMonth() + 12);
                }            
                if(membership.billingInterval === MembershipBillingInterval.WEEKLY) {
                    perdiodValidUntil.setMonth(membership.validFrom.getMonth() + 7);
                }
    
                const period: MembershipPeriod = {
                    id: i + 1,
                    uuid: uuidv4(),
                    membership: 0,//This should be assigned in the MembershipRepository once the latest id is calculated
                    start: membership.validFrom,
                    end: perdiodValidUntil,
                    state: MembershipPeriodState.PLANNED
                } ;
    
                membershipPeriods.push(period);
            }
    
            return membershipPeriods;
        }*/
