import { Box, Button } from "@zenml-io/react-component-library";
import CheckCircle from "@/assets/icons/check-circle.svg?react";
import { Link, useSearchParams } from "react-router-dom";
import { routes } from "@/router/routes";
import { ReactNode } from "react";
import ArrowRight from "@/assets/icons/arrow-right.svg?react";

type Props = {
	username: string;
	subHeader: ReactNode;
	displayBody?: boolean;
};

export function SuccessStep({ username, subHeader, displayBody = true }: Props) {
	const [params] = useSearchParams();

	const redirect = params.get("redirect");

	return (
		<Box className="flex max-w-[540px] flex-col items-center justify-center space-y-7 px-7 py-9">
			<CheckCircle className="h-[120px] w-[120px] fill-theme-text-success" />
			<div className="space-y-3 text-center">
				<p className="text-display-xs font-semibold">
					Congratulations!
					<br />
					{subHeader}
				</p>

				{displayBody && (
					<p className="text-theme-text-secondary">
						You can log in to the dashboard with your username{" "}
						<span className="font-semibold text-theme-text-primary">{username}</span> and your
						password to start exploring!
					</p>
				)}
				<Button className="inline-flex" size="md" intent="primary" asChild>
					<Link to={redirect || routes.home}>
						<span>Go to Dashboard</span>
						<ArrowRight className="h-5 w-5 fill-white" />
					</Link>
				</Button>
			</div>
		</Box>
	);
}
