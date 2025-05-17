import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, ControllerType, GET } from "fastify-decorators";


/**
 * The health route
 * 
 * @author Oscar I. Hernandez V.
 * 
 * @description
 * 
 * Controller that exposes the health check routes. This route exist as a singleton thru all application
 * 
 * The exposed information includes:
 * - current status
 * - startupTimeInMillisecs
 * - uptimeInMillisecs
 * 
 */
@Controller({
    route: '/health',
    type: ControllerType.SINGLETON
})
export default class MembershipRoutes {

    private startupDateInMillisecs = new Date().getTime();

    @GET({ url: '/' })
    async health(request: FastifyRequest, response: FastifyReply) {
        return {
            "health": {
                "status": "OK",
                "startupTimeInMillisecs": this.startupDateInMillisecs,
                "uptimeInMillisec": new Date().getTime() - this.startupDateInMillisecs
            }
        };
    }
}