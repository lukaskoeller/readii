import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const newsletterFeedsTable = sqliteTable("newsletter_feeds", {
  id: text().primaryKey().notNull(), // UUID as primary key
  title: text().notNull(),
  iconUrl: text(),
  description: text(),
});
