const cleanFromCDATA = (str: string | null | undefined) => {
  if (!str) {
    return null;
  }
  return str.replace("<![CDATA[", "").replace("]]>", "");
};

const processHTMLString = (str: string | null | undefined) => {
  let rawHTML = cleanFromCDATA(str);
  if (!rawHTML) {
    return null;
  }

  const dom = new DOMParser().parseFromString(rawHTML, "text/html");
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
  private dom: Document;
  private rawFeed: Element[];
  public feed: RSSItem[];
  author: string | null;

  constructor(rawXML: string) {
    this.dom = new DOMParser().parseFromString(rawXML, "text/xml");
    this.rawFeed = [];
    this.feed = [];
    this.author = null;

    if (this.dom.querySelector("item")) {
      this.rawFeed = Array.from(this.dom.querySelectorAll("item"));
    } else if (this.dom.querySelector("entry")) {
      this.rawFeed = Array.from(this.dom.querySelectorAll("entry"));
    }

    const author = this.dom.querySelector("author");
    const title = this.dom.querySelector("title");
    if (author) {
      this.author = author?.textContent ?? null;
    } else if (title) {
      this.author = title?.textContent ?? null;
    }

    this.feed = this.rawFeed.map((node) => {
      const rssItem = new RSSItem(node, this.author);

      return rssItem;
    });
  }
}

export class RSSItem {
  title: string | null;
  link: string | null;
  author: string | null;
  content: string | null;
  publishedAt: string | null;

  constructor(node: Element, author?: string | null) {
    this.title = null;
    this.link = null;
    this.author = null;
    this.publishedAt = null;
    this.author = author ?? null;
    /**
     * Unparsed HTML markup that holds the content of the article.
     */
    this.content = null;

    const title = node.querySelector("title")?.innerHTML;
    if (title) this.title = cleanFromCDATA(title) ?? null;

    const linkStr = node.querySelector("link")?.getAttribute("href");
    const link = linkStr ? new URL(linkStr) : null;
    if (link) this.link = link.href;

    const articleAuthor: string | null =
      node.getElementsByTagName("dc:creator")?.[0]?.innerHTML ?? null;
    if (articleAuthor) this.author = cleanFromCDATA(articleAuthor) ?? null;

    const content = node.querySelector("content")?.innerHTML;
    if (content) this.content = processHTMLString(content);

    const description = node.querySelector("description")?.innerHTML;
    if (description && description.length > 300)
      this.content = processHTMLString(description);

    const pubDate = getDate(
      node.getElementsByTagName("pubDate")?.[0]?.innerHTML
    );
    if (pubDate) this.publishedAt = pubDate;

    const updated = getDate(
      node.getElementsByTagName("updated")?.[0]?.innerHTML
    );
    if (updated) this.publishedAt = updated;

    const lastBuildDate = getDate(
      node.getElementsByTagName("lastBuildDate")?.[0]?.innerHTML
    );
    if (lastBuildDate) this.publishedAt = lastBuildDate;
  }
}
