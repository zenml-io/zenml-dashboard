import { useVerifyDevice } from "@/data/devices/device-verify-mutation";
import { Button } from "@zenml-io/react-component-library";
import { useId } from "react";
import { useForm } from "react-hook-form";

type Props = {
	deviceId: string;
	user_code: string;
};

type FormProps = {
	trustDevice: boolean;
};
export function DeviceVerificationForm({ deviceId, user_code }: Props) {
	const id = useId();
	// const [success, setSuccess] = useState(false);

	const { register, handleSubmit, watch } = useForm<FormProps>();

	const { mutate } = useVerifyDevice({});

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
			<Button disabled={!watch("trustDevice")} size="md" className="flex w-full justify-center">
				Authorize this device
			</Button>
		</form>
	);
}
