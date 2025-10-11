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
  folders: many(mediaSourceToFolders),
}));

export type TMediaSource = typeof mediaSource.$inferInsert;

// Media Source Icon table
export const mediaSourceIcon = sqliteTable("media_source_icon", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url"),
  title: text("title").notNull(),
  mediaSourceId: integer("media_source_id").references(() => mediaSource.id, { onDelete: "cascade" }),
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

const mediaItemBase = {
  title: text("title"),
  type: text("type", { enum: ["text", "audio", "video"] }).notNull(),
  content: text("content").notNull(),
  contentSnippet: text("content_snippet"),
  contentTldr: text("content_tldr"),
  url: text("url").unique().notNull(),
  creator: text("creator"),
  publishedAt: text("published_at").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  enclosure: text("enclosure"),
} as const;

const mediaItemUserControlled = {
  isStarred: integer("is_starred", { mode: "boolean" }).default(false),
  isRead: integer("is_read", { mode: "boolean" }).default(false),
  isReadLater: integer("is_read_later", { mode: "boolean" }).default(false),
} as const;

export type TMediaItemUserControlled = keyof typeof mediaItemUserControlled;

// Media Item table
export const mediaItem = sqliteTable("media_item", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  mediaSourceId: integer("media_source_id")
    .notNull()
    .references(() => mediaSource.id, { onDelete: "cascade" }),
  ...mediaItemBase,
  ...mediaItemUserControlled,
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
      .references(() => mediaItem.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.mediaItemId, t.categoryId] })]
);

export const folder = sqliteTable("folder", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
});

export type TFolder = typeof folder.$inferInsert;

export const folderRelations = relations(folder, ({ many }) => ({
  mediaSources: many(mediaSourceToFolders),
}));

export const mediaSourceToFolders = sqliteTable(
  "media_sources_to_folders",
  {
    mediaSourceId: integer("media_source_id")
      .notNull()
      .references(() => mediaSource.id, { onDelete: "cascade" }),
    folderId: integer("folder_id")
      .notNull()
      .references(() => folder.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.mediaSourceId, t.folderId] })]
);

export const mediaSourceToFoldersRelations = relations(mediaSourceToFolders, ({ one }) => ({
  mediaSource: one(mediaSource, {
    fields: [mediaSourceToFolders.mediaSourceId],
    references: [mediaSource.id],
  }),
  folder: one(folder, {
    fields: [mediaSourceToFolders.folderId],
    references: [folder.id],
  }),
}));

export type TMediaSourceToFolders = typeof mediaSourceToFolders.$inferInsert;
