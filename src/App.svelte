<script lang="ts">
  import ArticleCard from "./components/ArticleCard.svelte";
  import Header from "./components/Header.svelte";
  import { RSSItem, RSSFeed } from "./core";
  import nerdyXml from "./assets/nerdy.xml?raw";

  // let feed: RSSItem[] = $state([...new RSSFeed(nerdyXml).feed]);
  let feed: RSSItem[] = $state([]);

  const getFeeds = async () => {
    const results: Record<string, RSSFeed> =
      await chrome.storage.local.get(null);

    const allFeeds = Object.values(results).flatMap((rssFeed: RSSFeed) => {
      return rssFeed.feed;
    });

    feed = allFeeds;
  };

  const sortFeed = () => {
    feed.sort((a, b) => {
      if (a.publishedAt && b.publishedAt) {
        if (a.publishedAt < b.publishedAt) return -1;
        else if (a.publishedAt > b.publishedAt) return 1;
      }
      return 0;
    });
  };

  const initFeed = async () => {
    await getFeeds();
    sortFeed();
  };

  chrome.storage.onChanged.addListener(() => {
    console.log("storage changed");
    
    initFeed();
  });

  initFeed();
</script>

<Header />
<main class="main">
  <div class="articles nc-ram-grid">
    {#each feed.slice(0, 40) as data}
      <ArticleCard item={data} />
    {/each}
  </div>
</main>

<style>
  @custom-media --md-n-above (width >= 768px);
  .main {
    padding: var(--spacing-near);

    @media (--md-n-above) {
      padding: var(--spacing-far);
    }
  }

  .articles {
    --nc-ram-grid-gap: var(--spacing-base);
    --nc-ram-grid-min-width: 40ch;
  }
</style>
