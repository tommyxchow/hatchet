import { cn } from '@/lib/utils';
import Link, { type LinkProps } from 'next/link';
import { type ReactNode } from 'react';

interface LinkWithHoverEffectProps extends LinkProps {
  children: ReactNode;
  className?: string;
  openInNewTab?: boolean;
}

export function LinkWithHoverEffect({
  className,
  href,
  children,
  openInNewTab = false,
}: LinkWithHoverEffectProps) {
  return (
    <Link
      className={cn(
        'flex items-center gap-1 rounded-sm px-1.5 py-0.5 transition-colors hover:bg-accent hover:text-accent-foreground',
        className,
      )}
      href={href}
      target={openInNewTab ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
}
