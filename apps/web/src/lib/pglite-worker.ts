// my-pglite-worker.js
import { PUBLIC_DATABASE_URL } from '$env/static/public'
import { PGlite } from '@electric-sql/pglite'
import { worker } from '@electric-sql/pglite/worker'

worker({
  async init() {
    // Create and return a PGlite instance
    console.log("INIT PG LITE WORKER");
    
    return new PGlite(PUBLIC_DATABASE_URL, {
      // relaxedDurability: true, @todo Activate for alpha
    })
  },
})