import { Membership } from "../model/Membership";

export interface IMembershipRepository {

    connect(): void;
    create(membership: Membership): void;
    fetchAllMemberships(): Promise<Membership[]>;
    
}