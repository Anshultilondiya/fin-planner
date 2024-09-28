"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRetirementRequest = void 0;
exports.validateRetirementRequest = {
    "calculate": {
        body: {
            type: 'object',
            required: ['age', 'retirementAge', 'monthlyExpenses', 'inflationRate'],
            properties: {
                age: { type: 'number' },
                retirementAge: { type: 'number' },
                monthlyExpenses: { type: 'number' },
                inflationRate: { type: 'number' }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    retirementCorpus: {
                        type: 'array',
                    },
                    expectedAnnualExpenseAt
                }
            }
        }
    }
};
