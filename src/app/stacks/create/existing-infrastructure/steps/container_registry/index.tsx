import * as WizardStep from "@/components/wizard/Wizard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIsMutating } from "@tanstack/react-query";
import { Button } from "@zenml-io/react-component-library/components/server";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { StackWizardFooter } from "../../../components/WizardFooter";
import { ContainerRegistryForm } from "./Form";
import { ContainerRegistryHeader } from "./Header";
import { ContainerRegistryFormType, containerRegistrySchema } from "./schema";

export function ContainerRegistryStep() {
	const form = useForm<ContainerRegistryFormType>({
		resolver: zodResolver(containerRegistrySchema),
		shouldUnregister: true
	});
	return (
		<FormProvider {...form}>
			<WizardStep.Wrapper>
				<WizardStep.Header>Container Registry</WizardStep.Header>
				<WizardStep.Body>
					<section className="space-y-5 py-5 first:pt-0 last:pb-0">
						<ContainerRegistryHeader />
						<ContainerRegistryForm />
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
	const isMutating = !!useIsMutating();

	return (
		<Button
			className="justify-center gap-2"
			disabled={!form.formState.isValid || isMutating}
			form="artifact-store-form"
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
