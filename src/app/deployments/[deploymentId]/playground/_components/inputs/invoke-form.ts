import { JSONSchemaDefinition } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSONSchemaFaker } from "json-schema-faker";
import { useForm } from "react-hook-form";
import { z } from "zod";

JSONSchemaFaker.option({
	alwaysFakeOptionals: true,
	useDefaultValue: true,
	random: () => 0
});

const invokeFormSchema = z.object({
	parameters: z.string()
});

type InvokeFormType = z.infer<typeof invokeFormSchema>;

export function useInvokeForm(
	jsonSchema: JSONSchemaDefinition,
	submitDeployment: (data: unknown) => void
) {
	const defaultValues = JSONSchemaFaker.generate(jsonSchema);
	const form = useForm<InvokeFormType>({
		resolver: zodResolver(invokeFormSchema),
		defaultValues: {
			parameters: JSON.stringify(defaultValues, null, "\t")
		}
	});

	function handleSubmit(data: InvokeFormType) {
		try {
			submitDeployment(JSON.parse(data.parameters));
		} catch (error) {
			console.error(error);
		}
	}

	return { form, handleSubmit };
}
