<script lang="ts">
  import rssFile from "./assets/leaverou.xml?raw";
  import rssFile2 from "./assets/cssreflex.xml?raw";
  import rssFile3 from "./assets/echojs.xml?raw";
  import ArticleCard from "./components/ArticleCard.svelte";
  import Header from "./components/Header.svelte";
  import { RSSNode, RSSParser } from "./core";
  import AiSummarizer from "./components/AISummarizer.svelte";

  const rawFeed = new RSSParser(rssFile).feed;
  const rawFeed2 = new RSSParser(rssFile2).feed;
  const rawFeed3 = new RSSParser(rssFile3).feed;
  const feed: RSSNode[] = $state([]);

  for (const element of [...rawFeed, ...rawFeed2, ...rawFeed3]) {
    const item = new RSSNode(element);
    feed.push(item);
  }

  feed.sort((a, b) => {
    if (a.publishedAt && b.publishedAt) {
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    }
    return 0;
  });

  // const opml = new OPMLParser("https://nerdy.dev/subscriptions.opml");
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
  .main {
    padding: var(--spacing-near);
  }

  .articles {
    --nc-ram-grid-gap: var(--spacing-base);
    --nc-ram-grid-min-width: 28ch;
  }
</style>
