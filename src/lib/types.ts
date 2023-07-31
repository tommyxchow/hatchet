import { z } from 'zod';

export type RouteParams = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const HNItem = z.object({
  id: z.number(),
  deleted: z.boolean().optional(),
  type: z.string().optional(),
  by: z.string().optional(),
  time: z.number().optional(),
  text: z.string().optional(),
  dead: z.boolean().optional(),
  parent: z.number().optional(),
  poll: z.number().optional(),
  kids: z.array(z.number()).optional(),
  url: z.string().optional(),
  score: z.number().optional(),
  title: z.string().optional(),
  parts: z.array(z.number()).optional(),
  descendants: z.number().optional(),
});
export type HNItem = z.infer<typeof HNItem>;

export const HNFeedTypes = [
  'top',
  'new',
  'best',
  'ask',
  'show',
  'job',
] as const;
export type HNFeedType = (typeof HNFeedTypes)[number];
