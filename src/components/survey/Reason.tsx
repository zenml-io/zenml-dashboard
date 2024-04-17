import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@zenml-io/react-component-library";
import { ReactNode, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ReasonFormSchema, ReasonFormType } from "./form-schemas";

export type ReasonFormProps = {
	user?: User;
	submitHandler: (data: ReasonFormType) => void;
};

type Reason = {
	reason: string;
	icon: ReactNode;
};

// TODO Add icons
const reasons: Reason[] = [
	{
		reason: "Build an internal MLOps platform",
		icon: ""
	},
	{
		reason: "Automate manual ML processes",
		icon: ""
	},
	{
		reason: "Abstract ML infrastructure complexity",
		icon: ""
	},
	{
		reason: "Faster transition from experimentation to production",
		icon: ""
	},
	{
		reason: "Track your ML data & models",
		icon: ""
	}
];

export function ReasonForm({ submitHandler }: ReasonFormProps) {
	const {
		register,
		setValue,
		watch,
		handleSubmit,
		unregister,
		control,
		formState: { isValid }
	} = useForm<ReasonFormType>({
		resolver: zodResolver(ReasonFormSchema),
		defaultValues: { reasons: [] }
	});

	const watchOtherCheckbox = watch("other");

	useEffect(() => {
		if (watchOtherCheckbox) {
			register("otherVal");
		} else {
			unregister("otherVal");
		}
	}, [register, unregister, watchOtherCheckbox]);

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-display-xs font-semibold">Why do you want to use ZenML?</h1>
				<p className="text-theme-text-secondary">I want to...</p>
			</div>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
				<div className="space-y-2">
					<Controller
						control={control}
						name="reasons"
						render={({ field: { onChange, value } }) => (
							<>
								{reasons.map((reason, i) => (
									<div
										key={i}
										className="flex items-center rounded-md bg-theme-surface-primary p-3"
									>
										<Checkbox
											onCheckedChange={(val) => {
												if (val) {
													onChange([...value, reason.reason]);
												} else {
													onChange(value.filter((item) => item !== reason.reason));
												}
											}}
											value={reason.reason}
											className="mr-2 h-3 w-3"
											id={reason.reason}
										/>
										{reason.icon}
										<label className="w-full text-theme-text-secondary" htmlFor={reason.reason}>
											{reason.reason}
										</label>
									</div>
								))}
							</>
						)}
					></Controller>
					<div className="flex items-center rounded-md bg-theme-surface-primary p-3">
						<Checkbox
							onCheckedChange={(val) => setValue("other", !!val)}
							{...register(`other`, { value: false })}
							className="mr-2 h-3 w-3"
							id={"other"}
						/>
						<label className="w-full text-theme-text-secondary" htmlFor={"other"}>
							Other
						</label>
					</div>
					{watchOtherCheckbox && (
						<Input
							{...register("otherVal")}
							placeholder="Specify..."
							className="h-[40px] w-full border-theme-border-minimal"
						/>
					)}
				</div>
				<Button disabled={!isValid} type="submit" className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
