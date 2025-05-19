/**
 * Controller class for handling membership-related HTTP routes.
 * Defines endpoints for managing memberships, such as fetching all memberships or creating new ones.
 * Uses Fastify-decorators for route registration and dependency management.
 * 
 * @author Oscar I Hernandez V
 *
 * @decorator @Controller - Configures the base route and controller type.
 */

import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, ControllerType, GET, POST } from "fastify-decorators";
import { MembershipService } from "../services/MembershipService";
import { membershipRequestSchema } from "../model/schemas/request";
import { Static } from "@sinclair/typebox";
import { IEntityFactory } from "../utils/factory/IEntityFactory";
import { ClassRegistry } from "../utils/factory/impl/ClassRegistry";
import { MembershipFactory } from "../utils/factory/impl/MembershipFactory";
import { BunyanLoggerFactory } from "../utils/factory/impl/BunyanLoggerFactory";
import { Membership } from "../model/Membership";
import { MembershipPeriod } from "../model/MembershipPeriod";

const ROUTE_PREFIX = '/memberships';

@Controller({
    route: ROUTE_PREFIX,
    type: ControllerType.SINGLETON
})
export default class MembershipRoutes {

    private readonly MODULE_NAME = 'MembershipRoutes';
    private membershipService: MembershipService =  new MembershipService();
    private membershipFactory: IEntityFactory;
    private membershipPeriodFactory: IEntityFactory;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private logger: any = BunyanLoggerFactory.getInstance().createLogger({  name: this.MODULE_NAME });


    constructor() {
        this.membershipFactory = ClassRegistry.create<MembershipFactory>("MembershipFactory", undefined);
        this.membershipPeriodFactory = ClassRegistry.create<MembershipFactory>("MembershipPeriodFactory", undefined);
    }

    /**
    * GET /memberships - Retrieve all memberships
    * @returns Promise containing all memberships
    */
    @GET({ url: '/' })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getAllMemberships(request: FastifyRequest, reply: FastifyReply) {
        this.logger.trace("Fetching all memberships");
        return this.membershipService.getAllMemberships();
    }

    /**
     * POST /memberships - Create a new membership
     * @param request Fastify request containing membership data
     * @param reply Fastify reply handler
     * @returns Created membership and periods
     * @throws {ApiError} When creation fails
     */
    @POST({
        url: '/',
        options: {
            schema: {
                body: membershipRequestSchema
            }
        }
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createMembership(request: FastifyRequest<{ Body: Static<typeof membershipRequestSchema> }>, reply: FastifyReply) {
        const membership = this.membershipFactory.createEntity(request.body);
        const membershipPeriods = await this.membershipPeriodFactory.createEntity(membership);        
        const createdMembership = await this.membershipService.createMembership(membership as Membership, membershipPeriods as MembershipPeriod[]);

        if(!createdMembership) {
            this.logger.error("Unable to create a memebrship");
            throw { statusCode: 500, message: 'unableToCreateMembership' };
        }

        return { membership: createdMembership, membershipPeriods: membershipPeriods};        
    }
}