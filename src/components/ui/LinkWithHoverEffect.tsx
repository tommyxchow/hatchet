import Link, { type LinkProps } from 'next/link';
import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

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
      className={twMerge(
        'flex items-center gap-1 rounded-sm px-1.5 py-0.5 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800',
        className,
      )}
      href={href}
      target={openInNewTab ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
}
