import { useForm } from "react-hook-form";
import { ServerNameFormSchema, ServerNameFormType } from "./form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Button, Input } from "@zenml-io/react-component-library";
import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";

type Props = {
	submitHandler: (data: ServerNameFormType) => void;
};

const blockedAnimals = ["booby", "swallow"];

function generateUniqueName() {
	return uniqueNamesGenerator({
		dictionaries: [colors, animals.filter((el) => !blockedAnimals.includes(el))]
	});
}

export function ServerNameForm({ submitHandler }: Props) {
	const serverNameId = useId();
	const {
		handleSubmit,
		register,
		formState: { isValid }
	} = useForm<ServerNameFormType>({
		resolver: zodResolver(ServerNameFormSchema),
		defaultValues: { serverName: generateUniqueName() }
	});

	return (
		<div className="max-w-[570px] space-y-5">
			<div>
				<h1 className="text-display-xs font-semibold">Almost there! Select a server name</h1>
				<p className="text-theme-text-secondary">
					This will identify your ZenML server. You can use the generated name or create your own.
				</p>
			</div>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
				<div className="space-y-2">
					<div className="space-y-0.5">
						<label htmlFor={serverNameId} className="text-text-sm">
							Server Name
						</label>
						<Input {...register("serverName")} id={serverNameId} className="w-full" />
					</div>
				</div>
				<Button disabled={!isValid} className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
