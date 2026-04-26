import {
  Smartphone,
  Globe,
  Puzzle,
  Sparkles,
  MessageCircle,
  Search,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '@/data/services';

const iconMap: Record<Service['icon'], LucideIcon> = {
  smartphone: Smartphone,
  globe: Globe,
  puzzle: Puzzle,
  sparkles: Sparkles,
  'message-circle': MessageCircle,
  search: Search,
  shield: ShieldCheck,
};

interface Props {
  icon: Service['icon'];
  className?: string;
}

export function ServiceIcon({ icon, className = 'h-5 w-5' }: Props) {
  const Icon = iconMap[icon];
  return <Icon className={className} />;
}
