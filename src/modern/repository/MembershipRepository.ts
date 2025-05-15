import { Membership } from "../model/Membership";
import { IMembershipRepository } from "./interfaces/IMembershipRepository";
import mongoose, { Mongoose } from 'mongoose';
import { logger } from '../utils/logger';
import { MembershipSchema } from "../model/schemas/MembershipSchema";

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

    async fetchAllMemberships(): Promise<Membership[]> {
        return await MembershipSchema.find({});
    }
    
}