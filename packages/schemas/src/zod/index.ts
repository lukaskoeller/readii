import { z } from "zod/mini";

const $DatabaseId = z.optional(z.int().check(z.positive()));

export const $HttpsUrl = z.string().check(
  z.url({
    protocol: /^https?$/,
  })
);

const $IsoDatetime = z.iso.datetime();

export const $MediaSourceIcon = z.object({
  id: $DatabaseId,
  title: z.string(),
  url: z.nullable($HttpsUrl),
  // mediaSourceId is not included here as it's a foreign key reference
});

export const $MediaSource = z.object({
  id: $DatabaseId,
  name: z.string(),
  description: z.nullable(z.string()),
  url: $HttpsUrl,
  feedUrl: $HttpsUrl,
  logoUrl: z.nullable($HttpsUrl),
  lastBuildAt: z.nullable($IsoDatetime),
  lastFetchedAt: $IsoDatetime,
  language: z.nullable(z.string()),
  generator: z.nullable(z.string()),
  categories: z.nullable(z.array(z.string())),
});

export const $MediaType = z.enum(["text", "audio", "video"]);

export const $MediaItemUserControlled = z.object({
  isStarred: z.optional(z.boolean()),
  isRead: z.optional(z.boolean()),
  isReadLater: z.optional(z.boolean()),
});

export const $MediaItemBase = z.object({
  title: z.string(),
  type: $MediaType,
  url: $HttpsUrl,
  content: z.string(), // most important field
  contentSnippet: z.nullable(z.string()),
  contentTldr: z.nullable(z.string()),
  creator: z.nullable(z.string()),
  publishedAt: $IsoDatetime,
  thumbnailUrl: z.nullable($HttpsUrl),
  enclosure: z.nullable($HttpsUrl),
});

export const $MediaItem = z.object({
  id: $DatabaseId,
  ...$MediaItemBase.shape,
  ...$MediaItemUserControlled.shape,
});

export const $MediaItemPartial = z.partial($MediaItem);

/**
 * Tailored to media items from social media like Bluesky or Mastodon
 */
export const $MediaItemSocial = z.object({
  ...$MediaItem.shape,
  title: z.nullable(z.string()),
});
