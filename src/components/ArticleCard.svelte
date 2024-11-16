<script lang="ts">
  import { formatDistanceToNow, format } from "date-fns";
  import { RSSNode } from "../core";

  const VT_CARD_NAME = "card";
  const VT_HEADING_NAME = "heading";
  const VT_ARTICLE_NAME = "article";

  let dialog: HTMLDialogElement;
  let dialogHeading: HTMLHeadingElement;
  let dialogArticle: HTMLElement;
  let card: HTMLButtonElement;
  let cardHeading: HTMLHeadingElement;

  let { item }: { item: Element } = $props();
  const { title, publishedAt, author, link, content } = new RSSNode(item);
  const dateToNow = publishedAt ? formatDistanceToNow(publishedAt) : null;
  const htmlDatetime = publishedAt ? format(publishedAt, "yyyy-MM-dd") : null;
</script>

{#snippet closeBtn()}
  <button
    class="close"
    onclick={() => {
      dialogArticle.style.viewTransitionName = VT_ARTICLE_NAME;
      document.startViewTransition(() => {
        dialog.style.viewTransitionName = "";
        dialogHeading.style.viewTransitionName = "";
        dialogArticle.style.viewTransitionName = "";
        dialog.close();
        card.style.viewTransitionName = VT_CARD_NAME;
        cardHeading.style.viewTransitionName = VT_HEADING_NAME;
      });
    }}>Close</button
  >
{/snippet}

{#snippet dateAndAuthor()}
  {#if dateToNow}
    <time class="time" datetime={htmlDatetime}>{dateToNow}</time>
  {/if}
  {#if author}
    <address class="address">
      <a href={link} target="_blank" rel="noopener noreferrer">{author}</a>
    </address>
  {/if}
{/snippet}

<dialog bind:this={dialog} class="dialog">
  <article class="nc-flow article" bind:this={dialogArticle}>
    {@render closeBtn()}
    <h2 class="heading" bind:this={dialogHeading}>{title}</h2>
    {@render dateAndAuthor()}
    {@html content}
  </article>
  <footer class="article-footer">
    {@render closeBtn()}
  </footer>
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
    if (priorCard) priorCard.style.viewTransitionName = "";
    if (priorHeading) priorHeading.style.viewTransitionName = "";

    card.style.viewTransitionName = VT_CARD_NAME;
    cardHeading.style.viewTransitionName = VT_HEADING_NAME;
    document.startViewTransition(() => {
      card.style.viewTransitionName = "";
      cardHeading.style.viewTransitionName = "";
      cardHeading.style.viewTransitionName = "";
      dialog.showModal();
      dialog.style.viewTransitionName = VT_CARD_NAME;
      dialogHeading.style.viewTransitionName = VT_HEADING_NAME;
      dialogArticle.style.viewTransitionName = VT_ARTICLE_NAME;
    });
  }}
  class="card"
>
  <h1 class="heading" bind:this={cardHeading}>{title}</h1>
  {@render dateAndAuthor()}
</button>

<style>
  @custom-media --md-n-above (width >= 768px);

  .card,
  .dialog {
    background-color: var(--color-surface-muted);
    padding: var(--spacing-base);
    border-radius: var(--border-radius-large);
  }

  .card {
    /* border: 2px solid var(--color-border-subtle); */
    text-decoration: none;
    text-align: start;
  }

  .heading {
    font-size: var(--font-size-large);
    max-inline-size: 100%;
  }

  .dialog {
    inline-size: min(100%, 80ch);
    block-size: 100vh;
    max-inline-size: 100%;
    margin-inline: auto;
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
  }

  .time {
    display: block;
    font-size: var(--font-size-small);
    /* color: var(--color-text-muted); */
    color: var(--color-brand-secondary-emphasis);
    margin-block-start: var(--spacing-near);
  }

  .close {
    display: block;
    margin-inline: auto;
    text-transform: uppercase;
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
