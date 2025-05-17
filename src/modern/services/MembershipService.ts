import { IMembershipRepository } from "../repository/interfaces/IMembershipRepository";
import { MembershipRepository } from "../repository/MembershipRepository";


/**
 * Service class for handling membership-related business logic.
 * 
 * @author Oscar I. Hernandez V.
 * 
 * @description
 * Acts as an intermediary between the Membership controller and the Membership repository.
 * 
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
     * Retrieves all memberships from the repository.
     * @returns {Promise<Membership[]>} A promise that resolves to an array of Membership objects.
     * @throws {HttpErrorHandler} If the repository encounters an error while fetching data.
     */
    getAllMemberships() {
        return this.membershipRepository.getAllMemberships();
    }
}