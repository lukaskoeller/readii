<script lang="ts">
	import { Articles } from "$lib/articles.schema";

	const articleHandler = new Articles();

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const author = formData.get('author') as string;
		const article = { title, content, author };
		await articleHandler.create(article);
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
{#await articleHandler.read()}
	Loading articles…
{:then articles} 
	<pre style="white-space: pre;">{JSON.stringify(articles, null, 2)}</pre>
{:catch error}
	<p>Something went wrong</p>
	<p>{error}</p>
{/await}

<style>
	.form {
		display: grid;
		gap: 1em;
		inline-size: min(48ch, 100%);
	}
</style>
