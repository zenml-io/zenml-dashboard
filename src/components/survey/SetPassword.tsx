import { Button, Input } from "@zenml-io/react-component-library";
import { MultipleFieldErrors, useForm } from "react-hook-form";
import {
	UpdatePasswordFormType,
	updatePasswordFormSchema
} from "../password/UpdatePasswordSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordChecker } from "../password/PasswordChecker";

type Props = {
	isExistingUser?: boolean;
	isDefaultUser?: boolean;
	submitHandler: (data: UpdatePasswordFormType) => void;
};

export function SetPasswordForm({
	isDefaultUser = false,
	isExistingUser = false,
	submitHandler
}: Props) {
	const {
		register,
		watch,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<UpdatePasswordFormType>({
		resolver: zodResolver(updatePasswordFormSchema),
		mode: "onChange",
		criteriaMode: "all",
		defaultValues: { oldPassword: "" }
	});

	const newPasswordErrors = errors.newPassword?.types;

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-display-xs font-semibold">Create your password</h1>
				<p className="text-theme-text-secondary">Select a password for your account</p>
			</div>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
				<div className="space-y-2">
					{isExistingUser && (
						<div className="space-y-0.5">
							<label className="text-text-sm">Old Password</label>
							<Input
								{...(register("oldPassword"), { disabled: isDefaultUser })}
								type="password"
								className="w-full"
							/>
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
