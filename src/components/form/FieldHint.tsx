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

function getTypeHint(schema: JSONSchemaDefinition): string {
	// Generate type-specific hints based on schema properties
	const hints: string[] = [];

	if (schema.type) {
		const type = Array.isArray(schema.type) ? schema.type.join(" or ") : schema.type;
		hints.push(`Type: ${type}`);
	}

	if (schema.format) {
		hints.push(`Format: ${schema.format}`);
	}

	if (schema.minimum !== undefined || schema.maximum !== undefined) {
		if (schema.minimum !== undefined && schema.maximum !== undefined) {
			hints.push(`Range: ${schema.minimum} - ${schema.maximum}`);
		} else if (schema.minimum !== undefined) {
			hints.push(`Minimum: ${schema.minimum}`);
		} else if (schema.maximum !== undefined) {
			hints.push(`Maximum: ${schema.maximum}`);
		}
	}

	if (schema.minLength !== undefined || schema.maxLength !== undefined) {
		if (schema.minLength !== undefined && schema.maxLength !== undefined) {
			hints.push(`Length: ${schema.minLength} - ${schema.maxLength} characters`);
		} else if (schema.minLength !== undefined) {
			hints.push(`Minimum length: ${schema.minLength} characters`);
		} else if (schema.maxLength !== undefined) {
			hints.push(`Maximum length: ${schema.maxLength} characters`);
		}
	}

	if (schema.pattern) {
		hints.push(`Pattern: ${schema.pattern}`);
	}

	if (schema.enum && schema.enum.length > 0) {
		const values = schema.enum.slice(0, 3).join(", ");
		const extra = schema.enum.length > 3 ? ` (${schema.enum.length - 3} more...)` : "";
		hints.push(`Options: ${values}${extra}`);
	}

	if (schema.default !== undefined) {
		const defaultStr =
			typeof schema.default === "object" ? JSON.stringify(schema.default) : String(schema.default);
		hints.push(`Default: ${defaultStr}`);
	}

	return hints.join(" • ");
}

function getFallbackDescription(schema: JSONSchemaDefinition, fieldName: string): string {
	const typeHint = getTypeHint(schema);
	const baseName = fieldName.replace(/_/g, " ").toLowerCase();

	if (typeHint) {
		return `Configuration for ${baseName}. ${typeHint}`;
	}

	// Ultra-basic fallback
	return `Configuration setting for ${baseName}.`;
}

export function FieldHint({ schema, fieldName }: Props) {
	const description = schema.description || getFallbackDescription(schema, fieldName);

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
						<div className="space-y-1">
							<p>{description}</p>
							{!schema.description && (
								<p className="text-text-xs text-theme-text-tertiary">
									Auto-generated hint based on field type
								</p>
							)}
						</div>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
