import { ManualSetup } from "./ManualStep";
import { SmartSetup } from "./SmartSetup";

export default function NewStacksPage() {
	return (
		<section className="layout-container space-y-5 py-5">
			<SmartSetup />
			<ManualSetup />
		</section>
	);
}
