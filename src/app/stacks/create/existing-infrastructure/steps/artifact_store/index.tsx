import * as WizardStep from "@/components/wizard/Wizard";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@zenml-io/react-component-library/components/server";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { StackWizardFooter } from "../../../components/WizardFooter";
import { ArtifactStoreForm, artifactStoreSchema } from "./schema";
import { ArtifactStoreHeader } from "./Header";
import { ArtifactStoreListForm } from "./Form";

export function ArtifactStoreStep() {
	const form = useForm<ArtifactStoreForm>({
		resolver: zodResolver(artifactStoreSchema),
		shouldUnregister: true
	});
	return (
		<FormProvider {...form}>
			<WizardStep.Wrapper>
				<WizardStep.Header>Artifact Store</WizardStep.Header>
				<WizardStep.Body>
					<section className="space-y-5 py-5 first:pt-0 last:pb-0">
						<ArtifactStoreHeader />
						<ArtifactStoreListForm />
					</section>
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
