import type { LiveNamespace } from '@electric-sql/pglite/live';
import { PGliteWorker } from '@electric-sql/pglite/worker';

export const db = $state(
	Promise.withResolvers<
		PGliteWorker & {
			live: LiveNamespace;
		}
	>()
);
