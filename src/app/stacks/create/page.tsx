import { NewInfrastructure } from "./NewInfra";
import { ExistingInfrastructure } from "./ExistingInfra";

export default function NewStacksPage() {
	return (
		<section className="layout-container space-y-5 py-5">
			<NewInfrastructure />
			<ExistingInfrastructure />
		</section>
	);
}
