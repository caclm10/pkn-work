import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface BackButtonProps {
	href: string;
}

function BackButton({ href }: BackButtonProps) {
	return (
		<Button variant="ghost" asChild>
			<Link href={href}>
				<ArrowLeftIcon />
				Back
			</Link>
		</Button>
	);
}

export { BackButton };
