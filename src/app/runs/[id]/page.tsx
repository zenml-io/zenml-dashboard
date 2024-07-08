import Expand from "@/assets/icons/expand.svg?react";
import { useServerInfo } from "@/data/server/info-query";
import { checkIsLocalServer } from "@/lib/server";
import { Button } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction, useState } from "react";
import { DAG } from "./Dag";
import { RunsDetailHeader } from "./Header";
import { RunsDetailTabs, TabsHeader } from "./_Tabs";

export default function RunDetailPage() {
	const serverInfo = useServerInfo();
	const isLocal = checkIsLocalServer(serverInfo.data?.deployment_type || "other");
	const [isPanelOpen, setIsPanelOpen] = useState(true);
	return (
		<div>
			<RunsDetailHeader />
			<div
				className={`flex ${isLocal ? "h-[calc(100vh_-_4rem_-_4rem_-_4rem_-_2px)]" : "h-[calc(100vh_-_4rem_-_4rem_-_2px)]"}  w-full`}
			>
				<div
					className={`relative bg-white/40 transition-all duration-500 ${
						isPanelOpen ? "w-1/2" : "w-full"
					}`}
				>
					<DAG />
					<ExpandPanelButton isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
				</div>
				<div
					aria-hidden={!isPanelOpen}
					className={`h-full min-w-0 overflow-x-hidden text-ellipsis whitespace-nowrap bg-theme-surface-secondary transition-all duration-500 ${
						isPanelOpen
							? "w-1/2 border-l border-theme-border-moderate"
							: "w-0 overflow-x-hidden border-transparent"
					}`}
				>
					<TabsHeader setIsPanelOpen={setIsPanelOpen} />
					<RunsDetailTabs />
				</div>
			</div>
		</div>
	);
}

type ExpandPanelProps = {
	isPanelOpen: boolean;
	setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
};
function ExpandPanelButton({ isPanelOpen, setIsPanelOpen }: ExpandPanelProps) {
	return (
		<Button
			intent="secondary"
			className={`absolute right-4 top-4 h-7 w-7 items-center justify-center border border-neutral-300 bg-transparent p-0.5  ${
				isPanelOpen ? "hidden" : "flex"
			}`}
			onClick={() => setIsPanelOpen(true)}
		>
			<Expand className="h-5 w-5 fill-theme-text-primary" />
		</Button>
	);
}
