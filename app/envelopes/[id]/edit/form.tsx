"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateEnvelope } from "@/app/envelopes/[id]/edit/action";
import {
	editEnvelopeFormSchema,
	type EditEnvelopeFormSchema,
} from "@/app/envelopes/[id]/edit/schema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface EditEnvelopeFormProps {
	id: string;
	currentValues: EditEnvelopeFormSchema;
}

function EditEnvelopeForm({ id, currentValues }: EditEnvelopeFormProps) {
	const router = useRouter();

	const form = useForm<EditEnvelopeFormSchema>({
		resolver: zodResolver(editEnvelopeFormSchema),
		defaultValues: {
			name: currentValues.name,
			box: currentValues.box,
		},
	});

	const [state, action, pending] = useActionState(updateEnvelope, {
		success: false,
		returned: false,
		timestamp: new Date().getTime(),
	});

	async function onSubmit(values: EditEnvelopeFormSchema) {
		startTransition(() => action({ id, values }));
	}

	useEffect(() => {
		form.setValue("date", currentValues.date);
	}, []);

	useEffect(() => {
		if (state.success) {
			router.push(`/envelopes/${id}`);
			toast.success("Amplop berhasil diperbarui.");
		}
	}, [state]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>Edit Amplop</CardTitle>

						<CardDescription>
							Isi form di bawah ini untuk memperbarui amplop.
						</CardDescription>

						<CardAction>
							<Button type="submit" disabled={pending}>
								{pending && (
									<Loader2Icon className="animate-spin" />
								)}
								Simpan
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent className="flex flex-col gap-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormItem>
										<FormLabel>Nama Amplop</FormLabel>
										<FormControl>
											<Input
												placeholder="# ..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="box"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormItem>
										<FormLabel>Nama Box</FormLabel>
										<FormControl>
											<Input
												placeholder="TL ..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Tanggal Inven</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													type="button"
													variant="outline"
												>
													{field.value
														? field.value.toLocaleDateString()
														: "Select date"}
													<CalendarIcon className="ml-auto size-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>

										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												captionLayout="dropdown"
											/>
										</PopoverContent>
									</Popover>

									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}

export { EditEnvelopeForm };
