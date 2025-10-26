'use client';

import { FormEvent, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

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

export function LeadForm() {
  const t = useTranslations('form');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorKey, setErrorKey] = useState<string>('generic');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const normalized: Record<string, unknown> = {};

    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) {
          return;
        }

        if (key === 'loanAmount' || key === 'monthlyIncome') {
          normalized[key] = Number(trimmed);
          return;
        }

        normalized[key] = trimmed;
        return;
      }

      normalized[key] = value;
    });

    startTransition(async () => {
      setStatus('submitting');
      try {
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(normalized)
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({ errorKey: 'generic' }));
          setErrorKey(typeof data.errorKey === 'string' ? data.errorKey : 'generic');
          setStatus('error');
          return;
        }

        setStatus('success');
        setErrorKey('generic');
        event.currentTarget.reset();
      } catch {
        setErrorKey('generic');
        setStatus('error');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-sky-600">{t('title')}</h2>
        <p className="text-sm text-slate-600">{t('description')}</p>
      </header>

      <fieldset className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium">
          <span>{t('fields.name')}</span>
          <input
            name="fullName"
            required
            className="rounded-lg border border-slate-200 bg-white/90 px-4 py-2 text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          <span>{t('fields.phone')}</span>
          <input
            name="phone"
            required
            className="rounded-lg border border-slate-200 bg-white/90 px-4 py-2 text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </fieldset>

      <fieldset className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium">
          <span>{t('fields.occupation')}</span>
          <input
            name="occupation"
            required
            className="rounded-lg border border-slate-200 bg-white/90 px-4 py-2 text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          <span>{t('fields.salary')}</span>
          <input
            type="number"
            name="monthlyIncome"
            min={1000}
            step={100}
            required
            className="rounded-lg border border-slate-200 bg-white/90 px-4 py-2 text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </fieldset>

      <fieldset className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium">
          <span>{t('fields.loanAmount')}</span>
          <input
            type="number"
            name="loanAmount"
            min={1000}
            step={100}
            required
            className="rounded-lg border border-slate-200 bg-white/90 px-4 py-2 text-slate-900 placeholder:text-slate-500 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          <span>{t('fields.loanType')}</span>
          <select
            name="loanType"
            required
            className="rounded-lg border border-slate-200 bg-white/90 px-4 py-2 text-slate-900 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
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
        </label>
      </fieldset>

      <label className="flex flex-col gap-1 text-sm font-medium">
        <span>{t('fields.location')}</span>
        <select
          name="location"
          required
          className="rounded-lg border border-slate-200 bg-white/90 px-4 py-2 text-slate-900 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
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
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? t('submitting') : t('cta')}
      </button>

      {status === 'success' && (
        <p className="rounded-lg border border-blue-200/60 bg-blue-50 p-3 text-sm text-blue-700">
          {t('success')}
        </p>
      )}

      {status === 'error' && (
        <p className="rounded-lg border border-red-300/50 bg-red-50 p-3 text-sm text-red-600">
          {t(`error.${errorKey}`)}
        </p>
      )}
    </form>
  );
}

