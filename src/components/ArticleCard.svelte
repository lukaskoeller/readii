<script lang="ts">
  import { formatDistanceToNow, format } from "date-fns";
  import { RSSItem } from "../core";
  import AiSummarizer from "./AISummarizer.svelte";

  const VT_CARD_NAME = "card";
  const VT_HEADING_NAME = "heading";
  const VT_ARTICLE_NAME = "article";
  const VT_META_NAME = "meta";

  let dialog: HTMLDialogElement;
  let dialogHeading: HTMLHeadingElement;
  let dialogMeta: HTMLDivElement;
  let dialogArticle: HTMLElement;
  let card: HTMLButtonElement;
  let cardHeading: HTMLHeadingElement;
  let cardMeta: HTMLDivElement;

  let { item }: { item: RSSItem } = $props();
  let isDialogOpen = $state(false);
  const { title, publishedAt, author, link, content } = item;
  const dateToNow = publishedAt ? formatDistanceToNow(publishedAt) : null;
  const htmlDatetime = publishedAt ? format(publishedAt, "yyyy-MM-dd") : null;
</script>

{#snippet closeBtn()}
  <button
    class="close"
    aria-label="Close dialog"
    onclick={() => {
      dialogArticle.style.viewTransitionName = VT_ARTICLE_NAME;
      document.startViewTransition(() => {
        dialog.style.viewTransitionName = "";
        dialogHeading.style.viewTransitionName = "";
        dialogMeta.style.viewTransitionName = "";
        dialogArticle.style.viewTransitionName = "";
        dialog.close();
        isDialogOpen = false;
        card.style.viewTransitionName = VT_CARD_NAME;
        cardHeading.style.viewTransitionName = VT_HEADING_NAME;
        cardMeta.style.viewTransitionName = VT_META_NAME;
      });
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon icon-tabler icons-tabler-outline icon-tabler-x"
      ><path stroke="none" d="M0 0h24v24H0z" fill="inherit" /><path
        d="M18 6l-12 12"
      /><path d="M6 6l12 12" /></svg
    >
  </button>
{/snippet}

{#snippet dataAndAuthor()}
  {#if dateToNow}
    <time class="time" datetime={htmlDatetime}>{dateToNow}</time>
  {/if}
  {#if author}
    <address class="address">
      <a
        class="author-link"
        href={link}
        target="_blank"
        rel="noopener noreferrer">{author}</a
      >
    </address>
  {/if}
{/snippet}

<dialog bind:this={dialog} class="dialog">
  <header class="dialog-header">
    {@render closeBtn()}
  </header>
  <article class="nc-flow article" bind:this={dialogArticle}>
    <h2 class="heading" bind:this={dialogHeading}>{title}</h2>
    <div class="dialog-meta" bind:this={dialogMeta}>
      {@render dataAndAuthor()}
    </div>
    {#if content && isDialogOpen}
      <AiSummarizer text={content} />
    {/if}
    {@html content}
  </article>
</dialog>
<button
  bind:this={card}
  onclick={() => {
    const priorCard = document.querySelector(
      `[style*="view-transition-name: ${VT_CARD_NAME}"]`
    ) as HTMLButtonElement | null;
    const priorHeading = document.querySelector(
      `[style*="view-transition-name: ${VT_HEADING_NAME}"]`
    ) as HTMLHeadElement | null;
    const priorMeta = document.querySelector(
      `[style*="view-transition-name: ${VT_META_NAME}"]`
    ) as HTMLHeadElement | null;
    if (priorCard) priorCard.style.viewTransitionName = "";
    if (priorHeading) priorHeading.style.viewTransitionName = "";
    if (priorMeta) priorMeta.style.viewTransitionName = "";

    card.style.viewTransitionName = VT_CARD_NAME;
    cardHeading.style.viewTransitionName = VT_HEADING_NAME;
    cardMeta.style.viewTransitionName = VT_META_NAME;
    document.startViewTransition(() => {
      card.style.viewTransitionName = "";
      cardHeading.style.viewTransitionName = "";
      cardMeta.style.viewTransitionName = "";
      dialog.showModal();
      isDialogOpen = true;
      dialog.style.viewTransitionName = VT_CARD_NAME;
      dialogHeading.style.viewTransitionName = VT_HEADING_NAME;
      dialogMeta.style.viewTransitionName = VT_META_NAME;
      dialogArticle.style.viewTransitionName = VT_ARTICLE_NAME;
    });
  }}
  class="card"
>
  <h1 class="heading" bind:this={cardHeading}>{title}</h1>
  <div class="card-meta" bind:this={cardMeta}>
    {@render dataAndAuthor()}
  </div>
</button>

<style>
  @custom-media --md-n-above (width >= 768px);

  .card,
  .dialog {
    background-color: var(--color-surface-muted);
    padding: var(--spacing-base);
    border-radius: var(--border-radius-large);
  }

  .dialog-header {
    display: flex;
    justify-content: end;
    position: sticky;
    top: 0;
  }

  .card {
    /* border: 2px solid var(--color-border-subtle); */
    text-decoration: none;
    text-align: start;
    display: grid;
  }

  .heading {
    font-size: var(--font-size-large);
    max-inline-size: 100%;
  }

  .dialog {
    inline-size: min(100%, 160ch);
    margin-inline: auto;
    block-size: 100vh;
    max-inline-size: 100%;
    margin-block-start: var(--spacing-base);
    position: fixed;
    inset: 0;
    inset-block-start: auto;
    display: grid;
    align-content: start;
    overscroll-behavior: contain;

    @media (--md-n-above) {
      inset-block-end: auto;
    }

    &::backdrop {
      backdrop-filter: blur(12px);
    }

    &:not([open]) {
      pointer-events: none;
      opacity: 0;
    }
  }

  .article {
    min-inline-size: 0;
    overflow-wrap: break-word;
    inline-size: min(100%, 80ch);
    margin-inline: auto;
  }

  .card-meta,
  .dialog-meta {
    display: flex;
    gap: var(--spacing-base);
    margin-block-start: var(--spacing-base);
  }

  .card-meta {
    align-self: end;
  }

  .time,
  .author-link {
    display: block;
    font-family: var(--font-family-sans);
    font-weight: var(--font-weight-strong);
    font-size: var(--font-size-small);
    font-style: normal;
    text-decoration: none;
    /* color: var(--color-brand-secondary-emphasis); */
    color: var(--color-text-subtle);
  }

  .close {
    padding: var(--spacing-near);
    border-radius: 100%;
  }

  .article-footer {
    margin-block: var(--spacing-far);
  }

  ::view-transition-old(card),
  ::view-transition-new(card) {
    block-size: 100%;
    overflow: clip;
  }

  ::view-transition-old(heading),
  ::view-transition-new(heading) {
    inline-size: auto;
  }

  ::view-transition-old(meta),
  ::view-transition-new(meta) {
    inline-size: auto;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    70% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0%);
    }
    20% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  ::view-transition-group(*) {
    animation-duration: 0.4s;
  }

  ::view-transition-old(article) {
    animation-name: fadeOut;
  }

  ::view-transition-new(article) {
    block-size: auto;
    animation-name: fadeIn;
  }
</style>
