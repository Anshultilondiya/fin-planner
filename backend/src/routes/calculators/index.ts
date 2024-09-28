import type { FastifyInstance } from "fastify";
import SipRoutes from "./sip";
import RetirementCalculatorRoutes from "./retirement/retirement";

const CalculatorJunction = (fastify: FastifyInstance, options: any, done: any) => {
    
    fastify.register(SipRoutes, { prefix: '/sip' });
    fastify.register(RetirementCalculatorRoutes, { prefix: '/retirement' });

    done();
}

export default CalculatorJunction;