import { Membership } from "../model/Membership";
import { MembershipPeriod } from "../model/MembershipPeriod";
import { IMembershipRepository } from "./interfaces/IMembershipRepository";
import mongoose, { Mongoose } from 'mongoose';
import { logger } from '../utils/logger';
import { MembershipSchema } from "../model/schemas/db/mongo/MembershipSchema";
import { MembershipPeriodSchema } from "../model/schemas/db/mongo/MembershipPeriodSchema";


/**
 * The membership implementation for mongo/mongoose
 * 
 * @author Oscar I. Hernandez V.
 * 
 * @description
 * Repository with the functions to interact with mongo thru mongoose ORM
 * 
 */
export class MembershipRepository implements IMembershipRepository {

    private MONGO_DB_URI: string = process.env.MONGO_CONNECTION_STRING || '';
    private connection!: Mongoose;
    private connectionOptions = {
        retryWrites: true,
        w: "majority" as const
    };

    constructor() {
        this.connect();
    }

    async connect() {
        this.connection = await mongoose.connect(this.MONGO_DB_URI, this.connectionOptions);
        logger.get()?.info(`Connected to mongo server with version ${this.connection.version}`); 
    }


    create(membership: Membership): void {
        throw new Error("Method not implemented.");
    }

    async getAllMemberships(): Promise<Array<{ membership: Membership, periods: MembershipPeriod[] }>> {
        const allMemberships: Membership[] = await MembershipSchema.find({}, { _id:0 });
        const allPeriods: MembershipPeriod[] = await MembershipPeriodSchema.find({}, { _id:0 });
        const allResults: Array<{ membership: Membership, periods: MembershipPeriod[] }> = [];

        for(const membership of allMemberships) {
            const periods = allPeriods.filter(period => {
                return period.id == membership.id;
            });
            allResults.push({membership, periods});
        }

        return allResults;
    }
    
}