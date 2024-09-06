import RunIcon from "@/assets/icons/code-square.svg?react";
import PipelineIcon from "@/assets/icons/dataflow.svg?react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import { PipelinesBody } from "./PipelinesTab/PipelinesBody";
import { useSelectedTab } from "./service";
import { RunsBody } from "./RunsTab/RunsBody";

const tabData = [
	{
		value: "pipelines",
		label: "Pipelines",
		icon: PipelineIcon
	},
	{
		value: "runs",
		label: "Runs",
		icon: RunIcon
	}
];

export function PipelineTabs() {
	const selectedTab = useSelectedTab();
	const navigate = useNavigate();
	function handleTabChange(tab: string) {
		const current = new URLSearchParams();
		current.set("tab", tab);
		navigate(`?${current.toString()}`);
	}

	return (
		<div className="p-5">
			<Tabs onValueChange={handleTabChange} value={selectedTab}>
				<TabsList>
					{tabData.map((tab) => (
						<TabsTrigger
							key={tab.value}
							className="flex items-center gap-2 text-text-md"
							value={tab.value.toLowerCase()}
						>
							<tab.icon
								className={`h-5 w-5 ${
									selectedTab === tab.value ? "fill-primary-400" : "fill-theme-text-tertiary"
								}`}
							/>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="pipelines">
					<PipelinesBody />
				</TabsContent>

				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="runs">
					{/* <RunsActionProvider initialStageActions={[]}> */}
					<RunsBody />
					{/* </RunsActionProvider> */}
				</TabsContent>
			</Tabs>
		</div>
	);
}
