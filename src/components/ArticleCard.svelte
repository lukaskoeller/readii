<script lang="ts">
  import { formatDistanceToNow, format } from "date-fns";
  import { RSSNode } from "../core";
  
  let { item }: { item: Element } = $props();
  const { title, publishedAt, author, link } = new RSSNode(item);
  const dateToNow = publishedAt ? formatDistanceToNow(publishedAt) : null;
  const htmlDatetime = publishedAt ? format(publishedAt, "yyyy-MM-dd") : null;
</script>

<article class="article">
  <h1 class="heading">{title}</h1>
  <time datetime={htmlDatetime}>{dateToNow}</time>
  {#if author}
    <address>
      by <a href={link} rel="author noopener noreferrer">{author}</a>
    </address>
  {/if}
  <!-- {@html item.getElementsByTagName("content:encoded")[0].innerHTML.replace("<![CDATA[", "").replace("]]>", "")} -->
  <a href={link} target="_blank" rel="noopener noreferrer"> Visit </a>
</article>

<style>
  .article {
    background-color: var(--color-surface-base);
    padding: var(--spacing-base);
    border-radius: var(--border-radius-large);
    border: 2px solid var(--color-border-subtle);
  }

  .heading {
    font-size: var(--font-size-large);
  }
</style>
