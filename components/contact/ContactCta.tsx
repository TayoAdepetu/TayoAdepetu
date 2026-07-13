'use client';

import { ArrowRight, FileText, MessageCircle } from 'lucide-react';
import { buildProjectWhatsAppMessage, buildWhatsAppUrl } from '@/lib/contact';
import { cn } from '@/lib/utils';
import { useContact } from './ContactProvider';

interface ContactCtaProps {
  preselectedService?: string;
  layout?: 'hero' | 'nav' | 'section' | 'inline' | 'on-dark';
  className?: string;
}

export function ContactCta({ preselectedService, layout = 'hero', className }: ContactCtaProps) {
  const { open } = useContact();
  const whatsappHref = buildWhatsAppUrl(buildProjectWhatsAppMessage(preselectedService));

  if (layout === 'on-dark') {
    return (
      <div className={cn('flex flex-col sm:flex-row items-stretch sm:items-center gap-3', className)}>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-700 text-sm font-bold hover:bg-emerald-50 transition-all hover:-translate-y-0.5 shadow-xl"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <button
          onClick={() => open(preselectedService)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-sm font-semibold transition-colors"
        >
          <FileText className="h-4 w-4" />
          Send a Project Brief
        </button>
      </div>
    );
  }

  if (layout === 'nav') {
    return (
      <div className={cn('hidden md:flex items-center gap-2', className)}>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white text-emerald-700 hover:bg-emerald-50 text-[13px] font-bold shadow-md border border-slate-200/80 transition-all hover:-translate-y-0.5"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </a>
        <button
          onClick={() => open(preselectedService)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-brand-500 text-slate-700 text-[13px] font-medium transition-colors"
        >
          <FileText className="h-3.5 w-3.5" />
          Brief
        </button>
      </div>
    );
  }

  if (layout === 'section') {
    return (
      <div className={cn('flex flex-col sm:flex-row items-stretch sm:items-center gap-3', className)}>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-700 text-sm font-bold hover:bg-emerald-50 transition-all hover:-translate-y-0.5 shadow-xl"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </a>
        <button
          onClick={() => open(preselectedService)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-sm font-semibold transition-colors"
        >
          <FileText className="h-4 w-4" />
          Send a Project Brief
        </button>
      </div>
    );
  }

  if (layout === 'inline') {
    return (
      <div className={cn('flex flex-col sm:flex-row items-stretch sm:items-center gap-3', className)}>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all hover:-translate-y-0.5"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <button
          onClick={() => open(preselectedService)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-colors"
        >
          <FileText className="h-4 w-4" />
          Send a Project Brief
        </button>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col sm:flex-row items-stretch sm:items-center gap-3', className)}>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-700 text-sm font-bold hover:bg-emerald-50 transition-all hover:-translate-y-0.5 shadow-xl"
      >
        <MessageCircle className="h-4 w-4" />
        Chat on WhatsApp
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
      <button
        onClick={() => open(preselectedService)}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-brand-500 bg-white text-slate-800 text-sm font-semibold transition-colors"
      >
        <FileText className="h-4 w-4" />
        Send a Project Brief
      </button>
    </div>
  );
}
