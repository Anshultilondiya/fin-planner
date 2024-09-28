import type { FastifyInstance } from "fastify";

const SipRoutes = (fastify: FastifyInstance, options: any, done: any) => {

    fastify.get('/view', async (request, reply) => {
        return { message: 'SIP route' };
    });

    done();
}

export default SipRoutes;