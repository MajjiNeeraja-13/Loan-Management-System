/**
 * Calculates the Equated Monthly Installment (EMI)
 * Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * 
 * @param {number} principal - The total loan amount (P)
 * @param {number} annualRate - The annual interest rate in percentage
 * @param {number} tenureMonths - The loan duration in months (n)
 * @returns {number} The calculated monthly EMI rounded to 2 decimal places
 */
const calculateEMI = (principal, annualRate, tenureMonths) => {
  if (!principal || !annualRate || !tenureMonths) return 0;
  
  // Convert annual interest rate percentage to a monthly decimal rate
  const r = (annualRate / 12) / 100;
  
  // Calculate EMI
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  
  return Math.round(emi * 100) / 100;
};

module.exports = { calculateEMI };
