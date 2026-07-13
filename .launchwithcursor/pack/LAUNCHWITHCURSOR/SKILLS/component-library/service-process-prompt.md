# Service Process ("How It Works")

A **How It Works** section with a vertical step timeline: numbered badges, connector line, and card per step. Snapshot from a Next.js + Tailwind project — adapt imports, tokens, and content source to your target project.

**Stack:** React, TypeScript, Tailwind, Framer Motion (`FadeInView`, `StaggerChildren`). No Lucide required.

---

## Reference component

```tsx
import { FadeInView } from '@/components/motion/fade-in-view';
import { StaggerChildren, StaggerItem } from '@/components/motion/stagger-children';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { cn } from '@/lib/utils';

type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

type ServiceProcessProps = {
  title: string;
  steps: ProcessStep[];
};

export function ServiceProcess({ title, steps }: ServiceProcessProps) {
  return (
    <Section background="white">
      <Container className="space-y-10">
        <FadeInView className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-gtn-secondary">
            How It Works
          </p>
          <h2 className="text-gtn-primary">Our Process</h2>
          <div
            aria-hidden
            className="mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-gtn-secondary to-gtn-accent"
          />
          <p className="text-lead">
            A clear, step-by-step approach to {title.toLowerCase()} — from first conversation to
            lasting results.
          </p>
        </FadeInView>

        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-white via-gtn-neutral-50 to-gtn-secondary/5 p-6 shadow-sm lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-gtn-secondary/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-gtn-accent/10 blur-3xl"
          />

          <StaggerChildren>
            <ol className="relative mx-auto max-w-3xl">
              {steps.map((step, index) => {
                const accent = index % 2 === 1 ? 'accent' : 'secondary';
                const isLast = index === steps.length - 1;

                return (
                  <StaggerItem key={step.step}>
                    <li className={cn('relative flex gap-5 sm:gap-6', !isLast && 'pb-8 sm:pb-10')}>
                      {!isLast ? (
                        <div
                          aria-hidden
                          className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-gtn-secondary/50 via-gtn-secondary/25 to-transparent sm:left-6 sm:top-14"
                        />
                      ) : null}

                      <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gtn-primary to-gtn-secondary text-sm font-bold text-white shadow-md ring-4 ring-white sm:size-12 sm:text-base">
                        {step.step}
                      </div>

                      <article
                        className={cn(
                          'group relative flex-1 overflow-hidden rounded-2xl border border-border/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-6',
                          accent === 'accent'
                            ? 'hover:border-gtn-accent/40'
                            : 'hover:border-gtn-secondary/30',
                        )}
                      >
                        <div
                          aria-hidden
                          className={cn(
                            'absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80 transition-opacity group-hover:opacity-100',
                            accent === 'accent'
                              ? 'from-gtn-accent to-gtn-secondary'
                              : 'from-gtn-secondary to-gtn-primary',
                          )}
                        />
                        <h3 className="relative mb-2 text-lg font-semibold tracking-tight text-gtn-primary transition-colors group-hover:text-gtn-secondary">
                          {step.title}
                        </h3>
                        <p className="relative text-justify text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </article>
                    </li>
                  </StaggerItem>
                );
              })}
            </ol>
          </StaggerChildren>
        </div>
      </Container>
    </Section>
  );
}
```

---

## Dependencies to adapt

| Reference                                                      | Role                  | In a new project                                   |
| -------------------------------------------------------------- | --------------------- | -------------------------------------------------- |
| `FadeInView`                                                   | Scroll-reveal wrapper | Your motion wrapper, or drop if unavailable        |
| `StaggerChildren` / `StaggerItem`                              | Step list entrance    | Same, or replace with CSS                          |
| `Container` / `Section`                                        | Layout shell          | Your layout primitives, or plain `section` + `div` |
| `cn`                                                           | Class merging         | `clsx` / `tailwind-merge`, or inline               |
| `gtn-primary`, `gtn-secondary`, `gtn-accent`, `gtn-neutral-50` | Brand colors          | Map to your design tokens                          |
| `text-lead`, `text-muted-foreground`                           | Typography            | Your typography utilities                          |

Note: `title` prop is used in the intro sentence (`A clear, step-by-step approach to {title.toLowerCase()}…`) — pass the service or product name.

---

## Wiring

**Props:**

```ts
type ProcessStep = { step: number; title: string; description: string };

type ServiceProcessProps = {
  title: string;
  steps: ProcessStep[];
};
```

**Example content** (pass from CMS, content files, or page props):

```ts
const steps = [
  { step: 1, title: 'Initial Consultation', description: 'We assess your needs and timeline.' },
  { step: 2, title: 'Planning', description: 'Together we define goals and next steps.' },
  { step: 3, title: 'Delivery', description: 'We execute the plan with ongoing support.' },
  { step: 4, title: 'Follow-Up', description: 'We review outcomes and adjust as needed.' },
];
```

**Usage:**

```tsx
<ServiceProcess title="College Admissions" steps={steps} />
```
