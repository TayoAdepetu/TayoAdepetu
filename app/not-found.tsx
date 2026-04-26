import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="text-center max-w-lg">
        <div className="text-7xl sm:text-8xl font-black text-gradient-brand leading-none">404</div>
        <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
          Page not found
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          That page doesn&apos;t exist (yet). Try one of these instead:
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-600/25 transition-colors"
          >
            <Home className="h-4 w-4" />
            Back home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold transition-colors"
          >
            See services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
