import { RunsBody } from "./RunsBody";
import { RunsSelectorContextProvider } from "./RunsSelectorContext";

export default function RunsPage() {
	return (
		<RunsSelectorContextProvider>
			<RunsBody />
		</RunsSelectorContextProvider>
	);
}
