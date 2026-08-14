CREATE TABLE "useful_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"href" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
