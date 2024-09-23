const fastify = require('fastify')({ logger: true });

// Define the SIP calculation function
function sipCalculatorMonthly(amount, interestRate, years, withdrawals = []) {
    const monthlyRate = interestRate / 12 / 100;
    const months = years * 12;
    let transactions = [];
    let finalAmount = 0;
    let withdrawalIndex = 0;

    for (let month = 1; month <= months; month++) {
        finalAmount += amount;
        let withdrawalAmount = 0;

        // Process withdrawals
        if (withdrawals && withdrawalIndex < withdrawals.length) {
            if (withdrawals[withdrawalIndex].Month === month) {
                withdrawalAmount = withdrawals[withdrawalIndex].Amount;
                finalAmount -= withdrawalAmount;
                withdrawalIndex++;
            }
        }

        // Apply interest
        finalAmount *= (1 + monthlyRate);

        // Store transaction details
        transactions.push({
            Month: month,
            Amount: amount,
            FinalAmount: finalAmount.toFixed(2), // Limit to 2 decimal places
            Withdrawal: withdrawalAmount
        });
    }

    // Total investment
    const totalInvestment = amount * months;
    return { finalAmount, totalInvestment, transactions };
}

// POST route to handle SIP calculation
fastify.post('/calculate-sip', async (request, reply) => {
    const { amount, interest_rate, years, withdrawals } = request.body;

    // Perform SIP calculation
    const result = sipCalculatorMonthly(amount, interest_rate, years, withdrawals.monthly);

    // Return all transaction data along with the final amount and total investment
    reply.send({
        success: true,
        final_amount: result.finalAmount,
        total_investment: result.totalInvestment,
        transactions: result.transactions // All monthly transaction details
    });
});

// Start Fastify server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log(`Server is running on http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
