import type { PGQueryArgs } from '$lib/core/query.svelte';

export const articlesQueries = {
	all: {
		query: `SELECT * FROM articles;`,
		params: null
	}
} satisfies Record<string, PGQueryArgs>;
