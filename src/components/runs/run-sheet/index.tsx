import { SheetHeader } from "@/components/sheet/SheetHeader";
import { RunDetailTabsDisplay } from "../detail-tabs";
import { useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { RunSheetHeadline } from "./headline";
import { Button } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";
import { routes } from "@/router/routes";
import Maximize from "@/assets/icons/expand-full.svg?react";

type Props = {
	runId: string;
};

export function RunSheet({ runId }: Props) {
	const [activeTab, setActiveTab] = useState("overview");

	return (
		<div>
			<SheetHeader>
				<MaximizeButton runId={runId} />
			</SheetHeader>
			<RunSheetHeadline runId={runId} />
			<div className="p-5">
				<RunDetailTabsDisplay runId={runId} selectedTab={activeTab} handleTabChage={setActiveTab} />
			</div>
		</div>
	);
}

export function BorderErrorFallback() {
	return (
		<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
			<div className="text-center">
				<p className="mb-2 text-display-xs font-semibold">Error loading run sheet</p>
			</div>
		</EmptyState>
	);
}

function MaximizeButton({ runId }: Props) {
	return (
		<Button
			asChild
			className="flex aspect-square items-center justify-center p-0"
			intent="secondary"
			emphasis="minimal"
		>
			<Link to={routes.projects.runs.detail(runId)}>
				<Maximize className="h-5 w-5 fill-neutral-500" />
			</Link>
		</Button>
	);
}
