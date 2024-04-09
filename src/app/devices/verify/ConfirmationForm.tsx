import { useVerifyDevice } from "@/data/devices/device-verify-mutation";
import { Button } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction, useId } from "react";
import { useForm } from "react-hook-form";

type Props = {
	deviceId: string;
	user_code: string;
	setSuccess: Dispatch<SetStateAction<boolean>>;
};

type FormProps = {
	trustDevice: boolean;
};
export function DeviceVerificationForm({ deviceId, user_code, setSuccess }: Props) {
	const id = useId();

	const { register, handleSubmit, watch } = useForm<FormProps>();

	const { mutate, isPending } = useVerifyDevice({
		// TODO handle error
		onSuccess: () => {
			setSuccess(true);
		}
	});

	function verifyDevice(data: FormProps) {
		mutate({ deviceId, payload: { user_code, trusted_device: data.trustDevice } });
	}

	return (
		<form onSubmit={handleSubmit(verifyDevice)} className="flex flex-col gap-5">
			<div className="flex">
				<input {...register("trustDevice")} id={id} type="checkbox" />
				<label htmlFor={id}>
					<p>Trust this device</p>
					<p className="text-theme-text-secondary">We won't ask you again soon on this device.</p>
				</label>
			</div>
			<Button
				disabled={!watch("trustDevice") || isPending}
				size="md"
				className="flex w-full justify-center"
			>
				Authorize this device
			</Button>
		</form>
	);
}
