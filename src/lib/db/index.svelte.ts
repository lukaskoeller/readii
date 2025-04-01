import { PGliteWorker } from '@electric-sql/pglite/worker';

export const db = $state(Promise.withResolvers<PGliteWorker>());
