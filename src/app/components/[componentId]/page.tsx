import { StackComponentTabs } from "@/components/stack-components/component-detail/Tabs";
import { useParams } from "react-router-dom";
import { RunsBody } from "../../runs/RunsBody";
import { RunsSelectorProvider } from "../../runs/RunsSelectorContext";
import { StackList } from "../../stacks/StackList";

export default function ComponentDetailPage() {
	const { componentId } = useParams() as { componentId: string };

	return (
		<div className="@container">
			<StackComponentTabs
				isPanel={false}
				stacksTabContent={<StackList fixedQueryParams={{ component_id: componentId }} />}
				runsTabContent={
					<RunsSelectorProvider>
						<RunsBody fixedQueryParams={{ stack_component: componentId }} />
					</RunsSelectorProvider>
				}
				componentId={componentId}
			/>
		</div>
	);
}
