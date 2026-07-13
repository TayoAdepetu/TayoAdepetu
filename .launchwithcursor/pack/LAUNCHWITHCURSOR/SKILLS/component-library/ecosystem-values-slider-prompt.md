# Ecosystem Values Slider

A tabbed slider combining three themed panels (e.g. **Our Roots**, **Our Shared Trunk**, **Our Impact**) — each with eyebrow, title, description, and a chip list. Snapshot from a Next.js + Tailwind project — adapt imports, tokens, and content source to your target project.

**Stack:** React, TypeScript, Tailwind, shadcn/ui `Button`, Framer Motion, Lucide icons.

---

## Reference component

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { FadeInView } from '@/components/motion/fade-in-view';
import { StaggerChildren, StaggerItem } from '@/components/motion/stagger-children';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { slideFade } from '@/lib/motion/variants';
import { cn } from '@/lib/utils';

type SlideVariant = 'roots' | 'trunk' | 'impact';

type EcosystemValuesSlide = {
  variant: SlideVariant;
  eyebrow: string;
  title: string;
  description: string;
  values: readonly string[];
};

type EcosystemValuesSliderProps = {
  roots: {
    eyebrow: string;
    title: string;
    description: string;
    values: readonly string[];
  };
  trunk: {
    eyebrow: string;
    title: string;
    mission: string;
    values: readonly string[];
  };
  impact: {
    eyebrow: string;
    title: string;
    description: string;
    outcomes: readonly string[];
  };
};

const panelStyles: Record<
  SlideVariant,
  {
    panel: string;
    eyebrow: string;
    title: string;
    description: string;
    chip: string;
  }
> = {
  roots: {
    panel: 'border-border/70 bg-gradient-to-br from-white via-gtn-neutral-50 to-gtn-secondary/5',
    eyebrow: 'text-gtn-secondary',
    title: 'text-gtn-primary',
    description: 'text-lead',
    chip: 'border-border bg-gtn-neutral-50 text-gtn-primary',
  },
  trunk: {
    panel: 'border-gtn-primary/20 bg-gtn-primary text-white',
    eyebrow: 'text-gtn-accent',
    title: 'text-white',
    description: 'text-lg text-white/90',
    chip: 'border-white/20 bg-white/10 text-white',
  },
  impact: {
    panel:
      'border-gtn-secondary/15 bg-gradient-to-br from-gtn-neutral-50 via-white to-gtn-accent/5',
    eyebrow: 'text-gtn-secondary',
    title: 'text-gtn-primary',
    description: 'text-lead',
    chip: 'border-gtn-secondary/20 bg-white text-gtn-primary shadow-sm',
  },
};

function buildSlides({ roots, trunk, impact }: EcosystemValuesSliderProps): EcosystemValuesSlide[] {
  return [
    {
      variant: 'roots',
      eyebrow: roots.eyebrow,
      title: roots.title,
      description: roots.description,
      values: roots.values,
    },
    {
      variant: 'trunk',
      eyebrow: trunk.eyebrow,
      title: trunk.title,
      description: trunk.mission,
      values: trunk.values,
    },
    {
      variant: 'impact',
      eyebrow: impact.eyebrow,
      title: impact.title,
      description: impact.description,
      values: impact.outcomes,
    },
  ];
}

export function EcosystemValuesSlider({ roots, trunk, impact }: EcosystemValuesSliderProps) {
  const slides = buildSlides({ roots, trunk, impact });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = slides[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + slides.length) % slides.length);
    },
    [slides.length],
  );

  const goToPrevious = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  const goToNext = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  if (!current) return null;

  const styles = panelStyles[current.variant];

  return (
    <Section background="white">
      <Container className="space-y-8">
        <FadeInView className="flex flex-col items-center gap-6">
          <div
            className="flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Ecosystem values"
          >
            {slides.map((slide, slideIndex) => {
              const isActive = slideIndex === index;

              return (
                <button
                  key={slide.variant}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`ecosystem-values-panel-${slide.variant}`}
                  id={`ecosystem-values-tab-${slide.variant}`}
                  onClick={() => goTo(slideIndex)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                    isActive
                      ? 'border-gtn-secondary bg-gtn-secondary text-white shadow-sm'
                      : 'border-border bg-white text-gtn-primary hover:border-gtn-secondary/40 hover:bg-gtn-neutral-50',
                  )}
                >
                  {slide.eyebrow}
                </button>
              );
            })}
          </div>
        </FadeInView>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.variant}
              id={`ecosystem-values-panel-${current.variant}`}
              role="tabpanel"
              aria-labelledby={`ecosystem-values-tab-${current.variant}`}
              variants={slideFade}
              initial="enter"
              animate="center"
              exit="exit"
              aria-live={paused ? 'off' : 'polite'}
              className={cn(
                'overflow-hidden rounded-3xl border p-6 shadow-sm sm:p-8 lg:p-10',
                styles.panel,
              )}
            >
              <FadeInView className="mx-auto max-w-3xl space-y-4 text-center">
                <p className={cn('text-sm font-medium uppercase tracking-wider', styles.eyebrow)}>
                  {current.eyebrow}
                </p>
                <h2 className={styles.title}>{current.title}</h2>
                <p className={cn('leading-relaxed', styles.description)}>{current.description}</p>
              </FadeInView>

              <StaggerChildren className="mt-8 flex flex-wrap justify-center gap-3">
                {current.values.map((value) => (
                  <StaggerItem key={value}>
                    <span
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium',
                        styles.chip,
                      )}
                    >
                      {current.variant === 'impact' ? (
                        <CheckIcon className="size-4 text-gtn-secondary" aria-hidden />
                      ) : null}
                      {value}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Previous slide"
                onClick={goToPrevious}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Next slide"
                onClick={goToNext}
              >
                <ChevronRightIcon />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {slides.map((slide, slideIndex) => {
                const isActive = slideIndex === index;

                return (
                  <button
                    key={slide.variant}
                    type="button"
                    aria-label={`Go to ${slide.eyebrow}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => goTo(slideIndex)}
                    className={cn(
                      'size-2.5 rounded-full transition-all duration-300',
                      isActive
                        ? 'scale-110 bg-gtn-secondary'
                        : 'bg-border hover:bg-gtn-secondary/50',
                    )}
                  />
                );
              })}
            </div>

            <span className="text-sm tabular-nums text-muted-foreground">
              {index + 1} / {slides.length}
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

---

## Dependencies to adapt

| Reference                                                      | Role                            | In a new project                                   |
| -------------------------------------------------------------- | ------------------------------- | -------------------------------------------------- |
| `FadeInView`                                                   | Scroll-reveal wrapper           | Your motion wrapper, or drop if unavailable        |
| `StaggerChildren` / `StaggerItem`                              | Chip entrance animation         | Same, or replace with CSS                          |
| `Container` / `Section`                                        | Layout shell                    | Your layout primitives, or plain `section` + `div` |
| `Button`                                                       | Prev/next controls              | shadcn/ui, or any icon button                      |
| `slideFade`                                                    | Panel transition variant        | Copy variant locally, or use Framer defaults       |
| `cn`                                                           | Class merging                   | `clsx` / `tailwind-merge`, or inline               |
| `gtn-primary`, `gtn-secondary`, `gtn-accent`, `gtn-neutral-50` | Brand colors + per-panel themes | Map to your design tokens                          |
| `text-lead`                                                    | Lead paragraph style            | Your typography utility or equivalent              |

Note: `trunk` uses `mission` instead of `description` — the component maps it internally via `buildSlides`.

---

## Wiring

**Props:**

```ts
type EcosystemValuesSliderProps = {
  roots: { eyebrow: string; title: string; description: string; values: readonly string[] };
  trunk: { eyebrow: string; title: string; mission: string; values: readonly string[] };
  impact: { eyebrow: string; title: string; description: string; outcomes: readonly string[] };
};
```

**Example content** (rename panels to fit your brand — structure stays the same):

```ts
const roots = {
  eyebrow: 'Our Roots',
  title: 'Values That Nourish All We Do',
  description: 'The foundations everything else grows from.',
  values: ['Peace', 'Justice', 'Compassion', 'Inclusion'],
};
const trunk = {
  eyebrow: 'Our Mission',
  title: 'One Purpose, Shared Values',
  mission: 'Your organization mission statement here.',
  values: ['Leadership', 'Service', 'Learning', 'Truth'],
};
const impact = {
  eyebrow: 'Our Impact',
  title: 'Outcomes We Pursue',
  description: 'The results we work toward together.',
  outcomes: ['Trained leaders', 'Stronger communities', 'Lasting change'],
};
```

**Usage:**

```tsx
<EcosystemValuesSlider roots={roots} trunk={trunk} impact={impact} />
```
