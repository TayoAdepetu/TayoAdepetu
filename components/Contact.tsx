'use client';

import { motion } from 'motion/react';
import { Mail, Sparkles, Clock, Globe2 } from 'lucide-react';
import { useContact } from './contact/ContactProvider';
import { site } from '@/data/site';

export function Contact() {
  const { open } = useContact();

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl shadow-brand-900/40"
        >
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand-300/20 blur-3xl" />

          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/15 backdrop-blur-md border border-white/20">
                Let&apos;s build something
              </span>
              <h2 className="font-display mt-4 text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
                Got an idea? <br />
                I&apos;ll help you ship it.
              </h2>
              <p className="mt-4 text-base text-brand-50/90 max-w-xl leading-relaxed">
                Whether you&apos;re a founder with a napkin sketch or a team with a clear spec, tell me what
                you&apos;re building and when you need it. I&apos;ll come back within 24 hours with honest
                feedback and next steps.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => open()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-brand-700 text-sm font-bold hover:bg-brand-50 transition-all hover:-translate-y-0.5 shadow-xl"
                >
                  <Sparkles className="h-4 w-4" />
                  Start a Project
                </button>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/30 hover:bg-white/10 text-sm font-semibold transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {site.email}
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <InfoCard Icon={Clock} label="Typical delivery" value="5–7 weeks" />
              <InfoCard Icon={Globe2} label="Working with clients in" value="Nigeria, US, UK, Australia & beyond" />
              <InfoCard Icon={Mail} label="Email" value={site.email} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoCard({
  Icon,
  label,
  value,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
      <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-brand-50/80">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
