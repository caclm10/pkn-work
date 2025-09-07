CREATE TABLE `envelopes` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`box` text,
	`date` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `other_documents` (
	`id` text PRIMARY KEY NOT NULL,
	`envelope_id` text,
	`status` text,
	`type` text,
	`number` text,
	`date` integer,
	`parties` text,
	`description` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`envelope_id`) REFERENCES `envelopes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ownership_documents` (
	`id` text PRIMARY KEY NOT NULL,
	`envelope_id` text,
	`status` text,
	`type` text,
	`owner` text,
	`date` integer,
	`valid_until` integer,
	`address` text,
	`area` text,
	`description` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`envelope_id`) REFERENCES `envelopes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transfer_documents` (
	`id` text PRIMARY KEY NOT NULL,
	`envelope_id` text,
	`status` text,
	`type` text,
	`number` text,
	`date` integer,
	`description` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`envelope_id`) REFERENCES `envelopes`(`id`) ON UPDATE no action ON DELETE no action
);
