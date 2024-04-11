import { sanitizeUrl } from "@/lib/url";
import { Props } from "./Visualization";

export function ImageVisualization({ content }: Props) {
	return (
		<div className="flex items-center justify-center">
			<img
				src={sanitizeUrl("data:image/png;base64," + content)}
				alt={"Visualization for artifact"}
			/>
		</div>
	);
}
