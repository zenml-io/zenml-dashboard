import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import { ComponentConfigurationForm } from "@/components/stack-components/create-component/configuration-form";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponentType } from "@/types/components";
import {
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useId } from "react";
import { SelectedFlavorState } from ".";

type Props = SelectedFlavorState & {
	type: StackComponentType;
	backHandler: () => void;
	successHandler: (id: string) => void;
};

export function ConfigurationStep({ name, id, backHandler, type, successHandler }: Props) {
	const formId = useId();
	return (
		<>
			<DialogHeader className="w-full">
				<div className="flex w-0 flex-1 items-center gap-2">
					<Button
						intent="secondary"
						emphasis="subtle"
						className="flex aspect-square size-6 items-center justify-center"
						onClick={() => backHandler()}
					>
						<ArrowLeft className="size-5 shrink-0" />
						<span className="sr-only">Go step back</span>
					</Button>
					<DialogTitle className="truncate">
						Configure your {snakeCaseToTitleCase(name)} {snakeCaseToTitleCase(type)}
					</DialogTitle>
				</div>
			</DialogHeader>
			<ComponentConfigurationForm
				useMaxHeight
				flavorId={id}
				formId={formId}
				successHandler={successHandler}
				FooterComponent={FooterComponent}
			/>
		</>
	);
}

function FooterComponent({ formId, isPending }: { formId: string; isPending: boolean }) {
	return (
		<DialogFooter>
			<div className="flex items-center gap-2">
				<DialogClose asChild>
					<Button size="md" intent="secondary">
						Cancel
					</Button>
				</DialogClose>
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
			</div>
		</DialogFooter>
	);
}
