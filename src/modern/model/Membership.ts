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
 * @property {string} name - The membership name [ 'Platinum Plan', 'Gold Plan']
 * @property {number} userId - The owner of the membership
 * @property {number} recurringPrice - The price to pay on the period
 * @property {date} validFrom - The start date for the membership
 * @property {date} validUntil - The end date for the membership
 * @property {string} state - The current state of the membership ["active" , "canceled" , "suspended"]
 * @property {string} assignedBy - The admin user that assigns this membership to a user
 * @property {string} paymentMethod - The current payment method [ "card", "cash", "transfer"]
 * @property {string} billingInterval - The billing interval [ "monthly" , "yearly" , "bimonthly" ]
 * @property {number} billingPeriods - The number of the billing periods for the suscription.
 */

export interface Membership {
    id: number
    uuid: string
    name: string // name of the membership
    userId: number // the user that the membership is assigned to
    recurringPrice: number // price the user has to pay for every period
    validFrom: Date // start of the validity
    validUntil: Date // end of the validity
    state: string // indicates the state of the membership
    assignedBy: string
    paymentMethod: string // which payment method will be used to pay for the periods
    billingInterval: string // the interval unit of the periods
    billingPeriods: number // the number of periods the membership has
}

/**
 * Enum definition for available Membership payment methods
 */
export enum MembershipPaymentMethods {
    CASH = "cash",
    CREDIT_CARD = "credit card",
    TRANSFER = "transfer"
};

/**
 * Enum definition for available Membership billing intervals
 */
export enum MembershipBillingInterval {
    MONTHLY = "monthly",
    YEARLY = "yearly",
    WEEKLY = "weekly"
}

/**
 * Enum definition for membership states
 */
export enum MembershipState {
    ACTIVE = "active",
    PENDING = "pending",
    EXPIRED = "expired"
}