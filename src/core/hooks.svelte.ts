import { RSSFeed, type RSSItem } from ".";

export type TSubscription = {
  key: string;
  name: RSSFeed["author"];
  image: RSSFeed["image"];
};

export type TSubscriptions = Record<string, RSSFeed>;

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
  const allSubscriptions: TSubscription[] = Object.entries(subscriptions).map(
    ([key, rssFeed]) => ({
      key,
      name: rssFeed.author,
      image: rssFeed.image,
    })
  );
  return allSubscriptions.sort((a, b) =>
    (a.name ?? "").localeCompare(b.name ?? "")
  );
};

const sortFeedByPublishedAt = (a: RSSItem, b: RSSItem) => {
  if (a.publishedAt && b.publishedAt) {
    if (a.publishedAt < b.publishedAt) return -1;
    else if (a.publishedAt > b.publishedAt) return 1;
  }

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

const fetchFeed = async (url: string) => {
  const response = await fetch(url);
  const rawText = await response.text();
  const rssItem = new RSSFeed(rawText);

  return rssItem;
};

export const addFeedToStorage = async (url: string) => {
  const rssItem = await fetchFeed(url);
  // Add RSS Feed to Storage
  await chrome.storage.local.set({ [url]: rssItem });
};

export class FeedHandler {
  feed: RSSItem[] = $state([]);
  authors: TSubscription[] = $state([]);
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
    const feeds = await Promise.all(
      URLs.map((url) => fetchFeed(url))
    );
    const items = Object.fromEntries(URLs.map((key, index) => [key, feeds[index]]));
    await chrome.storage.local.set(items);
  };

  addFeed = async (url: string) => {
    await addFeedToStorage(url);
  };
}

export const feedHandler = new FeedHandler();
