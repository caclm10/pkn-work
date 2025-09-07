import { z } from "zod";

export const editEnvelopeFormSchema = z.object({
	name: z.string().min(1),
	box: z.string().min(1),
	date: z.date(),
});

export type EditEnvelopeFormSchema = z.infer<typeof editEnvelopeFormSchema>;
