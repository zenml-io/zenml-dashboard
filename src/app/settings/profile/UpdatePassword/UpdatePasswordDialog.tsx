import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import Tick from "@/assets/icons/tick-circle.svg?react";
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
import { UpdatePasswordForm, updatePasswordFormSchema } from "./UpdatePasswordSchemas";

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
					icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
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
	} = useForm<UpdatePasswordForm>({
		resolver: zodResolver(updatePasswordFormSchema),
		mode: "onChange",
		criteriaMode: "all"
	});

	function updatePassword(data: UpdatePasswordForm) {
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
					errors={newPasswordErrors || ([] as unknown as MultipleFieldErrors)}
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

const passwordCriteriaMap = {
	uppercase: "Password must contain at least one uppercase letter",
	lowercase: "Password must contain at least one lowercase letter",
	number: "Password must contain at least one number",
	special: "Password must contain at least one special character",
	length: "Password must be at least 8 characters"
};

function PasswordChecker({ errors, val }: { errors?: MultipleFieldErrors; val: string }) {
	const allErrors = flattenObjectValues(errors || {});

	function getClassName(errorName: string) {
		if (!val) return "text-theme-text-secondary";
		if (allErrors.includes(errorName)) {
			return "text-theme-text-error";
		}
		return "text-theme-text-success";
	}

	return (
		<div className="space-y-1 rounded-md border border-theme-border-moderate bg-theme-surface-secondary px-5 py-3 text-text-xs text-theme-text-secondary">
			<p className="text-text-sm text-theme-text-primary">Password criteria</p>
			<div>
				<p className={getClassName(passwordCriteriaMap["length"])}>Minimum 8 characters</p>
				<p className={getClassName(passwordCriteriaMap["number"])}>
					Must Contain one Numeric value
				</p>
				<p className={getClassName(passwordCriteriaMap["uppercase"])}>Must include upper cases</p>
				<p className={getClassName(passwordCriteriaMap["lowercase"])}>Must include lower cases</p>
				<p className={getClassName(passwordCriteriaMap["special"])}>
					Must include one special character (!,@,#...)
				</p>
			</div>
		</div>
	);
}

function SuccessAddMember() {
	return (
		<div className="space-y-5 p-7 text-center">
			<Tick className={`mx-auto h-[110px] w-[110px] fill-success-500`} />
			<p className="text-text-lg font-semibold text-theme-text-primary">
				The password was updated successfully!
			</p>
		</div>
	);
}

function flattenObjectValues(obj: MultipleFieldErrors): string[] {
	const values: string[] = [];

	Object.values(obj).forEach((value) => {
		if (typeof value === "string") {
			values.push(value);
		} else if (Array.isArray(value)) {
			values.push(...value);
		} else if (typeof value === "object" && value !== null) {
			values.push(...flattenObjectValues(value as MultipleFieldErrors));
		}
	});

	return values;
}
