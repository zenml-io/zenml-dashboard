import { PipelineDetailTabs } from "./tabs";
import { PipelineDetailNameSection } from "./name-section";
export function PipelineDetailHeader() {
	return (
		<section className="overflow-x-hidden border-b border-theme-border-moderate bg-theme-surface-primary">
			<div className="space-y-1 px-5 pt-5 lg:px-[80px]">
				<PipelineDetailNameSection />
				<PipelineDetailTabs />
			</div>
		</section>
	);
}
