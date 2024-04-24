import { Icon } from "@/components/Icon";
import { routes } from "@/router/routes";
import { Button } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";

export default function Page404() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<EmptyState icon={<Icon name="help" className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<h1 className="mb-2 text-display-xs font-semibold">
						We can't find the page you are looking for
					</h1>
					<p className="text-lg text-theme-text-secondary">
						You can try typing a different URL or we can bring you back to your Homepage.
					</p>
					<div className="mt-5 flex justify-center">
						<Button size="md" asChild>
							<Link className="w-min self-center whitespace-nowrap" to={routes.home}>
								<span className="px-0.5">Go to Home</span>
							</Link>
						</Button>
					</div>
				</div>
			</EmptyState>
		</div>
	);
}
