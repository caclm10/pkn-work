"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import type { EditEnvelopeFormSchema } from "@/app/envelopes/[id]/edit/schema";
import { db } from "@/db";
import { Envelope, type EnvelopeSelect } from "@/db/schema";

export async function updateEnvelope(
	_: any,
	payload: {
		id: EnvelopeSelect["id"];
		values: EditEnvelopeFormSchema;
	},
) {
	const { id, values } = payload;

	await db
		.update(Envelope)
		.set({
			name: values.name,
			box: values.box,
			date: values.date,
		})
		.where(eq(Envelope.id, id));

	revalidatePath("/");

	return {
		success: true,
		returned: true,
		timestamp: new Date().getTime(),
	};
}
