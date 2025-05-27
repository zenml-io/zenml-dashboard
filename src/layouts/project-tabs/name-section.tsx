import { ServerMembers } from "../non-project-scoped/server-members";
import { IdSection } from "./id-section";
export function NameSection() {
	return (
		<div className="flex items-center justify-between gap-2">
			<IdSection />
			<ServerMembers />
		</div>
	);
}
