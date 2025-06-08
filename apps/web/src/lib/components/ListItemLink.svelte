<script lang="ts">
	let {
		label,
		href
	}: {
		label: string;
		href: HTMLAnchorElement['href'];
	} = $props();
</script>

<li class="item">
<a {href} class="link">
	<span>{label}</span>
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
		class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
		><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg
	>
</a>
</li>

<style>
    .item {
        margin: 0;
        border-block-end: var(--border-width-thin) solid var(--color-border-base);

        &:last-child {
            border-block-end: none;
        }
    }

    .link {
        display: flex;
        justify-content: space-between;
        text-decoration: none;
        padding-block: calc(var(--spacing-near) * 1.5);
        font-weight: var(--font-weight-strong);
    }
</style>
