import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { Envelope } from "@/db/schema";
import { desc } from "drizzle-orm";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

function DummyCard({ title }: { title: string }) {
	return (
		<Card className="transition-transform hover:-translate-y-0.5">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
		</Card>
	);
}

async function MainPage() {
	const envelopes = await db
		.select()
		.from(Envelope)
		.orderBy(desc(Envelope.createdAt));

	return (
		<div className="flex flex-col gap-y-6">
			<h1 className="text-3xl font-semibold">Daftar Amplop</h1>

			<div className="flex justify-end">
				<Button asChild>
					<Link href="/envelopes/create">
						<PlusIcon />
						Amplop
					</Link>
				</Button>
			</div>

			<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
				{envelopes.map((envelope) => (
					<Card
						key={envelope.id}
						className="relative transition-transform hover:-translate-y-0.5"
					>
						<CardHeader>
							<CardTitle>
								<Link href={`/envelopes/${envelope.id}`}>
									<span className="absolute inset-0" />
									{envelope.name}
								</Link>
							</CardTitle>
							<CardDescription>
								<p>
									Tanggal Inven:{" "}
									{envelope.date?.toLocaleDateString(
										"id-ID",
										{
											month: "2-digit",
											day: "2-digit",
											year: "numeric",
										},
									)}
								</p>
							</CardDescription>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}

export default MainPage;
