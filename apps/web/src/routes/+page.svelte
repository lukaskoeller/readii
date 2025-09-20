<script lang="ts">
	import Feed from '$lib/components/Feed.svelte';
	import LanguageSwitch from '$lib/components/LanguageSwitch.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<header>
	<Logo />
	<LanguageSwitch />
</header>
<main>
	<p class="text">{m.intro()}</p>
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
		margin-block-end: var(--spacing-farthest);
	}
</style>
