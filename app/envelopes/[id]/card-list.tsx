import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface EnvelopeCardListProps {
	title: string;
	createHref: string;
	emptyText: string;
	isEmpty: boolean;
	children?: React.ReactNode;
}

function EnvelopeCardList({
	title,
	createHref,
	emptyText,
	isEmpty,
	children,
}: EnvelopeCardListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>

				<CardAction>
					<Button size="sm" asChild>
						<Link href={createHref}>
							<PlusIcon />
							Dokumen
						</Link>
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent>
				{isEmpty && (
					<p className="text-muted-foreground text-center text-sm italic">
						{emptyText}
					</p>
				)}

				{!isEmpty && children}
			</CardContent>
		</Card>
	);
}

export { EnvelopeCardList };
