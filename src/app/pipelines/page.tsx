import { PipelinesSelectorProvider } from "./PipelinesTab/PipelineSelectorContext";
import { PipelinesBody } from "./PipelinesTab/PipelinesBody";

export default function PipelinesPage() {
	return (
		<PipelinesSelectorProvider>
			<PipelinesBody />
		</PipelinesSelectorProvider>
	);
}
