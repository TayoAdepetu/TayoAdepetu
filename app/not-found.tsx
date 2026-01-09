import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-neutral-700 dark:text-neutral-300">
          Page Not Found
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors font-medium"
        >
          <Home className="h-5 w-5" />
          Go Home
        </Link>
      </div>
    </main>
  );
}

