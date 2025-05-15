import { IMembershipRepository } from "../repository/interfaces/IMembershipRepository";
import { MembershipRepository } from "../repository/MembershipRepository";
import { logger } from '../utils/logger';

export class MembershipService {

    private membershipRepository:IMembershipRepository;

    constructor() {
        this.membershipRepository = new MembershipRepository();
    }

    fetchAllMemberships() {
        return this.membershipRepository.fetchAllMemberships();
    }
}