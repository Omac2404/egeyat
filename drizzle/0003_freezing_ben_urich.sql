ALTER TABLE "mevzuat" ADD COLUMN "file_path" text;--> statement-breakpoint
ALTER TABLE "mevzuat" ADD COLUMN "published" boolean DEFAULT true NOT NULL;