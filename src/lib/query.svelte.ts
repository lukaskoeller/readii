import type { Results } from '@electric-sql/pglite';
import { db } from './db/index.svelte';

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

export class PGQuery<TResponseTData extends Record<string, unknown>> {
	result: TQueryResult<TResponseTData> = $state({
		status: 'pending',
		isPending: true,
		isSuccess: false,
		isError: false,
		data: undefined,
		error: undefined
	});

	constructor(query: string, params?: unknown[] | undefined | null) {
		const getResults = async () => {
			console.log('getResults');

			try {
				const client = await db.promise;
				this.result.status = 'pending';
				console.log('pending', client);
				await client.live.query<TResponseTData>(query, params, (results) => {
					console.log('success', results);

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
				console.log('error', err);
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
