import Stacks from "@/assets/icons/stack.svg?react";
import RunIcon from "@/assets/icons/terminal.svg?react";
import Tools from "@/assets/icons/tool-02.svg?react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@zenml-io/react-component-library";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComponentConfigTab } from "./ConfigTab";
import { useSelectedTab } from "./service";

type Props = {
	componentId: string;
	isPanel: boolean;
	stacksTabContent: ReactNode;
	runsTabContent: ReactNode;
};
export function StackComponentTabs({
	componentId,
	isPanel,
	stacksTabContent,
	runsTabContent
}: Props) {
	const [inMemoryTab, setInMemoryTab] = useState("configuration");
	const selectedTab = useSelectedTab();
	const navigate = useNavigate();

	function handleTabChage(tab: string) {
		if (isPanel) {
			setInMemoryTab(tab);
			return;
		}
		const current = new URLSearchParams();
		current.set("tab", tab);
		navigate(`?${current.toString()}`);
	}

	return (
		<div className="p-5">
			<Tabs value={isPanel ? inMemoryTab : selectedTab} onValueChange={handleTabChage}>
				<TabsList>
					<TabsTrigger className="flex items-center gap-2 text-text-md" value="configuration">
						<Tools className="h-5 w-5 shrink-0 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
						<span>Configuration</span>
					</TabsTrigger>
					<TabsTrigger className="flex items-center gap-2 text-text-md" value="stacks">
						<Stacks className="h-5 w-5 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
						<span>Stacks</span>
					</TabsTrigger>
					<TabsTrigger className="flex items-center gap-2 text-text-md" value="runs">
						<RunIcon className="h-5 w-5 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
						<span>Runs</span>
					</TabsTrigger>
				</TabsList>

				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="configuration">
					<ComponentConfigTab componentId={componentId} />
				</TabsContent>
				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="stacks">
					{stacksTabContent}
				</TabsContent>
				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="runs">
					{runsTabContent}
				</TabsContent>
			</Tabs>
		</div>
	);
}
