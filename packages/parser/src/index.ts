import { $MediaItem } from "@readii/schemas/zod";
import {
  getParsedAtProtoData,
  getParsedRssData,
  TGetParsedAtProtoDataOptions,
  TGetParsedRssDataOptions,
} from "./utils/parsers";

const DEFAULT_SOURCE = "rss" as const satisfies TMediaSourceType;

export type TMediaSourceType = "rss" | "atproto" | "podcast" | "youtube";

export type TGetFeedDataOptions =
  | ({
      source: "rss";
    } & TGetParsedRssDataOptions)
  | ({
      source: "atproto";
    } & TGetParsedAtProtoDataOptions)
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
  options?: TGetFeedDataOptions
) => {
  const { source, ...restOptions } = options ?? { source: DEFAULT_SOURCE };

  if (source === "rss") {
    return getParsedRssData(url, restOptions as TGetParsedRssDataOptions);
  }

  if (source === "atproto") {
    return getParsedAtProtoData(
      url,
      restOptions as TGetParsedAtProtoDataOptions
    );
  }

  throw new Error(`Unsupported media source: ${source}`);
};
