import { Membership } from "../model/Membership";
import { MembershipPeriod } from "../model/MembershipPeriod";
import { IMembershipRepository } from "../repository/interfaces/IMembershipRepository";
import { MembershipRepository } from "../repository/MembershipRepository";


/**
 * Service layer for membership business logic
 * Handles operations between controllers and repository
 * 
 * @author Oscar I. Hernandez V.
 */
export class MembershipService {

    /**
    * The repository responsible for data access operations related to memberships.
    * @type {IMembershipRepository}
    * @private
    */
    membershipRepository:IMembershipRepository;

    constructor() {
        this.membershipRepository = new MembershipRepository();
    }

    /**
     * Retrieves all memberships with their associated periods
     * @returns Promise containing all memberships with their periods
     * @throws Error if repository operation fails
     */
    async getAllMemberships(): Promise<Array<{ membership: Membership, periods: MembershipPeriod[] }>> {
        return this.membershipRepository.getAllMemberships();
    }    

    /**
     * Creates a new membership with associated periods
     * @param membership Membership data to create
     * @param membershipPeriods Array of membership periods to associate
     * @returns The created membership or null if creation failed
     * @throws Error if repository operation fails
     */    
    async createMembership(membership: Membership, membershipPeriods: MembershipPeriod[]): Promise<Membership | null> {
        return await this.membershipRepository.createMembership(membership, membershipPeriods);
    }
}