import type { FastifyInstance } from "fastify";
import { validateRetirementRequest } from "./requestValidator";


const getValidationSchema = (route: string) => {
    switch (route) {
        case 'calculate':
            return {schema:validateRetirementRequest['calculate']};
        default:
            return {};
    }
}

const RetirementCalculatorRoutes = (fastify: FastifyInstance, options: any, done: any) => {
    fastify.post('/calculate', getValidationSchema("calculate"), async (request, reply) => {
            console.log(request.body);
            return { message: 'Retirement route' };
        });
    
        done();
}
    
export default RetirementCalculatorRoutes;