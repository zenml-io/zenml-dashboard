import CloudTenant from "@/assets/icons/cloud-tenant.svg?react";
import Database from "@/assets/icons/database.svg?react";
import { Link } from "react-router-dom";
import { CreateStackOptionCard } from "./OptionCard";
import { routes } from "@/router/routes";

export function SmartSetup() {
	return (
		<section className="w-full space-y-5">
			<div>
				<h2 className="text-text-xl font-semibold">Smart Stack Setup</h2>
				<p className="text-theme-text-secondary">
					Use our smart tools to connect to your Cloud in a quick and simplified way.
				</p>
			</div>
			<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
				<NewInfrastructure />
				<ExistingCloud />
			</div>
		</section>
	);
}

function NewInfrastructure() {
	return (
		<Link to={routes.stacks.create.newInfra}>
			<CreateStackOptionCard
				title="New Infrastructure"
				isRecommended
				subtitle="Use a script to set a new cloud infrastructure from scratch"
				icon={<Database className="h-6 w-6 fill-primary-400" />}
				estimatedTime="3"
			/>
		</Link>
	);
}

function ExistingCloud() {
	return (
		<CreateStackOptionCard
			comingSoon
			title="Use existing Cloud"
			subtitle="Connect to your existing Cloud and configure your components manually."
			icon={<CloudTenant className="h-6 w-6 fill-primary-400" />}
			estimatedTime="15"
		/>
	);
}
