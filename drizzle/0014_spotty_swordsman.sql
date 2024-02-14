CREATE TABLE `addons` (
	`id` varchar(128) NOT NULL DEFAULT (uuid()),
	`name` varchar(191) NOT NULL,
	`price` decimal(10,2) DEFAULT '0',
	`storeId` varchar(128) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `addons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `addons_category` (
	`id` varchar(128) NOT NULL DEFAULT (uuid()),
	`name` varchar(191) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `addons_category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products_category_addons` (
	`id` varchar(128) NOT NULL DEFAULT (uuid()),
	`productId` varchar(128) NOT NULL,
	`addonsId` varchar(128) NOT NULL,
	`addonsCategoryId` varchar(128) NOT NULL,
	CONSTRAINT `products_category_addons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `product_variants`;--> statement-breakpoint
DROP TABLE `variants`;