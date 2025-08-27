import Logs from "@/assets/icons/logs.svg?react";
import { Spinner } from "@zenml-io/react-component-library";

export function LoadingLogs() {
	return (
		<section className="flex h-[calc(100vh_-_270px)] items-center justify-center">
			<div className="flex flex-col items-center justify-center">
				<div className="relative mb-2 flex items-center justify-center">
					<Spinner className="h-[120px] w-[120px]" />
					<LogsIcon />
				</div>
				<h2 className="my-3 text-center text-display-xs font-semibold">Loading the Logs</h2>
				<p className="text-center text-text-lg text-theme-text-secondary">
					It can take up to a few minutes. <br /> Please wait while we fetch logs from the artifact
					store.
				</p>
			</div>
		</section>
	);
}
function LogsIcon() {
	return (
		<div className="absolute rounded-rounded bg-primary-25 p-3">
			<Logs className="h-7 w-7 fill-primary-400" />
		</div>
	);
}

export function FilterLogsIndicator() {
	return (
		<section className="flex items-center justify-center">
			<div className="flex flex-col items-center justify-center">
				<div className="relative mb-2 flex items-center justify-center">
					<Spinner className="h-[120px] w-[120px]" />
					<LogsIcon />
				</div>
				<h2 className="my-3 text-center text-display-xs font-semibold">Loading the Logs</h2>
				<p className="text-center text-text-lg text-theme-text-secondary">
					It can take up to a few minutes. <br /> Please wait while we fetch logs from the artifact
					store.
				</p>
			</div>
		</section>
	);
}
