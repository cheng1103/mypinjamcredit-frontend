'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface StatsData {
  approvedToday: number;
  totalAmountToday: number;
  avgApprovalTime: number;
}

export function TodayStats() {
  const t = useTranslations();
  const [stats, setStats] = useState<StatsData>({
    approvedToday: 0,
    totalAmountToday: 0,
    avgApprovalTime: 0
  });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate real-time stats with reasonable ranges for a loan company
    const generateStats = () => {
      const currentHour = new Date().getHours();

      // More approvals during business hours (9am-6pm)
      const isBusinessHours = currentHour >= 9 && currentHour <= 18;
      const baseApprovals = isBusinessHours ? 15 : 5;

      return {
        approvedToday: baseApprovals + Math.floor(Math.random() * 8), // 5-23 or 15-33
        totalAmountToday: Math.floor(Math.random() * 200000) + 150000, // RM150k-350k
        avgApprovalTime: Math.floor(Math.random() * 15) + 15 // 15-30 minutes
      };
    };

    // Initial load
    setStats(generateStats());
    setIsAnimating(true);

    // Update every 2-3 minutes to simulate real-time activity
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setStats(generateStats());
        setIsAnimating(true);
      }, 300);
    }, 150000); // 2.5 minutes

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number): string => {
    return `RM ${(amount / 1000).toFixed(0)}k`;
  };

  return (
    <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6 shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Today's Activity</h3>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-600">Live Updates</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Approved Today */}
        <div className="rounded-xl bg-white/80 p-3 text-center backdrop-blur-sm transition-all hover:shadow-md">
          <div className={`text-2xl font-bold text-green-600 transition-all duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            {stats.approvedToday}
          </div>
          <div className="mt-1 text-xs font-medium text-slate-600">
            Approved<br />Today
          </div>
        </div>

        {/* Total Amount */}
        <div className="rounded-xl bg-white/80 p-3 text-center backdrop-blur-sm transition-all hover:shadow-md">
          <div className={`text-2xl font-bold text-blue-600 transition-all duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            {formatCurrency(stats.totalAmountToday)}
          </div>
          <div className="mt-1 text-xs font-medium text-slate-600">
            Total<br />Disbursed
          </div>
        </div>

        {/* Avg Approval Time */}
        <div className="rounded-xl bg-white/80 p-3 text-center backdrop-blur-sm transition-all hover:shadow-md">
          <div className={`text-2xl font-bold text-purple-600 transition-all duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            {stats.avgApprovalTime}m
          </div>
          <div className="mt-1 text-xs font-medium text-slate-600">
            Avg<br />Response
          </div>
        </div>
      </div>

      {/* Trust Message */}
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-white/60 p-3 text-xs text-slate-700">
        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>
          Join <span className="font-semibold text-green-700">{stats.approvedToday}</span> others who received approval today
        </span>
      </div>
    </div>
  );
}
