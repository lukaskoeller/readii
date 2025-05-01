<script lang="ts">
	import type { TArticle } from '$lib/articles/mutations.svelte';
	import { articlesQueries } from '$lib/articles/queries';
	import { PGQuery } from '$lib/core/query.svelte';

	const articlesQuery = new PGQuery<TArticle>(articlesQueries.all);
	const articles = $derived(articlesQuery.result);
    
    $effect(() => {
        console.log(articles.data?.rows);
    });
</script>

<section class="nc-stack">
    <h1>Articles</h1>
    <div class="nc-stack -near articles">
        {#each (articles.data?.rows ?? [] as TArticle[]) as article}
            <a href={`/articles/${article.id}`} class="nc-card card">
                <h2 class="heading">{article.title}</h2>
                <div class="meta">
                    <small>Author: {article.author}</small>
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
