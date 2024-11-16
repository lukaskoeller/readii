<script lang="ts">
  import rssFile from "./assets/leaverou.xml?raw";
  import ArticleCard from "./components/ArticleCard.svelte";
  import Header from "./components/Header.svelte";
  import { RSSParser } from "./core";

  const feed = new RSSParser(rssFile).feed;

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
