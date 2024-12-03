<script lang="ts">
  import ArticleCard from "./components/ArticleCard.svelte";
  import ControlCenter from "./components/ControlCenter.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Onboarding from "./components/Onboarding.svelte";
  import { feedHandler, onboardingHandler } from "./core/hooks.svelte";

  const isEmpty = $derived(
    !feedHandler.isLoading && feedHandler.feed.length === 0
  );
</script>

<Header />
<div class="wrapper">
  <div class="dashboard">
    <aside class="aside">
      <ControlCenter />
    </aside>
    <main>
      {#if !isEmpty && !onboardingHandler.isOnboarding}
        <div class="articles nc-ram-grid">
          {#each feedHandler.feed as data (data.link)}
            <ArticleCard item={data} />
          {/each}
        </div>
      {:else}
        <Onboarding />
      {/if}
    </main>
  </div>
</div>
<Footer />

<style>
  @custom-media --sm-n-above (width >= 480px);
  @custom-media --md-n-above (width >= 768px);
  .wrapper {
    min-block-size: 90vh;
    padding: var(--spacing-near);

    @media (--sm-n-above) {
      padding: var(--spacing-base);
    }

    @media (--md-n-above) {
      padding: var(--spacing-far);
    }
  }

  .dashboard {
    display: grid;
    gap: var(--spacing-far);

    @media (--md-n-above) {
      grid-template-columns: min(44ch, 100%) 3fr;
    }
  }

  .aside {
    min-inline-size: 0;
  }

  .articles {
    --nc-ram-grid-gap: var(--spacing-base);
    --nc-ram-grid-min-width: 40ch;
  }
</style>
