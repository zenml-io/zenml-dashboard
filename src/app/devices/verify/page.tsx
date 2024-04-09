import { Box, Spinner } from "@zenml-io/react-component-library";
import { useDeviceSearchParams } from "./service";
import { EmptyState } from "@/components/EmptyState";
import { useDevice } from "@/data/devices/device-detail-query";
import { ErrorFallback } from "@/components/Error";
import { PropsWithChildren } from "react";
import { DeviceInfo } from "./DeviceInfo";
import { DeviceVerificationForm } from "./ConfirmationForm";

export default function DeviceVerificationPage() {
	const { device_id, user_code } = useDeviceSearchParams();

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

	return (
		<Wrapper>
			<div className="w-full space-y-7">
				<div className="text-center">
					<h1 className="mb-0.5 text-display-xs font-semibold">Authorize a new device</h1>
					<p className="text-theme-text-secondary">You are logging in from a new device.</p>
				</div>
				<DeviceInfo device={data} />
				<DeviceVerificationForm />
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
