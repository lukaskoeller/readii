import {
  $MediaItem,
  $MediaItemSocial,
  $MediaSource,
  $MediaSourceIcon,
} from "@readii/schemas/zod";
import { z } from "zod/mini";
import { XMLParser } from "fast-xml-parser";
import { getIsMediaTypeImage } from "./utils";

export const getUrl = (url: string | null, baseUrl: string | null) => {
  if (!url || !baseUrl) return null;
  try {
    return String(url).startsWith("/") ? new URL(url, baseUrl).toString() : url;
  } catch (error) {
    return null;
  }
};

export const getFavicon = async (url: string, channelData: any) => {
  const feedImageUrl =
    channelData?.icon?.["#text"] ?? channelData?.image?.url?.["#text"];

  if (feedImageUrl) {
    return feedImageUrl;
  }

  try {
    const originUrl = new URL(url).origin;
    const faviconIcoUrl = `${originUrl}/favicon.ico`;
    const faviconPngUrl = `${originUrl}/favicon.png`;
    const faviconSvgUrl = `${originUrl}/favicon.svg`;
    const responses = await Promise.all([
      fetch(faviconIcoUrl),
      fetch(faviconPngUrl),
      fetch(faviconSvgUrl),
    ]);
    const responseOk = responses.find((res) => res.ok);
    if (responseOk) {
      return responseOk.url;
    }
  } catch (error) {
    // do nothing
  }

  return null;
};

const DEFAULT_SOURCE = "text" as const satisfies TMediaSourceType;
const SOURCE_TO_MEDIA_ITEM_SCHEMA = {
  text: $MediaItem,
  social: $MediaItemSocial,
  podcast: $MediaItem,
  youtube: $MediaItem,
};

export type TMediaSourceType = keyof typeof SOURCE_TO_MEDIA_ITEM_SCHEMA;

export type TGetFeedDataOptions = {
  /** @default "website" */
  source: TMediaSourceType;
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
  const source = options?.source ?? DEFAULT_SOURCE;
  const text = options?.rssString ?? (await (await fetch(url)).text());

  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
    alwaysCreateTextNode: true,
  });
  const rawData = parser.parse(text);

  const baseData = rawData?.rss ?? rawData?.feed;
  const channelData = baseData?.channel ?? baseData;
  let mediaItemsData = channelData?.item ?? channelData?.entry ?? null;
  if (mediaItemsData && !Array.isArray(mediaItemsData)) {
    mediaItemsData = [mediaItemsData];
  }

  const mediaSourceIcon = $MediaSourceIcon.safeParse({
    title:
      channelData?.image?.title?.["#text"] ??
      channelData?.webMaster?.["#text"] ??
      channelData?.title?.["#text"],
    url: await getFavicon(url, channelData),
  });
  if (!mediaSourceIcon.success) {
    throw new Error(
      `Invalid Media Source Icon: ${z.prettifyError(mediaSourceIcon.error)}\nURL: ${url}`
    );
  }

  const baseUrl =
    channelData?.link?.["#text"] ??
    (Array.isArray(channelData?.link) ? channelData?.link : [])?.find(
      (link: Record<string, unknown>) => link?.["@_rel"] !== "self"
    )?.["@_href"] ??
    channelData?.link?.["@_href"] ??
    null;
  const lastBuildAt =
    channelData?.lastBuildDate?.["#text"] ??
    channelData?.updated?.["#text"] ??
    null;
  const mediaSource = $MediaSource.safeParse({
    name: channelData?.title?.["#text"] ?? null,
    description: channelData?.description?.["#text"] ?? null,
    url: baseUrl,
    feedUrl: url,
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
      `Invalid Media Source: ${z.prettifyError(mediaSource.error)}\nURL: ${url}`
    );
  }

  const mediaItemSchema =
    SOURCE_TO_MEDIA_ITEM_SCHEMA[source];

  const mediaItems = z.array(mediaItemSchema).safeParse(
    (mediaItemsData ?? []).map((item: Record<string, any>) => {

      const mediaThumbnailUrl =
        item?.["media:thumbnail"]?.["@_url"] ??
        (getIsMediaTypeImage(item?.enclosure?.["@_type"])
          ? item?.enclosure?.["@_url"]
          : null) ??
        (Array.isArray(item?.link) ? item?.link : [])?.find(
          (link: Record<string, unknown>) => {
            const mediaType = link?.["@_type"] as string | undefined;
            return getIsMediaTypeImage(mediaType);
          }
        )?.["@_href"];

      const itemUrl =
        item?.link?.["#text"] ??
        item?.link?.["@_href"] ??
        (Array.isArray(item?.link) ? item?.link : [])?.find(
          (link: Record<string, unknown>) => link?.["@_rel"] == undefined
        )?.["@_href"];
      const enclosureUrl = item?.enclosure?.["@_url"] ?? null;

      const content =
        item?.["content:encoded"]?.["#text"] ??
        item?.content?.["#text"] ??
        item?.description?.["#text"] ??
        "";

      return {
        title: item?.title?.["#text"] ?? null,
        url: getUrl(itemUrl, baseUrl),
        type: "text", // @todo Make this dynamic based on content type

        /** Main content of the media item (html, audio, video) */
        content: content, // @todo NEXT: minify HTML
        contentSnippet: null,
        contentTldr: item?.summary?.["#text"] ?? null,

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
      `Invalid Media Items: ${z.prettifyError(mediaItems.error)}\nURL: ${url}`
    );
  }

  return {
    mediaSourceIcon: mediaSourceIcon.data,
    mediaSource: mediaSource.data,
    mediaItems: mediaItems.data,
  };
};
