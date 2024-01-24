ALTER TABLE `categories` RENAME COLUMN `productId` TO `storeId`;--> statement-breakpoint
ALTER TABLE `categories` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `categories` MODIFY COLUMN `storeId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `categories` ADD `name` varchar(191) NOT NULL;