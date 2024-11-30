<script lang="ts">
  import ArticleCard from "./components/ArticleCard.svelte";
  import ControlCenter from "./components/ControlCenter.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Onboarding from "./components/Onboarding.svelte";
  import { feedHandler } from "./core/hooks.svelte";
</script>

<Header />
<main class="main">
  <Onboarding />
  <div class="dashboard">
    <aside>
      <ControlCenter />
    </aside>
    <div class="articles nc-ram-grid">
      {#each feedHandler.feed as data}
        <ArticleCard item={data} />
      {/each}
    </div>
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

  .dashboard {
    display: grid;
    grid-template-columns: min(44ch, 100%) 3fr;
    gap: var(--spacing-far);
  }

  .articles {
    --nc-ram-grid-gap: var(--spacing-base);
    --nc-ram-grid-min-width: 40ch;
  }
</style>
