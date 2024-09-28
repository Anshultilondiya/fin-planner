import type { FastifyInstance } from "fastify";
import sipRoutes from "./calculators/sip";

const AuthenticationRoutes = (fastify: FastifyInstance, options: any, done: any) => {

    fastify.get('/login', async (request, reply) => {
        return { message: 'Login route' };
    });
    
    fastify.get('/register', async (request, reply) => {
        return { message: 'Register route' };
    });

    done();
}

export default AuthenticationRoutes;