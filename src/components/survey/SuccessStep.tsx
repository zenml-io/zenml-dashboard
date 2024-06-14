import { urlSchema } from "@/lib/url";
import { routes } from "@/router/routes";
import { Box, Button } from "@zenml-io/react-component-library";
import { ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Icon } from "../Icon";

type Props = {
	username: string;
	subHeader: ReactNode;
	displayBody?: boolean;
};

export function SuccessStep({ username, subHeader, displayBody = true }: Props) {
	const [params] = useSearchParams();

	const redirect = params.get("redirect");
	const sanitizedRedirect = redirect && `${window.location.origin}${redirect}`;
	const isUrl = urlSchema.safeParse(sanitizedRedirect);

	return (
		<Box className="flex max-w-[540px] flex-col items-center justify-center space-y-7 px-7 py-9">
			<Icon name="check-circle" className="h-[120px] w-[120px] fill-theme-text-success" />
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
					<Link to={isUrl.success ? isUrl.data : routes.home}>
						<span>Go to Dashboard</span>
						<Icon name="arrow-right" className="h-5 w-5 fill-white" />
					</Link>
				</Button>
			</div>
		</Box>
	);
}
