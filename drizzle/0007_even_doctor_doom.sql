ALTER TABLE "services" ADD COLUMN "images" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
UPDATE "services" SET "images" = to_jsonb(ARRAY["image"]) WHERE "image" IS NOT NULL;