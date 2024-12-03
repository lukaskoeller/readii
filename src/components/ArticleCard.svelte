<script lang="ts">
  import { formatDistanceToNow, format } from "date-fns";
  import { RSSItem } from "../core";
  import AiSummarizer from "./AISummarizer.svelte";
  import CloseIconButton from "./CloseIconButton.svelte";

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

  const { title, publishedAt, author, publisher, link, content } = item;
  const isExternal = Boolean(!content && link);

  const dateToNow = publishedAt ? formatDistanceToNow(publishedAt) : null;
  const htmlDatetime = publishedAt ? format(publishedAt, "yyyy-MM-dd") : null;

  type TMetaDataArgs = {
    dateToNow: typeof dateToNow;
    htmlDatetime: typeof htmlDatetime;
  } & Pick<RSSItem, "publisher"> &
    Partial<Pick<RSSItem, "author" | "link">>;
</script>

{#snippet externalLinkIcon()}
  <span class="external-icon">
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
      class="icon icon-tabler icons-tabler-outline icon-tabler-external-link"
      ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
        d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"
      /><path d="M11 13l9 -9" /><path d="M15 4h5v5" />
    </svg>
  </span>
{/snippet}

{#snippet closeBtn()}
  <CloseIconButton
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
  />
{/snippet}

{#snippet cardBody(args: TMetaDataArgs)}
  <h1 class="heading" bind:this={cardHeading}>{title}</h1>
  <div class="card-meta" bind:this={cardMeta}>
    {@render metaData(args)}
  </div>
{/snippet}

{#snippet metaData({
  dateToNow,
  htmlDatetime,
  author,
  link,
  publisher,
}: TMetaDataArgs)}
  <span class="nc-cluster -base meta-cluster">
    {#if dateToNow}
      <time class="time" datetime={htmlDatetime}>{dateToNow}</time>
    {/if}
    {#if publisher}
      <address class="address">
        {publisher}
      </address>
    {/if}
    {#if author}
      <span>
        {author}
      </span>
    {/if}
    {#if link}
      <a
        class="publisher-link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        go to article {@render externalLinkIcon()}
      </a>
    {/if}
  </span>
  {#if isExternal}
    {@render externalLinkIcon()}
  {/if}
{/snippet}

{#if isExternal}
  <a
    class="card article-card"
    target="_blank"
    rel="noopener noreferrer"
    href={link}
  >
    {@render cardBody({
      dateToNow,
      htmlDatetime,
      publisher,
    })}
  </a>
{:else}
  <dialog bind:this={dialog} class="dialog card article-dialog">
    <header class="dialog-header">
      {@render closeBtn()}
    </header>
    <article class="nc-flow article" bind:this={dialogArticle}>
      <h2 class="heading" bind:this={dialogHeading}>{title}</h2>
      <div class="dialog-meta" bind:this={dialogMeta}>
        {@render metaData({
          dateToNow,
          htmlDatetime,
          author,
          link,
          publisher,
        })}
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
    class="card article-card"
  >
    {@render cardBody({
      dateToNow,
      htmlDatetime,
      publisher,
    })}
  </button>
{/if}

<style>
  @custom-media --md-n-above (width >= 768px);

  .dialog-header {
    display: flex;
    justify-content: end;
    position: sticky;
    top: 0;
  }

  .article-card {
    /* border: 2px solid var(--color-border-subtle); */
    text-decoration: none;
    text-align: start;
    display: grid;
  }

  .heading {
    font-size: var(--font-size-large);
    max-inline-size: 100%;
  }

  .article-dialog {
    inline-size: min(100%, 160ch);
    margin-block-start: var(--spacing-base);
    block-size: calc(100vh - var(--spacing-base));
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
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-base);
    margin-block-start: var(--spacing-base);
    /* color: var(--color-brand-secondary-emphasis); */
    font-family: var(--font-family-sans);
    font-weight: var(--font-weight-strong);
    font-size: var(--font-size-small);
    font-style: normal;
    color: var(--color-text-subtle);
  }

  .card-meta {
    align-self: end;
    justify-content: space-between;
    min-inline-size: 0;
  }

  .meta-cluster {
    min-inline-size: 0;
    row-gap: var(--spacing-near);
  }

  .address {
    font-style: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .external-icon {
    display: inline-block;
    inline-size: 1rem;
  }

  .time,
  .publisher-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-near);
    font-family: var(--font-family-sans);
    font-weight: var(--font-weight-strong);
    font-size: var(--font-size-small);
    font-style: normal;
    text-decoration: none;
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
