import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { isFetchError } from "@/lib/fetch-error";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	useToast
} from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction, useId, useState } from "react";
import { MultipleFieldErrors, useForm } from "react-hook-form";

import { Icon } from "@/components/Icon";
import { PasswordChecker } from "@/components/password/PasswordChecker";
import {
	UpdatePasswordFormType,
	updatePasswordFormSchema
} from "@/components/password/UpdatePasswordSchemas";

export function UpdatePasswordDialog() {
	const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

	return (
		<Dialog
			onOpenChange={() => {
				setPasswordUpdateSuccess(false);
			}}
		>
			<DialogTrigger asChild>
				<Button size="md" className="shrink-0" intent="primary" emphasis="subtle">
					Change Password
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle> Update Credentials</DialogTitle>
				</DialogHeader>
				{passwordUpdateSuccess ? (
					<SuccessAddMember />
				) : (
					<ChangePasswordForm setSuccess={setPasswordUpdateSuccess} />
				)}
			</DialogContent>
		</Dialog>
	);
}

type FormProps = {
	setSuccess: Dispatch<SetStateAction<boolean>>;
};
export function ChangePasswordForm({ setSuccess }: FormProps) {
	const oldPasswordId = useId();
	const newPasswordId = useId();
	const confirmPasswordId = useId();
	const { toast } = useToast();

	const { mutate, isPending } = useUpdateCurrentUserMutation({
		onSuccess() {
			setSuccess(true);
		},
		onError(error) {
			if (isFetchError(error)) {
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

	const {
		register,
		handleSubmit,
		watch,
		formState: { isValid, errors }
	} = useForm<UpdatePasswordFormType>({
		resolver: zodResolver(updatePasswordFormSchema),
		mode: "onChange",
		criteriaMode: "all"
	});

	function updatePassword(data: UpdatePasswordFormType) {
		mutate({ old_password: data.oldPassword, password: data.newPassword });
	}

	const newPasswordErrors = errors.newPassword?.types;

	return (
		<>
			<div className="space-y-5 p-7">
				<form id="update-password-form" onSubmit={handleSubmit(updatePassword)}>
					<div className="space-y-2">
						<div className="space-y-0.5">
							<label htmlFor={oldPasswordId} className="text-text-sm">
								Old Password
							</label>
							<Input
								{...register("oldPassword")}
								type="password"
								id={oldPasswordId}
								className="w-full"
							/>
						</div>
						<div className="space-y-0.5">
							<label htmlFor={newPasswordId} className="text-text-sm">
								New Password
							</label>
							<Input
								{...register("newPassword")}
								type="password"
								id={newPasswordId}
								className="w-full"
							/>
						</div>
						<div className="space-y-0.5">
							<label htmlFor={confirmPasswordId} className="text-text-sm">
								Confirm Password
							</label>
							<Input
								{...register("confirmPassword")}
								type="password"
								id={confirmPasswordId}
								className="w-full"
							/>
						</div>
					</div>
				</form>
				<PasswordChecker
					val={watch("newPassword")}
					errors={
						(newPasswordErrors as MultipleFieldErrors) || ([] as unknown as MultipleFieldErrors)
					}
				/>
			</div>
			<DialogFooter className="gap-[10px]">
				<DialogClose asChild>
					<Button size="sm" intent="secondary">
						Cancel
					</Button>
				</DialogClose>
				<Button disabled={!isValid || isPending} form="update-password-form" size="sm">
					Update Password
				</Button>
			</DialogFooter>
		</>
	);
}

function SuccessAddMember() {
	return (
		<div className="space-y-5 p-7 text-center">
			<Icon name="tick-circle" className={`mx-auto h-[110px] w-[110px] fill-success-500`} />
			<p className="text-text-lg font-semibold text-theme-text-primary">
				The password was updated successfully!
			</p>
		</div>
	);
}
