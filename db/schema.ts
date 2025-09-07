import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

const Envelope = table("envelopes", {
	id: t
		.text()
		.primaryKey()
		.$default(() => nanoid()),

	name: t.text().notNull(),

	box: t.text().notNull(),

	date: t.integer({ mode: "timestamp" }).notNull(),

	createdAt: t
		.integer("created_at", { mode: "timestamp" })
		.$default(() => new Date()),
	updatedAt: t
		.integer("updated_at", { mode: "timestamp" })
		.$default(() => new Date())
		.$onUpdate(() => new Date()),
});

const OwnershipDocument = table("ownership_documents", {
	id: t
		.text()
		.primaryKey()
		.$default(() => nanoid()),

	envelopeId: t.text("envelope_id").references(() => Envelope.id),

	status: t.text(),

	type: t.text(),

	owner: t.text(),

	date: t.integer({ mode: "timestamp" }),

	validUntil: t.integer("valid_until", { mode: "timestamp" }),

	address: t.text(),

	area: t.text(),

	description: t.text(),

	createdAt: t
		.integer("created_at", { mode: "timestamp" })
		.$default(() => new Date()),
	updatedAt: t
		.integer("updated_at", { mode: "timestamp" })
		.$default(() => new Date())
		.$onUpdate(() => new Date()),
});

const TransferDocument = table("transfer_documents", {
	id: t
		.text()
		.primaryKey()
		.$default(() => nanoid()),

	envelopeId: t.text("envelope_id").references(() => Envelope.id),

	status: t.text(),

	type: t.text(),

	number: t.text(),

	date: t.integer({ mode: "timestamp" }),

	description: t.text(),

	createdAt: t
		.integer("created_at", { mode: "timestamp" })
		.$default(() => new Date()),
	updatedAt: t
		.integer("updated_at", { mode: "timestamp" })
		.$default(() => new Date())
		.$onUpdate(() => new Date()),
});

const OtherDocument = table("other_documents", {
	id: t
		.text()
		.primaryKey()
		.$default(() => nanoid()),

	envelopeId: t.text("envelope_id").references(() => Envelope.id),

	status: t.text(),

	type: t.text(),

	number: t.text(),

	date: t.integer({ mode: "timestamp" }),

	parties: t.text(),

	description: t.text(),

	createdAt: t
		.integer("created_at", { mode: "timestamp" })
		.$default(() => new Date()),
	updatedAt: t
		.integer("updated_at", { mode: "timestamp" })
		.$default(() => new Date())
		.$onUpdate(() => new Date()),
});

export { Envelope, OtherDocument, OwnershipDocument, TransferDocument };

export type EnvelopeSelect = typeof Envelope.$inferSelect;
