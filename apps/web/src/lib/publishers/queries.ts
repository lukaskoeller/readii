import type { PGQueryArgs } from '$lib/core/query.svelte';

export const publishersQueries = {
    all: {
        query: `SELECT * FROM publishers;`,
        params: null
    }
} satisfies Record<string, PGQueryArgs>;
