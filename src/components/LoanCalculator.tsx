'use client';

import { useEffect, useMemo, useState } from 'react';

type LoanCalculatorProps = {
  applyHref?: string;
  className?: string;
};

const INTEREST_RATE = 4.88; // 4.88% p.a.
const MIN_LOAN = 5000;
const MAX_LOAN = 100000;
const MAX_TENURE = 10;

export function LoanCalculator({ applyHref = '/en/apply', className }: LoanCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTenure, setLoanTenure] = useState(5); // years
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateLoan(loanAmount, loanTenure);
  }, [loanAmount, loanTenure]);

  const tenureOptions = useMemo(() => {
    return Array.from({ length: MAX_TENURE }, (_, index) => index + 1);
  }, []);

  const calculateLoan = (amount: number, tenure: number) => {
    const monthlyRate = INTEREST_RATE / 100 / 12;
    const numberOfPayments = tenure * 12;

    const monthly =
      (amount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const total = monthly * numberOfPayments;
    const interest = total - amount;

    setMonthlyPayment(monthly);
    setTotalPayment(total);
    setTotalInterest(interest);
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleApplyClick = () => {
    window.location.href = applyHref;
  };

  return (
    <div
      className={`rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-xl shadow-blue-100 ${
        className ?? ''
      }`}
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
          Repayment Estimator
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Loan Calculator</h1>
        <p className="text-sm text-slate-600">
          Adjust the sliders to estimate your monthly repayments based on our headline rate of{' '}
          <span className="font-semibold text-blue-600">{INTEREST_RATE}% p.a.</span>
        </p>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-5">
            <label className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Loan Amount</span>
              <span className="text-lg text-blue-600">RM {loanAmount.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min={MIN_LOAN}
              max={MAX_LOAN}
              step={1000}
              value={loanAmount}
              onChange={(event) => setLoanAmount(Number(event.target.value))}
              className="h-2 w-full cursor-pointer rounded-full bg-blue-100 accent-blue-600"
            />
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>RM {MIN_LOAN.toLocaleString()}</span>
              <span>RM {MAX_LOAN.toLocaleString()}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-5">
            <label className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Loan Tenure</span>
              <span className="text-lg text-blue-600">{loanTenure} years</span>
            </label>
            <div className="grid grid-cols-5 gap-2 text-sm text-slate-600">
              {tenureOptions.map((option) => {
                const isActive = option === loanTenure;
                return (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setLoanTenure(option)}
                    className={`rounded-full border px-3 py-2 transition ${
                      isActive
                        ? 'border-blue-500 bg-blue-500 text-white shadow'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {option}y
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-5 text-sm text-slate-600">
            <p>
              Calculations are based on a flat interest assumption and intended for illustration. An
              advisor will confirm your personalised indicative rate during consultation.
            </p>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-blue-100 bg-blue-600/5 p-6">
          <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.18em] text-blue-100/90">
              Estimated Monthly Repayment
            </p>
            <p className="mt-3 text-3xl font-semibold">RM {formatCurrency(monthlyPayment)}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-blue-100 bg-white p-4 text-slate-700">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                Total Payment
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                RM {formatCurrency(totalPayment)}
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-4 text-slate-700">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                Total Interest
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                RM {formatCurrency(totalInterest)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/40 bg-white/70 p-4 text-xs text-slate-600">
            Figures are for reference only. Final approval, rate, and tenure depend on credit
            assessment, documentation, and regulatory guidelines.
          </div>

          <button
            type="button"
            onClick={handleApplyClick}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:from-blue-600 hover:to-sky-600"
          >
            Start Loan Application
          </button>
        </section>
      </div>
    </div>
  );
}
