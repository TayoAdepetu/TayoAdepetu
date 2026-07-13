'use client';

import { ContactCta } from './contact/ContactCta';
import { cn } from '@/lib/utils';

interface Props {
  preselectedService?: string;
  className?: string;
}

export function StartProjectButton({ preselectedService, className }: Props) {
  return <ContactCta preselectedService={preselectedService} layout="inline" className={className} />;
}
