import Stacks from "@/assets/icons/stack.svg?react";
import Tools from "@/assets/icons/tool-02.svg?react";
import { ComponentConfigTab } from "./ConfigTab";
import { useSelectedTab } from "./service";
import { ReactNode, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";

type Props = {
	componentId: string;
	isPanel: boolean;
	stacksTabContent: ReactNode;
};
export function StackComponentTabs({ componentId, isPanel, stacksTabContent }: Props) {
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
				</TabsList>

				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="configuration">
					<ComponentConfigTab componentId={componentId} />
				</TabsContent>
				<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="stacks">
					{stacksTabContent}
				</TabsContent>
			</Tabs>
		</div>
	);
}
