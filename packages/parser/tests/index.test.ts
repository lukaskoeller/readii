import { expect, test } from "vitest";
import { getFeedData, TMediaSourceType } from "../src";
import { transformAtProtoToHtml } from "../src/utils";
import { Facet } from "@atproto/api";

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
  ["NASA Image of the Day", "rss", "https://www.nasa.gov/feeds/iotd-feed/"],
  [
    "readii.bsky.social",
    "atproto",
    "https://api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?filter=posts_no_replies&actor=did:plc:fmwrdogxjglnbwalvoe6jdam&limit=100",
  ],
  ["r/investing", "reddit", "https://www.reddit.com/r/investing/new.rss"]
];

test.each(rssFeeds)(
  'should parse feed "%s" (%s) correctly',
  async (title, source, url) => {
    const parsedFeed = await getFeedData(url, { source });
    expect("mediaSourceIcon" in parsedFeed).toBe(true);
    expect("mediaSource" in parsedFeed).toBe(true);
    expect("mediaItems" in parsedFeed).toBe(true);
  },
);

const FACETS: Array<[string, Facet[], string]> = [
  [
    "give it an upvote if you agree that #CSS outline shape should continue to match the element when using corner-shape\n\nissues.chromium.org/issues/45840...",
    [
      {
        features: [
          {
            $type: "app.bsky.richtext.facet#tag",
            tag: "CSS",
          },
        ],
        index: {
          byteEnd: 40,
          byteStart: 36,
        },
      },
      {
        features: [
          {
            $type: "app.bsky.richtext.facet#link",
            uri: "https://issues.chromium.org/issues/458409066",
          },
        ],
        index: {
          byteEnd: 152,
          byteStart: 117,
        },
      },
    ],
    'give it an upvote if you agree that <a href="https://bsky.app/hashtag/CSS">#CSS</a> outline shape should continue to match the element when using corner-shape\n\n<a href="https://issues.chromium.org/issues/458409066">issues.chromium.org/issues/45840...</a>',
  ],
];

test.each(FACETS)(
  'should transform "%s" to HTML string',
  (text, facets, expected) => {
    const htmlString = transformAtProtoToHtml(text, facets);
    expect(htmlString).toBe(expected);
  },
);
