import { PipelineSelectorContextProvider } from "./_components/PipelineSelectorContext";
import { PipelinesBody } from "./_components/PipelinesBody";

export default function PipelinesPage() {
	return (
		<PipelineSelectorContextProvider>
			<PipelinesBody />
		</PipelineSelectorContextProvider>
	);
}
