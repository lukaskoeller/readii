import { expect, test } from "vitest";
import { getFeedData } from "../src";

const feeds = [
  ["Adam Argyle", "https://nerdy.dev/rss"],
  ["Contrario by Victor Matekole", "https://matekole.com/rss.xml"],
  ["NYT Top Stories", "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"],
  ["Jake Archibald", "https://jakearchibald.com/posts.rss"],
  ["Smashing Magazine", "https://www.smashingmagazine.com/feed/"],
];


test.each(feeds)("should parse RSS feed \"%s\" correctly", async (title, url) => {
  const parsedFeed = await getFeedData(url);
  console.log(`[${title}] mediaSourceIcon:`, parsedFeed.mediaSourceIcon);
  expect("mediaSourceIcon" in parsedFeed).toBe(true);
  expect("mediaSource" in parsedFeed).toBe(true);
  expect("mediaItems" in parsedFeed).toBe(true);
});
