import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { ServiceIcon } from '@/components/ServiceIcon';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Mobile apps, websites, Chrome extensions, AI software, WhatsApp bots, SEO services, and escrow-powered marketplaces — end-to-end, for clients in Nigeria and globally.',
};

export default function ServicesPage() {
  return (
    <main className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          label="Services"
          align="center"
          title={
            <>
              Everything I ship —{' '}
              <span className="text-brand-600 dark:text-brand-400">end to end</span>
            </>
          }
          description="Seven focused services, each with a proven process, clear timelines, and real projects to back them up. Pick one to dive deep, or bundle a few for a full launch."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group relative flex flex-col h-full p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 group-hover:bg-brand-600 group-hover:text-white transition-colors mb-4">
                <ServiceIcon icon={svc.icon} className="h-5 w-5" />
              </div>

              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">{svc.name}</h2>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 flex-1 leading-relaxed">
                {svc.tagline}
              </p>

              <ul className="mt-3.5 space-y-1.5">
                {svc.highlights.slice(0, 3).map((h) => (
                  <li
                    key={h}
                    className="text-[12.5px] text-slate-600 dark:text-slate-400 flex items-start gap-2"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-brand-500 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{svc.timeline}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
