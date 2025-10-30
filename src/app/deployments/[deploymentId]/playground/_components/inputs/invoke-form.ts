import { JSONSchemaFaker } from "@/lib/json-faker";
import { JSONSchemaDefinition } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@zenml-io/react-component-library";
import { useForm } from "react-hook-form";
import { z } from "zod";

const invokeFormSchema = z.object({
	parameters: z.string()
});

type InvokeFormType = z.infer<typeof invokeFormSchema>;

export function useInvokeForm(
	jsonSchema: JSONSchemaDefinition,
	submitDeployment: (data: unknown) => void
) {
	const { toast } = useToast();
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
			if (error instanceof Error) {
				toast({
					emphasis: "subtle",
					status: "error",
					rounded: true,
					description: error.message
				});
			}
			console.error(error);
		}
	}

	return { form, handleSubmit };
}
