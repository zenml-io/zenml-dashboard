import { Codesnippet } from "../CodeSnippet";
import { Markdown } from "../Markdown";
import { Props } from "./Visualization";

type MarkdownVisualizationProps = Props & {
	markdownMode?: "markdown" | "raw";
};

export default function MarkdownVisualization({
	content,
	markdownMode
}: MarkdownVisualizationProps) {
	if (markdownMode === "raw") {
		return <Codesnippet code={content} fullWidth wrap />;
	}
	return <Markdown className="!prose !max-w-none" markdown={content} />;
}
