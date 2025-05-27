import { PipelineSelectorContextProvider } from "./PipelinesTab/PipelineSelectorContext";
import { PipelinesBody } from "./PipelinesTab/PipelinesBody";

export default function PipelinesPage() {
	return (
		<PipelineSelectorContextProvider>
			<PipelinesBody />
		</PipelineSelectorContextProvider>
	);
}
