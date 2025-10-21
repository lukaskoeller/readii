import { expect, test } from "vitest";
import { getFeedData, TMediaSourceType } from "../src";

const rssFeeds: Array<[string, TMediaSourceType, string]> = [
  ["Adam Argyle", "rss", "https://nerdy.dev/rss"],
  ["Contrario by Victor Matekole", "rss", "https://matekole.com/rss.xml"],
  [
    "NYT Top Stories",
    "rss",
    "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  ],
  ["Jake Archibald", "rss", "https://jakearchibald.com/posts.rss"],
  ["Smashing Magazine", "rss", "https://www.smashingmagazine.com/feed/"],
  [
    "readii.bsky.social",
    "atproto",
    "https://api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?filter=posts_no_replies&actor=did:plc:fmwrdogxjglnbwalvoe6jdam&limit=100",
  ],
];

test.each(rssFeeds)(
  'should parse feed "%s" (%s) correctly',
  async (title, source, url) => {
    const parsedFeed = await getFeedData(url, { source });
    console.log(`[${title}] mediaSourceIcon:`, parsedFeed.mediaSourceIcon);
    expect("mediaSourceIcon" in parsedFeed).toBe(true);
    expect("mediaSource" in parsedFeed).toBe(true);
    expect("mediaItems" in parsedFeed).toBe(true);
  }
);
