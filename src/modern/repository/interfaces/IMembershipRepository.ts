import { Membership } from "../../model/Membership";
import { MembershipPeriod } from "../../model/MembershipPeriod";

/**
 * Interface defining the contract for a Membership Repository.
 * 
 * @author Oscar I. Hernandez V.
 * 
 * @description
 * This abstraction layer handles data access operations for memberships and their associated periods.
 * Implementations should manage database connections and provide CRUD operations.
 * 
 */
export interface IMembershipRepository {

    connect(): void;
    create(membership: Membership): void;
    getAllMemberships(): Promise<Array<{ membership: Membership, periods: MembershipPeriod[] }>>;
    
}