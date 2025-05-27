import CheckCircle from "@/assets/icons/check-circle.svg?react";

type Props = {
	connectorName: string;
};

export function ConnectorSuccessBox({ connectorName }: Props) {
	return (
		<div className="flex w-full items-center gap-3 rounded-md border border-success-300 bg-success-50 px-4 py-3 text-text-sm text-success-900">
			<CheckCircle width={24} height={24} className="shrink-0 fill-success-900" />
			<p>
				You successfully registered the service connector `{connectorName}` and can now create new
				resources
			</p>
		</div>
	);
}
