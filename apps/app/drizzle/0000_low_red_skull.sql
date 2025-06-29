CREATE TABLE `Category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Category_name_unique` ON `Category` (`name`);--> statement-breakpoint
CREATE TABLE `media_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`media_source_id` integer NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`content` text NOT NULL,
	`content_snippet` text,
	`content_tldr` text,
	`url` text NOT NULL,
	`creator` text,
	`published_at` text NOT NULL,
	`thumbnail` text,
	`guid` text NOT NULL,
	`enclosure` text,
	FOREIGN KEY (`media_source_id`) REFERENCES `media_source`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `media_item_guid_unique` ON `media_item` (`guid`);--> statement-breakpoint
CREATE TABLE `media_items_to_categories` (
	`media_item_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	PRIMARY KEY(`media_item_id`, `category_id`),
	FOREIGN KEY (`media_item_id`) REFERENCES `media_item`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `media_source` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`url` text NOT NULL,
	`feed_url` text NOT NULL,
	`logo` text,
	`last_build_at` text,
	`last_fetched_at` text NOT NULL,
	`language` text,
	`generator` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `media_source_feed_url_unique` ON `media_source` (`feed_url`);--> statement-breakpoint
CREATE TABLE `media_source_icon` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`title` text NOT NULL,
	`media_source_id` integer,
	FOREIGN KEY (`media_source_id`) REFERENCES `media_source`(`id`) ON UPDATE no action ON DELETE no action
);
