import * as WizardStep from "@/components/wizard/Wizard";
import { useSchemaContext } from "@/context/SchemaContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { StackWizardFooter } from "../../../components/WizardFooter";
import { useIsMutating } from "@tanstack/react-query";
import { Button } from "@zenml-io/react-component-library";
import { NewConnector } from "./NewConnectorForm";

export function ConnectCloudStep() {
	const { schema, defaultValues } = useSchemaContext();

	const form = useForm({
		shouldUnregister: true,
		mode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			stackName: "",
			authMethod: "",
			...defaultValues
		}
	});
	return (
		<FormProvider {...form}>
			<WizardStep.Wrapper>
				<WizardStep.Header>Connect to your Cloud</WizardStep.Header>
				<WizardStep.Body>
					<NewConnector />
				</WizardStep.Body>
				<StackWizardFooter>
					<NextButton />
				</StackWizardFooter>
			</WizardStep.Wrapper>
		</FormProvider>
	);
}

function NextButton() {
	const {
		formState: { isValid, isSubmitting }
	} = useFormContext();
	const isMutating = !!useIsMutating();
	return (
		<Button
			className="justify-center gap-2"
			disabled={!isValid || isMutating || isSubmitting}
			form="connect-form"
			size="md"
		>
			{isMutating || isSubmitting ? "Loading..." : "Next"}
		</Button>
	);
}
