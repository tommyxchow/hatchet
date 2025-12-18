import { cn } from '@/lib/utils';
import { type RouteType } from 'next/dist/lib/load-custom-routes';
import Link, { type LinkProps } from 'next/link';
import { type ReactNode } from 'react';

interface LinkWithHoverEffectProps extends LinkProps<RouteType> {
  children?: ReactNode;
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
        'hover:bg-accent hover:text-accent-foreground flex items-center gap-1 rounded-sm px-1.5 py-0.5 transition-colors',
        className,
      )}
      href={href}
      target={openInNewTab ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
}
