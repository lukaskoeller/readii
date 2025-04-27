import type { Results } from '@electric-sql/pglite';
import { db } from '../db/index.svelte';

export type TQueryResult<T> =
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
}

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
				await client.live.query<TResponseTData>(args.query, args.params, (results) => {
					this.result = {
						status: 'success',
						isPending: false,
						isSuccess: true,
						isError: false,
						data: results,
						error: undefined
					};
				});
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
