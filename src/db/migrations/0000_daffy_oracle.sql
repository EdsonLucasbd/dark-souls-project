CREATE TABLE `bosses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`game` text NOT NULL,
	`location` text,
	`is_optional` integer DEFAULT false,
	`souls` integer,
	`health_points` integer,
	`description` text,
	`lore` text,
	`image_url` text,
	`wiki_url` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bosses_slug_unique` ON `bosses` (`slug`);--> statement-breakpoint
CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`game` text NOT NULL,
	`description` text,
	`lore` text,
	`image_url` text,
	`wiki_url` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `locations_slug_unique` ON `locations` (`slug`);--> statement-breakpoint
CREATE TABLE `npcs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`game` text NOT NULL,
	`location` text,
	`is_hostile` integer DEFAULT false,
	`description` text,
	`lore` text,
	`image_url` text,
	`wiki_url` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `npcs_slug_unique` ON `npcs` (`slug`);--> statement-breakpoint
CREATE TABLE `weapons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`game` text NOT NULL,
	`weapon_type` text,
	`attack_type` text,
	`physical_damage` integer,
	`magic_damage` integer,
	`fire_damage` integer,
	`lightning_damage` integer,
	`strength_req` integer,
	`dexterity_req` integer,
	`intelligence_req` integer,
	`faith_req` integer,
	`strength_scaling` text,
	`dexterity_scaling` text,
	`intelligence_scaling` text,
	`faith_scaling` text,
	`description` text,
	`image_url` text,
	`wiki_url` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `weapons_slug_unique` ON `weapons` (`slug`);