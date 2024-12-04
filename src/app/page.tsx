import External from "@/assets/icons/link-external.svg?react";
import CloudSquares from "@/assets/illustrations/cloud-squares.svg";
import { useServerInfo } from "@/data/server/info-query";
import { getLoginCommand } from "@/lib/login-command";
import { routes } from "@/router/routes";
import { Badge, Box, Button } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { Codesnippet } from "../components/CodeSnippet";
import { OverviewHeader } from "./Header";

export default function IndexPage() {
	return (
		<div>
			<OverviewHeader />
			<div className="layout-container space-y-5 py-5">
				<OverviewContent />
				<VsCodeBox />
			</div>
		</div>
	);
}

function OverviewContent() {
	const { data } = useServerInfo();
	return (
		<Box className="flex flex-col-reverse overflow-hidden lg:flex-row">
			<div className="w-full px-7 py-5 lg:w-2/3">
				<h2 className="text-display-xs font-semibold">Welcome to ZenML</h2>
				<p className="mt-2 text-text-lg text-theme-text-secondary">
					You successfully installed ZenML dashboard. <br />
					Now you can get started with your new ZenML server.
					<br />
					To get started{" "}
					<Link className="link text-theme-text-brand" to={routes.onboarding}>
						checkout the onboarding guide
					</Link>
					.
				</p>
				<hr className="mb-5 mt-5 w-[100px]" />
				<div className="">
					<p className="mb-1 text-text-sm">Copy your ZenML server URL</p>
					<div className="">
						<Codesnippet
							codeClasses="truncate"
							className="truncate"
							code={getLoginCommand(data?.deployment_type || "other")}
						/>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-center bg-primary-50 lg:w-1/3">
				<img
					alt="illustration of different purple squares"
					src={CloudSquares}
					className="h-full w-full"
				/>
			</div>
		</Box>
	);
}

function VsCodeBox() {
	return (
		<Box className="flex flex-col items-center justify-between gap-3 overflow-hidden px-7 py-5 md:flex-row md:flex-wrap">
			<div className="space-y-1">
				<div className="flex items-center space-x-1">
					<Badge className="text-text-xs font-semibold" color="green">
						NEW
					</Badge>
					<h2 className="text-text-xl font-semibold">VS Code Quickstart with ZenML</h2>
				</div>
				<p className="text-theme-text-secondary">
					Get started quickly with ZenML using GitHub Codespaces! You can run our quickstart guide
					in a pre-configured environment.
				</p>
			</div>

			<Button size="sm" className="w-fit" emphasis="subtle" asChild>
				<a target="_blank" rel="noopener noreferrer" href="https://github.com/zenml-io/zenml">
					Visit our GitHub repo <External className="h-5 w-5 shrink-0" />
				</a>
			</Button>
		</Box>
	);
}
