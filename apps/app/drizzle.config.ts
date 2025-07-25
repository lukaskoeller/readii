import type { Config } from 'drizzle-kit';

export default {
  schema: './core/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;