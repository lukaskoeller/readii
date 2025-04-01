import type { ClientInit } from '@sveltejs/kit';
import { db } from '$lib/db/index.svelte';
import PGWorker from '$lib/pglite-worker?worker';
import { PGliteWorker } from '@electric-sql/pglite/worker';

export const init: ClientInit = () => {
	try {
		const pgWorker = new PGWorker({
			type: 'module'
		});
	
		const database = new PGliteWorker(pgWorker);
		
		db.resolve(database);
	} catch (error) {
		db.reject(new Error("Error initializing database", { cause: error }));
	}
};
