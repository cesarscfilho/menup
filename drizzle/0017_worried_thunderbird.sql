ALTER TABLE `addons_category` ADD `quantityMin` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `addons_category` ADD `quantityMax` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `addons_category` ADD `active` boolean DEFAULT false NOT NULL;