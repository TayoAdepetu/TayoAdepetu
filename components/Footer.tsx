'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { site } from '@/data/site';

const ELSEWHERE_LINKS = [
  { href: site.social.upwork, label: 'Upwork' },
  { href: site.social.github, label: 'GitHub' },
  { href: site.social.linkedin, label: 'LinkedIn' },
  { href: '/tayo-adepetu-resume.pdf', label: 'Résumé' },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:justify-between sm:text-left gap-6">
          <div className="w-full sm:w-auto">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white text-xs font-bold">
                TA
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">Tayo Adepetu</span>
            </Link>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Elsewhere
            </p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-x-1 gap-y-1 text-[13px]">
              {ELSEWHERE_LINKS.map((link, i) => (
                <span key={link.href} className="inline-flex items-center">
                  {i > 0 && <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>}
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-0.5 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                    {link.href.startsWith('http') && <ArrowUpRight className="h-3 w-3" />}
                  </a>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors sm:pt-1"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Tayo Adepetu. All rights reserved.</p>
          <p>Built with Next.js, TypeScript & Tailwind CSS — deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
