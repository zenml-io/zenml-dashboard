import Collapse from "@/assets/icons/collapse.svg?react";
import { RunDetailTabsDisplay } from "@/components/runs/detail-tabs";
import { Button } from "@zenml-io/react-component-library";
import { useNavigate, useParams } from "react-router-dom";
import { useSelectedTab } from "../../../components/runs/detail-tabs/service";

type TabsHeaderProps = {
	handlePanelToggle: () => void;
};
export function TabsHeader({ handlePanelToggle }: TabsHeaderProps) {
	return (
		<div className="flex items-center gap-4 border-b border-theme-border-moderate bg-theme-surface-primary px-5 py-4">
			<Button
				className="flex h-6 w-6 items-center justify-center bg-transparent p-0.5"
				intent="secondary"
				onClick={() => handlePanelToggle()}
			>
				<Collapse className="h-5 w-5 fill-theme-text-secondary" />
			</Button>
			<span className="text-text-xl">Run Insights</span>
		</div>
	);
}

export function RunsDetailTabs() {
	const { runId } = useParams() as { runId: string };
	const selectedTab = useSelectedTab();
	const navigate = useNavigate();

	function handleTabChage(tab: string) {
		const current = new URLSearchParams();
		current.set("tab", tab);
		navigate(`?${current.toString()}`);
	}

	return (
		<div className="flex flex-col gap-5 p-5">
			<RunDetailTabsDisplay
				runId={runId}
				selectedTab={selectedTab}
				handleTabChage={handleTabChage}
			/>
		</div>
	);
}
