import type { TRetirementCalculatorParams } from "../../types/calculators/retirement.type";

export const retirementCalculator = ({
    age,
    retirementAge,
    monthlyExpenses,
    inflationRate
}: TRetirementCalculatorParams) => {
    // Number of years until retirement
  const yearsToRetirement = retirementAge - age;

  // Adjust the monthly expenses for inflation over the years to retirement
  const inflatedMonthlyExpenses = monthlyExpenses * Math.pow((1 + inflationRate / 100), yearsToRetirement);

  // Estimate annual expenses at the time of retirement (12 months)
  const annualExpensesAtRetirement = inflatedMonthlyExpenses * 12;

  // Estimate the retirement corpus (assuming you want 30 years of retirement)
    const retirementCorpus = annualExpensesAtRetirement * 30;
    
    return {
        retirementCorpus: [
            {

            }
        ],
        expectedAnnualExpenseAtRetirementAge: annualExpensesAtRetirement
    }
}