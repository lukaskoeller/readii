import { FEED_CATEGORY_TO_LABEL, TFeedCategoryLabel } from "@readii/data";
import { TFeedCategory } from "@readii/data/suggestions/zod";
import { LinkProps } from "expo-router";

export type TFeedSuggestionCategoryItem = {
  key: TFeedCategory;
  label: TFeedCategoryLabel;
  href: LinkProps["href"];
};

export const CATEGORIES = [
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "news-politics" },
    },
    key: "news-politics",
    label: FEED_CATEGORY_TO_LABEL["news-politics"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "entertainment" },
    },
    key: "entertainment",
    label: FEED_CATEGORY_TO_LABEL["entertainment"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "sports" },
    },
    key: "sports",
    label: FEED_CATEGORY_TO_LABEL["sports"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "startups-innovation" },
    },
    key: "startups-innovation",
    label: FEED_CATEGORY_TO_LABEL["startups-innovation"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "money-business" },
    },
    key: "money-business",
    label: FEED_CATEGORY_TO_LABEL["money-business"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "software-development" },
    },
    key: "software-development",
    label: FEED_CATEGORY_TO_LABEL["software-development"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "design" },
    },
    key: "design",
    label: FEED_CATEGORY_TO_LABEL["design"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "style-beauty" },
    },
    key: "style-beauty",
    label: FEED_CATEGORY_TO_LABEL["style-beauty"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "food" },
    },
    key: "food",
    label: FEED_CATEGORY_TO_LABEL["food"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "travel-regional" },
    },
    key: "travel-regional",
    label: FEED_CATEGORY_TO_LABEL["travel-regional"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "health" },
    },
    key: "health",
    label: FEED_CATEGORY_TO_LABEL["health"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "home-garden" },
    },
    key: "home-garden",
    label: FEED_CATEGORY_TO_LABEL["home-garden"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "science-tech" },
    },
    key: "science-tech",
    label: FEED_CATEGORY_TO_LABEL["science-tech"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "cars" },
    },
    key: "cars",
    label: FEED_CATEGORY_TO_LABEL["cars"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "hobbies" },
    },
    key: "hobbies",
    label: FEED_CATEGORY_TO_LABEL["hobbies"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "outdoors" },
    },
    key: "outdoors",
    label: FEED_CATEGORY_TO_LABEL["outdoors"],
  },
  {
    href: {
      pathname: "/discover/[category]",
      params: { category: "kids-parenting" },
    },
    key: "kids-parenting",
    label: FEED_CATEGORY_TO_LABEL["kids-parenting"],
  },
] as const satisfies TFeedSuggestionCategoryItem[];
