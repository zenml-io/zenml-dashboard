import { ComponentIcon } from "@/components/ComponentIcon";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { StackComponentType } from "@/types/components";
import { Badge } from "@zenml-io/react-component-library";
import { useFormContext } from "react-hook-form";
import { FormType } from "./schema";

type Props = { type: StackComponentType };

export function TypeOverviewItem({ type }: Props) {
	const {
		watch,
		formState: { errors }
	} = useFormContext<FormType>();

	const component = watch(`components.${type}`);
	const isComponentFilledout = component && component.length > 0;

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

const MAX_VISIBLE_ICONS = 3;

function SelectedContent({ type }: Props) {
	const { watch } = useFormContext<FormType>();
	const component = watch(`components.${type}`);

	if (!component || component.length === 0) return null;

	const isMultipleComponents = component.length > 1;
	const hasOverflow = component.length > MAX_VISIBLE_ICONS;
	const visibleComponents = hasOverflow ? component.slice(0, MAX_VISIBLE_ICONS - 1) : component;
	const overflowCount = component.length - visibleComponents.length;

	return (
		<div className="flex flex-col items-center gap-2 text-text-sm">
			<ul className="flex flex-nowrap items-center gap-1">
				{visibleComponents.map((c) => (
					<li key={c.id}>
						<img
							width={24}
							height={24}
							src={c.logoUrl}
							className="shrink-0 object-contain"
							alt={`Icon of ${c.name}`}
						/>
					</li>
				))}
				{hasOverflow && (
					<li aria-label={`${overflowCount} more components`}>
						<Badge rounded={false} color="light-grey">
							+{overflowCount}
						</Badge>
					</li>
				)}
			</ul>
			<div className="space-y-0.25">
				<div className="text-theme-text-primary">
					{isMultipleComponents ? `${component.length} Components` : component[0].name}
				</div>
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
