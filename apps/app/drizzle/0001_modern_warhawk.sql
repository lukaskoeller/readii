PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Channel` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`link` text NOT NULL,
	`generator` text,
	`last_build_date` text,
	`atom_link` text,
	`copyright` text,
	`language` text,
	`web_master` text,
	`ttl` integer,
	`icon` text,
	`logo` text
);
--> statement-breakpoint
INSERT INTO `__new_Channel`("id", "title", "description", "link", "generator", "last_build_date", "atom_link", "copyright", "language", "web_master", "ttl", "icon", "logo") SELECT "id", "title", "description", "link", "generator", "last_build_date", "atom_link", "copyright", "language", "web_master", "ttl", "icon", "logo" FROM `Channel`;--> statement-breakpoint
DROP TABLE `Channel`;--> statement-breakpoint
ALTER TABLE `__new_Channel` RENAME TO `Channel`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `ChannelImage` ADD `channel_id` integer REFERENCES Channel(id);