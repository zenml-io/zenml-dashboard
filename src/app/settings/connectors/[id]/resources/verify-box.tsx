import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { VerifyButton } from "./verify-button";
import { FallbackIcon } from "@/components/fallback/icon";

export function ConnectorVerifyBox() {
	return (
		<div className="p-9">
			<div className="flex flex-col items-center space-y-5">
				<FallbackIcon icon={<AlertCircle className="h-[36px] w-[36px] fill-primary-400" />} />
				<div className="space-y-2 text-center">
					<p className="text-display-xs font-semibold">Please verify your service connector</p>
					<p className="text-text-lg text-theme-text-secondary">
						We'll check your connection and load available resources.
						<br />
						This may take up to a minute.
					</p>
				</div>
				<VerifyButton>
					<span>Verify now</span>
				</VerifyButton>
			</div>
		</div>
	);
}
