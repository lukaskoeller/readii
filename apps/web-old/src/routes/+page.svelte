<script lang="ts">
	import Feed from '$lib/components/Feed.svelte';
	import LanguageSwitch from '$lib/components/LanguageSwitch.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { GOOGLE_FORM_WAITLIST_URL } from '$lib/constants';
	import { m } from '$lib/paraglide/messages';
</script>

<header>
	<Logo />
	<LanguageSwitch />
</header>
<main>
	<p class="text">{m.intro()}</p>
	<div class="actions">
		<a
			class="nc-button -primary -small"
			href={GOOGLE_FORM_WAITLIST_URL}
			target="_blank"
			rel="noopener noreferrer">{m.join_waitlist_btn()}</a
		>
		<a
			class="nc-button -stealth -small"
			href="https://bsky.app/profile/readii.bsky.social"
			target="_blank"
			rel="noopener noreferrer">{m.feed_bluesky_btn()}</a
		>
	</div>
	<Feed />
</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: var(--spacing-far);
	}

	.text {
		margin-block: var(--spacing-far);
		margin-block-end: var(--spacing-base);
	}

	.actions {
		display: flex;
		justify-content: center;
		gap: var(--spacing-near);
		margin-block-start: var(--spacing-far);
		margin-block-end: var(--spacing-far);
	}
</style>
