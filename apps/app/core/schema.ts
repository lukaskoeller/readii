import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// Channel table
export const channel = sqliteTable("Channel", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  link: text("link").notNull().unique(),
  generator: text("generator"),
  last_build_date: text("last_build_date"),
  atom_link: text("atom_link"),
  copyright: text("copyright"),
  language: text("language"),
  web_master: text("web_master"),
  ttl: integer("ttl"),
  icon: text("icon"),
  logo: text("logo"),
});

export const channelRelations = relations(channel, ({ one, many }) => ({
  image: one(channelImage),
  items: many(item),
}));

export type TChannel = typeof channel.$inferInsert;

// ChannelImage table
export const channelImage = sqliteTable("ChannelImage", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  title: text("title").notNull(),
  link: text("link").notNull(),
  channel_id: integer("channel_id").references(() => channel.id),
});

export const channelImageRelations = relations(channelImage, ({ one }) => ({
  channel: one(channel, {
    fields: [channelImage.channel_id],
    references: [channel.id],
  }),
}));

export type TChannelImage = typeof channelImage.$inferInsert;

// Item table
export const item = sqliteTable("Item", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  channel_id: integer("channel_id")
    .notNull()
    .references(() => channel.id),
  title: text("title").notNull(),
  description: text("description"),
  link: text("link").notNull(),
  guid: text("guid").notNull().unique(),
  dc_creator: text("dc_creator"),
  pub_date: text("pub_date"),
  enclosure: text("enclosure"),
  media_thumbnail: text("media_thumbnail"),
});

export type TItem = typeof item.$inferInsert;

export const itemRelations = relations(item, ({ many, one }) => ({
  usersToGroups: many(itemToCategory),
  channel: one(channel, {
    fields: [item.channel_id],
    references: [channel.id],
  }),
}));

// Category table
export const category = sqliteTable("Category", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export type TCategory = typeof category.$inferInsert;

export const categoryRelations = relations(category, ({ many }) => ({
  usersToGroups: many(itemToCategory),
}));

export const itemToCategory = sqliteTable(
  "item_to_category",
  {
    itemId: integer("item_id")
      .notNull()
      .references(() => item.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => category.id),
  },
  (t) => [primaryKey({ columns: [t.itemId, t.categoryId] })]
);
