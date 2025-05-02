<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, className }: { children: Snippet; className: string } = $props();
</script>

<ul class={`nc-card nc-stack list ${className}`}>
	{@render children()}
</ul>

<style>
	.list {
		list-style: none;
		padding-inline: var(--spacing-base);
		padding-block: calc(var(--spacing-base) - var(--spacing-near));
	}
</style>
