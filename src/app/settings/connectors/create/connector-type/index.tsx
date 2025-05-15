import * as Wizard from "@/components/wizard/Wizard";
import { useWizardContext } from "@/context/WizardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ConnectorTypeSelectForm, connectorTypeSelectSchema } from "./schema";
import { useRegisterConnectorContext } from "../create-context";
import { CancelButton, NextButton } from "../common/footer-buttons";
import { StepDescription } from "./description";
import { ConnectorTypeList } from "./list";

export function ConnectorTypeStep() {
	const { goToNextStep } = useWizardContext();
	const { setConnectorType, connectorType } = useRegisterConnectorContext();
	const form = useForm<ConnectorTypeSelectForm>({
		resolver: zodResolver(connectorTypeSelectSchema),
		defaultValues: {
			connectorType: connectorType
		}
	});

	function handleSelectType({ connectorType }: ConnectorTypeSelectForm) {
		setConnectorType(connectorType);
		goToNextStep();
	}

	return (
		<Wizard.Wrapper>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(handleSelectType)}>
					<Wizard.Header>Select Your Implementation</Wizard.Header>
					<Wizard.Body>
						<div className="space-y-5">
							<StepDescription />
							<ConnectorTypeList />
						</div>
					</Wizard.Body>
					<Wizard.Footer>
						<CancelButton />
						<NextButton disabled={!form.formState.isValid} />
					</Wizard.Footer>
				</form>
			</FormProvider>
		</Wizard.Wrapper>
	);
}
