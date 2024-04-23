import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@zenml-io/react-component-library";
import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { AccountDetailForm, accountDetailsFormSchema } from "./form-schemas";

type AccountDetailsProps = {
	fullName?: string;
	email?: string;
	isDefaultUser?: boolean;
	submitHandler: (data: AccountDetailForm) => void;
};

export function AccountDetailsForm({ email, fullName, submitHandler }: AccountDetailsProps) {
	const fullNameId = useId();
	const emailId = useId();
	const getUpdatesId = useId();
	const {
		register,
		handleSubmit,
		setValue,
		unregister,
		watch,
		formState: { isValid }
	} = useForm<AccountDetailForm>({
		resolver: zodResolver(accountDetailsFormSchema),
		defaultValues: {
			fullName: fullName,

			email: email
		}
	});

	const watchGetUpdates = watch("getUpdates");

	useEffect(() => {
		if (watchGetUpdates) {
			register("email");
		} else {
			unregister("email");
		}
	});

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-display-xs font-semibold">Add your account details</h1>
				<p className="text-theme-text-secondary">
					Please, fill in your details to get started with ZenML.
				</p>
			</div>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
				<div className="flex items-center space-x-1">
					<Checkbox
						{...register("getUpdates", { value: false })}
						onCheckedChange={(val) => setValue("getUpdates", !!val)}
						id={getUpdatesId}
					/>
					<label htmlFor={getUpdatesId} className="text-text-sm">
						I want to receive news and recommendations about how to use ZenML
					</label>
				</div>
				{watchGetUpdates && (
					<>
						<div className="space-y-0.5">
							<label htmlFor={emailId} className="text-text-sm">
								Email
							</label>
							<Input
								placeholder="example@company.inc"
								{...register("email")}
								type="email"
								id={emailId}
								className="w-full"
							/>
						</div>
						<div className="space-y-0.5">
							<label htmlFor={fullNameId} className="text-text-sm">
								Full Name
							</label>
							<Input {...register("fullName")} id={fullNameId} className="w-full" />
						</div>
					</>
				)}
				<Button disabled={!isValid} className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
