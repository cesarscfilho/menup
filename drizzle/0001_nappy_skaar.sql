ALTER TABLE "users" RENAME TO "products";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "users_category_id_categories_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
