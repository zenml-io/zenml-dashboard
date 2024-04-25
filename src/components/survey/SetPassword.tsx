import { Button, Input } from "@zenml-io/react-component-library";
import { MultipleFieldErrors, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordChecker } from "../password/PasswordChecker";
import { ReactNode } from "react";
import { SetPasswordStepType, setPasswordStepSchema } from "./form-schemas";

type Props = {
	displayUsername?: boolean;
	submitHandler: (data: SetPasswordStepType) => void;
	headline?: ReactNode;
	subHeadine?: ReactNode;
};

export function SetPasswordForm({
	displayUsername = false,
	submitHandler,
	headline = "Create your password",
	subHeadine = "Select a password for your account"
}: Props) {
	const {
		register,
		watch,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<SetPasswordStepType>({
		resolver: zodResolver(setPasswordStepSchema),
		mode: "onChange",
		criteriaMode: "all",
		defaultValues: { oldPassword: "" }
	});

	const newPasswordErrors = errors.newPassword?.types;

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-display-xs font-semibold">{headline}</h1>
				<p className="text-theme-text-secondary">{subHeadine}</p>
			</div>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
				<div className="space-y-2">
					{displayUsername && (
						<div className="space-y-0.5">
							<label className="text-text-sm">Username</label>
							<Input {...register("username")} className="w-full" />
						</div>
					)}
				</div>
				<div className="space-y-0.5">
					<label className="text-text-sm">New Password</label>
					<Input {...register("newPassword")} type="password" className="w-full" />
				</div>
				<div className="space-y-0.5">
					<label className="text-text-sm">Confirm Password</label>
					<Input {...register("confirmPassword")} type="password" className="w-full" />
				</div>
				<PasswordChecker
					val={watch("newPassword")}
					errors={
						(newPasswordErrors as MultipleFieldErrors) || ([] as unknown as MultipleFieldErrors)
					}
				/>
				<Button disabled={!isValid} className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
