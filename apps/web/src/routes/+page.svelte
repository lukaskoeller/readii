<script lang="ts">
	import testXML from '$lib/adam-argyle-rss.xml?url';
	import { RSSFeed } from '$lib/core/processor';
	import { onMount } from 'svelte';
	import { MixtureMutation } from '$lib/core/mutations.svelte';
	import KpiLink from '$lib/components/KpiLink.svelte';
	import ListItemLink from '$lib/components/ListItemLink.svelte';
	import ListCard from '$lib/components/ListCard.svelte';

	const mixtureMutation = new MixtureMutation();

	onMount(() => {
		const getTestArticles = async () => {
			const url = "http://rachelandrew.co.uk/feed/"; 
			const feed = await new RSSFeed().init(`https://corsproxy.io/?url=${url}`);
			console.log("FEED", feed);
			
			mixtureMutation.createFeed(feed.feed, feed.publisher);
		};
		getTestArticles();
	});
</script>

<div class="nc-stack -far main-stack">
	<section class="nc-stack -near welcome">
		<h1>Moin, Lukas</h1>
		<p>Liebe ist tatsächlich ein Geschenk</p>
	</section>
	<section class="two-grid">
		<KpiLink
			href="/articles?filter=unread"
			count={13}
			label="Unread"
			ariaLabel="Go to unread articles"
		>
			{#snippet icon()}
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
					class="icon icon-tabler icons-tabler-outline icon-tabler-notification"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M10 6h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
					/><path d="M17 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg
				>
			{/snippet}
		</KpiLink>
		<KpiLink
			href="/articles?filter=starred"
			count={7}
			label="Starred"
			ariaLabel="See starred articles"
		>
			{#snippet icon()}
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
					class="icon icon-tabler icons-tabler-outline icon-tabler-star"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
					/></svg
				>
			{/snippet}
		</KpiLink>
		<KpiLink
			href="/articles?filter=read"
			count={11}
			label="Read Later"
			ariaLabel="See read later articles"
		>
			{#snippet icon()}
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
					class="icon icon-tabler icons-tabler-outline icon-tabler-clock"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"
					/><path d="M12 7v5l3 3" /></svg
				>
			{/snippet}
		</KpiLink>
	</section>
	<section class="nc-stack -base">
		<h2>Your categories</h2>
		<ListCard className="categories-list">
			<ListItemLink href="/articles?filter=unread&category=technology" label="Technology" />
			<ListItemLink href="/articles?filter=unread&category=design" label="Design" />
			<ListItemLink href="/articles?filter=unread&category=business" label="Business" />
			<ListItemLink href="/articles?filter=unread&category=startups" label="Startups" />
		</ListCard>
	</section>
	<section class="more nc-stack -base">
		<h2>More</h2>
		<div class="nc-stack -near actions">
			<a href="/search" type="button" class="nc-button -muted">Add Feed</a>
		</div>
	</section>
</div>

<style>
	.main-stack {
		align-items: stretch;
	}
	.welcome {
		margin-block-start: var(--spacing-far);
		margin-block-end: var(--spacing-base);
	}

	.two-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-near);
	}

	.categories-list {
		align-items: stretch;
	}

	.actions {
		inline-size: 100%;
		align-items: stretch;
	}
</style>
