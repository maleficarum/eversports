import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, ControllerType, GET, POST } from "fastify-decorators";
import { MembershipService } from "../services/MembershipService";

@Controller({
    route: '/memberships',
    type: ControllerType.SINGLETON
})
export default class MembershipRoutes {

    //@Inject(FastifyInstanceToken)
    //private instance!: FastifyInstance;
    private membershipService: MembershipService =  new MembershipService();

    @GET({ url: '/' })
    async fetchAllMemberships(request: FastifyRequest, reply: FastifyReply) {
        return this.membershipService.fetchAllMemberships();
    }

    @POST( {url: '/'} )
    async createMembership() {

    }    
}