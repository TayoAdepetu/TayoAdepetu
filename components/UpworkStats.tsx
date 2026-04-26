'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Award, Zap, Target } from 'lucide-react';
import { site } from '@/data/site';

const stats = [
  { label: 'Projects completed', value: site.upworkStats.completedProjects, Icon: Target },
  { label: 'Job success score', value: site.upworkStats.successRate, Icon: CheckCircle2 },
  { label: 'Upwork ranking', value: site.upworkStats.rank, Icon: Award },
  { label: 'Avg delivery', value: site.upworkStats.deliveryTime, Icon: Zap },
];

export function UpworkStats() {
  return (
    <section
      id="upwork"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
            Verified track record
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
            Six years on Upwork. <span className="text-gradient-brand">Zero bad reviews.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            My Upwork profile has been earning top-rated badges since 2020 — first as a copywriter and SEO
            specialist, and for the last four years as a full-stack engineer. Every stat below is verified
            and public on my{' '}
            <a
              href={site.social.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 dark:text-brand-400 font-semibold underline underline-offset-2 hover:text-brand-700"
            >
              Upwork profile
            </a>
            .
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 max-w-xl">
            {stats.map(({ label, value, Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-colors group"
              >
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-brand-100 dark:bg-brand-900/30 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <Icon className="relative h-5 w-5 text-brand-600 dark:text-brand-400 mb-3" />
                <div className="relative text-2xl font-bold text-slate-900 dark:text-slate-50">{value}</div>
                <div className="relative text-sm text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
              </motion.div>
            ))}
          </div>

          <a
            href={site.social.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold transition-colors group"
          >
            Verify on Upwork
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Screenshot */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-br from-brand-500/20 via-brand-600/20 to-brand-800/20 rounded-[2rem] blur-2xl" />
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-4 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                upwork.com/freelancers/~016a2653ba2eb2f93c
              </span>
            </div>
            <Image
              src="/upwork-profile.png"
              alt="Tayo Adepetu's public Upwork profile showing Top-rated Plus status, 100% job success rate, and earnings"
              width={1200}
              height={800}
              className="w-full h-auto"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
