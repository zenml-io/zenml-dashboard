import PipelineIcon from "@/assets/icons/dataflow.svg?react";
import TemplatesIcon from "@/assets/icons/pipeline-template.svg?react";
import RunIcon from "@/assets/icons/terminal.svg?react";
import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from "@zenml-io/react-component-library";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PipelinesBody } from "./PipelinesTab/PipelinesBody";
import { PipelineDataTableContextProvider } from "./PipelinesTab/PipelineSelectorContext";
import { RunsBody } from "./RunsTab/RunsBody";
import { useSelectedTab } from "./service";
import { TemplateBody } from "./Templates/TemplateBody";
import { RunsDataTableContextProvider } from "./RunsTab/RunsDataTableContext";

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
	},
	{
		value: "templates",
		label: "Templates",
		icon: TemplatesIcon
	}
];

export function PipelineTabs() {
	const [searchParams] = useSearchParams();
	const selectedTab = useSelectedTab();
	const navigate = useNavigate();

	useEffect(() => {
		const tabParam = searchParams.get("tab");
		if (!tabParam) {
			const newParams = new URLSearchParams(searchParams);
			newParams.set("tab", "pipelines");
			navigate(`?${newParams.toString()}`, { replace: true });
		}
	}, [navigate, searchParams]);

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
							{tab.value === "templates" && (
								<Badge
									className="rounded-sm font-semibold text-primary-500"
									color="purple"
									size="sm"
								>
									New
								</Badge>
							)}
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="pipelines">
					<PipelineDataTableContextProvider>
						<PipelinesBody />
					</PipelineDataTableContextProvider>
				</TabsContent>

				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="runs">
					<RunsDataTableContextProvider>
						<RunsBody />
					</RunsDataTableContextProvider>
				</TabsContent>
				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="templates">
					<TemplateBody />
				</TabsContent>
			</Tabs>
		</div>
	);
}
