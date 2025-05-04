<script lang="ts">
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
	import { page } from '$app/state';

	let { children } = $props();

	const isActiveLink = (href: string) => {
		const pathId = page.route.id;
		if (href === '/') {
			return pathId === href;
		}
		return pathId?.startsWith(href) || false;
	};
</script>

	<main class="main">
		{@render children()}
	</main>
	<header class="header">
		<nav class="nav">
			<a href="/" class={{ 'nav-link': true, active: isActiveLink('/') }}>
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
					class="icon icon-tabler icons-tabler-outline icon-tabler-home"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M5 12l-2 0l9 -9l9 9l-2 0"
					/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path
						d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"
					/></svg
				>
				<span>Home</span>
			</a>
			<a href="/articles" class={{ 'nav-link': true, active: isActiveLink('/articles') }}>
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
					class="icon icon-tabler icons-tabler-outline icon-tabler-layout-list"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
					/><path
						d="M4 14m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
					/></svg
				>
				<span>Feed</span>
			</a>
			<a href="/search" class={{ 'nav-link': true, active: isActiveLink('/search') }}>
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
					class="icon icon-tabler icons-tabler-outline icon-tabler-search"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"
					/><path d="M21 21l-6 -6" /></svg
				>
				<span>Search</span>
			</a>
			<a href="/profile" class={{ 'nav-link': true, active: isActiveLink('/profile') }}>
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
					class="icon icon-tabler icons-tabler-outline icon-tabler-user-circle"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
					/><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path
						d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
					/></svg
				>
				<span>Profile</span>
			</a>
		</nav>
	</header>

<style>
	.main {
		min-block-size: 100vh;
		padding: var(--spacing-base);
	}
	.header {
		inline-size: 100%;
		position: sticky;
		bottom: 0;
	}

	.nav {
		display: flex;
		justify-content: space-between;
		gap: var(--spacing-near);
		padding-block: var(--spacing-nearest);
		padding-inline: var(--spacing-base);
		background-color: var(--color-surface-base);
		border-block-start: var(--border-width-thin) solid var(--color-border-base);
	}

	.nav-link {
		text-decoration: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-tiny);
        font-weight: var(--font-weight-strong);
		font-size: var(--font-size-smallest);
		padding-inline: calc(var(--spacing-base) * 1.5);
		padding-block: var(--spacing-near);
		border-radius: var(--border-radius-medium);

		&.active {
			background-color: var(--color-surface-muted);
            color: var(--color-brand-primary-base);
		}
	}
</style>
