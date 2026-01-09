'use client';

import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, FileDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-neutral-200 dark:border-neutral-800">
          <Image
            src="/images/profile.jpg"
            alt="Tayo Adepetu"
            fill
            className="object-cover"
            priority
            onError={(e) => {
              // Fallback to a placeholder if image not found
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-6xl font-bold text-neutral-400">
            TA
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
          Tayo Adepetu
        </h1>
        
        <p className="text-2xl md:text-3xl font-medium mb-6 text-neutral-700 dark:text-neutral-300">
          Software Engineer
        </p>
        
        <p className="text-lg md:text-xl mb-10 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Engineer. Writer. Mentor. Builder. Crafting thoughtful solutions and sharing insights on freelancing, tech, and professional growth.
        </p>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <a
            href="https://github.com/tayoadepetu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
          </a>
          <a
            href="https://linkedin.com/in/tayoadepetu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
          </a>
          <a
            href="https://twitter.com/tayoadepetu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
          </a>
          <a
            href="mailto:tayo@tayoadepetu.com"
            className="p-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
          </a>
        </div>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors font-medium"
        >
          <FileDown className="h-5 w-5" />
          Download Resume
        </a>
      </div>
    </section>
  );
}

