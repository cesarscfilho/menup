CREATE TABLE `product_variants` (
	`id` varchar(128) NOT NULL DEFAULT (uuid()),
	`productId` varchar(128) NOT NULL,
	`variantId` varchar(128) NOT NULL,
	CONSTRAINT `product_variants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `variants` MODIFY COLUMN `price` decimal(10,2);--> statement-breakpoint
ALTER TABLE `variants` DROP COLUMN `productId`;