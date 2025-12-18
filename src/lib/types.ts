import { z } from 'zod';

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

export const HNUser = z.object({
  id: z.string(),
  created: z.number(),
  karma: z.number(),
  about: z.string().optional(),
  submitted: z.array(z.number()).optional(),
});
export type HNUser = z.infer<typeof HNUser>;

export const HNComment = HNItem.extend({
  indent: z.number(),
  collapsed: z.boolean(),
  hidden: z.boolean(),
});
export type HNComment = z.infer<typeof HNComment>;

export const HNFeedTypes = [
  'top',
  'new',
  'best',
  'ask',
  'show',
  'jobs',
] as const;
export type HNFeedType = (typeof HNFeedTypes)[number];
