CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "games_genres" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "games_genres" CASCADE;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "genre_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;