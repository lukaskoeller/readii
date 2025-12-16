<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { dayMonthYearTimeFormat } from '$lib/utils';
	import { getFeed } from './feed.remote';
	import logo from '@readii/assets/icons/app/svg';
</script>

<div class="container">
	{#each await getFeed() as item}
		{@const publishedAt = new Date(item.publishedAt)}
		<article class="item">
			<div class="logo">
				<img class="img" src={logo} alt="" />
			</div>
			<div class="main">
				<time datetime={publishedAt.toISOString()} class="meta">
					{publishedAt ? dayMonthYearTimeFormat.format(publishedAt) : ''}
				</time>
				<p class="content">{@html item.content}</p>
				<div class="actions">
					<a href={item.url} target="_blank" rel="noopener noreferrer" class="link"
						>{m.feed_item_link()}</a
					>
				</div>
			</div>
		</article>
	{/each}
</div>

<style>
	.container {
		margin-block: var(--spacing-base);
		display: flex;
		flex-direction: column;
	}

	.item {
		display: flex;
		gap: var(--spacing-base);
		padding-block: var(--spacing-far);
		border-block-end: var(--border-width-thin) solid var(--color-border-base);
	}

	.meta {
		font-family: var(--font-family-default);
		font-size: var(--font-size-small);
		color: var(--color-text-subtle);
		text-box: trim-both cap text;
	}

	.content {
		min-inline-size: 0;
		word-break: break-word;
		text-wrap: pretty;
		white-space: pre-wrap;
		margin-block-start: var(--spacing-near);
		font-size: var(--font-size-large);
	}

	.logo {
		inline-size: 42px;
		block-size: 42px;
		flex-shrink: 0;
	}

	.main {
		flex-grow: 1;
	}

	.img {
		inline-size: 100%;
		block-size: 100%;
		border-radius: var(--border-radius-round);
		border: var(--border-width-thin) solid var(--color-border-base);
	}

	.actions {
		display: flex;
		justify-content: end;
		margin-block-start: var(--spacing-base);
		font-size: var(--font-size-small);
		color: var(--font-text-subtle);
	}

	.link {
		color: var(--color-text-subtle);
	}
</style>
