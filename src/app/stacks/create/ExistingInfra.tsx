import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import CloudTenant from "@/assets/icons/cloud-tenant.svg?react";
import Help from "@/assets/icons/help.svg?react";
import Layout from "@/assets/icons/layout.svg?react";
import { routes } from "@/router/routes";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { Link, useSearchParams } from "react-router-dom";
import * as OptionsCard from "./OptionCard";

const learnMoreLink = "https://docs.zenml.io/how-to/stack-deployment/deploy-a-cloud-stack";

export function ExistingInfrastructure() {
	return (
		<section className="w-full space-y-5">
			<div>
				<h2 className="text-text-xl font-semibold">Connect Existing Infrastructure</h2>
				<p className="text-theme-text-secondary">
					Register your stack and components using existing resources that are already provisioned.
				</p>
			</div>
			<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
				<ScanCard />
				<ManualSetupCard />
			</div>
		</section>
	);
}

function ManualSetupCard() {
	const [searchParams] = useSearchParams();
	const link =
		routes.stacks.create.manual + (searchParams.size >= 1 ? `?${searchParams.toString()}` : "");

	return (
		<div className="relative">
			<Link to={link}>
				<OptionsCard.Root>
					<OptionsCard.Header>
						<OptionsCard.Icon>
							<Layout className="h-6 w-6 fill-primary-400" />
						</OptionsCard.Icon>
						<OptionsCard.Icons />
					</OptionsCard.Header>
					<OptionsCard.Body>
						<OptionsCard.TitleLine>
							<OptionsCard.Title>Manual Setup</OptionsCard.Title>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="z-10">
											<AlertCircle className="h-5 w-5 shrink-0 fill-theme-text-tertiary" />
										</div>
									</TooltipTrigger>
									<TooltipContent
										align="start"
										side="bottom"
										className="z-50 flex max-w-[480px] flex-col gap-2 bg-theme-surface-primary p-5 text-text-sm text-theme-text-primary"
									>
										<p>
											Customize your ML stack by selecting each component individually through the
											ZenML interface. Choose from a list of pre-configured components or add new
											ones tailored to your needs.
										</p>
										<a className="link text-primary-400" target="_blank" href={learnMoreLink}>
											Learn More
										</a>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</OptionsCard.TitleLine>
						<OptionsCard.Subtitle>
							Register stack and components manually using ZenML. Recommended for advanced or custom
							configurations.
						</OptionsCard.Subtitle>
					</OptionsCard.Body>
					<OptionsCard.RecommendedFor recommendataion="advanced users" />
					<OptionsCard.Footer>
						<OptionsCard.EstimatedTime min="5-10" />
						<OptionsCard.Flexibility flexibility={100}>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="z-10">
											<Help className="h-3 w-3 shrink-0 fill-theme-text-tertiary" />
										</div>
									</TooltipTrigger>
									<TooltipContent className="z-50 max-w-[480px] bg-theme-surface-primary text-theme-text-primary">
										<strong>Full flexibility:</strong> Complete control and customization. For
										expert users and highly specialized requirements.
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

function ScanCard() {
	return (
		<div className="relative">
			<Link to={routes.stacks.create.existingInfra}>
				<OptionsCard.Root>
					<OptionsCard.Header>
						<OptionsCard.Icon>
							<CloudTenant className="h-6 w-6 fill-primary-400" />
						</OptionsCard.Icon>
						<OptionsCard.Icons />
					</OptionsCard.Header>
					<OptionsCard.Body>
						<OptionsCard.TitleLine>
							<OptionsCard.Title>Scan your Cloud</OptionsCard.Title>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="z-10">
											<AlertCircle className="h-5 w-5 shrink-0 fill-theme-text-tertiary" />
										</div>
									</TooltipTrigger>
									<TooltipContent
										align="start"
										side="bottom"
										className="z-50 flex max-w-[480px] flex-col gap-2 bg-theme-surface-primary p-5 text-text-sm text-theme-text-primary"
									>
										<p>
											The stack wizard allows you to browse through your existing infrastructure and
											use it to register a ZenML cloud stack.
										</p>
										<a className="link text-primary-400" target="_blank" href={learnMoreLink}>
											Learn More
										</a>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</OptionsCard.TitleLine>
						<OptionsCard.Subtitle>
							Input your credentials and scan existing infrastructure on your cloud provider. Best
							for users with existing resources.
						</OptionsCard.Subtitle>
					</OptionsCard.Body>
					<OptionsCard.RecommendedFor recommendataion="infrastructure engineers" />
					<OptionsCard.Footer>
						<OptionsCard.EstimatedTime min="5" />
						<OptionsCard.Flexibility flexibility={50}>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="z-10">
											<Help className="h-3 w-3 shrink-0 fill-theme-text-tertiary" />
										</div>
									</TooltipTrigger>
									<TooltipContent className="z-50 max-w-[480px] bg-theme-surface-primary text-theme-text-primary">
										<strong>Medium flexibility:</strong> Balances ease-of-use with some
										customization options.
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
