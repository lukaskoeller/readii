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
	FOREIGN KEY (`media_source_id`) REFERENCES `media_source`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_media_item`("id", "media_source_id", "title", "type", "content", "content_snippet", "content_tldr", "url", "creator", "published_at", "thumbnail_url", "enclosure", "is_starred", "is_read", "is_read_later") SELECT "id", "media_source_id", "title", "type", "content", "content_snippet", "content_tldr", "url", "creator", "published_at", "thumbnail_url", "enclosure", "is_starred", "is_read", "is_read_later" FROM `media_item`;--> statement-breakpoint
DROP TABLE `media_item`;--> statement-breakpoint
ALTER TABLE `__new_media_item` RENAME TO `media_item`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `media_item_url_unique` ON `media_item` (`url`);