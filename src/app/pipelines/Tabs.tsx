import RunIcon from "@/assets/icons/terminal.svg?react";
import PipelineIcon from "@/assets/icons/dataflow.svg?react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@zenml-io/react-component-library";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PipelinesBody } from "./PipelinesTab/PipelinesBody";
import { RunsBody } from "./RunsTab/RunsBody";
import { RunsSelectorProvider } from "./RunsTab/RunsSelectorContext";
import { useSelectedTab } from "./service";
import { useEffect } from "react";

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
	const [searchParams] = useSearchParams();
	const selectedTab = useSelectedTab();
	const navigate = useNavigate();

	useEffect(() => {
		// To set current tab in URL
		const tabParam = searchParams.get("tab");
		if (!tabParam) {
			const newParams = new URLSearchParams(searchParams);
			newParams.set("tab", "pipelines");
			navigate(`?${newParams.toString()}`, { replace: true });
		}
	}, []);

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
					<RunsSelectorProvider>
						<RunsBody />
					</RunsSelectorProvider>
				</TabsContent>
			</Tabs>
		</div>
	);
}
