import { ComponentIcon } from "@/components/ComponentIcon";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponentType } from "@/types/components";
import { useFormContext } from "react-hook-form";
import { FormType } from "./schema";

type Props = { type: StackComponentType };

export function TypeOverviewItem({ type }: Props) {
	const {
		watch,
		formState: { errors }
	} = useFormContext<FormType>();

	const component = watch(`components.${type}`);
	const isComponentFilledout = component && component.id;

	return (
		<div
			data-error={
				!isComponentFilledout && errors.components && errors.components[type] ? "true" : "false"
			}
			data-filled={isComponentFilledout ? "true" : "false"}
			className="flex h-[110px] flex-col items-center justify-center space-y-2 truncate whitespace-nowrap rounded-md border border-theme-border-moderate bg-theme-surface-secondary py-5 text-center text-text-sm text-theme-text-secondary transition-all duration-150 hover:bg-theme-surface-primary hover:shadow-sm data-[error=true]:border-theme-text-error data-[filled=true]:border-success-400 data-[filled=true]:bg-theme-surface-primary data-[state=active]:bg-theme-surface-primary group-data-[state=active]/trigger:bg-theme-surface-primary group-data-[state=active]/trigger:shadow-md data-[error=false]:data-[filled=false]:group-data-[state=active]/trigger:border-theme-border-bold"
		>
			{isComponentFilledout ? <SelectedContent type={type} /> : <UnselectedContent type={type} />}
		</div>
	);
}

function SelectedContent({ type }: Props) {
	const { watch } = useFormContext<FormType>();
	const component = watch(`components.${type}`);
	const isComponentFilledout = component && component.id;

	if (!isComponentFilledout) return null;

	return (
		<div className="flex flex-col items-center gap-2 text-text-sm">
			<img width={24} height={24} src={component.logoUrl} alt={`Icon of ${component.name}`} />
			<div className="space-y-0.25">
				<div className="text-theme-text-primary">{component.name}</div>
				<div className="text-text-xs text-theme-text-tertiary">{snakeCaseToTitleCase(type)}</div>
			</div>
		</div>
	);
}

function UnselectedContent({ type }: Props) {
	return (
		<>
			<ComponentIcon
				className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong"
				type={type}
			/>
			<span>{snakeCaseToTitleCase(type)}</span>
		</>
	);
}
