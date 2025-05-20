import { Membership } from "../model/Membership";
import { MembershipPeriod } from "../model/MembershipPeriod";
import { IMembershipRepository } from "./interfaces/IMembershipRepository";
import mongoose, { Mongoose } from 'mongoose';
import { MembershipSchema } from "../model/schemas/db/mongo/MembershipSchema";
import { MembershipPeriodSchema } from "../model/schemas/db/mongo/MembershipPeriodSchema";
import { BunyanLoggerFactory } from "../utils/factory/impl/BunyanLoggerFactory";
import { ErrorCodes } from "../utils/error.handler";


/**
 * MongoDB repository implementation for Membership entities
 * Handles all database operations for Memberships and their associated Periods
 * 
 * @author Oscar I. Hernandez V.

 * 
 */
export class MembershipRepository implements IMembershipRepository {

    private MONGO_DB_URI: string;
    private connection!: Mongoose;
    private readonly connectionOptions = {}
    /*private connectionOptions = { 
        serverApi: { 
            version: "1" as const, strict: true, deprecationErrors: true 
        } 
    };*/

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly logger: any = BunyanLoggerFactory.getInstance().createLogger({ name: 'MembershipRepository' });

    constructor() {
        this.MONGO_DB_URI = process.env.MONGO_CONNECTION_STRING || '';
        if (!this.MONGO_DB_URI) {
            throw { statusCode: 500, message: ErrorCodes.ERROR_UNABLE_TO_CONNECT_TO_DATABASE };
        }
    }

    async connect() {
        try {
            this.connection = await mongoose.connect(this.MONGO_DB_URI, this.connectionOptions);
            this.logger.info(`Connected to MongoDB server version ${this.connection.version}`);
        } catch (error) {
            this.logger.error('Failed to connect to MongoDB', error);
            throw { statusCode: 500, message: 'unableToConnectToDatabase' };
        }
    }

    /**
     * Creates a new Membership and associated Periods
     * @param membership The Membership entity to create
     * @param membershipPeriods Array of associated Period entities
     * @returns The created Membership or null if creation failed
     */
    async createMembership(membership: Membership, membershipPeriods: MembershipPeriod[]): Promise<Membership | null> {
        //const session = await mongoose.startSession();
        //session.startTransaction();

        try {
            // Generate sequential ID (consider using auto-increment in production)
            const nextId = await this.getNextMembershipId();
            membership.id = nextId;

            // Create membership
            const createdMembership = await MembershipSchema.create(membership);
            this.logger.debug("Created new membership", { membershipId: nextId, createdMembership });

            // Create associated periods
            const periodCreationPromises = membershipPeriods.map(period => {
                period.membership = membership.id;
                return MembershipPeriodSchema.create(period);
            });

            await Promise.all(periodCreationPromises);
            //await session.commitTransaction();

            return this.findMembershipById(membership.id);
        } catch (error) {
            //await session.abortTransaction();
            this.logger.error("Failed to create membership", { error, membershipId: membership.id });
            throw { statusCode: 500, message: ErrorCodes.ERROR_UNABLE_TO_CREATE_MEMBERSHIP };
        }

    }

    /**
    * Retrieves all Memberships with their associated Periods
    * @returns Array of Membership objects with their Periods
    */
    async getAllMemberships(): Promise<Array<{ membership: Membership, periods: MembershipPeriod[] }>> {
        try {
            const [memberships, periods] = await Promise.all([
                MembershipSchema.find({}, { _id: 0 }).lean(),
                MembershipPeriodSchema.find({}, { _id: 0 }).lean()
            ]);
            
            return memberships.map(membership => ({
                membership,
                periods: periods.filter(period => {
                    //console.log(membership.id + " --- " + period.membership);
                    return period.membership === membership.id
                })
            }));
        } catch (error) {
            this.logger.error("Failed to retrieve memberships", error);
            throw { statusCode: 500, message: ErrorCodes.ERROR_UNABLE_TO_GET_ALL_MEMBERSHIPS };
        }
    }

    private async getNextMembershipId(): Promise<number> {
        const lastMembership = await MembershipSchema.findOne({}, { id: 1 })
            .sort({ id: -1 })
            .lean();

        return lastMembership ? lastMembership.id + 1 : 1;
    }

    private async findMembershipById(id: number): Promise<Membership | null> {
        return MembershipSchema.findOne({ id }, { _id: 0, __v: 0 }).lean();
    }

}