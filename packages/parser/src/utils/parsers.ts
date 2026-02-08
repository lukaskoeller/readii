import {
  $MediaItemAtProto,
  $MediaSource,
  $MediaSourceIcon,
} from "@readii/schemas/zod";
import { z } from "zod/mini";
import {
  getMediaItems,
  getMediaSource,
  getMediaSourceIcon,
  getRssBaseData,
  transformAtProtoToHtml,
} from "./index";

export type TGetParsedRssDataOptions = {
  /**
   * Raw RSS feed data as a string.
   * If given, fetching from the URL will be skipped. */
  rssString?: string;
};

export const getParsedRssData = async (
  url: string,
  options?: TGetParsedRssDataOptions,
) => {
  const { channelData, mediaItemsData } = await getRssBaseData(url, options);

  /** MEDIA SOURCE ICON */
  const mediaSourceIcon = await getMediaSourceIcon({
    url,
    channelData,
  });

  /** MEDIA SOURCE */
  const mediaSource = await getMediaSource({
    channelData,
    url,
  });
  const baseUrl = mediaSource.url;

  /** MEDIA ITEMS */
  const mediaItems = getMediaItems({
    mediaItemsData,
    baseUrl,
    url,
  });

  return {
    mediaSourceIcon,
    mediaSource,
    mediaItems,
  };
};

export type TGetParsedRedditDataArgs = {
  /**
   * The URL to the Subreddit
   * @example https://www.reddit.com/r/Frontend/
   */
  url: string;
  /**
   * Defines the type of feed to fetch.
   * @default "new"
   */
  type?: "best" | "new" | "hot" | "top" | "rising";
};
export type TGetParsedRedditDataOptions = TGetParsedRssDataOptions;

export const getParsedRedditData = async (
  args: TGetParsedRedditDataArgs,
  options?: TGetParsedRedditDataOptions,
) => {
  const { url, type = "new" } = args;
  /**
   * Construct the RSS feed URL for the specified subreddit and type.
   * `https://www.reddit.com/r/Frontend/` becomes `https://www.reddit.com/r/Frontend/new.rss` for the `new` type.
   */
  const rssUrl = `${url}/${type}.rss`.replace(/\/+$/, "/"); // ensure it ends with a single slash before "rss"
  const { channelData, mediaItemsData } = await getRssBaseData(rssUrl, options);
  const aboutData = (await fetch(`${url}/about.json`).then((res) => res.json())).data;
  const title = aboutData?.display_name_prefixed ?? aboutData?.display_name ?? channelData?.title;
  const iconUrl = aboutData?.community_icon;

  /** MEDIA SOURCE ICON */
  const mediaSourceIcon = await getMediaSourceIcon({
    url: rssUrl,
    channelData,
    overwrites: {
      title,
      url: aboutData?.community_icon,
    }
  });

  /** MEDIA SOURCE */
  const mediaSource = await getMediaSource({
    channelData,
    url: rssUrl,
    overwrites: {
      description: aboutData?.public_description,
      logoUrl: iconUrl,
      name: title,
    }
  });
  const baseUrl = mediaSource.url;

  /** MEDIA ITEMS */
  const mediaItems = getMediaItems({
    mediaItemsData,
    baseUrl,
    url: rssUrl,
  });

  return {
    mediaSourceIcon,
    mediaSource,
    mediaItems,
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
  options: TGetParsedAtProtoDataOptions,
) => {
  const jsonData = options?.atProtoObject ?? (await (await fetch(url)).json());

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
        mediaSourceIcon.error,
      )}\nURL: ${url}`,
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
      `Invalid Media Source: ${z.prettifyError(mediaSource.error)}\nURL: ${url}`,
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
    }),
  );
  if (!mediaItems.success) {
    console.error(mediaItems.error);
    throw new Error(
      `Invalid Media Items: ${z.prettifyError(mediaItems.error)}\nURL: ${url}`,
    );
  }

  return {
    mediaSourceIcon: mediaSourceIcon.data,
    mediaSource: mediaSource.data,
    mediaItems: mediaItems.data,
  };
};
