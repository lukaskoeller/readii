<script lang="ts" module>
  import { feedHandler } from "../core/hooks.svelte";
  import Chip from "./Chip.svelte";

  let noSubscriptions = $derived(feedHandler.authors.length);
</script>

<div class="control-center">
  <details open>
    <summary>RSS Feeds ({noSubscriptions})</summary>
    <div class="nc-cluster">
      {#each feedHandler.authors as author}
        {#if author.name}
          <Chip title={author.name} src={author.image.url} />
        {/if}
      {/each}
    </div>
  </details>
</div>

<style>
  @custom-media --md-n-above (width >= 768px);

  .control-center {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
    font-family: var(--font-family-sans);
  }
</style>
