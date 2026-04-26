'use client';

import Link from 'next/link';
import { Children } from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { useContact } from './contact/ContactProvider';

export function Footer() {
  const { open } = useContact();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold shadow-lg shadow-brand-500/25">
                TA
              </span>
              <div className="leading-tight">
                <div className="font-semibold text-slate-900 dark:text-slate-50">Tayo Adepetu</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Engineer × SEO
                </div>
              </div>
            </Link>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Full-stack software engineer and SEO specialist helping individuals and businesses in Nigeria, the
              US, UK, Australia and beyond ship better products.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <SocialLink href={site.social.github} label="GitHub">
                <Github className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.social.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={site.social.twitter} label="Twitter">
                <Twitter className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="Email">
                <Mail className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <FooterColumn title="Explore">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/#about">About</FooterLink>
            <FooterLink href="/projects">Projects</FooterLink>
            <FooterLink href="/#testimonials">Testimonials</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <button
              onClick={() => open()}
              className="text-left text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Contact us
            </button>
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.shortName}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Elsewhere">
            <FooterExternal href={site.social.upwork}>Upwork profile</FooterExternal>
            <FooterExternal href={site.social.github}>GitHub</FooterExternal>
            <FooterExternal href={site.social.linkedin}>LinkedIn</FooterExternal>
            <FooterExternal href={`mailto:${site.email}`}>Email</FooterExternal>
          </FooterColumn>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Tayo Adepetu. All rights reserved.</p>
          <p>Built with Next.js, TypeScript & Tailwind CSS — deployed on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {Children.map(children, (child, i) => (
          <li key={i}>{child}</li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
    >
      {children}
    </Link>
  );
}

function FooterExternal({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
    >
      {children}
      <ArrowUpRight className="h-3 w-3" />
    </a>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
    >
      {children}
    </a>
  );
}
