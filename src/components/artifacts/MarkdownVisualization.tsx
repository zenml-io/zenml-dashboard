import { Props } from "./Visualization";
import Markdown from "react-markdown";

export default function MarkdownVisualization({ content }: Props) {
	return <Markdown className="prose">{content}</Markdown>;
}
