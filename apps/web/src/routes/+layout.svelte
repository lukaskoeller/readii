<script lang="ts">
	import favicon from '@readii/assets/icons/favicon/svg';
	import ogimage from '@readii/assets/images/ogimage';
	import '$lib/styles/theme.css';
	// import "@nordcode/ui/utils/media"
	import '@nordcode/ui/bundle';
	import '@nordcode/ui/utils/layouts';
	import '@nordcode/ui/components/card';
	import '@nordcode/ui/components/forms';
	import '@nordcode/ui/components/inputs';
	import '@nordcode/ui/components/buttons';
	import '@nordcode/ui/components/gallery';
	import '$lib/styles/overrides.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>readii - RSS Reader</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content="A cross-platform app that allows you to follow content from across the internet in one place. Whether it's your favorite blogs, websites, or newsletters. Filter and customize your content according to your personal interests.">
	<meta property="og:image" content={ogimage}/>
</svelte:head>

<div class="wrapper">
	{@render children?.()}
</div>

<style>
	.wrapper {
		inline-size: min(60ch, 100%);
		padding-inline: var(--spacing-base);
		margin-inline: auto;
	}
</style>
