import { eq } from "drizzle-orm";

import { EditEnvelopeForm } from "@/app/envelopes/[id]/edit/form";
import { BackButton } from "@/components/back-button";
import { db } from "@/db";
import { selectOne } from "@/db/helpers";
import { Envelope } from "@/db/schema";

interface EditEnvelopePageProps {
	params: Promise<{ id: string }>;
}

async function EditEnvelopePage({ params }: EditEnvelopePageProps) {
	const { id } = await params;

	const envelope = await selectOne(
		db.select().from(Envelope).where(eq(Envelope.id, id)),
	);

	if (!envelope) return null;

	return (
		<div className="flex flex-col gap-6">
			<div>
				<BackButton href={`/envelopes/${id}`} />
			</div>

			<EditEnvelopeForm
				id={id}
				currentValues={{
					name: envelope.name,
					box: envelope.box,
					date: envelope.date,
				}}
			/>
		</div>
	);
}

export default EditEnvelopePage;
