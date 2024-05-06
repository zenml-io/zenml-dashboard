import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { useVerifyDevice } from "@/data/devices/device-verify-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, useToast } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction, useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { DeviceRegistrationFormType, deviceRegistrationFormSchema } from "./service";

type Props = {
	deviceId: string;
	user_code: string;
	setSuccess: Dispatch<SetStateAction<boolean>>;
};

export function DeviceVerificationForm({ deviceId, user_code, setSuccess }: Props) {
	const id = useId();

	const {
		handleSubmit,
		formState: { isValid },
		control
	} = useForm<DeviceRegistrationFormType>({
		resolver: zodResolver(deviceRegistrationFormSchema),
		defaultValues: {
			trustDevice: false
		}
	});
	const { toast } = useToast();

	const { mutate, isPending } = useVerifyDevice({
		onSuccess: () => {
			setSuccess(true);
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		}
	});

	function verifyDevice(data: DeviceRegistrationFormType) {
		mutate({ deviceId, payload: { user_code, trusted_device: data.trustDevice } });
	}

	return (
		<form onSubmit={handleSubmit(verifyDevice)} className="flex flex-col gap-5">
			<div className="flex items-start gap-2">
				<Controller
					control={control}
					name="trustDevice"
					render={({ field: { onChange, value } }) => (
						<Checkbox checked={value} onCheckedChange={(val) => onChange(!!val)} id={id} />
					)}
				/>

				<label htmlFor={id}>
					<p>Trust this device</p>
					<p className="text-theme-text-secondary">We won't ask you again soon on this device.</p>
				</label>
			</div>
			<Button disabled={isPending || !isValid} size="md" className="flex w-full justify-center">
				Authorize this device
			</Button>
		</form>
	);
}
