"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";

import { deleteEnvelope } from "@/app/envelopes/[id]/actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { EnvelopeSelect } from "@/db/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EnvelopeDeleteAlertProps {
	id: EnvelopeSelect["id"];
}

function EnvelopeDeleteAlert({ id }: EnvelopeDeleteAlertProps) {
	const router = useRouter();

	const [state, action, pending] = useActionState(deleteEnvelope, {
		success: false,
		timestamp: new Date().getTime(),
		returned: false,
	});

	function handleClickAction() {
		startTransition(() => action(id));
	}

	useEffect(() => {
		if (!state.returned) return;

		if (state.success) {
			toast.success("Amplop berhasil dihapus.");
			router.push("/");
		} else {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" size="icon" disabled={pending}>
					{pending ? (
						<Loader2Icon className="animate-spin" />
					) : (
						<Trash2Icon />
					)}
					<span className="sr-only">Delete</span>
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Hapus Amplop</AlertDialogTitle>
					<AlertDialogDescription>
						Apa kamu yakin menghapus amplop ini? Amplop yang
						terhapus tidak dapat dikembalikan lagi.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						onClick={handleClickAction}
					>
						Hapus
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export { EnvelopeDeleteAlert };
