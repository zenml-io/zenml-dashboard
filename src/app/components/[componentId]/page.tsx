import { useParams } from "react-router-dom";
import { StackComponentsDetailHeader } from "../../../components/stack-components/component-detail/Header";
import { StackComponentTabs } from "@/components/stack-components/component-detail/Tabs";
import { StackList } from "../../stacks/StackList";

export default function ComponentDetailPage() {
	const { componentId } = useParams() as { componentId: string };

	return (
		<div className="@container">
			<StackComponentsDetailHeader isPanel={false} componentId={componentId} />
			<StackComponentTabs
				isPanel={false}
				stacksTabContent={<StackList fixedQueryParams={{ component_id: componentId }} />}
				componentId={componentId}
			/>
		</div>
	);
}
