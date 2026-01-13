import { Button } from "@zenml-io/react-component-library";
import LayoutLeft from "@/assets/icons/layout-left.svg?react";

type Props = {
	toggleSidebar: () => void;
};

export function LogViewerSidebarToggleButton({ toggleSidebar }: Props) {
	return (
		<Button
			intent="secondary"
			emphasis="minimal"
			className="flex size-6 shrink-0 items-center justify-center p-0"
			onClick={toggleSidebar}
		>
			<LayoutLeft className="h-5 w-5 shrink-0 fill-theme-text-secondary" />
		</Button>
	);
}
