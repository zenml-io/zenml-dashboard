import Layout from "@/assets/icons/layout.svg?react";
import { routes } from "@/router/routes";
import { Link, useSearchParams } from "react-router-dom";
import { CreateStackOptionCard } from "./OptionCard";

export function ManualSetup() {
	return (
		<section className="w-full space-y-5">
			<div>
				<h2 className="text-text-xl font-semibold">Manual Setup</h2>
				<p className="text-theme-text-secondary">
					Register your stack and component manually selecting your preferred tools from a list
				</p>
			</div>
			<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
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
				<CreateStackOptionCard
					title="Manual Setup"
					subtitle="Use a script to set a new cloud infrastructure from scratch"
					icon={<Layout className="h-6 w-6 fill-primary-400" />}
					estimatedTime="3"
				/>
			</Link>
		</div>
	);
}
