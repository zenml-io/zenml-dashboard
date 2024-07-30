import CloudTenant from "@/assets/icons/cloud-tenant.svg?react";
import Database from "@/assets/icons/database.svg?react";
import { useServerInfo } from "@/data/server/info-query";
import { checkIsLocalServer } from "@/lib/server";
import { routes } from "@/router/routes";
import { Skeleton } from "@zenml-io/react-component-library";
import { Link, useSearchParams } from "react-router-dom";
import { CreateStackOptionCard } from "./OptionCard";

export function SmartSetup() {
	const { isError, isPending, data } = useServerInfo();
	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return <div>Failed to load server info</div>;

	const isLocalServer = checkIsLocalServer(data.deployment_type || "other");

	return (
		<section className="w-full space-y-5">
			<div>
				<h2 className="text-text-xl font-semibold">Smart Stack Setup</h2>
				<p className="text-theme-text-secondary">
					Use our smart tools to connect to your Cloud in a quick and simplified way.
				</p>
			</div>
			<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
				<NewInfrastructure isLocalDeployment={isLocalServer} />
				<ExistingCloud isLocalDeployment={isLocalServer} />
			</div>
		</section>
	);
}

type Props = {
	isLocalDeployment: boolean;
};
function NewInfrastructure({ isLocalDeployment }: Props) {
	const [searchParams] = useSearchParams();
	const link =
		routes.stacks.create.newInfra + (searchParams.size >= 1 ? `?${searchParams.toString()}` : "");
	return (
		<div className="relative">
			{isLocalDeployment && <LocalOverlay />}
			<Link to={link}>
				<CreateStackOptionCard
					title="New Infrastructure"
					isRecommended
					subtitle="Use a script to set a new cloud infrastructure from scratch"
					icon={<Database className="h-6 w-6 fill-primary-400" />}
					estimatedTime="3"
				/>
			</Link>
		</div>
	);
}

function ExistingCloud({ isLocalDeployment }: Props) {
	const [searchParams] = useSearchParams();
	const link =
		routes.stacks.create.existingInfra +
		(searchParams.size >= 1 ? `?${searchParams.toString()}` : "");
	return (
		<div className="relative">
			{isLocalDeployment && <LocalOverlay />}
			<Link to={link}>
				<CreateStackOptionCard
					title="Use existing Cloud"
					subtitle="Connect to your existing Cloud and configure your components manually."
					icon={<CloudTenant className="h-6 w-6 fill-primary-400" />}
					estimatedTime="15"
				/>
			</Link>
		</div>
	);
}

function LocalOverlay() {
	return (
		<div className="group absolute flex h-full w-full items-center justify-center rounded-md border border-theme-border-moderate bg-white/70">
			<div className="hidden rounded-md bg-theme-text-primary px-3 py-2 text-text-xs text-theme-text-negative shadow-lg animate-in fade-in-0 fade-out-0 zoom-in-95 group-hover:block">
				Smart Setup is not available for local deployments
			</div>
		</div>
	);
}
