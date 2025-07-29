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
		<div className="flex items-center gap-1">
			<p>
				{label}
				{!isOptional && (
					<span className="text-theme-text-error" aria-label="required">
						*
					</span>
				)}
			</p>
			{schema && fieldName && <FieldHint schema={schema} fieldName={fieldName} />}
		</div>
	);
}
