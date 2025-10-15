import { JSONSchemaDefinition } from "@/types/forms";
import Editor, { EditorProps, OnMount } from "@monaco-editor/react";

type Props = EditorProps & {
	deploymentId: string;
	jsonSchema: JSONSchemaDefinition;
};

export function PlaygroundEditor({ jsonSchema, value, onChange, deploymentId }: Props) {
	const fileMatch = `${deploymentId}.json`;

	const handleEditorMount: OnMount = (_editor, monaco) => {
		// Configure JSON language defaults with schema validation
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			enableSchemaRequest: true,
			validate: true,
			schemas: [
				{
					uri: `deployment-input-schema-${deploymentId}.json`,
					fileMatch: [fileMatch],
					schema: jsonSchema
				}
			]
		});
	};

	return (
		<Editor
			path={fileMatch}
			value={value}
			onChange={onChange}
			language="json"
			options={{ minimap: { enabled: false } }}
			className="h-full border border-theme-border-moderate"
			onMount={handleEditorMount}
		/>
	);
}
