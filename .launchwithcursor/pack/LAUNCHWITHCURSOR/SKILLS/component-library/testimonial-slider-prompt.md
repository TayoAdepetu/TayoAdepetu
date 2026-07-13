# Testimonial Slider

A homepage testimonials carousel: featured quote panel, prev/next controls, auto-advance, and a clickable thumbnail strip with initials avatars. Snapshot from a Next.js + Tailwind project — adapt imports, tokens, and content source to your target project.

**Stack:** React, TypeScript, Tailwind, shadcn/ui `Button`, Framer Motion, Lucide icons.

---

## Reference component

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { FadeInView } from '@/components/motion/fade-in-view';
import { StaggerChildren, StaggerItem } from '@/components/motion/stagger-children';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { slideFade } from '@/lib/motion/variants';
import { cn } from '@/lib/utils';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type TestimonialSliderProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  testimonials: Testimonial[];
};

const avatarGradients = [
  'from-gtn-secondary to-gtn-primary',
  'from-gtn-accent to-gtn-secondary',
  'from-gtn-primary to-gtn-secondary',
  'from-gtn-secondary to-gtn-accent',
] as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialSlider({
  eyebrow,
  title = 'Testimonials',
  description,
  testimonials,
}: TestimonialSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = testimonials[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + testimonials.length) % testimonials.length);
    },
    [testimonials.length],
  );

  const goToPrevious = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  const goToNext = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [paused, testimonials.length]);

  if (!current) return null;

  return (
    <Section background="muted">
      <Container className="space-y-12">
        <FadeInView className="mx-auto max-w-3xl space-y-4 text-center">
          {eyebrow ? (
            <p className="text-sm font-medium uppercase tracking-wider text-gtn-secondary">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-gtn-primary">{title}</h2>
          {description ? <p className="text-lead">{description}</p> : null}
        </FadeInView>

        <div
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-gtn-neutral-50 via-white to-gtn-secondary/5 p-6 shadow-sm lg:p-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-gtn-secondary/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-gtn-accent/10 blur-3xl"
          />

          <FadeInView className="relative">
            <figure className="relative overflow-hidden rounded-2xl border border-gtn-primary/10 bg-gtn-primary px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-12 lg:py-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-gtn-accent/20 blur-2xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-10 size-40 rounded-full bg-gtn-secondary/30 blur-2xl"
              />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1 text-center">
                  <QuoteIcon aria-hidden className="mx-auto mb-6 size-10 text-gtn-accent/80" />
                  <div className="min-h-[8rem] sm:min-h-[7rem]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.blockquote
                        key={index}
                        variants={slideFade}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        aria-live={paused ? 'off' : 'polite'}
                        className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-white/95 lg:text-xl lg:leading-relaxed"
                      >
                        &ldquo;{current.quote}&rdquo;
                      </motion.blockquote>
                    </AnimatePresence>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.figcaption
                      key={`${index}-attribution`}
                      variants={slideFade}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="mt-8 flex items-center justify-center gap-4 border-t border-white/15 pt-6"
                    >
                      <div
                        aria-hidden
                        className={cn(
                          'flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white shadow-md',
                          avatarGradients[index % avatarGradients.length],
                        )}
                      >
                        {getInitials(current.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white">{current.name}</p>
                        <p className="text-sm text-white/70">{current.role}</p>
                      </div>
                    </motion.figcaption>
                  </AnimatePresence>
                </div>

                <div className="flex shrink-0 items-center gap-2 lg:flex-col lg:items-end">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label="Previous testimonial"
                      onClick={goToPrevious}
                      className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    >
                      <ChevronLeftIcon />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label="Next testimonial"
                      onClick={goToNext}
                      className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    >
                      <ChevronRightIcon />
                    </Button>
                  </div>
                  <span className="text-sm tabular-nums text-white/60">
                    {index + 1} / {testimonials.length}
                  </span>
                </div>
              </div>
            </figure>
          </FadeInView>

          <StaggerChildren className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {testimonials.map((testimonial, testimonialIndex) => {
              const isActive = testimonialIndex === index;

              return (
                <StaggerItem key={`${testimonial.name}-${testimonialIndex}`}>
                  <button
                    type="button"
                    onClick={() => goTo(testimonialIndex)}
                    aria-current={isActive ? 'true' : undefined}
                    aria-label={`Show testimonial from ${testimonial.name}`}
                    className={cn(
                      'group flex w-full items-center gap-3 rounded-2xl border bg-white/90 p-3 text-left shadow-sm backdrop-blur-sm transition-all duration-300 sm:p-4',
                      isActive
                        ? 'border-gtn-accent/60 ring-2 ring-gtn-accent/30 shadow-md'
                        : 'border-border/80 hover:-translate-y-0.5 hover:border-gtn-secondary/30 hover:shadow-md',
                    )}
                  >
                    <div
                      aria-hidden
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white transition-transform duration-300 group-hover:scale-105',
                        avatarGradients[testimonialIndex % avatarGradients.length],
                      )}
                    >
                      {getInitials(testimonial.name)}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          'truncate text-sm font-medium transition-colors',
                          isActive
                            ? 'text-gtn-primary'
                            : 'text-foreground group-hover:text-gtn-secondary',
                        )}
                      >
                        {testimonial.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </Container>
    </Section>
  );
}
```

---

## Dependencies to adapt

| Reference                                                      | Role                     | In a new project                                           |
| -------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------- |
| `FadeInView`                                                   | Scroll-reveal wrapper    | Use your motion wrapper, or drop if unavailable            |
| `StaggerChildren` / `StaggerItem`                              | Staggered entrance       | Same, or replace with CSS                                  |
| `Container` / `Section`                                        | Layout shell             | Your layout primitives, or plain `section` + `div`         |
| `Button`                                                       | Prev/next controls       | shadcn/ui, or any icon button                              |
| `slideFade`                                                    | Slide transition variant | Copy variant locally, or use Framer defaults               |
| `cn`                                                           | Class merging            | `clsx` / `tailwind-merge`, or inline                       |
| `gtn-primary`, `gtn-secondary`, `gtn-accent`, `gtn-neutral-50` | Brand colors             | Map to your design tokens                                  |
| `text-lead`                                                    | Lead paragraph style     | Your typography utility or `text-lg text-muted-foreground` |

---

## Wiring

**Props:**

```ts
type Testimonial = { quote: string; name: string; role: string };

type TestimonialSliderProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  testimonials: Testimonial[];
};
```

**Example content** (pass from config, CMS, or page props — wherever your project keeps copy):

```ts
const testimonials = [
  { quote: '…', name: 'Sarah M.', role: 'Parent, Educational Consulting Client' },
  { quote: '…', name: 'James O.', role: 'Community Organization Partner' },
];
```

**Usage:**

```tsx
<TestimonialSlider
  eyebrow="Client Stories"
  title="Testimonials"
  description="Hear from clients who have worked with us."
  testimonials={testimonials}
/>
```
