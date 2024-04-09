import { Device } from "@/types/devices";
import { Box } from "@zenml-io/react-component-library";

type Props = {
	device: Device;
};

export function DeviceInfo({ device }: Props) {
	return (
		<Box className="w-full p-5">
			<dl className="flex flex-col gap-5">
				<div className="flex items-center justify-between">
					<dt>IP Address</dt>
					<dd>{device.body?.ip_address}</dd>
				</div>
				{device.metadata?.city && device.metadata?.country && (
					<div className="flex items-center justify-between">
						<dt>Location</dt>
						<dd>
							{device.metadata?.city}, {device.metadata?.country}
						</dd>
					</div>
				)}
				<div className="flex min-w-0 items-center justify-between">
					<dt>Hostname</dt>
					<dd className="truncate">{device.body?.hostname}</dd>
				</div>
			</dl>
		</Box>
	);
}
