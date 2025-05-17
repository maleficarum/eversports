/**
 * Controller class for handling membership-related HTTP routes.
 * Defines endpoints for managing memberships, such as fetching all memberships or creating new ones.
 * Uses Fastify-decorators for route registration and dependency management.
 *
 * @decorator @Controller - Configures the base route and controller type.
 */

import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, ControllerType, GET, POST } from "fastify-decorators";
import { MembershipService } from "../services/MembershipService";
import { membershipRequestSchema } from "../model/schemas/request";
import { Static } from "@sinclair/typebox";
import { logger } from '../utils/logger';

const ROUTE_PREFIX = '/memberships';

@Controller({
    route: ROUTE_PREFIX,
    type: ControllerType.SINGLETON
})
export default class MembershipRoutes {

    private static readonly LOG_TAG = 'MembershipRoutes';
    private membershipService: MembershipService =  new MembershipService();

    @GET({ url: '/' })
    async getAllMemberships(request: FastifyRequest, reply: FastifyReply) {
        logger.get()?.debug(`${MembershipRoutes.LOG_TAG}: Fetching all memberships`);
        return this.membershipService.getAllMemberships();
    }

    @POST({
        url: '/',
        options: {
            schema: {
                body: membershipRequestSchema
            }
        }
    })
    async createMembership(request: FastifyRequest<{ Body: Static<typeof membershipRequestSchema> }>,
                            reply: FastifyReply) {

        logger.get()?.debug(`${MembershipRoutes.LOG_TAG}: Fetching all memberships`);

        return {};
    }
}