import { TFeedCategory, TFeedSuggestion } from "./suggestions.schema";
import suggestionsJson from "./suggestions.json";

export const FEED_CATEGORY_TO_LABEL = {
  "home-garden": "Home & Garden",
  "kids-parenting": "Kids & Parenting",
  "money-business": "Money & Business",
  "news-politics": "News & Politics",
  "science-tech": "Science & Tech",
  "software-development": "Software Development",
  "startups-innovation": "Startups & Innovation",
  "style-beauty": "Style & Beauty",
  "travel-regional": "Travel & Regional",
  cars: "Cars",
  design: "Design",
  entertainment: "Entertainment",
  food: "Food",
  health: "Health",
  hobbies: "Hobbies",
  outdoors: "Outdoors",
  sports: "Sports",
} as const satisfies Record<TFeedCategory, string>;

export type TFeedCategoryLabel = typeof FEED_CATEGORY_TO_LABEL[TFeedCategory];

/**
 * Iterates over feed suggestions and groups them by category.
 * @param data Array of feed suggestions
 * @returns A record mapping each category to its corresponding feed suggestions
 */
export const getSuggestionsByCategory = (
  data: TFeedSuggestion[]
): Record<TFeedCategory, TFeedSuggestion[]> => {
  const feedSuggestionsMap = new Map<TFeedCategory, TFeedSuggestion[]>();

  for (const feedSuggestion of data) {
    for (const category of feedSuggestion.categories) {
      if (!feedSuggestionsMap.has(category)) {
        feedSuggestionsMap.set(category, []);
      }
      const currentValue = feedSuggestionsMap.get(category) ?? [];
      feedSuggestionsMap.set(category, [...currentValue, feedSuggestion]);
    }
  }

  const result = Object.fromEntries(feedSuggestionsMap) as Record<
    TFeedCategory,
    TFeedSuggestion[]
  >;
  return result;
};

export const suggestionsByCategory = getSuggestionsByCategory(
  suggestionsJson as TFeedSuggestion[]
);

export const suggestionsByCategoryEntries = Object.entries(
  suggestionsByCategory
);
