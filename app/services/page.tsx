import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { ServiceIcon } from '@/components/ServiceIcon';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Mobile apps, websites, Chrome extensions, AI software, WhatsApp bots, SEO services, and escrow-powered marketplaces — end-to-end, for clients in Nigeria and globally.',
};

export default function ServicesPage() {
  return (
    <main className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
            Services
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
            Everything I ship — <span className="text-gradient-brand">end to end</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
            Seven focused services, each with a proven process, clear timelines, and real projects to back them
            up. Pick one to dive deep, or bundle a few for a full launch.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group relative flex flex-col h-full p-7 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 group-hover:bg-brand-600 group-hover:text-white transition-colors mb-5">
                <ServiceIcon icon={svc.icon} className="h-6 w-6" />
              </div>

              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{svc.name}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 flex-1 leading-relaxed">
                {svc.tagline}
              </p>

              <ul className="mt-4 space-y-1.5">
                {svc.highlights.slice(0, 3).map((h) => (
                  <li
                    key={h}
                    className="text-[13px] text-slate-600 dark:text-slate-400 flex items-start gap-2"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-brand-500 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">{svc.timeline}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
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
