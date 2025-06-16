// import sanitizeHtml from "sanitize-html";

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
  //   const sanitizedHTML = sanitizeHtml(rawHTML);
  const sanitizedHTML = rawHTML;

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
  publisher: {
    name: string | null;
    rssUrl: string | null;
    url: string | null;
    image: {
      url: string | null;
      title: string | null;
      link: string | null;
    };
  };

  constructor() {
    this.feed = [];
    this.publisher = {
      image: {
        url: null,
        title: null,
        link: null,
      },
      name: null,
      rssUrl: null,
      url: null,
    };
  }

  init = async (rssUrl: string) => {
    let rawFeed: Element[] = [];

    const rawXML = await fetch(
      `/api/channel?url=${encodeURIComponent(rssUrl)}`
    ).then((res) => res.text());
    const domRSS = new DOMParser().parseFromString(rawXML, "text/xml");

    this.publisher.rssUrl = rssUrl;

    const link = domRSS.querySelector("link:not([href])");
    if (link) {
      this.publisher.url = link?.textContent ?? null;
    }

    const rawHTML = this.publisher.url
      ? await fetch(this.publisher.url).then((res) => res.text())
      : null;
    const domHTML = rawHTML
      ? new DOMParser().parseFromString(rawHTML, "text/xml")
      : null;

    if (domRSS.querySelector("item")) {
      rawFeed = Array.from(domRSS.querySelectorAll("item"));
    } else if (domRSS.querySelector("entry")) {
      rawFeed = Array.from(domRSS.querySelectorAll("entry"));
    }

    const author = domRSS.querySelector("author");
    const title = domRSS.querySelector("title");
    if (author) {
      this.publisher.name = author?.textContent ?? null;
    } else if (title) {
      this.publisher.name = title?.textContent ?? null;
    }

    const image = domRSS.querySelector("image");
    if (image) {
      const url = image.querySelector("url");
      const title = image.querySelector("title");
      const link = image.querySelector("link");

      this.publisher.image = {
        url: url?.textContent ?? null,
        title: title?.textContent ?? null,
        link: link?.textContent ?? null,
      };
    } else {
      const image =
        domHTML?.querySelector('link[href$=".svg"]') ??
        domHTML?.querySelector('link[href$=".png"]') ??
        domHTML?.querySelector('link[href$=".jpg"]');
      const imageUrl = image ? image.getAttribute("href") : null;

      console.log({
        rawHTML,
        domHTML,
        imageUrl,
        image,
      });

      if (imageUrl) {
        this.publisher.image = {
          url: imageUrl ?? null,
          title: title?.textContent ?? null,
          link: link?.textContent ?? null,
        };
      }
    }

    this.feed = rawFeed.map((node) => {
      const rssItem = new RSSItem(node, this.publisher);

      return rssItem;
    });

    return this;
  };
}

const MIN_CONTENT_LENGTH = 900;

export class RSSItem {
  title: string | null;
  author: string | null;
  url: string | null;
  content: string | null;
  publishedAt: string | null;

  constructor(node: Element, publisher: RSSFeed["publisher"]) {
    this.title = null;
    this.url = null;
    this.publishedAt = null;
    this.author = publisher.name ?? null;
    /**
     * Unparsed HTML markup that holds the content of the article.
     */
    this.content = null;

    const title = node.querySelector("title")?.textContent;
    if (title) this.title = cleanFromCDATA(title) ?? null;

    const linkHrefStr = node.querySelector("link")?.getAttribute("href");
    const linkHref = linkHrefStr ? new URL(linkHrefStr) : null;
    if (linkHref) this.url = linkHref.href;

    const linkStr = node.querySelector("link")?.textContent;
    const link = linkStr ? new URL(cleanFromCDATA(linkStr) as string) : null;
    if (link) this.url = link.href;

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
