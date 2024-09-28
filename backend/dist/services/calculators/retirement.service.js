"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retirementCalculator = void 0;
const retirementCalculator = ({ age, retirementAge, monthlyExpenses, inflationRate }) => {
    // Number of years until retirement
    const yearsToRetirement = retirementAge - age;
    // Adjust the monthly expenses for inflation over the years to retirement
    const inflatedMonthlyExpenses = monthlyExpenses * Math.pow((1 + inflationRate / 100), yearsToRetirement);
    // Estimate annual expenses at the time of retirement (12 months)
    const annualExpensesAtRetirement = inflatedMonthlyExpenses * 12;
    // Estimate the retirement corpus (assuming you want 30 years of retirement)
    const retirementCorpus = annualExpensesAtRetirement * 30;
    return retirementCorpus;
};
exports.retirementCalculator = retirementCalculator;
