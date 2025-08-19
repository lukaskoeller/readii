import { expect, test } from "vitest";
import { getFeedData } from "../src";

test("should parse RSS Feed correctly", async () => {
  // const feedURL = new URL("./nerdy-rss.xml", import.meta.url).toString();
  const parsedFeed = await getFeedData("https://nerdy.dev/rss");
  expect("mediaSourceIcon" in parsedFeed).toBe(true);
  expect("mediaSource" in parsedFeed).toBe(true);
  expect("mediaItems" in parsedFeed).toBe(true);
});
