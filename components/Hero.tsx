'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileDown, FileText, MessageCircle, Star } from 'lucide-react';
import { buildProjectWhatsAppMessage, buildWhatsAppUrl } from '@/lib/contact';
import { useContact } from './contact/ContactProvider';

export function Hero() {
  const { open } = useContact();
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const profileImgRef = useRef<HTMLImageElement | null>(null);
  const whatsappHref = buildWhatsAppUrl(buildProjectWhatsAppMessage());

  useEffect(() => {
    const img = profileImgRef.current;
    if (!img) return;
    if (img.complete) {
      if (img.naturalWidth > 0) setProfileLoaded(true);
      else setProfileError(true);
    }
  }, []);

  return (
    <section className="relative min-h-[min(100svh,920px)] lg:min-h-[88vh] flex items-end lg:items-center pt-20 pb-10 sm:pb-12 lg:pt-24 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Mobile: portrait as atmospheric backdrop */}
      {!profileError && (
        <div aria-hidden className="pointer-events-none absolute inset-0 lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/profile.jpg"
            alt=""
            className={`absolute inset-x-0 top-0 h-[58%] w-full object-cover object-[center_15%] transition-opacity duration-700 ${profileLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-100/20 via-white/75 to-white" />
          <div className="absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-transparent via-transparent to-white/90" />
        </div>
      )}

      {/* Desktop ambient backgrounds */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none hidden lg:block" />
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none hidden lg:block [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl animate-float hidden lg:block" />
      <div
        className="pointer-events-none absolute bottom-10 -right-20 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl animate-float hidden lg:block"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
        {/* Copy + actions */}
        <div className="relative rounded-3xl border border-white/70 bg-white/88 backdrop-blur-xl shadow-[0_20px_60px_-24px_rgba(15,23,42,0.18)] p-6 sm:p-8 text-center lg:text-left lg:rounded-none lg:border-0 lg:bg-transparent lg:backdrop-blur-none lg:shadow-none lg:p-0">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-[1.75rem] sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.08] text-slate-900"
          >
            I Build <span className="text-gradient-brand">Software That Ships,</span>{' '}
            <br className="hidden sm:block" />
            and <span className="text-gradient-brand">SEO That Ranks.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 sm:mt-5 text-[15px] sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            I&apos;m <span className="font-semibold text-slate-900">Tayo Adepetu</span> — a{' '}
            <span className="font-semibold text-brand-700">Top-rated Plus</span> Full-stack Software Engineer and
            former Copywriter & SEO Specialist. For 4+ years I&apos;ve helped founders in Nigeria, the US, UK, Germany,
            and Australia take ideas from conceptualisation to launch and get them ranked on Google.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 sm:mt-8 w-full max-w-sm sm:max-w-lg mx-auto lg:max-w-none lg:mx-0"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white text-emerald-700 text-sm font-bold ring-1 ring-slate-200/90 shadow-[0_10px_28px_-12px_rgba(15,23,42,0.18)] hover:bg-emerald-50 hover:ring-emerald-200/80 hover:shadow-[0_14px_32px_-12px_rgba(16,185,129,0.25)] transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <button
                onClick={() => open()}
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:shadow-brand-600/35 transition-all hover:-translate-y-0.5"
              >
                <FileText className="h-4 w-4" />
                Send a Project Brief
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 text-sm font-semibold hover:border-brand-400 hover:bg-brand-50/60 hover:text-brand-700 transition-colors"
              >
                View Past Work
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="/tayo-adepetu-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-500 text-sm font-medium hover:text-brand-600 transition-colors"
              >
                <FileDown className="h-4 w-4" />
                Resume
              </a>
            </div>
          </motion.div>
        </div>

        {/* Desktop portrait card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto hidden lg:block w-full max-w-md"
        >
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 rounded-[2rem] blur-3xl opacity-30" />

            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl">
              <div className="aspect-[4/5] relative bg-gradient-to-br from-brand-100 via-brand-50 to-white">
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
                    <span className="mt-3 text-[11px] uppercase tracking-widest text-slate-500">
                      {profileError ? 'Add profile.jpg to /public/images' : 'Loading…'}
                    </span>
                  </div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute top-5 -left-6 bg-white rounded-xl border border-slate-200 shadow-xl p-2.5 flex items-center gap-2.5"
              >
                <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Star className="h-3.5 w-3.5 text-emerald-600 fill-current" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Upwork</div>
                  <div className="text-xs font-semibold text-slate-900">Top-rated Plus</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-5 -right-6 bg-white rounded-xl border border-slate-200 shadow-xl p-2.5"
              >
                <div className="text-[10px] text-slate-500">Success rate</div>
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
