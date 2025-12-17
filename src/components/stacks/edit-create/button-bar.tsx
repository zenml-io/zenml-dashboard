import { useIsMutating } from "@tanstack/react-query";
import { Button } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";

type StackFormButtonBarProps = {
	cancelRoute: string;
	submitLabel: string;
	isLoading?: boolean;
};

export function StackFormButtonBar({
	cancelRoute,
	submitLabel,
	isLoading = false
}: StackFormButtonBarProps) {
	const {
		formState: { isSubmitting }
	} = useFormContext();
	const isMutating = !!useIsMutating({ mutationKey: ["stack"] });
	const isDisabled = isSubmitting || isMutating || isLoading;

	return (
		<div className="flex items-center justify-end space-x-2 border-t border-theme-border-moderate p-5">
			<Button asChild intent="secondary" size="md">
				<Link to={cancelRoute}>Cancel</Link>
			</Button>
			<Button type="submit" className="flex items-center gap-1" disabled={isDisabled} size="md">
				{isDisabled && (
					<div
						role="alert"
						aria-busy="true"
						className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
					></div>
				)}
				{submitLabel}
			</Button>
		</div>
	);
}
