ALTER TABLE `products` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `categoryId` int NOT NULL;