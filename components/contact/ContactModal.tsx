'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { X, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { site } from '@/data/site';

const PROJECT_TYPES = [
  'Mobile App Development',
  'Website Development',
  'Chrome Extension Development',
  'AI-powered Software Development',
  'WhatsApp Software Development',
  'Local and Global SEO Services',
  'Escrow-powered Mobile or Web App',
  'Other',
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];

const buildDefaultDescription = () =>
  `Hi Tayo,

I'd like to discuss a project with you.

• Project idea (short description):
  [Briefly describe what you want built — the problem, users, and key features.]

• Desired delivery window:
  [e.g., within 6 weeks / by October 2026]

• Budget range:
  [e.g., $3,000 – $5,000 / ₦3m – ₦5m / open to a quote]

• Links / references (optional):
  [Any existing site, brand, or similar products]

Looking forward to hearing from you.

Best,
`;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export function ContactModal({ isOpen, onClose, preselectedService }: ContactModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('Website Development');
  const [description, setDescription] = useState(buildDefaultDescription());
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reset & prefill when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setStatus('idle');
    setErrorMessage(null);

    if (preselectedService) {
      const match = PROJECT_TYPES.find(
        (pt) => pt.toLowerCase().includes(preselectedService.toLowerCase()) ||
          preselectedService.toLowerCase().includes(pt.toLowerCase()),
      );
      if (match) setProjectType(match);
    }
  }, [isOpen, preselectedService]);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const mailtoHref = useMemo(() => {
    const subject = `New project enquiry — ${projectType}`;
    const body = `Full name: ${fullName}\nEmail: ${email}\nProject type: ${projectType}\n\n${description}`;
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [fullName, email, projectType, description]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, projectType, description }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Something went wrong sending your message.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Unexpected error.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="relative w-full sm:max-w-2xl max-h-[95vh] overflow-y-auto bg-white dark:bg-slate-900 sm:rounded-2xl rounded-t-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-brand-600" />
                  Start a project
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Tell me what you&apos;re building — I&apos;ll reply within 24 hours.
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {status === 'success' ? (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-50">
                  Message sent
                </h4>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  Thanks {fullName.split(' ')[0] || 'there'} — I&apos;ll reply to{' '}
                  <strong>{email}</strong> within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name" htmlFor="contact-name">
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email address" htmlFor="contact-email">
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Which project do you need?" htmlFor="contact-type">
                  <select
                    id="contact-type"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                    className={inputClass}
                  >
                    {PROJECT_TYPES.map((pt) => (
                      <option key={pt} value={pt}>
                        {pt}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Project details"
                  htmlFor="contact-description"
                  helper="Edit the template below — delivery time, budget, and a short description are what I need most."
                >
                  <textarea
                    id="contact-description"
                    required
                    rows={10}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputClass} font-mono text-[13px] leading-relaxed`}
                  />
                </Field>

                {status === 'error' && errorMessage && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Couldn&apos;t send through the site.</p>
                      <p className="mt-1">
                        {errorMessage} — you can still{' '}
                        <a
                          href={mailtoHref}
                          className="underline font-semibold text-brand-600 dark:text-brand-400"
                        >
                          open this in your email app
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send enquiry
                      </>
                    )}
                  </button>

                  <a
                    href={mailtoHref}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Or open in email app
                  </a>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-500 pt-1">
                  By submitting this form you agree I can contact you at the email you provided.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  'w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow';

function Field({
  label,
  htmlFor,
  helper,
  children,
}: {
  label: string;
  htmlFor: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
      {children}
      {helper && <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-500">{helper}</p>}
    </div>
  );
}
