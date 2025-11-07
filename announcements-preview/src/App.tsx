import { useState, useCallback } from "react";
import { EditorPanel } from "./components/EditorPanel";
import { PreviewPanel } from "./components/PreviewPanel";
import { ValidationErrors } from "./components/ValidationErrors";
import { validateAnnouncements } from "./lib/validation";
import { ZodError } from "zod";
import sampleAnnouncements from "./data/sample-announcements.json";

const initialJson = JSON.stringify(sampleAnnouncements, null, 2);

export function App() {
	const [json, setJson] = useState<string>(initialJson);
	const [isValid, setIsValid] = useState(true);
	const [error, setError] = useState<ZodError | undefined>();

	const handleJsonChange = useCallback((newJson: string, valid: boolean, err?: ZodError) => {
		setJson(newJson);
		setIsValid(valid);
		setError(err);
	}, []);

	let announcements: ReturnType<typeof validateAnnouncements>["data"] = [];
	if (isValid && json.trim()) {
		try {
			const parsed = JSON.parse(json);
			const result = validateAnnouncements(parsed);
			if (result.success) {
				announcements = result.data;
			}
		} catch {
			// Invalid JSON, will show error
		}
	}

	return (
		<div className="flex h-screen flex-col">
			<header className="border-b border-theme-border-moderate bg-theme-surface-primary px-6 py-4">
				<h1 className="text-display-sm font-semibold">Announcements Preview</h1>
				<p className="mt-1 text-text-sm text-theme-text-secondary">
					Upload or edit JSON to preview announcements
				</p>
			</header>
			<div className="flex flex-1 overflow-hidden">
				<div className="w-1/2 border-r border-theme-border-moderate">
					<EditorPanel value={json} onJsonChange={handleJsonChange} />
				</div>
				<div className="flex w-1/2 flex-col overflow-hidden">
					{error && (
						<div className="shrink-0 border-b border-theme-border-moderate p-4">
							<ValidationErrors error={error} />
						</div>
					)}
					<div className="min-h-0 flex-1 overflow-hidden">
						<PreviewPanel announcements={announcements} />
					</div>
				</div>
			</div>
		</div>
	);
}
