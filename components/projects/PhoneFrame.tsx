'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PhoneFrameProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  videoSrc?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  priority?: boolean;
}

export function PhoneFrame({
  children,
  src,
  alt = '',
  videoSrc,
  poster,
  autoPlay = false,
  loop = false,
  muted = true,
  className,
  priority = false,
}: PhoneFrameProps) {
  return (
    <div className={cn('relative mx-auto w-full max-w-[280px]', className)}>
      <div className="absolute -inset-4 bg-gradient-to-br from-brand-500/15 via-brand-600/10 to-brand-700/15 rounded-[2.5rem] blur-2xl" />
      <div className="relative rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-slate-900/20">
        <div className="rounded-[1.6rem] overflow-hidden bg-black">
          <div className="flex items-center justify-center gap-1 py-1.5 bg-slate-950">
            <span className="h-1 w-10 rounded-full bg-slate-800" />
          </div>
          <div className="relative aspect-[9/19.5] w-full bg-slate-900">
            {videoSrc ? (
              <video
                src={videoSrc}
                poster={poster}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : src ? (
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="280px"
                priority={priority}
              />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
