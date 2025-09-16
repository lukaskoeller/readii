import type { Results } from '@electric-sql/pglite';
import { db } from '../db/index.svelte';
import { SvelteMap } from 'svelte/reactivity';

export type TQueryResult<T = Record<string, unknown>> =
	| {
			status: 'pending';
			isPending: true;
			isSuccess: false;
			isError: false;
			data: undefined;
			error: undefined;
	  }
	| {
			status: 'success';
			isPending: false;
			isSuccess: true;
			isError: false;
			data: Results<T>;
			error: undefined;
	  }
	| {
			status: 'error';
			isPending: false;
			isSuccess: false;
			isError: true;
			data: undefined;
			error: Error;
	  };

export type PGQueryArgs = {
	query: string;
	params?: unknown[] | undefined | null;
};

export class PGQuery<TResponseTData extends Record<string, unknown>> {
	result: TQueryResult<TResponseTData> = $state({
		status: 'pending',
		isPending: true,
		isSuccess: false,
		isError: false,
		data: undefined,
		error: undefined
	});

	constructor(args: PGQueryArgs) {
		const getResults = async () => {
			try {
				const client = await db.promise;
				this.result.status = 'pending';
				const queryKey = getQueryKey(args);

				if (queryCache.has(queryKey)) {
					this.result = queryCache.get(queryKey) as TQueryResult<TResponseTData>;
				} else {
					await client.live.query<TResponseTData>(args.query, args.params, (results) => {
						this.result = {
							status: 'success',
							isPending: false,
							isSuccess: true,
							isError: false,
							data: results,
							error: undefined
						};
						queryCache.set(queryKey, this.result);
					});
				}
			} catch (err) {
				this.result = {
					status: 'error',
					isPending: false,
					isSuccess: false,
					isError: true,
					data: undefined,
					error: err as Error
				};
			}
		};
		getResults();
	}
}

export type TQueryKey = `${PGQueryArgs['query']}-${string}`; // Composes of the query sql string and an optional stringified array of params

export const getQueryKey = (args: PGQueryArgs): TQueryKey => {
	const queryKey = `${args.query}-${(args.params ?? []).toString()}`;
	return queryKey as TQueryKey;
};

export const queryCache = new SvelteMap<TQueryKey, TQueryResult>();
