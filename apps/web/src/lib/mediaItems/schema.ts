import { z } from "zod";

export const mediaItemBaseSchema = z.object({
    content: z.string(),
    creator: z.string().nullable(),
    mediaThumbnail: z.string().nullable(),
    publishedAt: z.string(),
    title: z.string(),
    url: z.string().url(),
});

export const mediaItemSchema = z.object({
    ...mediaItemBaseSchema.shape,
    publisherId: z.number(),
    id: z.number(),
});

export type TMediaItemPayload = z.infer<typeof mediaItemBaseSchema>;
export type TMediaItem = z.infer<typeof mediaItemSchema>;