PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_media_source_icon` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text,
	`title` text NOT NULL,
	`media_source_id` integer,
	FOREIGN KEY (`media_source_id`) REFERENCES `media_source`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_media_source_icon`("id", "url", "title", "media_source_id") SELECT "id", "url", "title", "media_source_id" FROM `media_source_icon`;--> statement-breakpoint
DROP TABLE `media_source_icon`;--> statement-breakpoint
ALTER TABLE `__new_media_source_icon` RENAME TO `media_source_icon`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `media_item_url_unique` ON `media_item` (`url`);