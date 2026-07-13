'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, X, Sparkles, Smartphone, Globe, Puzzle, MessageCircle, Search, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { services, type Service } from '@/data/services';
import { useContact } from './contact/ContactProvider';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Writing' },
];

const iconFor = (icon: Service['icon']) => {
  const base = 'h-4 w-4';
  switch (icon) {
    case 'smartphone':
      return <Smartphone className={base} />;
    case 'globe':
      return <Globe className={base} />;
    case 'puzzle':
      return <Puzzle className={base} />;
    case 'sparkles':
      return <Sparkles className={base} />;
    case 'message-circle':
      return <MessageCircle className={base} />;
    case 'search':
      return <Search className={base} />;
    case 'shield':
      return <ShieldCheck className={base} />;
  }
};

function AvailabilityBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300',
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
      </span>
      Available
    </span>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const { open: openContact } = useContact();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus whenever the user navigates to a different route.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- intentional: reset UI menus on route change */
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  // Lock body scroll when mobile open
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-sm'
            : 'bg-transparent',
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo + availability */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link href="/" className="flex items-center gap-2 group min-w-0">
                <span className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white text-sm font-bold">
                  TA
                </span>
                <div className="hidden sm:block leading-tight">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">Tayo Adepetu</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Engineer × SEO
                  </div>
                </div>
              </Link>
              <AvailabilityBadge />
            </div>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.slice(0, 2).map((l) => (
                <NavLink key={l.href} href={l.href}>
                  {l.label}
                </NavLink>
              ))}

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  onClick={() => setServicesOpen((v) => !v)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-[13px] font-medium text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg transition-colors"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown
                    className={cn('h-3.5 w-3.5 transition-transform', servicesOpen && 'rotate-180')}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[680px]"
                    >
                      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 p-3">
                        <div className="grid grid-cols-2 gap-1">
                          {services.map((svc) => (
                            <Link
                              key={svc.slug}
                              href={`/services/${svc.slug}`}
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors"
                            >
                              <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                {iconFor(svc.icon)}
                              </div>
                              <div className="min-w-0">
                                <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                                  {svc.shortName}
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                                  {svc.tagline}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 py-2">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            Need something else? I probably do it too.
                          </span>
                          <Link
                            href="/services"
                            className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700"
                          >
                            All services →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_LINKS.slice(2).map((l) => (
                <NavLink key={l.href} href={l.href}>
                  {l.label}
                </NavLink>
              ))}
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => openContact()}
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-[13px] font-semibold transition-all hover:-translate-y-0.5"
              >
                Contact us
              </button>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden rounded-lg p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-950 shadow-2xl overflow-y-auto"
            >
              <div className="p-5 pt-20 space-y-1">
                {NAV_LINKS.slice(0, 2).map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}

                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors"
                >
                  Services
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform', mobileServicesOpen && 'rotate-180')}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-2 my-1 border-l border-slate-200 dark:border-slate-800 pl-3 space-y-1">
                        {services.map((svc) => (
                          <Link
                            key={svc.slug}
                            href={`/services/${svc.slug}`}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                          >
                            <span className="text-brand-600 dark:text-brand-400">{iconFor(svc.icon)}</span>
                            {svc.shortName}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="block px-3 py-2 rounded-lg text-[13px] font-semibold text-brand-600 dark:text-brand-400"
                        >
                          View all services →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {NAV_LINKS.slice(2).map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openContact();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors"
                  >
                    Contact us
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-[13px] font-medium text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}
