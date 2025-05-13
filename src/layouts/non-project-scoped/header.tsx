import { NameSection } from "./name-section";
import { NonProjectTabs } from "./tabs";

export function Header() {
	return (
		<section className="overflow-x-hidden border-b border-theme-border-moderate bg-theme-surface-primary">
			<div className="space-y-3 px-5 pt-5 lg:px-[80px]">
				<NameSection />
				<NonProjectTabs />
			</div>
		</section>
	);
}
