import Codebrowser from "@/assets/icons/code-browser.svg?react";
import ConnectorAdd from "@/assets/icons/connector-add.svg?react";
import Help from "@/assets/icons/help.svg?react";
import Info from "@/assets/icons/info.svg?react";
import { useServerInfo } from "@/data/server/info-query";
import { checkIsLocalServer } from "@/lib/server";
import { routes } from "@/router/routes";
import { Skeleton } from "@zenml-io/react-component-library";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { Link, useSearchParams } from "react-router-dom";
import { LocalOverlay } from "./LocalOverlay";
import * as OptionsCard from "./OptionCard";

const learnMoreLink =
	"https://docs.zenml.io/how-to/infrastructure-deployment/stack-deployment/deploy-a-cloud-stack";

export function NewInfrastructure() {
	const { isError, isPending, data } = useServerInfo();
	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return <div>Failed to load server info</div>;

	const isLocalServer = checkIsLocalServer(data.deployment_type || "other");
	return (
		<section className="w-full space-y-5">
			<div>
				<h2 className="text-text-xl font-semibold">Create New Infrastructure</h2>
				<p className="text-theme-text-secondary">
					Use our smart tools to create a new Cloud infrastructure a quick and simplified way.
				</p>
			</div>
			<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
				<InBrowserCard isLocalDeployment={isLocalServer} />
				<TerraformCard isLocalDeployment={isLocalServer} />
			</div>
		</section>
	);
}

type Props = {
	isLocalDeployment: boolean;
};

function InBrowserCard({ isLocalDeployment }: Props) {
	const [searchParams] = useSearchParams();
	const link =
		routes.stacks.create.newInfra + (searchParams.size >= 1 ? `?${searchParams.toString()}` : "");
	return (
		<div className="relative">
			{isLocalDeployment && <LocalOverlay />}
			<Link to={link}>
				<OptionsCard.Root>
					<OptionsCard.Header>
						<OptionsCard.Icon>
							<Codebrowser className="h-6 w-6 fill-primary-400" />
						</OptionsCard.Icon>
						<OptionsCard.Icons />
					</OptionsCard.Header>
					<OptionsCard.Body>
						<OptionsCard.TitleLine>
							<OptionsCard.Title>In-browser Experience</OptionsCard.Title>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="z-10">
											<Info className="h-5 w-5 shrink-0 fill-theme-text-tertiary" />
										</div>
									</TooltipTrigger>
									<TooltipContent
										align="start"
										side="bottom"
										className="z-50 flex max-w-[480px] flex-col gap-2 bg-theme-surface-primary p-5 text-text-sm text-theme-text-primary"
									>
										<p>
											Deploy the necessary pieces of infrastructure on your selected cloud provider
											and get you started on remote stack with a single click.
										</p>
										<a className="link text-primary-400" target="_blank" href={learnMoreLink}>
											Learn More
										</a>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</OptionsCard.TitleLine>
						<OptionsCard.Subtitle>
							Provision cloud infrastructure via browser UI. No local installs needed. Quick setup
							for cloud resources.
						</OptionsCard.Subtitle>
					</OptionsCard.Body>
					<OptionsCard.RecommendedFor recommendataion="data scientists" />
					<OptionsCard.Footer>
						<OptionsCard.EstimatedTime min="5" />
						<OptionsCard.Flexibility flexibility={25}>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="z-10">
											<Help className="h-3 w-3 shrink-0 fill-theme-text-tertiary" />
										</div>
									</TooltipTrigger>
									<TooltipContent className="z-50 max-w-[480px] bg-theme-surface-primary text-theme-text-primary">
										<strong>Low flexibility:</strong> Best for straightforward setups with minimal
										customization.
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</OptionsCard.Flexibility>
					</OptionsCard.Footer>
				</OptionsCard.Root>
			</Link>
		</div>
	);
}

function TerraformCard({ isLocalDeployment }: Props) {
	const [searchParams] = useSearchParams();
	const link =
		routes.stacks.create.terraform + (searchParams.size >= 1 ? `?${searchParams.toString()}` : "");

	return (
		<div className="relative">
			{isLocalDeployment && <LocalOverlay />}
			<Link to={link}>
				<OptionsCard.Root className="flex flex-col justify-between space-y-0">
					<div className="space-y-1">
						<OptionsCard.Header>
							<OptionsCard.Icon>
								<ConnectorAdd className="h-6 w-6 fill-primary-400" />
							</OptionsCard.Icon>
							<OptionsCard.Icons hasTerraform />
						</OptionsCard.Header>
						<OptionsCard.Body>
							<OptionsCard.TitleLine>
								<OptionsCard.Title>Infrastructure-as-code</OptionsCard.Title>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<div className="z-10">
												<Info className="h-5 w-5 shrink-0 fill-theme-text-tertiary" />
											</div>
										</TooltipTrigger>
										<TooltipContent
											align="start"
											side="bottom"
											className="z-50 flex max-w-[480px] flex-col gap-2 bg-theme-surface-primary p-5 text-text-sm text-theme-text-primary"
										>
											<p>
												Infrastructure-as-code (IaC) refers to using a dynamic codebase to provision
												and manage infrastructure, rather than deferring to manual processes.
											</p>
											<a className="link text-primary-400" target="_blank" href={learnMoreLink}>
												Learn More
											</a>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</OptionsCard.TitleLine>
							<OptionsCard.Subtitle>
								Use Terraform modules to deploy infrastructure and register it back to ZenML.
							</OptionsCard.Subtitle>
						</OptionsCard.Body>
					</div>
					<div className="space-y-1">
						<OptionsCard.RecommendedFor recommendataion="infrastructure engineers" />
						<OptionsCard.Footer>
							<OptionsCard.EstimatedTime min="3" />
							<OptionsCard.Flexibility flexibility={75}>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<div className="z-10">
												<Help className="h-3 w-3 shrink-0 fill-theme-text-tertiary" />
											</div>
										</TooltipTrigger>
										<TooltipContent className="z-50 max-w-[480px] bg-theme-surface-primary text-theme-text-primary">
											<strong>High flexibility:</strong> Offers extensive customization for advanced
											users or complex setups.
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</OptionsCard.Flexibility>
						</OptionsCard.Footer>
					</div>
				</OptionsCard.Root>
			</Link>
		</div>
	);
}
