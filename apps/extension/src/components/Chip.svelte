<script lang="ts">
  type ChipProps = {
    title: string;
    /** URL to an img shown as avatar */
    src?: string | null;
    /**
     * If `onclick` is provided, the `<Chip>`
     * is rendered as a `<button>`.
     */
    onclick?: () => void;
  };

  let { onclick, title, src }: ChipProps = $props();
</script>

{#snippet body()}
  {#if src}
    <img class="img" {src} alt={title} />
  {/if}
  <span class="title">{title}</span>
{/snippet}

{#if onclick}
  <button type="button" class="chip" onclick={onclick}>
    {@render body()}
  </button>
{:else}
  <div class="chip">
    {@render body()}
  </div>
{/if}

<style>
  .chip {
    --size: 2rem;
    --padding: var(--spacing-nearest);

    display: inline-flex;
    align-items: center;
    min-inline-size: 0;
    gap: var(--spacing-near);
    padding: var(--padding);
    block-size: var(--size);
    border-radius: var(--size);
    border: 1px solid var(--color-border-base);
    background: unset;
  }

  .img {
    block-size: calc(var(--size) * 0.625);
    aspect-ratio: 1/1;
    border-radius: 100%;
    object-fit: cover;
    overflow: hidden;
  }

  .title {
    --margin: var(--padding);

    font-family: var(--font-family-sans);
    font-size: var(--font-size-smallest);
    font-weight: var(--font-weight-strong);
    margin-inline-end: var(--margin);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &:only-child {
      margin-inline-start: var(--margin);
    }
  }
</style>
