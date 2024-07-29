import * as WizardStep from "@/components/wizard/Wizard";
import { useSchemaContext } from "@/context/SchemaContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { StackWizardFooter } from "../../../components/WizardFooter";
import { useIsMutating } from "@tanstack/react-query";
import { Button } from "@zenml-io/react-component-library";
import { NewConnector } from "./NewConnectorForm";

export function ConnectCloudStep() {
	const { schema } = useSchemaContext();
	const form = useForm({
		shouldUnregister: true,
		mode: "onChange",
		resolver: zodResolver(schema)
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
		formState: { isValid }
	} = useFormContext();
	const isMutating = !!useIsMutating();
	return (
		<Button
			className="justify-center gap-2"
			disabled={!isValid || isMutating}
			form="connect-form"
			size="md"
		>
			{isMutating && (
				<div
					role="alert"
					aria-busy="true"
					className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
				></div>
			)}
			{isMutating ? "Loading..." : "Next"}
		</Button>
	);
}
