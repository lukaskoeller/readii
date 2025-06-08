CREATE TABLE `Category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Category_name_unique` ON `Category` (`name`);--> statement-breakpoint
CREATE TABLE `Channel` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`link` text NOT NULL,
	`image_id` integer,
	`generator` text,
	`last_build_date` text,
	`atom_link` text,
	`copyright` text,
	`language` text,
	`web_master` text,
	`ttl` integer,
	`icon` text,
	`logo` text,
	FOREIGN KEY (`image_id`) REFERENCES `ChannelImage`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ChannelImage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`title` text NOT NULL,
	`link` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`channel_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`link` text NOT NULL,
	`guid` text NOT NULL,
	`dc_creator` text,
	`pub_date` text,
	`enclosure` text,
	`media_thumbnail` text,
	FOREIGN KEY (`channel_id`) REFERENCES `Channel`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Item_guid_unique` ON `Item` (`guid`);--> statement-breakpoint
CREATE TABLE `item_to_category` (
	`item_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	PRIMARY KEY(`item_id`, `category_id`),
	FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON UPDATE no action ON DELETE no action
);
