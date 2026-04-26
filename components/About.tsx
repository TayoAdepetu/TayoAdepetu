'use client';

import { motion } from 'motion/react';
import { Code2, PenLine, Search, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const FACTS = [
  { Icon: Code2, label: 'Full-stack engineer', value: '4+ years' },
  { Icon: PenLine, label: 'Copywriter & SEO', value: 'Since 2020' },
  { Icon: Briefcase, label: 'Projects delivered', value: '35+ on Upwork' },
  { Icon: MapPin, label: 'Based in', value: 'Lagos, Nigeria' },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
            About me
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 leading-tight max-w-3xl">
            Engineer by day. Writer by instinct. <span className="text-gradient-brand">SEO nerd for life.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 mt-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            <p>
              I&apos;m a <strong className="text-slate-900 dark:text-slate-100">Full-stack Software Engineer</strong>{' '}
              with 4+ years of shipping production software — Laravel, TypeScript, React, React Native, and
              Next.js. I&apos;ve built enterprise systems, fintech payment rails, AI-powered claims processors, and
              marketplaces with real-money escrow.
            </p>

            <p>
              Before engineering, I spent years as a{' '}
              <strong className="text-slate-900 dark:text-slate-100">Copywriter and SEO Specialist</strong>, writing
              articles that ranked, running campaigns that converted, and building brand voice from scratch. That
              background still shows up in everything I ship — I can&apos;t help writing UX copy while coding, and
              I obsess over how a product is found, not just how it&apos;s built.
            </p>

            <p>
              Today, I help individuals and businesses — in{' '}
              <strong className="text-slate-900 dark:text-slate-100">Nigeria and globally (US, UK, Australia)</strong> —
              take software products from conceptualisation to launch. Typical end-to-end delivery runs 5 to 7 weeks.
              When the work is done, I can also help you rank for the keywords that matter.
            </p>

            <p>
              I&apos;m an <strong className="text-slate-900 dark:text-slate-100">Economics graduate</strong> of
              Obafemi Awolowo University, a <strong className="text-slate-900 dark:text-slate-100">CS50</strong>{' '}
              alum, and currently studying Computer Science at Miva Open University. That mix of economics,
              engineering, and marketing is what I bring to your product.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {FACTS.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <div className="flex-shrink-0 h-11 w-11 rounded-lg bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {label}
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{value}</div>
                </div>
              </div>
            ))}

            <div className="p-5 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white">
              <GraduationCap className="h-5 w-5 mb-2 opacity-80" />
              <div className="text-xs uppercase tracking-wider opacity-80">Now learning</div>
              <div className="font-semibold mt-0.5">
                B.Sc Computer Science · Miva Open University
              </div>
              <div className="text-xs opacity-80 mt-1">Plus Web3Bridge smart contract cohort X.</div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Search className="h-5 w-5 text-brand-600 dark:text-brand-400 mb-2" />
              <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Dual specialism
              </div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                Software Engineering + Local & Global SEO
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
