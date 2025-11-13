'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const loanTypeValues = [
  'PERSONAL_USE',
  'BUSINESS_EXPANSION',
  'EQUIPMENT_FINANCING',
  'WORKING_CAPITAL',
  'DEBT_CONSOLIDATION'
] as const;

const malaysiaStates = [
  'JOHOR',
  'KEDAH',
  'KELANTAN',
  'MELAKA',
  'NEGERI_SEMBILAN',
  'PAHANG',
  'PENANG',
  'PERAK',
  'PERLIS',
  'SABAH',
  'SARAWAK',
  'SELANGOR',
  'TERENGGANU',
  'KUALA_LUMPUR',
  'PUTRAJAYA',
  'LABUAN'
] as const;

// Phone number formatter - removes all non-digits and formats properly
const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters except leading +
  const cleaned = phone.replace(/[^\d+]/g, '');
  // Remove + if present and any leading 6 (country code)
  const withoutCountryCode = cleaned.replace(/^\+?6?/, '');
  // Ensure it starts with 0
  return withoutCountryCode.startsWith('0') ? withoutCountryCode : '0' + withoutCountryCode;
};

// Full form schema - all fields in one form
const leadFormSchema = z.object({
  loanAmount: z.number()
    .min(1000, 'Loan amount must be at least RM 1,000')
    .max(5000000, 'Loan amount must be less than RM 5,000,000'),
  loanType: z.enum(loanTypeValues, {
    message: 'Please select a loan type'
  }),
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .transform(formatPhoneNumber)
    .refine(
      (phone) => /^01[0-46-9]\d{7,8}$/.test(phone),
      'Please enter a valid Malaysian phone number (e.g. 012-345-6789)'
    ),
  occupation: z.string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(100, 'Occupation must be less than 100 characters'),
  monthlyIncome: z.number()
    .min(1000, 'Monthly income must be at least RM 1,000')
    .max(1000000, 'Monthly income must be less than RM 1,000,000'),
  location: z.enum(malaysiaStates, {
    message: 'Please select your location'
  })
});

type LeadFormData = z.infer<typeof leadFormSchema>;

export function SimpleLeadForm() {
  const t = useTranslations('form');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: LeadFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const toastId = toast.loading(t('submitting'));

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ errorKey: 'generic' }));
        throw new Error(errorData.errorKey || 'generic');
      }

      toast.success(t('success'), { id: toastId });
      reset();
    } catch (error) {
      const errorKey = error instanceof Error ? error.message : 'generic';
      toast.error(t(`error.${errorKey}`), { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <header className="space-y-1">
        <h2 className="text-base font-semibold text-sky-600">{t('title')}</h2>
        <p className="text-xs text-slate-600">{t('description')}</p>
      </header>

      <div className="space-y-2">
        {/* Loan Details Section */}
        <div className="space-y-2 pb-2 border-b border-slate-200">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Loan Details</h3>

          <label className="flex flex-col gap-1 text-xs font-medium">
            <span>{t('fields.loanAmount')}</span>
            <input
              type="number"
              {...register('loanAmount', { valueAsNumber: true })}
              placeholder="e.g. 10000"
              className={`rounded-lg border ${
                errors.loanAmount ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
              } bg-white/90 px-2 py-1.5 text-sm text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:outline-none focus:ring-2`}
            />
            {errors.loanAmount && (
              <span className="text-xs text-red-600">{errors.loanAmount.message}</span>
            )}
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            <span>{t('fields.loanType')}</span>
            <select
              {...register('loanType')}
              defaultValue=""
              className={`rounded-lg border ${
                errors.loanType ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
              } bg-white/90 px-2 py-1.5 text-sm text-slate-900 shadow-sm transition focus:outline-none focus:ring-2`}
            >
              <option value="" disabled>
                {t('placeholderOption')}
              </option>
              {loanTypeValues.map((value) => (
                <option key={value} value={value}>
                  {t(`loanTypeOptions.${value}`)}
                </option>
              ))}
            </select>
            {errors.loanType && (
              <span className="text-xs text-red-600">{errors.loanType.message}</span>
            )}
          </label>
        </div>

        {/* Personal Info Section */}
        <div className="space-y-2 pb-2 border-b border-slate-200">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Personal Information</h3>

          <label className="flex flex-col gap-1 text-xs font-medium">
            <span>{t('fields.name')}</span>
            <input
              {...register('fullName')}
              placeholder="e.g. Ahmad bin Abdullah"
              className={`rounded-lg border ${
                errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
              } bg-white/90 px-2 py-1.5 text-sm text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:outline-none focus:ring-2`}
            />
            {errors.fullName && (
              <span className="text-xs text-red-600">{errors.fullName.message}</span>
            )}
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            <span>{t('fields.phone')}</span>
            <input
              {...register('phone')}
              placeholder="e.g. 012-345-6789 or +60123456789"
              className={`rounded-lg border ${
                errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
              } bg-white/90 px-2 py-1.5 text-sm text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:outline-none focus:ring-2`}
            />
            {errors.phone && (
              <span className="text-xs text-red-600">{errors.phone.message}</span>
            )}
            <span className="text-xs text-slate-500">
              Accepts any format: with/without spaces, dashes, or +60
            </span>
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            <span>{t('fields.occupation')}</span>
            <input
              {...register('occupation')}
              placeholder="e.g. Business Owner"
              className={`rounded-lg border ${
                errors.occupation ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
              } bg-white/90 px-2 py-1.5 text-sm text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:outline-none focus:ring-2`}
            />
            {errors.occupation && (
              <span className="text-xs text-red-600">{errors.occupation.message}</span>
            )}
          </label>
        </div>

        {/* Financial & Location Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Financial & Location</h3>

          <label className="flex flex-col gap-1 text-xs font-medium">
            <span>{t('fields.salary')}</span>
            <input
              type="number"
              {...register('monthlyIncome', { valueAsNumber: true })}
              placeholder="e.g. 3000"
              className={`rounded-lg border ${
                errors.monthlyIncome ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
              } bg-white/90 px-2 py-1.5 text-sm text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:outline-none focus:ring-2`}
            />
            {errors.monthlyIncome && (
              <span className="text-xs text-red-600">{errors.monthlyIncome.message}</span>
            )}
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium">
            <span>{t('fields.location')}</span>
            <select
              {...register('location')}
              defaultValue=""
              className={`rounded-lg border ${
                errors.location ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
              } bg-white/90 px-2 py-1.5 text-sm text-slate-900 shadow-sm transition focus:outline-none focus:ring-2`}
            >
              <option value="" disabled>
                {t('placeholderOption')}
              </option>
              {malaysiaStates.map((state) => (
                <option key={state} value={state}>
                  {t(`locationOptions.${state}`)}
                </option>
              ))}
            </select>
            {errors.location && (
              <span className="text-xs text-red-600">{errors.location.message}</span>
            )}
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md transition duration-200 hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t('submitting')}
          </>
        ) : (
          <>✓ {t('cta')}</>
        )}
      </button>
    </form>
  );
}
