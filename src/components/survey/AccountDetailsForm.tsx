import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@zenml-io/react-component-library";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { AccountDetailForm, accountDetailsFormSchema } from "./form-schemas";

type AccountDetailsProps = {
	fullName?: string | null;
	email?: string | null;
	getUpdates?: boolean;
	submitHandler: (data: AccountDetailForm) => void;
};

export function AccountDetailsForm({ email, fullName, submitHandler }: AccountDetailsProps) {
	const fullNameId = useId();
	const emailId = useId();
	const getUpdatesId = useId();
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { isValid }
	} = useForm<AccountDetailForm>({
		resolver: zodResolver(accountDetailsFormSchema),
		defaultValues: {
			fullName: fullName || "",
			getUpdates: true,
			email: email || ""
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
				<div className="space-y-2">
					<div className="space-y-0.5">
						<label htmlFor={fullNameId} className="text-text-sm">
							Name
						</label>
						<Input {...register("fullName")} id={fullNameId} className="w-full" />
					</div>
					<div className="space-y-0.5">
						<label htmlFor={emailId} className="text-text-sm">
							Email {!watch("getUpdates") && <>(optional)</>}
						</label>
						<Input
							placeholder="example@company.inc"
							{...register("email")}
							type="email"
							id={emailId}
							className="w-full"
						/>
					</div>
				</div>
				<div className="flex items-center space-x-1">
					<Controller
						control={control}
						name="getUpdates"
						render={({ field: { onChange, value } }) => (
							<Checkbox
								checked={value}
								onCheckedChange={(val) => onChange(!!val)}
								id={getUpdatesId}
							/>
						)}
					></Controller>
					<label htmlFor={getUpdatesId} className="text-text-sm">
						I want to receive news and recommendations about how to use ZenML
					</label>
				</div>
				<Button disabled={!isValid} className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
				<p className="text-center text-theme-text-secondary">
					By continuing you agree to the{" "}
					<a
						className="link text-theme-text-brand"
						href="https://www.zenml.io/privacy-policy"
						rel="noopener noreferrer"
						target="_blank"
					>
						Privacy Policy
					</a>
				</p>
			</form>
		</div>
	);
}
