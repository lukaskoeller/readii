import {
  getParsedAtProtoData,
  getParsedRedditData,
  getParsedRssData,
  TGetParsedRedditDataOptions,
  type TGetParsedAtProtoDataOptions,
  type TGetParsedRssDataOptions,
} from "./utils/parsers";

const SUPPORTED_SOURCES = [
  "rss",
  "atproto",
  "podcast",
  "youtube",
  "reddit",
] as const;

export type TMediaSourceType = (typeof SUPPORTED_SOURCES)[number];

export type TGetFeedDataOptions =
  | ({
      source: "rss";
    } & TGetParsedRssDataOptions)
  | ({
      source: "atproto";
    } & TGetParsedAtProtoDataOptions)
  | ({
      source: "reddit";
    } & TGetParsedRedditDataOptions)
  | {
      source: "podcast" | "youtube";
    };
/**
 * Fetch and parse an RSS or Atom feed and transform it into a structured format.
 * @param url The URL of the feed
 * @param rssString Raw XML feed data as a string. If given, fetching from the URL will be skipped.
 * @param options Additional options for fetching and parsing the feed.
 * @returns An object containing the media source icon, media source details, and an array of media items.
 */
export const getFeedData = async (
  url: string,
  options?: TGetFeedDataOptions,
) => {
  const { source, ...restOptions } = options ?? { source: null };
  const hostname = new URL(url).hostname;

  if (source === "rss") {
    return getParsedRssData(url, restOptions as TGetParsedRssDataOptions);
  }

  if (source === "reddit" || hostname.toLowerCase().endsWith("reddit.com")) {
    return getParsedRedditData(url, restOptions as TGetParsedRedditDataOptions);
  }

  if (source === "atproto" || hostname.toLowerCase().endsWith("api.bsky.app")) {
    return getParsedAtProtoData(
      url,
      restOptions as TGetParsedAtProtoDataOptions,
    );
  }

  if (!source) {
    try {
      return getParsedRssData(url, restOptions as TGetParsedRssDataOptions);
    } catch (error) {
      throw new Error(
        `Failed to parse RSS feed. Ensure you provide a valid RSS feed URL or specify the \`source\` (${SUPPORTED_SOURCES.join(" | ")}) in options.`,
      );
    }
  }

  throw new Error(`Unsupported media source: ${source}`);
};
