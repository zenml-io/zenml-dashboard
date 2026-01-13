import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { EmptyState } from "@/components/EmptyState";
import { PageBoundary } from "@/error-boundaries/PageBoundary";
import { routes } from "@/router/routes";
import { Button } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";

export function StackPageBoundary() {
	return (
		<PageBoundary>
			<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<h1 className="mb-2 text-display-xs font-semibold">Stack Not Found</h1>
					<p className="text-theme-text-secondary">
						The stack you are looking for doesn't exist or may have been deleted.
					</p>
				</div>
				<Button intent="primary" size="lg" asChild>
					<Link to={routes.stacks.overview}>Back to Stacks</Link>
				</Button>
			</EmptyState>
		</PageBoundary>
	);
}
