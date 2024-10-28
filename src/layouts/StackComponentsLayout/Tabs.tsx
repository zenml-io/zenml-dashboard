import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@zenml-io/react-component-library/components/client";
import StackIcon from "@/assets/icons/stack.svg?react";
import Container from "@/assets/icons/container.svg?react";
import { ReactNode } from "react";
import { routes } from "@/router/routes";
import { useLocation, useNavigate } from "react-router-dom";

export function StackComponentTabs({ children }: { children: ReactNode }) {
	const navigate = useNavigate();

	const path = useLocation().pathname;
	const segment = path.split("/").at(-1) as "stacks" | "components" | null;

	function changeValue(val: string) {
		if (val === "stacks") {
			navigate(routes.stacks.overview);
		}
		if (val === "components") {
			navigate(routes.components.overview);
		}
	}

	return (
		<Tabs onValueChange={changeValue} value={segment || "stacks"}>
			<TabsList>
				<TabsTrigger className="flex items-center gap-2 text-text-md" value="stacks">
					<StackIcon className="h-5 w-5 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
					<span>Stacks</span>
				</TabsTrigger>
				<TabsTrigger className="flex items-center gap-2 text-text-md" value="components">
					<Container className="h-5 w-5 fill-theme-text-tertiary group-data-[state=active]/trigger:fill-theme-surface-strong" />
					<span>Components</span>
				</TabsTrigger>
			</TabsList>

			<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="stacks">
				{children}
			</TabsContent>
			<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="components">
				{children}
			</TabsContent>
		</Tabs>
	);
}
