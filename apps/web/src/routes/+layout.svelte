<script lang="ts">
	import favicon from '@readii/assets/icons/favicon/svg';
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
</svelte:head>

<div class="wrapper">
	{@render children?.()}
</div>

<style>
	.wrapper {
		inline-size: 72ch;
		margin-inline: auto;
	}
</style>
