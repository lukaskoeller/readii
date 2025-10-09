CREATE TABLE `folder` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folder_name_unique` ON `folder` (`name`);--> statement-breakpoint
CREATE TABLE `media_sources_to_folders` (
	`media_source_id` integer NOT NULL,
	`folder_id` integer NOT NULL,
	PRIMARY KEY(`media_source_id`, `folder_id`),
	FOREIGN KEY (`media_source_id`) REFERENCES `media_source`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`folder_id`) REFERENCES `folder`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_media_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`media_source_id` integer NOT NULL,
	`title` text,
	`type` text NOT NULL,
	`content` text NOT NULL,
	`content_snippet` text,
	`content_tldr` text,
	`url` text NOT NULL,
	`creator` text,
	`published_at` text NOT NULL,
	`thumbnail_url` text,
	`enclosure` text,
	`is_starred` integer DEFAULT false,
	`is_read` integer DEFAULT false,
	`is_read_later` integer DEFAULT false,
	FOREIGN KEY (`media_source_id`) REFERENCES `media_source`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_media_item`("id", "media_source_id", "title", "type", "content", "content_snippet", "content_tldr", "url", "creator", "published_at", "thumbnail_url", "enclosure", "is_starred", "is_read", "is_read_later") SELECT "id", "media_source_id", "title", "type", "content", "content_snippet", "content_tldr", "url", "creator", "published_at", "thumbnail_url", "enclosure", "is_starred", "is_read", "is_read_later" FROM `media_item`;--> statement-breakpoint
DROP TABLE `media_item`;--> statement-breakpoint
ALTER TABLE `__new_media_item` RENAME TO `media_item`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `media_item_url_unique` ON `media_item` (`url`);--> statement-breakpoint
CREATE TABLE `__new_media_items_to_categories` (
	`media_item_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	PRIMARY KEY(`media_item_id`, `category_id`),
	FOREIGN KEY (`media_item_id`) REFERENCES `media_item`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_media_items_to_categories`("media_item_id", "category_id") SELECT "media_item_id", "category_id" FROM `media_items_to_categories`;--> statement-breakpoint
DROP TABLE `media_items_to_categories`;--> statement-breakpoint
ALTER TABLE `__new_media_items_to_categories` RENAME TO `media_items_to_categories`;--> statement-breakpoint
CREATE TABLE `__new_media_source_icon` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text,
	`title` text NOT NULL,
	`media_source_id` integer,
	FOREIGN KEY (`media_source_id`) REFERENCES `media_source`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_media_source_icon`("id", "url", "title", "media_source_id") SELECT "id", "url", "title", "media_source_id" FROM `media_source_icon`;--> statement-breakpoint
DROP TABLE `media_source_icon`;--> statement-breakpoint
ALTER TABLE `__new_media_source_icon` RENAME TO `media_source_icon`;