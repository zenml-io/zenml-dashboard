"use client";

import { Button, Skeleton } from "@zenml-io/react-component-library";
import { useId } from "react";
import * as Wizard from "@/components/wizard/Wizard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { componentQueries } from "@/data/components";
import { useQuery } from "@tanstack/react-query";
import { routes } from "@/router/routes";
import { ComponentConfigurationForm } from "@/components/stack-components/create-component/configuration-form";

export function EditComponentConfig() {
	const navigate = useNavigate();
	const { componentId } = useParams() as { componentId: string };
	const component = useQuery({
		...componentQueries.componentDetail(componentId),
		throwOnError: true
	});

	function handleSuccess(id: string) {
		navigate(routes.components.detail(id));
	}

	const formId = useId();
	if (component.isPending) {
		return <Skeleton className="h-[300px] w-full" />;
	}

	if (component.isError) {
		return <div>Error</div>;
	}

	const flavorId = component.data.resources?.flavor?.id;

	if (!flavorId) {
		return <div>No flavor found</div>;
	}

	return (
		<>
			<Wizard.Body className="p-0">
				<ComponentConfigurationForm
					component={component.data}
					flavorId={flavorId}
					formId={formId}
					isCreate={false}
					successHandler={handleSuccess}
					FooterComponent={FooterComponent}
				/>
			</Wizard.Body>
		</>
	);
}

function FooterComponent({ formId, isPending }: { formId: string; isPending: boolean }) {
	const params = useParams() as { componentId: string };

	return (
		<Wizard.Footer>
			<Button asChild intent="secondary" size="md">
				<Link to={routes.components.detail(params.componentId)}>Cancel</Link>
			</Button>
			<Button size="md" disabled={isPending} type="submit" form={formId}>
				{isPending && (
					<div
						role="alert"
						aria-busy="true"
						className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
					></div>
				)}
				Update Component
			</Button>
		</Wizard.Footer>
	);
}
