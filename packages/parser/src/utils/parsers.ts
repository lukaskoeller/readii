import {
  $MediaItem,
  $MediaItemAtProto,
  $MediaSource,
  $MediaSourceIcon,
} from "@readii/schemas/zod";
import { z } from "zod/mini";
import { XMLParser } from "fast-xml-parser";
import { getFavicon, getIsMediaTypeImage, getUrl, transformAtProtoToHtml } from "./index";

export type TGetParsedRssDataOptions = {
  /**
   * Raw RSS feed data as a string.
   * If given, fetching from the URL will be skipped. */
  rssString?: string;
};

export const getParsedRssData = async (
  url: string,
  options: TGetParsedRssDataOptions
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
      `Invalid Media Source Icon: ${z.prettifyError(
        mediaSourceIcon.error
      )}\nURL: ${url}`
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

  const mediaItems = z.array($MediaItem).safeParse(
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

export type TGetParsedAtProtoDataOptions = {
  /**
   * The AT Protocol object data.
   */
  atProtoObject?: Record<string, unknown>;
};

export const getParsedAtProtoData = async (
  url: string,
  options: TGetParsedAtProtoDataOptions
) => {
  const jsonData = options?.atProtoObject ?? (await (await fetch(url)).json());
  console.log(jsonData);
  

  const feed = Array.isArray(jsonData?.feed) ? jsonData?.feed : [];
  const handle = feed[0]?.post?.author?.handle;
  const authorName: string | null =
    feed[0]?.post?.author?.displayName ?? handle ?? null;

  const mediaSourceIcon = $MediaSourceIcon.safeParse({
    title: authorName,
    url: feed[0]?.post?.author?.avatar ?? null,
  });
  if (!mediaSourceIcon.success) {
    throw new Error(
      `Invalid Media Source Icon: ${z.prettifyError(
        mediaSourceIcon.error
      )}\nURL: ${url}`
    );
  }

  const did = feed[0]?.post?.author?.did;
  const baseUrl = did ? `https://bsky.app/profile/${did}` : null;
  const lastBuildAt = null;
  const firstPostRecord = feed[0]?.post?.record;
  const languages = firstPostRecord?.langs;
  const mediaSource = $MediaSource.safeParse({
    name: authorName,
    description: null,
    url: baseUrl,
    feedUrl: url,
    logoUrl: mediaSourceIcon.data.url,
    lastBuildAt: lastBuildAt ? new Date(lastBuildAt).toISOString() : null,
    lastFetchedAt: new Date().toISOString(),
    language:
      Array.isArray(languages) && languages.length > 0 ? languages[0] : null, // @todo allow multiple languages?
    generator: null,
    categories: null,
  });
  if (!mediaSource.success) {
    console.error(mediaSource.error);
    throw new Error(
      `Invalid Media Source: ${z.prettifyError(mediaSource.error)}\nURL: ${url}`
    );
  }

  const mediaItems = z.array($MediaItemAtProto).safeParse(
    (feed ?? []).map((item: Record<string, any>) => {
      const post = item?.post ?? {};
      const record = post?.record ?? {};

      const images = post?.embed?.images;
      const mediaThumbnailUrl = images?.[0]?.thumb ?? null;

      const postId = post?.uri?.split("/").pop() ?? null;
      const itemUrl = postId
        ? `https://bsky.app/profile/${handle}/post/${postId}`
        : null;

      let content = record?.text ?? "";
      if (content) {
        content = transformAtProtoToHtml(content, record?.facets ?? []);
      }

      return {
        title: null,
        type: "text",
        url: itemUrl,
        content: content,
        contentSnippet: null,
        contentTldr: null,
        creator: authorName,
        publishedAt: record?.createdAt,
        thumbnailUrl: mediaThumbnailUrl,
        enclosure: null,
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
