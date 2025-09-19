<script>
	import FeedData from './FeedData.svelte';
</script>

<section>
	<h2 class="heading">Feed</h2>
	<p>Stay updated with the latest updates on readii.</p>
	<svelte:boundary>
		<FeedData />
		{#snippet pending()}
			<p>Loading feed data...</p>
		{/snippet}
	</svelte:boundary>
</section>

<style>
	.heading {
		margin-block-end: var(--spacing-near);
	}
</style>
