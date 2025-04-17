<script lang="ts">
	import { ArticlesMutation, type TArticle } from '$lib/articles.svelte';
	import { PGQuery } from '$lib/query.svelte';

	const articleMutation = new ArticlesMutation();
	const articlesQuery = new PGQuery<TArticle>('SELECT * FROM articles;');
	const articles = $derived(articlesQuery.result);

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const author = formData.get('author') as string;
		const article = { title, content, author };
		await articleMutation.create(article);
		console.log(article);
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<form onsubmit={handleSubmit} class="form">
	<input type="text" name="title" placeholder="Title" />
	<textarea name="content" placeholder="Content"></textarea>
	<input type="text" name="author" placeholder="Author" />
	<button type="submit">Submit</button>
</form>
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
