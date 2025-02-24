import { StackComponentsDetailHeader } from "@/components/stack-components/component-detail/Header";
import { Outlet, useParams } from "react-router-dom";

export default function ComponentLayout() {
	const { componentId } = useParams() as { componentId: string };
	return (
		<div>
			<StackComponentsDetailHeader isPanel={false} componentId={componentId} />
			<Outlet />
		</div>
	);
}
