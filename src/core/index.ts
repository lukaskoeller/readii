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
    return (
      this.node
        .getElementsByTagName("dc:creator")?.[0]
        ?.innerHTML.replace("<![CDATA[", "")
        .replace("]]>", "") ?? null
    );
  }

  public get description(): string | null {
    return this.node.querySelector("description")?.innerHTML ?? null;
  }

  public get publishedAt(): Date | null {
    const publishedAtStr =
      this.node.getElementsByTagName("pubDate")?.[0]?.innerHTML;
    const publishedAt = new Date(publishedAtStr);
    const isValidDate = publishedAt.toString() !== "Invalid Date";
    return isValidDate ? publishedAt : null;
  }
}
