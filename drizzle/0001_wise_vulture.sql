CREATE TYPE "public"."platform" AS ENUM('PC', 'PlayStation', 'XBOX', 'Mobile');--> statement-breakpoint
CREATE TABLE "games_genres" (
	"game_id" integer NOT NULL,
	"genre_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "genres_name_unique" UNIQUE("name"),
	CONSTRAINT "genres_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "platform" SET DATA TYPE "public"."platform" USING "platform"::"public"."platform";--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "platform" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "external_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "poster_url" text;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "meta_score" integer;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "my_score" integer;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "review" text;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "completed_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "games_genres" ADD CONSTRAINT "games_genres_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games_genres" ADD CONSTRAINT "games_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" DROP COLUMN "score";--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_external_id_unique" UNIQUE("external_id");--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_slug_unique" UNIQUE("slug");