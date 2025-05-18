/**
 * The Membership entity.
 * 
 * @author Oscar I. Hernandez V.
 * 
 * @description
 * Interface base for all DB schemas. Each schema would be a wrapper for this interface
 * 
 * @property {number} id - The membership ID
 * @property {string} uuid - The hash that makes a unique membership
 * @property {number} membership - The membership to which this period belongs
 * @property {date} start - The start date for the current period
 * @property {date} end - The end date for the current period
 * @property {string} state - The current state of the membership ["active" , "canceled" , "suspended"]
 */

export interface MembershipPeriod {
    id: number
    uuid: string
    membership: number // membership the period is attached to
    start: Date // indicates the start of the period
    end: Date // indicates the end of the period
    state: string
}

/**
 * Enum for the membership period available states
 */
export enum MembershipPeriodState {
    PLANNED = "planned"
}