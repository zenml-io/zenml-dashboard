import { Props } from "./Visualization";
import Markdown from "@/components/Markdown";
import { Codesnippet } from "../CodeSnippet";

export type MarkdownVisualizationMode = "preview" | "raw";

export default function MarkdownVisualization({
	content,
	mode = "preview"
}: Props & { mode?: MarkdownVisualizationMode }) {
	if (mode === "raw") {
		// Raw mode shows the unparsed markdown text; wrapping improves readability for long lines.
		return <Codesnippet code={content} fullWidth wrap />;
	}
	return <Markdown className="!prose !max-w-none">{content}</Markdown>;
}
