<script lang="ts" module>
  import type { RSSFeed } from "../core";
  let subscriptions: TSubscription[] = $state([]);
  let noSubscriptions = $derived(subscriptions.length);

  export type TSubscription = {
    key: string;
    name: string | null;
  };

  const getSubscriptions = async () => {
    const results: Record<string, RSSFeed> =
      await chrome.storage.local.get(null);

    const allSubscriptions: TSubscription[] = Object.entries(results).map(
      ([key, rssFeed]) => ({
        key,
        name: rssFeed.author,
      })
    );

    subscriptions = allSubscriptions;
  };

  getSubscriptions();
</script>

<div class="control-center">
  <details>
    <summary>RSS Feeds ({noSubscriptions})</summary>
    <div class="stack">
      {#each subscriptions as subscription}
        <div>{subscription.name}</div>
      {/each}
    </div>
  </details>
</div>

<style>
  @custom-media --md-n-above (width >= 768px);

  .control-center {
    display: flex;
    gap: var(--spacing-near);
    font-family: var(--font-family-sans);

    @media (--md-n-above) {
      gap: var(--spacing-base);
    }
  }

  .stack {
    display: flex;
    gap: var(--spacing-near);
    flex-wrap: wrap;
  }
</style>
