import { Markdown } from "../Markdown";
import { Props } from "./Visualization";

export default function MarkdownVisualization({ content }: Props) {
	return <Markdown className="!prose !max-w-none" markdown={content} />;
}
