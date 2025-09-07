"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createEnvelope } from "@/app/envelopes/create/action";
import {
	createEnvelopeFormSchema,
	type CreateEnvelopeFormSchema,
} from "@/app/envelopes/create/schema";
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
import { usePrevious } from "@/hooks/use-previous";

function CreateEnvelopeForm() {
	const router = useRouter();

	const form = useForm<CreateEnvelopeFormSchema>({
		resolver: zodResolver(createEnvelopeFormSchema),
		defaultValues: {
			name: "",
			box: "",
		},
	});

	const [state, action, pending] = useActionState(createEnvelope, {
		success: false,
		timestamp: new Date().getTime(),
	});

	const prevState = usePrevious(state);

	async function onSubmit(values: CreateEnvelopeFormSchema) {
		startTransition(() => action(values));
	}

	useEffect(() => {
		if (state.success) {
			toast.success("Amplop baru berhasil ditambahkan.");
			router.push("/");
		}
	}, [state]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>Tambah Amplop</CardTitle>

						<CardDescription>
							Isi form di bawah ini untuk menambahkan amplop.
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

export { CreateEnvelopeForm };
