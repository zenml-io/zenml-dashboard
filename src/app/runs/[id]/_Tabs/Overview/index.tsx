import { Details } from "./Details";
import { StackCollapsible } from "./Stack";

export function OverviewTab() {
	return (
		<div className="grid grid-cols-1 gap-5">
			<Details />
			<StackCollapsible />
		</div>
	);
}
