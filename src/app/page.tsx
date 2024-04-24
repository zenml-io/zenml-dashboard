import CloudSquares from "@/assets/illustrations/cloud-squares.svg";
import { Box } from "@zenml-io/react-component-library";
import { Codesnippet } from "../components/CodeSnippet";
import { OverviewHeader } from "./Header";

export default function IndexPage() {
	return (
		<div>
			<OverviewHeader />
			<div className="layout-container py-5">
				<OverviewContent />
			</div>
		</div>
	);
}

function OverviewContent() {
	return (
		<Box className="flex flex-col-reverse items-stretch overflow-hidden md:flex-row">
			<div className="w-full px-7 py-5 md:w-2/3">
				<h2 className="text-display-xs font-semibold">Welcome to ZenML</h2>
				<p className="mt-2 text-text-lg text-theme-text-secondary">
					You successfully installed ZenML dashboard. <br />
					Now you can get started with your new ZenML server.
				</p>
				<hr className="mb-5 mt-5 w-[100px]" />
				<div className="">
					<p className="mb-1 text-text-sm">Copy your ZenML server URL</p>
					<div className="flex flex-wrap items-center gap-5">
						<Codesnippet
							codeClasses="truncate"
							className="flex h-8 items-center truncate p-0 px-4"
							code={`zenml connect --url=${window.location.origin}`}
						/>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-center bg-primary-50 md:w-1/3">
				<img
					alt="illustration of different purple squares"
					src={CloudSquares}
					className="h-full w-full"
				/>
			</div>
		</Box>
	);
}
