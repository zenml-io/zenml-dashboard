import { Details } from "./Details";
import { InfoCollapsible } from "./Info";
import { StackCollapsible } from "./Stack";

export function OverviewTab() {
	return (
		<div className="grid grid-cols-1 gap-5">
			<Details />
			<InfoCollapsible />
			<StackCollapsible />
		</div>
	);
}
