import { cn } from '@/lib/utils';

interface PageHeaderProps {
  label: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function PageHeader({
  label,
  title,
  description,
  align = 'left',
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <h1 className="font-display mt-4 text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-slate-50 leading-tight">
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            'mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
