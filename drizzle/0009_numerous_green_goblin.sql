ALTER TABLE `stores` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `stores` MODIFY COLUMN `id` varchar(128) DEFAULT (uuid());