import { Box, Spinner } from "@zenml-io/react-component-library";
import { useDeviceSearchParams } from "./service";
import { EmptyState } from "@/components/EmptyState";
import { useDevice } from "@/data/devices/device-detail-query";
import { ErrorFallback } from "@/components/Error";
import { PropsWithChildren, useState } from "react";
import { DeviceInfo } from "./DeviceInfo";
import { DeviceVerificationForm } from "./ConfirmationForm";
import { DeviceVerificationSuccess } from "./Success";

export default function DeviceVerificationPage() {
	const { device_id, user_code } = useDeviceSearchParams();
	const [success, setSuccess] = useState(false);
	const { data, isPending, isError, error } = useDevice(
		{
			deviceId: device_id!,
			queryParams: { user_code }
		},
		{
			enabled: !!device_id && !!user_code
		}
	);

	if (!device_id || !user_code) {
		return (
			<EmptyState>
				<p>Invalid device verification link.</p>
			</EmptyState>
		);
	}

	if (isError) {
		return (
			<Wrapper>
				<ErrorFallback isAlertCircle err={error}></ErrorFallback>
			</Wrapper>
		);
	}

	if (isPending) {
		return (
			<Wrapper>
				<Spinner />
			</Wrapper>
		);
	}

	if (success) return <DeviceVerificationSuccess />;

	return (
		<Wrapper>
			<div className="w-full space-y-7">
				<div className="text-center">
					<h1 className="mb-0.5 text-display-xs font-semibold">Authorize a new device</h1>
					<p className="text-theme-text-secondary">You are logging in from a new device.</p>
				</div>
				<DeviceInfo device={data} />
				<DeviceVerificationForm
					setSuccess={setSuccess}
					deviceId={device_id}
					user_code={user_code}
				/>
			</div>
		</Wrapper>
	);
}

function Wrapper({ children }: PropsWithChildren) {
	return (
		<Box className="flex w-full min-w-[540px] flex-col items-center justify-center gap-5 p-7">
			{children}
		</Box>
	);
}
