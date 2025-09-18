import { Props } from "./Visualization";
import Markdown from "@/components/Markdown";

export default function MarkdownVisualization({ content }: Props) {
	return <Markdown className="!prose !max-w-none">{content}</Markdown>;
}
