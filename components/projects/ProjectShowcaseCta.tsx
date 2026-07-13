'use client';

import { ContactCta } from '@/components/contact/ContactCta';

export function ProjectShowcaseCta() {
  return (
    <section className="mt-16 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-8 sm:p-10">
      <h2 className="font-display text-2xl sm:text-3xl font-normal text-slate-900 dark:text-slate-50">
        Building a mobile product?
      </h2>
      <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
        I handle mobile apps end to end — from UI and API to payments, AI features, and store-ready delivery.
      </p>
      <ContactCta preselectedService="Mobile App Development" layout="inline" className="mt-6" />
    </section>
  );
}
