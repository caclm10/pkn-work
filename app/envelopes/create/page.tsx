import { CreateEnvelopeForm } from "@/app/envelopes/create/form";
import { BackButton } from "@/components/back-button";

function CreateEnvelopePage() {
	return (
		<div className="flex flex-col gap-6">
			<div>
				<BackButton href="/" />
			</div>

			<CreateEnvelopeForm />
		</div>
	);
}

export default CreateEnvelopePage;
