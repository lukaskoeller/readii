<script lang="ts">
	import { mediaItemQueries } from '$lib/mediaItems/queries';
	import { PGQuery } from '$lib/core/query.svelte';
	import type { TMediaItem } from '$lib/mediaItems/schema';

	const articlesQuery = new PGQuery<TMediaItem>(mediaItemQueries.all);
	const articles = $derived(articlesQuery.result);
</script>

<section class="nc-stack">
    <h1>Articles</h1>
    <div class="nc-stack -near articles">
        {#each (articles.data?.rows ?? [] as TMediaItem[]) as article}
            <a href={`/articles/${article.id}`} class="nc-card card">
                <h2 class="heading">{article.title}</h2>
                <div class="meta">
                    <small style="font-size: var(--font-size-smallest); font-weight: bold">Author: {article.author}</small>
                     - 
                    <small style="font-size: var(--font-size-smallest); font-weight: bold">{article.publishedAt}</small>
                </div>
            </a>
        {/each}
    </div>
</section>

<style>
    .articles {
        inline-size: 100%;
    }

    .card {
        inline-size: 100%;
        padding: var(--spacing-near);
        border: 0;
        background-color: var(--color-surface-muted);
    }

    .heading {
        font-size: var(--font-size-base);
    }

    .meta {
        color: var(--color-text-subtle);
    }
</style>
