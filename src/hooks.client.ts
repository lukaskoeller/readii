import type { ClientInit } from '@sveltejs/kit';
import { db } from '$lib/db/index.svelte';
import pgWorkerURL from '$lib/pglite-worker?url';
import { PGliteWorker } from '@electric-sql/pglite/worker';
import { live } from '@electric-sql/pglite/live';

export const init: ClientInit = async () => {
	try {
		const database = await PGliteWorker.create(new Worker(pgWorkerURL, { type: 'module' }), {
			extensions: {
				live
			}
		});

		db.resolve(database);
	} catch (error) {
		db.reject(new Error('Error initializing database', { cause: error }));
	}
};
