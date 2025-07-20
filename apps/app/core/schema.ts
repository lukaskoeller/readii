import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// Media Source table
export const mediaSource = sqliteTable("media_source", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  feedUrl: text("feed_url").unique().notNull(),
  logoUrl: text("logo"),
  lastBuildAt: text("last_build_at"),
  lastFetchedAt: text("last_fetched_at").notNull(),
  language: text("language"),
  generator: text("generator"),
  // categories
});

export const mediaSourceRelations = relations(mediaSource, ({ one, many }) => ({
  icon: one(mediaSourceIcon),
  items: many(mediaItem),
}));

export type TMediaSource = typeof mediaSource.$inferInsert;

// Media Source Icon table
export const mediaSourceIcon = sqliteTable("media_source_icon", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url"),
  title: text("title").notNull(),
  mediaSourceId: integer("media_source_id").references(() => mediaSource.id),
});

export const mediaSourceIconRelations = relations(
  mediaSourceIcon,
  ({ one }) => ({
    mediaSource: one(mediaSource, {
      fields: [mediaSourceIcon.mediaSourceId],
      references: [mediaSource.id],
    }),
  })
);

export type TMediaSourceIcon = typeof mediaSourceIcon.$inferInsert;

// Media Item table
export const mediaItem = sqliteTable("media_item", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  mediaSourceId: integer("media_source_id")
    .notNull()
    .references(() => mediaSource.id),
  title: text("title").notNull(),
  type: text("type", { enum: ["text", "audio", "video"] }).notNull(),
  content: text("content").notNull(),
  contentSnippet: text("content_snippet"),
  contentTldr: text("content_tldr"),
  url: text("url").notNull(),
  creator: text("creator"),
  publishedAt: text("published_at").notNull(),
  thumbnail: text("thumbnail"),
  enclosure: text("enclosure"),
  isStarred: integer("is_starred", { mode: "boolean" }).default(false),
  isRead: integer("is_read", { mode: "boolean" }).default(false),
  isReadLater: integer("is_read_later", { mode: "boolean" }).default(false),
});

export type TMediaItem = typeof mediaItem.$inferInsert;

export const mediaItemsRelations = relations(mediaItem, ({ many, one }) => ({
  categories: many(mediaItemsToCategories),
  mediaSource: one(mediaSource, {
    fields: [mediaItem.mediaSourceId],
    references: [mediaSource.id],
  }),
}));

// Category table
export const category = sqliteTable("Category", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export type TCategory = typeof category.$inferInsert;

export const categoryRelations = relations(category, ({ many }) => ({
  mediaItems: many(mediaItemsToCategories),
}));

export const mediaItemsToCategories = sqliteTable(
  "media_items_to_categories",
  {
    mediaItemId: integer("media_item_id")
      .notNull()
      .references(() => mediaItem.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => category.id),
  },
  (t) => [primaryKey({ columns: [t.mediaItemId, t.categoryId] })]
);
