import { CreateComponentHeader } from "./header";
import { RegisterComponentWizard } from "./wizard";

export default function ComponentCreatePage() {
	return (
		<div className="space-y-5">
			<CreateComponentHeader />
			<section className="layout-container">
				<RegisterComponentWizard />
			</section>
		</div>
	);
}
