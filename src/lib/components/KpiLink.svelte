<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		icon,
		count,
		label,
		href,
		ariaLabel
	}: {
		icon: Snippet;
		count: number;
		label: string;
		href: HTMLAnchorElement['href'];
		ariaLabel: string;
	} = $props();
</script>

<a {href} class="nc-card link" aria-label={ariaLabel}>
	<div class="icon">
		{@render icon()}
	</div>
	<span class="count">{count}</span>
	<div class="label">{label}</div>
</a>

<style>
	.link {
        padding: var(--spacing-base);
		display: grid;
        align-items: center;
        column-gap: var(--spacing-base);
        row-gap: var(--spacing-nearest);
		grid:
			'icon count' auto
			'label label' auto
			/ 1fr auto;
	}

	.icon {
		grid-area: icon;
        color: var(--color-text-subtle);
	}

	.count {
		grid-area: count;
        font-weight: var(--font-weight-strong);
        font-size: var(--font-size-large);
        color: var(--color-brand-primary-base)
	}

	.label {
		grid-area: label;
        font-weight: var(--font-weight-strong);
		font-size: var(--font-size-medium);
		color: var(--color-text-base);
	}
</style>
