import { RunIndexPrefix } from "./run-index-prefix";

type Props = {
	name: string;
	index?: number | null;
};

/**
 * Displays a run name with an optional index prefix.
 * Renders as a span so the parent can control the wrapper element (h1, h2, p, etc.).
 */
export function RunName({ name, index }: Props) {
	return (
		<span>
			<RunIndexPrefix index={index} />
			{name}
		</span>
	);
}
