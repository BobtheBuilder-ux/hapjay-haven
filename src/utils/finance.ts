
/**
 * Format currency in Naira
 */
export const formatCurrencyNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Extract numeric value from price string
 */
export const extractNumericValue = (priceString: string): number => {
  return parseFloat(priceString.replace(/[^0-9.-]+/g, "")) || 0;
};

/**
 * Calculate monthly installment payment
 * 
 * @param principal Total loan amount
 * @param monthlyInterestRate Monthly interest rate (annual rate / 12)
 * @param termInMonths Loan term in months
 */
export const calculateMonthlyPayment = (
  principal: number, 
  monthlyInterestRate: number, 
  termInMonths: number
): number => {
  if (principal <= 0 || termInMonths <= 0) return 0;
  
  const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termInMonths);
  const denominator = Math.pow(1 + monthlyInterestRate, termInMonths) - 1;
  
  if (denominator === 0) return principal / termInMonths;
  return principal * (numerator / denominator);
};
