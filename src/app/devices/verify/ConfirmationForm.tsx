import { useVerifyDevice } from "@/data/devices/device-verify-mutation";
import { Button, Checkbox, useToast } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction, useId } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@/components/Icon";

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

	const { register, handleSubmit, watch, setValue } = useForm<FormProps>();
	const { toast } = useToast();

	const { mutate, isPending } = useVerifyDevice({
		// TODO handle error
		onSuccess: () => {
			setSuccess(true);
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <Icon name="alert-circle" className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		}
	});

	function verifyDevice(data: FormProps) {
		mutate({ deviceId, payload: { user_code, trusted_device: data.trustDevice } });
	}

	return (
		<form onSubmit={handleSubmit(verifyDevice)} className="flex flex-col gap-5">
			<div className="flex items-start gap-2">
				<Checkbox
					{...register("trustDevice")}
					onCheckedChange={(val) => setValue("trustDevice", !!val)}
					id={id}
				/>
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
