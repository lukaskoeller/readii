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
  const validHTMLString = dom.body.innerText;
  
  return validHTMLString;
};

export class RSSParser {
  private dom: Document;
  feed: Element[];
  author: string | null;

  constructor(rawXML: string) {
    this.dom = new DOMParser().parseFromString(rawXML, "text/xml");
    this.feed = [];
    this.author = null;

    if (this.dom.querySelector("item")) {
      this.feed = Array.from(this.dom.querySelectorAll("item"));
    } else if (this.dom.querySelector("entry")) {
      this.feed = Array.from(this.dom.querySelectorAll("entry"));
    }

    if (this.dom.querySelector("author")) {
      this.author = this.dom.querySelector("author")?.textContent ?? null;
    } else if (this.dom.querySelector("title")) {
      this.author = this.dom.querySelector("title")?.textContent ?? null;
    }
  }
}

export class RSSNode {
  private node: Element;

  constructor(node: Element) {
    this.node = node;
  }

  public get title(): string | null {
    return this.node.querySelector("title")?.innerHTML ?? null;
  }

  public get link(): string | null {
    const linkStr = this.node.querySelector("link")?.getAttribute("href");
    const link = linkStr ? new URL(linkStr) : null;
    return link ? link.href : null;
  }

  public get author(): string | null {
    const author =
      this.node.getElementsByTagName("dc:creator")?.[0]?.innerHTML ?? null;
    return cleanFromCDATA(author) ?? null;
  }

  /**
   * Unparsed HTML markup that holds the content of the article.
   */
  public get content(): string | null {
    const content = this.node.querySelector("content")?.innerHTML;
    if (content) return processHTMLString(content);

    const contentEncoded =
      this.node.querySelector("content:encoded")?.innerHTML;
    if (contentEncoded) return processHTMLString(contentEncoded);

    const description = this.node.querySelector("description")?.innerHTML;
    if (description && description.length > 300)
      return processHTMLString(description);

    return null;
  }

  public get publishedAt(): Date | null {
    const publishedAtStr =
      this.node.getElementsByTagName("pubDate")?.[0]?.innerHTML;
    const publishedAt = new Date(publishedAtStr);
    const isValidDate = publishedAt.toString() !== "Invalid Date";
    return isValidDate ? publishedAt : null;
  }
}
