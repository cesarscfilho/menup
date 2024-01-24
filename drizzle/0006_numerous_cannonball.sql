CREATE TABLE `categories` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`productId` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `products` ADD PRIMARY KEY(`categoryId`);--> statement-breakpoint
ALTER TABLE `products` ADD `categoryId` serial AUTO_INCREMENT NOT NULL;