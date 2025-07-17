import {
  $MediaItem,
  $MediaSource,
  $MediaSourceIcon,
} from "@readii/schemas/zod";
import { z } from "zod/mini";

export const getUrl = (url: string | null, baseUrl: string | null) => {
  if (!url || !baseUrl) return null;
  try {
    return String(url).startsWith("/") ? new URL(url, baseUrl).toString() : url;
  } catch (error) {
    return null;
  }
};

export const getFeedData = (rawData: Record<string, unknown>) => {
  const baseData = rawData?.rss ?? rawData?.feed;
  const channelData = baseData?.channel ?? baseData;
  const mediaItemsData = channelData?.item ?? channelData?.entry ?? null;

  const mediaSourceIcon = $MediaSourceIcon.parse({
    title:
      channelData?.image?.title?.["#text"] ??
      channelData?.webMaster?.["#text"] ??
      channelData?.title?.["#text"],
    url: channelData?.image?.url?.["#text"] ?? null, // @todo: Fetch favicon as fallback
  });

  const baseUrl =
    channelData?.link?.["#text"] ??
    (Array.isArray(channelData?.link) ? channelData?.link : [])?.find(
      (link) => link?.["@_rel"] !== "self"
    )?.["@_href"] ??
    null;
  const lastBuildAt =
    channelData?.lastBuildDate?.["#text"] ??
    channelData?.updated?.["#text"] ??
    null;
  const mediaSource = $MediaSource.parse({
    name: channelData?.title?.["#text"] ?? null,
    description: channelData?.description?.["#text"] ?? null,
    url: baseUrl,
    feedUrl:
      channelData?.["atom:link"]?.["@_href"] ??
      (Array.isArray(channelData?.link ?? channelData?.["atom:link"])
        ? channelData?.link ?? channelData?.["atom:link"]
        : []
      )?.find((link) => link?.["@_rel"] === "self")?.["@_href"] ??
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
      ? channelData?.category?.map((cat) => cat?.["#text"] ?? cat)
      : null,
  });

  const mediaItems = z.array($MediaItem).parse(
    (mediaItemsData ?? [])?.map((item) => {
      const mediaThumbnailUrl = item?.["media:thumbnail"]?.["@_url"];
      const itemUrl = item?.link?.["#text"] ?? item?.link?.["@_href"];
      const enclosureUrl = item?.enclosure?.["@_url"] ?? null;

      return {
        title: item?.title?.["#text"],
        url: getUrl(itemUrl, baseUrl),
        type: "text", // @todo Make this dynamic based on content type
        content:
          item?.description?.["#text"] ??
          item?.content?.["#text"] ??
          item?.["content:encoded"]?.["#text"],
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

  return {
    mediaSourceIcon,
    mediaSource,
    mediaItems,
  };
};
