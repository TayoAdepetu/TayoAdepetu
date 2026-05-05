'use client';

import { Sparkles, ArrowRight } from 'lucide-react';
import { useContact } from './contact/ContactProvider';
import { cn } from '@/lib/utils';

interface Props {
  preselectedService?: string;
  label?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function StartProjectButton({
  preselectedService,
  label = 'Start this project',
  variant = 'primary',
  className,
}: Props) {
  const { open } = useContact();

  const base =
    'group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5';
  const styles =
    variant === 'primary'
      ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50'
      : 'border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200';

  return (
    <button onClick={() => open(preselectedService)} className={cn(base, styles, className)}>
      {variant === 'primary' && <Sparkles className="h-4 w-4" />}
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}
