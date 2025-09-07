"use server";

import { revalidatePath } from "next/cache";

import type { CreateEnvelopeFormSchema } from "@/app/envelopes/create/schema";
import { db } from "@/db";
import { Envelope } from "@/db/schema";

export async function createEnvelope(_: any, values: CreateEnvelopeFormSchema) {
	await db.insert(Envelope).values({
		name: values.name,
		box: values.box,
		date: values.date,
	});

	revalidatePath("/");

	return {
		success: true,
		timestamp: new Date().getTime(),
	};
}
