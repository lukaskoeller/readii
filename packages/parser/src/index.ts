import {
  $MediaItem,
  $MediaItemSocial,
  $MediaSource,
  $MediaSourceIcon,
} from "@readii/schemas/zod";
import { z } from "zod/mini";
import { XMLParser } from "fast-xml-parser";

export const getUrl = (url: string | null, baseUrl: string | null) => {
  if (!url || !baseUrl) return null;
  try {
    return String(url).startsWith("/") ? new URL(url, baseUrl).toString() : url;
  } catch (error) {
    return null;
  }
};

export const getFavicon = async (url: string, channelData: any) => {
  const feedImageUrl = channelData?.image?.url?.["#text"];

  if (feedImageUrl) {
    return feedImageUrl;
  }

  try {
    const originUrl = new URL(url).origin;
    const faviconUrl = `${originUrl}/favicon.ico`;
    const response = await fetch(faviconUrl, {
      method: "HEAD",
    });
    if (response.ok) {
      return faviconUrl;
    }
  } catch (error) {
    // do nothing
  }

  return null;
};

const SOURCE_TO_MEDIA_ITEM_SCHEMA = {
  website: $MediaItem,
  social: $MediaItemSocial,
  podcast: $MediaItem,
  youtube: $MediaItem,
};

export type TGetFeedDataOptions = {
  /** @default "website" */
  source: "website" | "social" | "podcast" | "youtube";
  rssString?: string;
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
  const text = options?.rssString ?? (await (await fetch(url)).text());

  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
    alwaysCreateTextNode: true,
  });
  const rawData = parser.parse(text);

  const baseData = rawData?.rss ?? rawData?.feed;
  const channelData = baseData?.channel ?? baseData;
  const mediaItemsData = channelData?.item ?? channelData?.entry ?? null;

  const mediaSourceIcon = $MediaSourceIcon.safeParse({
    title:
      channelData?.image?.title?.["#text"] ??
      channelData?.webMaster?.["#text"] ??
      channelData?.title?.["#text"],
    url: await getFavicon(url, channelData),
  });
  if (!mediaSourceIcon.success) {
    console.error(mediaSourceIcon.error);
    throw new Error(
      `Invalid Media Source Icon: ${z.prettifyError(mediaSourceIcon.error)}`
    );
  }

  const baseUrl =
    channelData?.link?.["#text"] ??
    (Array.isArray(channelData?.link) ? channelData?.link : [])?.find(
      (link: Record<string, unknown>) => link?.["@_rel"] !== "self"
    )?.["@_href"] ??
    null;
  const lastBuildAt =
    channelData?.lastBuildDate?.["#text"] ??
    channelData?.updated?.["#text"] ??
    null;
  const mediaSource = $MediaSource.safeParse({
    name: channelData?.title?.["#text"] ?? null,
    description: channelData?.description?.["#text"] ?? null,
    url: baseUrl,
    feedUrl:
      channelData?.["atom:link"]?.["@_href"] ??
      (Array.isArray(channelData?.link ?? channelData?.["atom:link"])
        ? channelData?.link ?? channelData?.["atom:link"]
        : []
      )?.find((link: Record<string, unknown>) => link?.["@_rel"] === "self")?.[
        "@_href"
      ] ??
      channelData?.link?.["#text"] ??
      null,
    logoUrl:
      channelData?.logo?.["#text"] ??
      channelData?.icon?.["#text"] ??
      channelData?.image?.url?.["#text"] ??
      null,
    lastBuildAt: lastBuildAt ? new Date(lastBuildAt).toISOString() : null,
    lastFetchedAt: new Date().toISOString(),
    language: channelData?.language?.["#text"] ?? null,
    generator: channelData?.generator?.["#text"] ?? null,
    categories: Array.isArray(channelData?.category)
      ? channelData?.category?.map(
          (cat: Record<string, unknown>) => cat?.["#text"] ?? cat
        )
      : null,
  });
  if (!mediaSource.success) {
    console.error(mediaSource.error);
    throw new Error(
      `Invalid Media Source: ${z.prettifyError(mediaSource.error)}`
    );
  }

  const mediaItemSchema =
    SOURCE_TO_MEDIA_ITEM_SCHEMA[options?.source ?? "website"];

  const mediaItems = z.array(mediaItemSchema).safeParse(
    (mediaItemsData ?? []).map((item: Record<string, any>) => {
      const mediaThumbnailUrl = item?.["media:thumbnail"]?.["@_url"];
      const itemUrl = item?.link?.["#text"] ?? item?.link?.["@_href"];
      const enclosureUrl = item?.enclosure?.["@_url"] ?? null;

      const content =
        item?.["content:encoded"]?.["#text"] ??
        item?.content?.["#text"] ??
        item?.description?.["#text"];

      return {
        title: item?.title?.["#text"] ?? null,
        url: getUrl(itemUrl, baseUrl),
        type: "text", // @todo Make this dynamic based on content type

        /** Main content of the media item (html, audio, video) */
        content: content, // @todo NEXT: minify HTML
        contentSnippet: null,
        contentTldr: null,

        creator: item?.["dc:creator"]?.["#text"] ?? null,
        publishedAt:
          item?.pubDate?.["#text"] ?? item?.updated?.["#text"]
            ? new Date(
                item?.pubDate?.["#text"] ?? item?.updated?.["#text"]
              ).toISOString()
            : null,
        thumbnailUrl: getUrl(mediaThumbnailUrl, baseUrl),
        enclosure: getUrl(enclosureUrl, baseUrl),
      };
    })
  );
  if (!mediaItems.success) {
    console.error(mediaItems.error);
    throw new Error(
      `Invalid Media Items: ${z.prettifyError(mediaItems.error)}`
    );
  }

  return {
    mediaSourceIcon: mediaSourceIcon.data,
    mediaSource: mediaSource.data,
    mediaItems: mediaItems.data,
  };
};
