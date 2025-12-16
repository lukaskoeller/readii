<script>
	import { FEED_URL } from '$lib/constants';
	import { m } from '$lib/paraglide/messages';
	import FeedData from './FeedData.svelte';
</script>

<section>
	<!-- <h2 class="heading">{m.feed_heading()}</h2>
	<p class="intro">{m.feed_intro()}</p> -->
	<svelte:boundary>
		<FeedData />
		{#snippet pending()}
			<!-- <p>{m.feed_loading()}</p> -->
		{/snippet}
	</svelte:boundary>
</section>
