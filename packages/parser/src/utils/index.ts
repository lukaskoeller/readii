import { Facet } from "@atproto/api";
import {
  isLink,
  isMention,
  isTag,
} from "@atproto/api/dist/client/types/app/bsky/richtext/facet";
import {
  $MediaItem,
  $MediaSource,
  $MediaSourceIcon,
} from "@readii/schemas/zod";
import { XMLParser } from "fast-xml-parser";
import { z } from "zod/mini";

/**
 * Checks if the given media type is an image.
 * @param mediaType The media type string (e.g., "image/png", "video/mp4").
 * @returns True if the media type is an image, false otherwise.
 */
export const getIsMediaTypeImage = (mediaType: string | undefined | null) => {
  if (!mediaType) return false;
  return mediaType.startsWith("image/");
};

/**
 * Fetch the favicon URL for a given website.
 * @param url The URL of the website.
 * @param channelData The channel data from the RSS feed.
 * @returns The favicon URL or `null` if not found.
 */
export const getFavicon = async (
  url: string,
  channelData: any,
): Promise<string | null> => {
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
    return null;
  }

  return null;
};

/**
 * Gets the absolute URL based on the given URL and base URL.
 * @param url The URL to resolve.
 * @param baseUrl The base URL to use for resolution.
 * @returns The resolved absolute URL or `null` if invalid.
 */
export const getUrl = (url: string | null, baseUrl: string | null) => {
  if (!url || !baseUrl) return null;
  try {
    return String(url).startsWith("/") ? new URL(url, baseUrl).toString() : url;
  } catch (error) {
    return null;
  }
};

export const transformAtProtoToHtml = (text: string, facets: Facet[]) => {
  let htmlString = text;
  const replaceMap: Map<string, string> = new Map();
  for (const facet of facets) {
    const { index, features } = facet;
    const feature = features[0];
    const { byteStart, byteEnd } = index;
    const subString = text.slice(byteStart, byteEnd);

    if (isLink(feature)) {
      replaceMap.set(subString, `<a href="${feature.uri}">${subString}</a>`);
      continue;
    }

    if (isMention(feature)) {
      replaceMap.set(
        subString,
        `<a href="https://bsky.app/profile/${feature.did}">${subString}</a>`,
      );
      continue;
    }

    if (isTag(feature)) {
      replaceMap.set(
        subString,
        `<a href="https://bsky.app/hashtag/${feature.tag}">${subString}</a>`,
      );
    }
  }

  for (const [text, textWithHtml] of replaceMap) {
    htmlString = htmlString.replace(text, textWithHtml);
  }
  return htmlString;
};

export const decodeHTMLEntities = <
  T extends string | null | undefined = string,
>(
  text: T,
) => {
  if (typeof text !== "string") return text;
  return text
    .replace("&#8211;", "–")
    .replace("&#8217;", "’")
    .replace("&#8220;", "“")
    .replace("&#8221;", "”")
    .replace("&#8230;", "…")
    .replace("&#038;", "&")
    .replace("&#39;", "'")
    .replace("&#34;", '"');
};

export type TGetRssBaseDataOptions = {
  /**
   * Raw RSS feed data as a string.
   * If given, fetching from the URL will be skipped. */
  rssString?: string;
};

export const getRssBaseData = async (
  url: string,
  options?: TGetRssBaseDataOptions,
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
  const mediaItemsRawData = channelData?.item ?? channelData?.entry ?? null;
  const mediaItemsData: Record<string, any>[] =
    mediaItemsRawData && !Array.isArray(mediaItemsRawData)
      ? [mediaItemsRawData]
      : mediaItemsRawData;

  return { channelData, mediaItemsData };
};

export type TGetMediaSourceIconArgs = {
  url: string;
  channelData: any;
  overwrites?: Partial<z.infer<typeof $MediaSourceIcon>>;
};
export const getMediaSourceIcon = async (args: TGetMediaSourceIconArgs) => {
  const { url, channelData, overwrites } = args;
  const mediaSourceIconTitle =
    overwrites?.title ??
    channelData?.image?.title?.["#text"] ??
    channelData?.webMaster?.["#text"] ??
    channelData?.title?.["#text"];

  const mediaSourceIcon = $MediaSourceIcon.safeParse({
    title: decodeHTMLEntities<string>(mediaSourceIconTitle),
    url: overwrites?.url ?? (await getFavicon(url, channelData)),
  });
  if (!mediaSourceIcon.success) {
    throw new Error(
      `Invalid Media Source Icon: ${z.prettifyError(
        mediaSourceIcon.error,
      )}\nURL: ${url}`,
    );
  }
  return mediaSourceIcon.data;
};

export type TGetMediaSourceArgs = {
  url: string;
  channelData: any;
  overwrites?: Partial<z.infer<typeof $MediaSource>>;
};
export const getMediaSource = async (args: TGetMediaSourceArgs) => {
  const { url, channelData, overwrites } = args;
  const baseUrl =
    overwrites?.url ??
    channelData?.link?.["#text"] ??
    (Array.isArray(channelData?.link) ? channelData?.link : [])?.find(
      (link: Record<string, unknown>) => link?.["@_rel"] !== "self",
    )?.["@_href"] ??
    channelData?.link?.["@_href"] ??
    null;

  const lastBuildAt =
    overwrites?.lastBuildAt ??
    channelData?.lastBuildDate?.["#text"] ??
    channelData?.updated?.["#text"] ??
    null;

  const mediaSource = $MediaSource.safeParse({
    name: decodeHTMLEntities<string | null>(
      overwrites?.name ?? channelData?.title?.["#text"] ?? null,
    ),
    description: decodeHTMLEntities<string | null>(
      overwrites?.description ?? channelData?.description?.["#text"] ?? null,
    ),
    url: baseUrl,
    feedUrl: overwrites?.feedUrl ?? url,
    logoUrl:
      overwrites?.logoUrl ??
      channelData?.logo?.["#text"] ??
      (await getFavicon(url, channelData)) ??
      null,
    lastBuildAt: lastBuildAt ? new Date(lastBuildAt).toISOString() : null,
    lastFetchedAt: new Date().toISOString(),
    language: overwrites?.language ?? channelData?.language?.["#text"] ?? null,
    generator:
      overwrites?.generator ?? channelData?.generator?.["#text"] ?? null,
    categories:
      !overwrites?.categories && Array.isArray(channelData?.category)
        ? channelData?.category?.map(
            (cat: Record<string, unknown>) => cat?.["#text"] ?? cat,
          )
        : (overwrites?.categories ?? null),
  });
  if (!mediaSource.success) {
    console.error(mediaSource.error);
    throw new Error(
      `Invalid Media Source: ${z.prettifyError(mediaSource.error)}\nURL: ${url}`,
    );
  }

  return mediaSource.data;
};

export type TGetMediaItemsArgs = {
  baseUrl: string | null;
  url: string;
  mediaItemsData: Record<string, any>[];
};
export const getMediaItems = (args: TGetMediaItemsArgs) => {
  const { baseUrl, url, mediaItemsData } = args;
  const mediaItems = z.array($MediaItem).safeParse(
    (mediaItemsData ?? []).map((item) => {
      const content =
        item?.["content:encoded"]?.["#text"] ??
        item?.content?.["#text"] ??
        item?.description?.["#text"] ??
        "";
      const description = decodeHTMLEntities<string>(
        item?.description?.["#text"] ?? "",
      );

      const imgRegex =
        /<img\b(?![^>]*?(?:width|height)=["']1["'])[^>]*?src=["'](.*?)["']/i;
      const imgMatch = imgRegex.exec(content) ?? imgRegex.exec(description);
      const mediaThumbnailUrlFallback = imgMatch ? imgMatch[1] : null;
      const mediaThumbnailUrl =
        item?.["media:thumbnail"]?.["@_url"] ??
        (getIsMediaTypeImage(item?.enclosure?.["@_type"])
          ? item?.enclosure?.["@_url"]
          : null) ??
        (Array.isArray(item?.link) ? item?.link : [])?.find(
          (link: Record<string, unknown>) => {
            const mediaType = link?.["@_type"] as string | undefined;
            return getIsMediaTypeImage(mediaType);
          },
        )?.["@_href"] ??
        mediaThumbnailUrlFallback;

      const itemUrl =
        item?.link?.["#text"] ??
        item?.link?.["@_href"] ??
        (Array.isArray(item?.link) ? item?.link : [])?.find(
          (link: Record<string, unknown>) => link?.["@_rel"] == undefined,
        )?.["@_href"];
      const enclosureUrl = item?.enclosure?.["@_url"] ?? null;
      const publishedAt = item?.pubDate?.["#text"] ?? item?.updated?.["#text"];
      const publishedAtDate = publishedAt ? new Date(publishedAt) : null;

      return {
        title: decodeHTMLEntities<string | null>(
          item?.title?.["#text"] ?? null,
        ),
        url: getUrl(itemUrl, baseUrl),
        type: "text", // @todo Make this dynamic based on content type

        /** Main content of the media item (html, audio, video) */
        content: content, // @todo NEXT: minify HTML
        contentSnippet: null,
        contentTldr: decodeHTMLEntities<string | null>(
          item?.summary?.["#text"] ?? null,
        ),

        creator: decodeHTMLEntities<string | null>(
          item?.["dc:creator"]?.["#text"] ?? null,
        ),
        publishedAt:
          publishedAtDate && publishedAtDate?.toString() !== "Invalid Date"
            ? publishedAtDate.toISOString()
            : null,
        thumbnailUrl: getUrl(mediaThumbnailUrl, baseUrl),
        enclosure: getUrl(enclosureUrl, baseUrl),
      };
    }),
  );
  if (!mediaItems.success) {
    console.error(mediaItems.error);
    throw new Error(
      `Invalid Media Items: ${z.prettifyError(mediaItems.error)}\nURL: ${url}`,
    );
  }

  return mediaItems.data;
};
