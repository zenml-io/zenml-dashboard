import { InfoBox } from "@/components/Infobox";
import { stackQueries } from "@/data/stacks";
import { routes } from "@/router/routes";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { clearWizardData, parseWizardData } from "./create/terraform/persist";

type Props = {
	setHasResumeableTerraform: Dispatch<SetStateAction<boolean>>;
};

export function ResumeTerraformBanner({ setHasResumeableTerraform }: Props) {
	const { success, data } = parseWizardData();
	const stack = useQuery({
		...stackQueries.stackDeploymentStack({
			provider: data?.provider || "aws",
			stack_name: data?.stackName || "",
			date_start: data?.timestamp
		}),
		enabled: success,
		throwOnError: true
	});

	useEffect(() => {
		if (stack.data) {
			clearWizardData();
			setHasResumeableTerraform(false);
		}
	}, [stack.data]);

	if (!success) return null;

	if (stack.isError) return null;
	if (stack.isPending) return <Skeleton className="h-[70px] w-full" />;

	return (
		<InfoBox className="w-full">
			<section className="flex flex-wrap items-center justify-between gap-y-2">
				<div className="flex flex-wrap items-center gap-2">
					<p className="font-semibold">You have a Terraform Stack provision incomplete</p>
					<p className="text-text-sm">
						Return to the setup and finish the configuration on your cloud provider
					</p>
				</div>
				<div>
					<Button
						className="w-fit bg-theme-surface-primary"
						intent="primary"
						emphasis="subtle"
						asChild
					>
						<Link to={routes.stacks.create.terraform}>
							<span>Review Stack</span>
						</Link>
					</Button>
				</div>
			</section>
		</InfoBox>
	);
}
