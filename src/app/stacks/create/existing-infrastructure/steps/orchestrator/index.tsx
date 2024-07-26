import * as WizardStep from "@/components/wizard/Wizard";
import { useSchemaContext } from "@/context/SchemaContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@zenml-io/react-component-library/components/server";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { StackWizardFooter } from "../../../components/WizardFooter";
import { OrchestratorForm } from "./Form";
import { OrchestratorHeader } from "./Header";

export function OrchestratorStep() {
	const { schema } = useSchemaContext();
	const form = useForm({
		resolver: zodResolver(schema),
		shouldUnregister: true,
		defaultValues: {
			resourceId: ""
		}
	});

	return (
		<FormProvider {...form}>
			<WizardStep.Wrapper>
				<WizardStep.Header>Orchestrator</WizardStep.Header>
				<WizardStep.Body>
					<OrchestratorHeader />
					<OrchestratorForm />
				</WizardStep.Body>
				<StackWizardFooter>
					<NextButton />
				</StackWizardFooter>
			</WizardStep.Wrapper>
		</FormProvider>
	);
}

function NextButton() {
	const form = useFormContext();

	return (
		<Button disabled={!form.formState.isValid} form="artifact-store-form" size="md">
			Next
		</Button>
	);
}
