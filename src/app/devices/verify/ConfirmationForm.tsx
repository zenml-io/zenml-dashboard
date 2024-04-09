import { Button } from "@zenml-io/react-component-library";
import { useId } from "react";
import { useForm } from "react-hook-form";

export function DeviceVerificationForm() {
	const id = useId();

	const { register, handleSubmit, watch } = useForm<{ trustDevice: boolean }>();

	return (
		<form onSubmit={handleSubmit(() => console.log("submitted"))} className="flex flex-col gap-5">
			<div className="flex">
				<input {...register("trustDevice")} id={id} type="checkbox" />
				<label htmlFor={id}>
					<p>Trust this device</p>
					<p className="text-theme-text-secondary">We won’t ask you again soon on this device.</p>
				</label>
			</div>
			<Button disabled={!watch("trustDevice")} size="md" className="flex w-full justify-center">
				Authorize this device
			</Button>
		</form>
	);
}
