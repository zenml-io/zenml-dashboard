import CheckCircle from "@/assets/icons/check-circle.svg?react";
import { Tick } from "@/components/pro/ProCta";
import { routes } from "@/router/routes";
import { Button } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";

const contents = [
	"Comprehensive documentation to get started",
	"Your 14-day trial license key",
	"Step-by-step deployment instructions"
];

export function SubmitSuccess() {
	return (
		<section className="flex h-full w-full flex-col items-center justify-center space-y-5">
			<CheckCircle className="h-[120px] w-[120px] fill-theme-text-success" />
			<div className="space-y-7">
				<div className="max-w-[500px] space-y-2 text-center">
					<h1 className="text-display-xs font-semibold">You're on your way to ZenML Pro!</h1>
					<p className="text-theme-text-secondary">
						Thank you for choosing to upgrade to ZenML Pro. We've received your request and you'll
						receive an email with:
					</p>
					<ul className="mx-auto w-fit space-y-3">
						{contents.map((val, idx) => (
							<li className="flex items-center gap-1" key={idx}>
								<Tick />
								<span>{val}</span>
							</li>
						))}
					</ul>
					<p className="text-theme-text-secondary">
						Meanwhile, you can ask your questions in our{" "}
						<a
							className="link"
							href="https://zenml.io/slack"
							target="_blank"
							rel="noopener noreferrer"
						>
							Slack channel
						</a>{" "}
						or{" "}
						<a
							className="link"
							href="https://docs.zenml.io"
							target="_blank"
							rel="noopener noreferrer"
						>
							check our documentation.
						</a>
					</p>
				</div>
				<Button size="md" className="mx-auto">
					<Link to={routes.projects.overview}>Go to Dashboard</Link>
				</Button>
			</div>
		</section>
	);
}
