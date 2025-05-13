import { RunsBody } from "./RunsBody";
import { RunsSelectorProvider } from "./RunsSelectorContext";

export default function RunsPage() {
	return (
		<RunsSelectorProvider>
			<RunsBody />
		</RunsSelectorProvider>
	);
}
