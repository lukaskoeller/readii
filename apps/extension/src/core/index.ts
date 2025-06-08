import sanitizeHtml from "sanitize-html";

const cleanFromCDATA = (str: string | null | undefined) => {
  if (!str) {
    return null;
  }
  return str.replace("<![CDATA[", "").replace("]]>", "");
};

const processHTMLString = (str: string | null | undefined) => {
  const rawHTML = cleanFromCDATA(str);
  if (!rawHTML) {
    return null;
  }
  const sanitizedHTML = sanitizeHtml(rawHTML);

  const dom = new DOMParser().parseFromString(sanitizedHTML, "text/html");
  const validHTMLString = dom.body.innerHTML;

  return validHTMLString;
};

/**
 * @returns Returns either an ISO 8601 formatted date string
 * or null if the input string is invalid.
 */
const getDate = (str: string | null | undefined) => {
  try {
    const date = new Date(String(str));
    const isValid = date.toString() !== "Invalid Date";

    return isValid ? date.toISOString() : null;
  } catch (error) {
    console.warn(`Invalid date string "${str}" provided.`, error);
    return null;
  }
};

export class RSSFeed {
  public feed: RSSItem[];
  publisher: string | null;
  rssUrl: string;
  url: string | null;
  image: {
    url: string | null;
    title: string | null;
    link: string | null;
  };

  constructor(rawXML: string, rssUrl: string) {
    let rawFeed: Element[] = [];
    const dom = new DOMParser().parseFromString(rawXML, "text/xml");
    this.feed = [];
    this.publisher = null;
    this.rssUrl = rssUrl;
    this.url = null;
    this.image = {
      url: null,
      title: null,
      link: null,
    };

    if (dom.querySelector("item")) {
      rawFeed = Array.from(dom.querySelectorAll("item"));
    } else if (dom.querySelector("entry")) {
      rawFeed = Array.from(dom.querySelectorAll("entry"));
    }

    const author = dom.querySelector("author");
    const title = dom.querySelector("title");
    if (author) {
      this.publisher = author?.textContent ?? null;
    } else if (title) {
      this.publisher = title?.textContent ?? null;
    }

    const link = dom.querySelector("link");
    if (link) {
      this.url = link?.textContent ?? null;
    }

    const image = dom.querySelector("image");
    if (image) {
      const url = image.querySelector("url");
      const title = image.querySelector("title");
      const link = image.querySelector("link");

      this.image = {
        url: url?.textContent ?? null,
        title: title?.textContent ?? null,
        link: link?.textContent ?? null,
      };
    }

    this.feed = rawFeed.map((node) => {
      const rssItem = new RSSItem(node, this.publisher);

      return rssItem;
    });
  }
}

const MIN_CONTENT_LENGTH = 900;

export class RSSItem {
  title: string | null;
  link: string | null;
  author: string | null;
  publisher: RSSFeed["publisher"];
  content: string | null;
  publishedAt: string | null;

  constructor(node: Element, publisher: RSSFeed["publisher"]) {
    this.title = null;
    this.link = null;
    this.publishedAt = null;
    this.publisher = publisher;
    this.author = publisher ?? null;
    /**
     * Unparsed HTML markup that holds the content of the article.
     */
    this.content = null;

    const title = node.querySelector("title")?.textContent;
    if (title) this.title = cleanFromCDATA(title) ?? null;

    const linkHrefStr = node.querySelector("link")?.getAttribute("href");
    const linkHref = linkHrefStr ? new URL(linkHrefStr) : null;
    if (linkHref) this.link = linkHref.href;

    const linkStr = node.querySelector("link")?.textContent;
    const link = linkStr ? new URL(cleanFromCDATA(linkStr) as string) : null;
    if (link) this.link = link.href;

    const articleAuthor: string | null =
      node.getElementsByTagName("dc:creator")?.[0]?.textContent ?? null;
    if (articleAuthor) this.author = cleanFromCDATA(articleAuthor) ?? null;

    const content = node.querySelector("content")?.textContent;
    if (content && content.length > MIN_CONTENT_LENGTH)
      this.content = processHTMLString(content);

    const contentEncoded =
      node.getElementsByTagName("content:encoded")?.[0]?.textContent;
    if (contentEncoded && contentEncoded.length > MIN_CONTENT_LENGTH)
      this.content = processHTMLString(contentEncoded);

    const description = node.querySelector("description")?.textContent;
    if (description && description.length > MIN_CONTENT_LENGTH)
      this.content = processHTMLString(description);

    const pubDate = getDate(
      node.getElementsByTagName("pubDate")?.[0]?.textContent
    );
    if (pubDate) this.publishedAt = pubDate;

    const updated = getDate(
      node.getElementsByTagName("updated")?.[0]?.textContent
    );
    if (updated) this.publishedAt = updated;

    const lastBuildDate = getDate(
      node.getElementsByTagName("lastBuildDate")?.[0]?.textContent
    );
    if (lastBuildDate) this.publishedAt = lastBuildDate;
  }
}
