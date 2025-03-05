import { useParams } from "react-router-dom";
import { StackComponentsDetailHeader } from "../../../components/stack-components/component-detail/Header";
import { StackComponentTabs } from "@/components/stack-components/component-detail/Tabs";
import { StackList } from "../../stacks/StackList";
import { RunsBody } from "../../pipelines/RunsTab/RunsBody";
import { RunsDataTableContextProvider } from "../../pipelines/RunsTab/RunsDataTableContext";

export default function ComponentDetailPage() {
	const { componentId } = useParams() as { componentId: string };

	return (
		<div className="@container">
			<StackComponentsDetailHeader isPanel={false} componentId={componentId} />
			<StackComponentTabs
				isPanel={false}
				stacksTabContent={<StackList fixedQueryParams={{ component_id: componentId }} />}
				runsTabContent={
					<RunsDataTableContextProvider>
						<RunsBody fixedQueryParams={{ stack_component: componentId }} />
					</RunsDataTableContextProvider>
				}
				componentId={componentId}
			/>
		</div>
	);
}
