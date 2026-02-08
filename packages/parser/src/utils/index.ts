import { Facet } from "@atproto/api";
import {
  isLink,
  isMention,
  isTag,
} from "@atproto/api/dist/client/types/app/bsky/richtext/facet";

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
