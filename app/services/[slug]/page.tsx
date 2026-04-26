import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Code2, Users } from 'lucide-react';
import { services } from '@/data/services';
import { ServiceIcon } from '@/components/ServiceIcon';
import { StartProjectButton } from '@/components/StartProjectButton';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return { title: 'Service not found' };
  return {
    title: svc.name,
    description: svc.summary,
    openGraph: {
      title: svc.name,
      description: svc.summary,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <main className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All services
        </Link>

        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white p-8 sm:p-12 lg:p-14 shadow-2xl shadow-brand-900/30 mb-16">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
          <div className="relative">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 mb-5">
              <ServiceIcon icon={svc.icon} className="h-6 w-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
              {svc.name}
            </h1>
            <p className="mt-4 text-xl text-brand-50/90 max-w-3xl">{svc.tagline}</p>
            <p className="mt-5 text-lg text-brand-50/80 max-w-3xl leading-relaxed">{svc.summary}</p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <StartProjectButton
                preselectedService={svc.name}
                label="Start this project"
                className="!bg-white !text-brand-700 hover:!bg-brand-50 !shadow-xl"
              />
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 font-semibold transition-colors"
              >
                See past work
              </Link>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-2xl">
              <HeroStat Icon={Clock} label="Typical timeline" value={svc.timeline} />
              <HeroStat Icon={Users} label="Ideal for" value={`${svc.idealFor.length} segments`} />
              <HeroStat Icon={Code2} label="Stack size" value={`${svc.tech.length} tools`} />
            </div>
          </div>
        </div>

        {/* Highlights */}
        <section className="mb-16">
          <div className="grid sm:grid-cols-2 gap-4">
            {svc.highlights.map((h) => (
              <div
                key={h}
                className="flex items-start gap-3 p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
              >
                <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-200 font-medium">{h}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">
            What you get
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {svc.features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-50">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">
            How we&apos;ll work together
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {svc.process.map((p) => (
              <div
                key={p.step}
                className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <div className="text-xs font-bold text-brand-600 dark:text-brand-400">{p.step}</div>
                <h3 className="mt-2 font-semibold text-slate-900 dark:text-slate-50">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech + ideal for */}
        <section className="mb-16 grid lg:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Stack</h3>
            <div className="flex flex-wrap gap-2">
              {svc.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="p-7 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Who it&apos;s for</h3>
            <ul className="space-y-2.5">
              {svc.idealFor.map((a) => (
                <li key={a} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <ArrowRight className="h-4 w-4 mt-1 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
            Ready to kick things off?
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Click the button — the form comes pre-selected with this service, so you only need to tell me
            about the project.
          </p>
          <div className="mt-6 flex justify-center">
            <StartProjectButton preselectedService={svc.name} label={`Kick off ${svc.shortName.toLowerCase()}`} />
          </div>
        </section>

        {/* Other services */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-5">
            Other services
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
                    <ServiceIcon icon={s.icon} className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-sm group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                    {s.shortName}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{s.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function HeroStat({
  Icon,
  label,
  value,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
      <Icon className="h-4 w-4 mb-2 text-brand-50/80" />
      <div className="text-[11px] uppercase tracking-wider text-brand-50/70">{label}</div>
      <div className="font-semibold text-sm mt-0.5 text-white">{value}</div>
    </div>
  );
}
