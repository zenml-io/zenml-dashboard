import { InfoBox } from "@/components/Infobox";
import type { IDEConfig } from "../types";
import { InstallationMethodCard } from "./InstallationMethodCard";

type IDETabContentProps = {
	ide: IDEConfig;
	onOpenLink: (url: string) => void;
};

export function IDETabContent({ ide, onOpenLink }: IDETabContentProps) {
	return (
		<div className="space-y-4">
			<div className="space-y-1">
				<h3 className="text-text-md font-semibold">{ide.name} Setup</h3>
				<p className="text-text-sm text-theme-text-secondary">
					Choose an installation method below and follow the instructions.
				</p>
			</div>

			<div className="space-y-3">
				{ide.methods.map((method, index) => (
					<InstallationMethodCard
						key={`${ide.value}-${method.type}-${index}`}
						method={method}
						onOpenLink={onOpenLink}
					/>
				))}
			</div>

			{ide.troubleshooting && (
				<InfoBox intent="neutral">
					<div className="space-y-1">
						<h4 className="text-text-sm font-semibold">Troubleshooting</h4>
						<p className="text-text-sm">{ide.troubleshooting}</p>
					</div>
				</InfoBox>
			)}
		</div>
	);
}
