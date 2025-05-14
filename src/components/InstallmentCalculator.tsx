
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";

interface InstallmentCalculatorProps {
  propertyPrice?: string;
}

const InstallmentCalculator = ({ propertyPrice = "₦0" }: InstallmentCalculatorProps) => {
  const [price, setPrice] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(12);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalLoan, setTotalLoan] = useState<number>(0);
  
  // Format currency as Naira
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Parse price from string with currency symbol to number
  useEffect(() => {
    if (propertyPrice) {
      // Extract only numbers from the price string
      const numericValue = parseFloat(propertyPrice.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(numericValue)) {
        setPrice(numericValue);
        
        // Calculate 30% down payment
        const calculatedDownPayment = Math.round(numericValue * 0.3);
        setDownPayment(calculatedDownPayment);
        
        // Calculate loan amount
        const loanAmount = numericValue - calculatedDownPayment;
        setTotalLoan(loanAmount);
      }
    }
  }, [propertyPrice]);

  // Calculate monthly payment
  useEffect(() => {
    // Loan amount = price - down payment
    const loanAmount = price - downPayment;
    setTotalLoan(loanAmount);
    
    // Formula: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    // Where M = Monthly payment, P = Principal (loan amount), 
    // r = Monthly interest rate, n = Number of months
    
    // Monthly interest rate (5.5% per year ÷ 12 months)
    const monthlyInterestRate = 0.055 / 12;
    
    if (loanAmount > 0 && loanTerm > 0) {
      const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm);
      const denominator = Math.pow(1 + monthlyInterestRate, loanTerm) - 1;
      
      const monthlyPaymentAmount = loanAmount * (numerator / denominator);
      setMonthlyPayment(Math.round(monthlyPaymentAmount));
    } else {
      setMonthlyPayment(0);
    }
  }, [price, downPayment, loanTerm]);

  // Handle price change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value) || 0;
    setPrice(newPrice);
    
    // Recalculate 30% down payment
    const newDownPayment = Math.round(newPrice * 0.3);
    setDownPayment(newDownPayment);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Installment Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Price</label>
          <Input
            type="number"
            value={price}
            onChange={handlePriceChange}
            className="text-right"
          />
          <p className="text-sm text-gray-500 mt-1">Enter property price in Naira</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Down Payment (30%)</label>
            <span className="text-sm font-semibold">{formatCurrency(downPayment)}</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Down payment is fixed at 30% of the property price</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Loan Term</label>
            <span className="text-sm font-semibold">{loanTerm} Months</span>
          </div>
          <Slider
            min={6}
            max={12}
            step={1}
            defaultValue={[12]}
            value={[loanTerm]}
            onValueChange={(values) => setLoanTerm(values[0])}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>6 Months</span>
            <span>12 Months</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Interest Rate</label>
            <span className="text-sm font-semibold">5.5%</span>
          </div>
          <p className="text-sm text-gray-500">Fixed at 5.5% per annum</p>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Loan Amount:</span>
            <span className="font-semibold">{formatCurrency(totalLoan)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Estimated Monthly Payment:</span>
            <span className="text-lg font-bold text-realestate-navy">
              {formatCurrency(monthlyPayment)}
            </span>
          </div>
        </div>

        <Button className="w-full bg-realestate-navy mt-2">Apply for Financing</Button>
      </CardContent>
    </Card>
  );
};

export default InstallmentCalculator;
