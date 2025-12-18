import { nullable, string, z } from "zod/mini";
import { $HttpsUrl } from "@readii/schemas/zod";

export const feedCategory = z.enum([
  "cars",
  "design",
  "entertainment",
  "food",
  "health",
  "hobbies",
  "home-garden",
  "kids-parenting",
  "money-business",
  "news-politics",
  "outdoors",
  "science-tech",
  "software-development",
  "sports",
  "startups-innovation",
  "style-beauty",
  "travel-regional",
]);

export type TFeedCategory = z.infer<typeof feedCategory>;

export const suggestionSchema = z.object({
  title: string(),
  id: $HttpsUrl,
  url: $HttpsUrl,
  feedUrl: $HttpsUrl,
  description: nullable(string()),
  iconUrl: $HttpsUrl,
  ogImageUrl: $HttpsUrl,
  categories: z.array(feedCategory),
});

export type TFeedSuggestion = z.infer<typeof suggestionSchema>;
