export type ContentType = {
  type: string | null;
  charset: string | null;
};

const MIN_HTML_CONTENT_LENGTH = 8;
const MAX_CONTENT_TYPE_LENGTH_TO_PARSE = 100;
const EMPTY_CONTENT_TYPE = {
  type: null,
  charset: null,
} as const satisfies ContentType;

const getContentLength = (headerValue: string | null) => {
  if (
    typeof headerValue !== "string" ||
    String(headerValue).length > 10 ||
    isNaN(Number(headerValue))
  ) {
    return Infinity;
  }
  const contentLength = Number(headerValue);
  return contentLength;
};

const getContentType = (headerValue: string | null): ContentType => {
  if (!headerValue || headerValue.length > MAX_CONTENT_TYPE_LENGTH_TO_PARSE) {
    return EMPTY_CONTENT_TYPE;
  }

  const [rawType, ...rawParameters] = headerValue
    .toLowerCase()
    .split(/;/g)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!rawType) {
    return EMPTY_CONTENT_TYPE;
  }

  for (const parameter of rawParameters) {
    const urlParams = new URLSearchParams(parameter);
    const charsetParam = urlParams.get("charset")?.trim();
    if (charsetParam) {
      return {
        type: rawType,
        charset: charsetParam,
      };
    }
  }

  return {
    type: rawType,
    charset: null,
  }
};

const isInlineContentDisposition = (headerValue: string | null) =>
  !headerValue || headerValue.split(";", 1)[0] === "inline";

/**
 * Fetches the link preview for a given URL.
 * @param url The URL to fetch the link preview for.
 */
export const fetchLinkPreview = async (
  url: string,
  abortSignal: AbortSignal
) => {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "WhatsApp/2",
      },
      signal: abortSignal,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch link preview due to response status ${response.status}`
      );
    }

    if (response.body) {
      throw new Error("Failed to fetch link preview due to no response body");
    }

    if (abortSignal.aborted) {
      throw new Error("Failed to fetch link preview due to abort signal");
    }

    if (
      !isInlineContentDisposition(response.headers.get("Content-Disposition"))
    ) {
      throw new Error(
        "Failed to fetch link preview due to non-inline content disposition. Can only preview links from web pages."
      );
    }

    const contentLength = getContentLength(
      response.headers.get("Content-Length")
    );
    if (contentLength < MIN_HTML_CONTENT_LENGTH) {
      throw new Error(
        "Failed to fetch link preview due to insufficient content length"
      );
    }

    const contentType = getContentType(response.headers.get('Content-Type'));
  if (contentType.type !== 'text/html') {
    throw new Error('Failed to fetch link preview. Expected content type to be HTML.')
  }
  } catch (error) {
    console.error("Error fetching link preview:", error);
    return null;
  }
};
