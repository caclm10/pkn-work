import { z } from "zod";

export const createEnvelopeFormSchema = z.object({
	name: z.string().min(1),
	box: z.string().min(1),
	date: z.date(),
});

export type CreateEnvelopeFormSchema = z.infer<typeof createEnvelopeFormSchema>;
