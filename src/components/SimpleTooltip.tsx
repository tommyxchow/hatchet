'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type ReactNode } from 'react';

interface SimpleTooltipProps {
  children: ReactNode;
  content: string;
  open?: boolean;
}

export function SimpleTooltip({ children, content, open }: SimpleTooltipProps) {
  return (
    <Tooltip open={open}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}
