'use client';

import { useState, useEffect } from 'react';

export function QuickCalculator() {
  const [loanAmount, setLoanAmount] = useState(20000);
  const [tenure, setTenure] = useState(24);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Simple calculation with approximate interest rate (you can adjust this)
    const interestRate = 0.08; // 8% annual interest rate
    const monthlyRate = interestRate / 12;
    const numPayments = tenure;

    // Calculate monthly payment using loan amortization formula
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    setMonthlyPayment(Math.round(payment));
  }, [loanAmount, tenure]);

  return (
    <div className="space-y-4 md:space-y-6 rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-sky-50 to-white p-4 md:p-6 shadow-lg">
      <div className="text-center">
        <h3 className="text-base md:text-lg font-semibold text-blue-600">Quick Calculator</h3>
        <p className="text-xs text-slate-600 mt-1">Estimate your monthly repayment</p>
      </div>

      {/* Loan Amount Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Loan Amount</label>
          <span className="text-lg font-bold text-blue-600">
            RM {loanAmount.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="5000"
          max="100000"
          step="1000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((loanAmount - 5000) / (100000 - 5000)) * 100}%, #dbeafe ${((loanAmount - 5000) / (100000 - 5000)) * 100}%, #dbeafe 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>RM 5K</span>
          <span>RM 100K</span>
        </div>
      </div>

      {/* Tenure Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Repayment Period</label>
          <span className="text-lg font-bold text-blue-600">
            {tenure} months
          </span>
        </div>
        <input
          type="range"
          min="12"
          max="60"
          step="12"
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((tenure - 12) / (60 - 12)) * 100}%, #dbeafe ${((tenure - 12) / (60 - 12)) * 100}%, #dbeafe 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>12 mo</span>
          <span>24 mo</span>
          <span>36 mo</span>
          <span>48 mo</span>
          <span>60 mo</span>
        </div>
      </div>

      {/* Result Display */}
      <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">
          Estimated Monthly Payment
        </div>
        <div className="text-4xl font-bold text-green-600">
          RM {monthlyPayment.toLocaleString()}
        </div>
        <div className="text-xs text-slate-600 mt-2">
          Total repayment: RM {(monthlyPayment * tenure).toLocaleString()}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-slate-500 text-center">
        <svg className="inline h-4 w-4 text-slate-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        Estimates only. Actual rates may vary based on your credit profile.
      </div>
    </div>
  );
}
