export const validateRetirementRequest = {
    "calculate": {
        body: {
            type: 'object',
            required: ['age', 'retirementAge', 'monthlyExpenses', 'inflationRate'],
            properties: {
                age: { type: 'number' },
                retirementAge: { type: 'number' },
                monthlyExpenses: { type: 'number' },
                inflationRate: { type: 'number' },
                lifeExpectancy: { type: 'number' } // This property is now optional
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    retirementCorpus: {
                        type: 'array',
                    },
                    expectedAnnualExpenseAtRetirementAge: {type: 'number'},
                }
            }
        }
    }
}