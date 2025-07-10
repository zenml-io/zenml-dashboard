import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import Info from "@/assets/icons/info.svg?react";
import { JSONSchemaDefinition } from "@/types/forms";

type Props = {
	schema: JSONSchemaDefinition;
	fieldName: string;
};

export function FieldHint({ schema, fieldName }: Props) {
	const description = schema.description;

	if (!description) return null;

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Info className="size-4 shrink-0 fill-theme-text-secondary" />
				</TooltipTrigger>
				<TooltipContent className="max-w-[400px] bg-theme-surface-primary p-5 text-text-sm text-theme-text-primary">
					<div className="space-y-4">
						<p className="w-fit rounded-sm bg-primary-25 px-1 py-0.5 font-mono text-primary-400">
							{fieldName}
						</p>
						<p>{description}</p>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
