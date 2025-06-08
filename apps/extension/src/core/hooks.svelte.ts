import { intervalToDuration } from "date-fns";
import { RSSFeed, type RSSItem } from ".";

export type TSubscriptionKey = string;

export type TAuthor = {
  key: TSubscriptionKey;
  name: RSSFeed["publisher"];
  image: RSSFeed["image"];
};

export type TSubscriptions = Record<TSubscriptionKey, RSSFeed>;

export type TFeed = RSSItem[];

/**
 * Gets the feed from the storage.
 */
const getFeed = (subscriptions: TSubscriptions): TFeed => {
  const allFeeds = Object.values(subscriptions).flatMap((rssFeed: RSSFeed) => {
    return rssFeed.feed;
  });

  return sortFeed(allFeeds);
};

const getAuthors = (subscriptions: TSubscriptions) => {
  const authors: TAuthor[] = Object.entries(subscriptions).map(
    ([key, rssFeed]) => ({
      key,
      name: rssFeed.publisher,
      image: rssFeed.image,
    })
  );
  return authors.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
};

const sortFeedByPublishedAt = (a: RSSItem, b: RSSItem) => {
  if (a.publishedAt && b.publishedAt) {
    if (a.publishedAt > b.publishedAt) return -1;
    else if (a.publishedAt < b.publishedAt) return 1;
  }

  if (a.publishedAt && !b.publishedAt) return -1;
  if (!a.publishedAt && b.publishedAt) return 1;

  return 0;
};

const getSortFeedByAlphabetically =
  (sortBy: Exclude<keyof RSSItem, "content">) => (a: RSSItem, b: RSSItem) =>
    (a[sortBy] ?? "").localeCompare(b[sortBy] ?? "");

const getSubscriptions = (): Promise<Record<string, RSSFeed>> =>
  chrome.storage.local.get(null);

/**
 * Sorts the feed based on a given `sortBy` key.
 * @param sortBy The key to sort the feed by.
 * @default "publishedAt"
 */
export const sortFeed = (
  feed: TFeed,
  sortBy?: Parameters<typeof getSortFeedByAlphabetically>[0]
) => {
  if (sortBy === "publishedAt" || !sortBy) {
    return feed.sort(sortFeedByPublishedAt);
  }

  if (sortBy === "author" || sortBy === "title" || sortBy === "link") {
    return feed.sort(getSortFeedByAlphabetically(sortBy));
  }

  return feed;
};

const fetchRSSFeed = async (url: string | string[]) => {
  if (Array.isArray(url)) {
    const rawTexts = await Promise.all(
      url.map((url) => fetch(url).then((response) => response.text()))
    );
    const rssItems = rawTexts.map((rawText, idx) => new RSSFeed(rawText, url[idx]));
    return rssItems;
  }

  const response = await fetch(url);
  const rawText = await response.text();
  const rssItem = new RSSFeed(rawText, url);
  return rssItem;
};

export const addToStorage = async (url: string | string[]) => {
  if (Array.isArray(url)) {
    const URLs = url;
    const feeds = await Promise.all(URLs.map((url) => fetchRSSFeed(url)));
    const subscriptions = Object.fromEntries(
      URLs.map((key, index) => [key, feeds[index]])
    );
    // Add RSS Feed to Storage
    await chrome.storage.local.set(subscriptions);
  } else {
    const rssItem = await fetchRSSFeed(url);
    const subscription = { [url]: rssItem };
    // Add RSS Feed to Storage
    await chrome.storage.local.set(subscription);
  }
};

export class FeedHandler {
  feed: RSSItem[] = $state([]);
  authors: TAuthor[] = $state([]);
  isLoading: boolean = $state(false);
  isError: boolean = $state(false);
  error: Error | null = $state(null);

  private getData = async () => {
    this.isLoading = true;
    try {
      const results = await getSubscriptions();

      this.feed = getFeed(results);
      this.authors = getAuthors(results);

      this.isLoading = false;
    } catch (error) {
      this.isError = true;
      this.isLoading = false;
      this.error = new Error("Failed to get feed from storage.", {
        cause: error,
      });
    }
  };

  constructor() {
    this.getData();
    const lastUpdated = localStorage.getItem("lastUpdated");
    const durationSinceLastUpdate = lastUpdated
      ? intervalToDuration({ start: new Date(lastUpdated), end: new Date() })
          .hours ?? 0
      : 0;

    if (lastUpdated === null || durationSinceLastUpdate >= 24) {
      this.refresh();
    }
    /** Listens for changes in the storage and updates the state. */
    chrome.storage.onChanged.addListener(() => {
      this.getData();
    });
  }

  /**
   * Refreshes the feed by re-fetching it from each url.
   */
  refresh = async () => {
    const URLs = this.authors.map((author) => author.key);
    const feeds = await Promise.all(URLs.map((url) => fetchRSSFeed(url)));
    const items = Object.fromEntries(
      URLs.map((key, index) => [key, feeds[index]])
    );
    try {
      await chrome.storage.local.set(items);
      localStorage.setItem("lastUpdated", new Date().toISOString());
    } catch (error) {
      console.error("Failed to refresh feed.", error);
      // @todo Add error handling.
    }
  };

  add = async (url: string | string[]) => {
    await addToStorage(url);
  };

  remove = async (keys: TSubscriptionKey | TSubscriptionKey[]) => {
    await chrome.storage.local.remove(keys);
  };
}

export const feedHandler = new FeedHandler();

export type TOnboardingHandler = {
  isOnboarding: boolean;
};

export const onboardingHandler: TOnboardingHandler = $state({
  isOnboarding: false,
});
