"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { selectOne } from "@/db/helpers";
import { Envelope, type EnvelopeSelect } from "@/db/schema";

async function deleteEnvelope(_: any, id: EnvelopeSelect["id"]) {
	const envelope = await selectOne(
		db.select().from(Envelope).where(eq(Envelope.id, id)),
	);

	if (!envelope) {
		return {
			success: false,
			message: "Amplop tidak ditemukan.",
			returned: true,
			timestamp: new Date().getTime(),
		};
	}

	await db.delete(Envelope).where(eq(Envelope.id, id));

	return {
		success: true,
		returned: true,
		timestamp: new Date().getTime(),
	};
}

export { deleteEnvelope };
