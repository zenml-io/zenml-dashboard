import { HeaderBox, InfoBox, StacksHeader } from "./Fragments";
import { StackCollapsible } from "./StackCollapsible";

export default function StacksPage() {
	return (
		<div>
			<StacksHeader />

			<div className="layout-container py-5">
				<InfoBox />
				<div className="grid grid-cols-4 gap-5 py-5">
					<div className="col-span-4 space-y-5 lg:col-span-3">
						<HeaderBox />
						<StackCollapsible />
					</div>
				</div>
			</div>
		</div>
	);
}
