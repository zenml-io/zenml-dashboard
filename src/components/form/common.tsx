import { FieldHint } from "./FieldHint";
import { JSONSchemaDefinition } from "@/types/forms";

type Props = {
	label: string;
	isOptional: boolean;
	schema?: JSONSchemaDefinition;
	fieldName?: string;
};

export function RendererHeadline({ label, isOptional, schema, fieldName }: Props) {
	return (
		<span className="flex items-center">
			{label}
			{!isOptional && (
				<span className="text-theme-text-error" aria-label="required">
					*
				</span>
			)}
			{schema && fieldName && <FieldHint schema={schema} fieldName={fieldName} />}
		</span>
	);
}
