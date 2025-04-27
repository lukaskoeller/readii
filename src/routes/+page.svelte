<script lang="ts">
	import { ArticlesMutation, type TArticle } from '$lib/articles/mutations.svelte';
	import { articlesQueries } from '$lib/articles/queries';
	import { PGQuery } from '$lib/core/query.svelte';
	import { PublishersMutation } from '$lib/publishers/mutations.svelte';
	import { publishersQueries } from '$lib/publishers/queries';
	import testXML from '$lib/adam-argyle-rss.xml?url';
	import { RSSFeed } from '$lib/core/processor';
	import { onMount } from 'svelte';
	import { MixtureMutation } from '$lib/core/mutations.svelte';

	const mixtureMutation = new MixtureMutation();
	const articleMutation = new ArticlesMutation();
	const publisherMutation = new PublishersMutation();
	const articlesQuery = new PGQuery<TArticle>(articlesQueries.all);
	const articles = $derived(articlesQuery.result);
	const publishersQuery = new PGQuery<TArticle>(publishersQueries.all);
	const publishers = $derived(publishersQuery.result);

	onMount(() => {
		const getTestArticles = async () => {
			const rawXML = (await fetch(testXML).then((res) => res.text()));
			const feed = new RSSFeed(String(rawXML), "https://nerdy.dev/rss.xml");
			console.log("CREATE FEED!!!", feed);
			mixtureMutation.createFeed(feed.feed, feed.publisher)
		}
		getTestArticles();
	})

	const createArticle = async (event: SubmitEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const author = formData.get('author') as string;
		const article = { title, content, author };
		await articleMutation.create(article);
	};

	const createAuthor = async (event: SubmitEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const name = formData.get('name') as string;
		const url = formData.get('url') as string;
		const rssUrl = formData.get('rss-url') as string;
		const iconUrl = formData.get('icon-url') as string;
		const publisher = { name, url, rssUrl, iconUrl };
		await mixtureMutation.createFeed(null, publisher);
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<form onsubmit={createAuthor} class="form">
	<input type="text" name="name" placeholder="Name" value="Adam Argyle" />
	<input type="url" name="url" placeholder="URL" value="https://nerdy.dev" />
	<input type="url" name="rss-url" placeholder="RSS URL" value="https://nerdy.dev/rss.xml" />
	<input type="url" name="icon-url" placeholder="Icon URL" value="https://nerdy.dev/rss-icon.png" />
	<button type="submit">Submit Publisher</button>
</form>
<hr>
<form onsubmit={createArticle} class="form">
	<input type="text" name="title" placeholder="Title" />
	<textarea name="content" placeholder="Content"></textarea>
	<input type="text" name="author" placeholder="Author" />
	<button type="submit">Submit Article</button>
</form>
{#if publishers.isPending}
	Loading publishers…
{:else if publishers.isError}
	<p>Error: {publishers.error.message}</p>
{:else}
	<pre style="white-space: pre;">{JSON.stringify(publishers.data, null, 2)}</pre>
{/if}
<hr />
{#if articles.isPending}
	Loading articles…
{:else if articles.isError}
	<p>Error: {articles.error.message}</p>
{:else}
	<pre style="white-space: pre;">{JSON.stringify(articles.data, null, 2)}</pre>
{/if}


<style>
	.form {
		display: grid;
		gap: 1em;
		inline-size: min(48ch, 100%);
	}
</style>
