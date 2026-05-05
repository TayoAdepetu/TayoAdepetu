'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, FileDown, Star } from 'lucide-react';
import { useContact } from './contact/ContactProvider';
import { site } from '@/data/site';

export function Hero() {
  const { open } = useContact();
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const profileImgRef = useRef<HTMLImageElement | null>(null);

  // If the image was already cached/decoded before hydration, the onLoad
  // handler we attach below will never fire. Sync from the DOM after mount.
  useEffect(() => {
    const img = profileImgRef.current;
    if (!img) return;
    if (img.complete) {
      if (img.naturalWidth > 0) setProfileLoaded(true);
      else setProfileError(true);
    }
  }, []);

  return (
    <section className="relative min-h-[88vh] flex items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      {/* Floating blue orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl animate-float" />
      <div
        className="pointer-events-none absolute bottom-10 -right-20 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-[11px] font-medium mb-5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-500" />
            </span>
            Available for new projects · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-slate-900 dark:text-slate-50"
          >
            I build software that ships, <br className="hidden sm:block" />
            and <span className="text-gradient-brand">SEO that ranks.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed"
          >
            I&apos;m <span className="font-semibold text-slate-900 dark:text-slate-100">Tayo Adepetu</span> — a{' '}
            <span className="font-semibold text-brand-700 dark:text-brand-300">Top-rated Plus</span> Full-stack
            Software Engineer and former Copywriter & SEO Specialist. For 4+ years I&apos;ve helped founders in Nigeria, the
            US, UK, Germany, and Australia take ideas from conceptualisation to launch and get them ranked on Google.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <button
              onClick={() => open()}
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="h-4 w-4" />
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-colors"
            >
              View past work
            </Link>
            <a
              href="/tayo-adepetu-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 text-sm font-medium transition-colors"
            >
              <FileDown className="h-4 w-4" />
              Resume
            </a>
          </motion.div>

          {/* Quick stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
          >
            <QuickStat value={site.upworkStats.completedProjects} label="Projects delivered" />
            <QuickStat value={site.upworkStats.successRate} label="Job success" />
            <QuickStat value={site.upworkStats.rank} label="Upwork rank" />
            <QuickStat value={site.upworkStats.deliveryTime} label="Delivery window" />
          </motion.div>
        </div>

        {/* Right: portrait card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-6 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 rounded-[2rem] blur-3xl opacity-30" />

            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
              <div className="aspect-[4/5] relative bg-gradient-to-br from-brand-100 via-brand-50 to-white dark:from-brand-950 dark:via-slate-900 dark:to-slate-900">
                {/* Portrait image — uses plain img with graceful fallback */}
                {!profileError && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    ref={profileImgRef}
                    src="/images/profile.jpg"
                    alt="Tayo Adepetu"
                    onLoad={() => setProfileLoaded(true)}
                    onError={() => setProfileError(true)}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${profileLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}
                {(profileError || !profileLoaded) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[7rem] leading-none font-black bg-gradient-to-br from-brand-500 to-brand-800 bg-clip-text text-transparent select-none">
                      TA
                    </span>
                    <span className="mt-3 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {profileError ? 'Add profile.jpg to /public/images' : 'Loading…'}
                    </span>
                  </div>
                )}
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute top-5 -left-4 sm:-left-6 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-2.5 flex items-center gap-2.5"
              >
                <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                  <Star className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 fill-current" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Upwork</div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Top-rated Plus
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-5 -right-4 sm:-right-6 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-2.5"
              >
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Success rate</div>
                <div className="text-base font-bold bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                  100%
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuickStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50">{value}</div>
      <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
    </div>
  );
}
