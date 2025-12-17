import { optional, string, z } from "zod/mini";
import { $HttpsUrl } from "@readii/schemas/zod";

export const feedCategory = z.enum([
  "news-politics",
  "entertainment",
  "sports",
  "startups-innovation",
  "money-business",
  "software-development",
  "design",
  "style-beauty",
  "food",
  "travel-regional",
]);

export type TFeedCategory = z.infer<typeof feedCategory>;

export const suggestionSchema = z.object({
  title: string(),
  id: $HttpsUrl,
  url: $HttpsUrl,
  feedUrl: $HttpsUrl,
  description: optional(string()),
  iconUrl: $HttpsUrl,
  ogImageUrl: $HttpsUrl,
  categories: z.array(feedCategory),
});
