'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { ServiceIcon } from './ServiceIcon';

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            What I do
          </span>
          <h2 className="font-display mt-4 text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 dark:text-slate-50 leading-tight">
            Seven ways I can move <span className="text-brand-600 dark:text-brand-400">your product forward</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            From MVP to launch to first-page rankings, each service has a dedicated process, typical timeline,
            and proof in past work.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {services.map((svc, i) => (
            <motion.div
              key={svc.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/services/${svc.slug}`}
                className="group relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10"
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-400 via-brand-600 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <ServiceIcon icon={svc.icon} className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-700 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">{svc.name}</h3>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                  {svc.tagline}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Timeline</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{svc.timeline}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-colors"
          >
            Explore all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
