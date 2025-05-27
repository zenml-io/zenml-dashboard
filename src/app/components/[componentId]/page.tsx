import { StackComponentTabs } from "@/components/stack-components/component-detail/Tabs";
import { useParams } from "react-router-dom";
import { RunsBody } from "../../runs/RunsBody";
import { RunsSelectorContextProvider } from "../../runs/RunsSelectorContext";
import { StackList } from "../../stacks/StackList";

export default function ComponentDetailPage() {
	const { componentId } = useParams() as { componentId: string };

	return (
		<div className="@container">
			<StackComponentTabs
				isPanel={false}
				stacksTabContent={<StackList fixedQueryParams={{ component_id: componentId }} />}
				runsTabContent={
					<RunsSelectorContextProvider>
						<RunsBody fixedQueryParams={{ stack_component: componentId }} />
					</RunsSelectorContextProvider>
				}
				componentId={componentId}
			/>
		</div>
	);
}
