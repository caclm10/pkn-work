import { EnvelopeCardList } from "@/app/envelopes/[id]/card-list";
import { EnvelopeDeleteAlert } from "@/app/envelopes/[id]/delete-alert";
import { BackButton } from "@/components/back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { selectOne } from "@/db/helpers";
import { Envelope } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

interface EnvelopePageProps {
	params: Promise<{ id: string }>;
}

async function EnvelopePage({ params }: EnvelopePageProps) {
	const { id } = await params;

	const envelope = await selectOne(
		db.select().from(Envelope).where(eq(Envelope.id, id)),
	);

	if (!envelope) return null;

	return (
		<div className="flex flex-col gap-8">
			<div>
				<BackButton href="/" />
			</div>

			<div className="flex flex-col gap-y-2">
				<h1 className="text-4xl font-semibold">{envelope.name}</h1>
				<div>
					<Badge>{envelope.box}</Badge>
				</div>
				<p className="text-muted-foreground text-sm">
					{envelope.date?.toLocaleDateString("id-ID", {
						month: "2-digit",
						day: "2-digit",
						year: "numeric",
					})}
				</p>

				<div className="flex gap-x-3">
					<Button variant="ghost" size="icon" asChild>
						<Link href={`/envelopes/${id}/edit`}>
							<PencilIcon />
							<span className="sr-only">Edit</span>
						</Link>
					</Button>
					<EnvelopeDeleteAlert id={envelope.id} />
				</div>
			</div>

			<div className="flex flex-col gap-6">
				<EnvelopeCardList
					title="Dokumen Kepemilikan"
					createHref="#"
					emptyText="Tidak ada dokumen kepemilikan."
					isEmpty
				/>
				<EnvelopeCardList
					title="Dokumen Peralihan"
					createHref="#"
					emptyText="Tidak ada dokumen peralihan."
					isEmpty
				/>
				<EnvelopeCardList
					title="Dokumen Lain-Lain"
					createHref="#"
					emptyText="Tidak ada dokumen lain-lain."
					isEmpty
				/>
			</div>
		</div>
	);
}

export default EnvelopePage;
