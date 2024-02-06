ALTER TABLE `categories` MODIFY COLUMN `id` varchar(128) NOT NULL DEFAULT (uuid());--> statement-breakpoint
ALTER TABLE `categories` MODIFY COLUMN `storeId` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `id` varchar(128) NOT NULL DEFAULT (uuid());--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `storeId` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `id` varchar(128) NOT NULL DEFAULT (uuid());--> statement-breakpoint
ALTER TABLE `variants` MODIFY COLUMN `id` varchar(128) NOT NULL DEFAULT (uuid());--> statement-breakpoint
ALTER TABLE `variants` MODIFY COLUMN `productId` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `stores` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `categoryId`;