"use client";

import { Button } from "@zenml-io/react-component-library/components/server";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import { useWizardContext } from "@/context/WizardContext";
import { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { routes } from "@/router/routes";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function CancelButton() {
	return (
		<Button size="md" intent="secondary" asChild>
			<Link to={routes.settings.connectors.overview}>Cancel</Link>
		</Button>
	);
}

export function NextButton({ isPending, ...props }: Props & { isPending?: boolean }) {
	return (
		<Button type="submit" size="md" intent="primary" {...props}>
			{!!isPending && (
				<div
					role="alert"
					aria-busy="true"
					className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
				></div>
			)}
			<span>Next</span>
			<ArrowLeft width={24} height={24} className="size-5 shrink-0 rotate-180 fill-white" />
		</Button>
	);
}

export function PreviousButton(props: Props) {
	const { goToPreviousStep } = useWizardContext();
	return (
		<Button
			onClick={() => goToPreviousStep()}
			type="button"
			size="md"
			intent="primary"
			emphasis="subtle"
			{...props}
		>
			<ArrowLeft width={24} height={24} className="size-5 shrink-0 fill-primary-600" />
			Prev
		</Button>
	);
}
