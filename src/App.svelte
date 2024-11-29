<script lang="ts">
  import ArticleCard from "./components/ArticleCard.svelte";
  import ControlCenter from "./components/ControlCenter.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Onboarding from "./components/Onboarding.svelte";
  import { RSSItem, RSSFeed } from "./core";

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
    initFeed();
  });

  initFeed();
</script>

<Header />
<main class="main">
  <!-- <ControlCenter /> -->
  <Onboarding />
  <div class="articles nc-ram-grid">
    {#each feed as data}
      <ArticleCard item={data} />
    {/each}
  </div>
</main>
<Footer />

<style>
  @custom-media --sm-n-above (width >= 480px);
  @custom-media --md-n-above (width >= 768px);
  .main {
    min-block-size: 90vh;
    padding: var(--spacing-near);

    @media (--sm-n-above) {
      padding: var(--spacing-base);
    }

    @media (--md-n-above) {
      padding: var(--spacing-far);
    }
  }

  .articles {
    --nc-ram-grid-gap: var(--spacing-base);
    --nc-ram-grid-min-width: 40ch;
  }
</style>
