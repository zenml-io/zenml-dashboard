import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import { ComponentConfigurationForm } from "@/components/stack-components/create-component/configuration-form";
import * as Wizard from "@/components/wizard/Wizard";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { routes } from "@/router/routes";
import { StackComponentType } from "@/types/components";
import { Flavor } from "@/types/flavors";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useId } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
	flavor: Flavor;
	type: StackComponentType;
	handleBack: () => void;
};

export function ConfiguratinStep({ flavor, type, handleBack }: Props) {
	const formId = useId();
	const navigate = useNavigate();

	function handleSuccess(id: string) {
		navigate(routes.components.detail(id));
	}

	const flavorName = flavor.body?.display_name ?? snakeCaseToTitleCase(flavor.name);

	return (
		<>
			<Wizard.Header className="flex items-center gap-2">
				<Button
					intent="secondary"
					emphasis="subtle"
					className="flex aspect-square size-6 items-center justify-center"
					onClick={() => handleBack()}
				>
					<ArrowLeft className="size-5 shrink-0" />
					<span className="sr-only">Go step back</span>
				</Button>
				<span>
					Configure your {flavorName} {snakeCaseToTitleCase(type)}
				</span>
			</Wizard.Header>
			<Wizard.Body className="p-0">
				<ComponentConfigurationForm
					flavorId={flavor.id}
					formId={formId}
					successHandler={handleSuccess}
					FooterComponent={FooterComponent}
				/>
			</Wizard.Body>
		</>
	);
}

function FooterComponent({ formId, isPending }: { formId: string; isPending: boolean }) {
	return (
		<Wizard.Footer>
			<Button asChild intent="secondary" size="md">
				<Link to={routes.components.overview}>Cancel</Link>
			</Button>
			<Button size="md" disabled={isPending} type="submit" form={formId}>
				{isPending && (
					<div
						role="alert"
						aria-busy="true"
						className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
					></div>
				)}
				Register Component
			</Button>
		</Wizard.Footer>
	);
}
