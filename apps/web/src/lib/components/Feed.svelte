<script>
	import { FEED_URL } from '$lib/constants';
	import { m } from '$lib/paraglide/messages';
	import FeedData from './FeedData.svelte';
</script>

<section>
	<h2 class="heading">{m.feed_heading()}</h2>
	<p class="intro">{m.feed_intro()}</p>
	<div class="actions">
		<a class="nc-button -primary -small" href={FEED_URL} target="_blank" rel="noopener noreferrer"
			>{m.feed_rss_btn()}</a
		>
		<a
			class="nc-button -stealth -small"
			href="https://bsky.app/profile/readii.bsky.social"
			target="_blank"
			rel="noopener noreferrer">{m.feed_bluesky_btn()}</a
		>
	</div>
	<svelte:boundary>
		<FeedData />
		{#snippet pending()}
			<p>{m.feed_loading()}</p>
		{/snippet}
	</svelte:boundary>
</section>

<style>
	.heading {
		margin-block-end: var(--spacing-base);
		color: var(--color-brand-primary-base);
	}

	.intro {
		color: var(--color-text-subtle);
	}

	.actions {
		display: flex;
		gap: var(--spacing-near);
		margin-block-start: var(--spacing-base);
		margin-block-end: var(--spacing-far);
	}
</style>
