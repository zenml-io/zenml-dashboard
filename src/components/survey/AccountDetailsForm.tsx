import { getIsDefaultUser } from "@/lib/user";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@zenml-io/react-component-library";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { AccountDetailForm, accountDetailsFormSchema } from "./form-schemas";

type AccountDetailsProps = {
	user?: User;
	submitHandler: (data: AccountDetailForm) => void;
};

export function AccountDetailsForm({ user, submitHandler }: AccountDetailsProps) {
	const isDefaultUser = user ? getIsDefaultUser(user) : false;
	const usernameId = useId();
	const fullNameId = useId();
	const workEmailId = useId();
	const getUpdatesId = useId();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { isValid }
	} = useForm<AccountDetailForm>({
		resolver: zodResolver(accountDetailsFormSchema),
		defaultValues: {
			fullName: user?.body?.full_name,
			username: user?.name,
			workEmail: user?.metadata?.email
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
						<label htmlFor={usernameId} className="text-text-sm">
							Username
						</label>
						<Input
							{...register("username", { disabled: isDefaultUser })}
							id={usernameId}
							className="w-full"
						/>
					</div>
					<div className="space-y-0.5">
						<label htmlFor={fullNameId} className="text-text-sm">
							Full Name
						</label>
						<Input {...register("fullName")} id={fullNameId} className="w-full" />
					</div>
					<div className="space-y-0.5">
						<label htmlFor={workEmailId} className="text-text-sm">
							Work Email
						</label>
						<Input
							placeholder="example@company.inc"
							{...register("workEmail")}
							type="email"
							id={workEmailId}
							className="w-full"
						/>
					</div>
				</div>
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
				<Button disabled={!isValid} className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
