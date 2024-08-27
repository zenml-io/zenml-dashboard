import AWS from "@/assets/icons/services/aws.svg?react";
import Azure from "@/assets/icons/services/azure.svg?react";
import GCP from "@/assets/icons/services/gcp.svg?react";
import Kubernetes from "@/assets/icons/services/kubernetes.svg?react";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox } from "@zenml-io/react-component-library";
import { clsx } from "clsx";
import { ReactNode, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { InfrastructureFormSchema, InfrastructureFormType } from "./form-schemas";

export type InfrastructureFormProps = {
	user?: User;
	submitHandler: (data: InfrastructureFormType) => void;
};

type InfraProvider = {
	name: string;
	icon: ReactNode;
};

const names: InfraProvider[] = [
	{
		name: "GCP",
		icon: <GCP className="h-5 w-5 fill-primary-400" />
	},
	{
		name: "AWS",
		icon: <AWS className="h-5 w-5" />
	},
	{
		name: "Azure",
		icon: <Azure className="h-5 w-5 fill-primary-400" />
	},
	{
		name: "Kubernetes",
		icon: <Kubernetes className="h-5 w-5 fill-primary-400" />
	},
	{
		name: "Openshift",
		icon: <Kubernetes className="h-5 w-5" /> // TODO Openshift Icon
	}
];

export function InfrastructureForm({ submitHandler }: InfrastructureFormProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const {
		register,
		setValue,
		watch,
		handleSubmit,

		control,
		formState: { isValid }
	} = useForm<InfrastructureFormType>({
		resolver: zodResolver(InfrastructureFormSchema),
		defaultValues: { providers: [] },
		shouldUnregister: true
	});

	const watchOtherCheckbox = watch("other");
	useEffect(() => {
		if (watchOtherCheckbox) {
			inputRef.current?.focus();
		}
	}, [watchOtherCheckbox]);

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-display-xs font-semibold">What is your current infrastructure?</h1>
				<p className="text-theme-text-secondary">Select all the applicable options</p>
			</div>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
				<div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-2 xl:min-w-[700px]">
					<Controller
						control={control}
						name="providers"
						render={({ field: { onChange, value } }) => (
							<>
								{names.map((name, i) => (
									<label
										key={i}
										className={clsx(
											"flex items-center gap-1 rounded-md border pl-3 transition-all duration-150",
											{
												"border-primary-400 bg-primary-25 shadow-sm": watch("providers").includes(
													name.name
												),
												"border-transparent bg-theme-surface-primary hover:border-theme-border-bold hover:shadow-sm":
													!watch("providers").includes(name.name)
											}
										)}
									>
										<Checkbox
											onCheckedChange={(val) => {
												if (val) {
													onChange([...value, name.name]);
												} else {
													onChange(value.filter((item) => item !== name.name));
												}
											}}
											value={name.name}
											className="h-3 w-3"
										/>
										<div className="flex w-full items-center gap-1 py-3 pr-3 text-theme-text-secondary hover:cursor-pointer">
											{name.icon}
											{name.name}
										</div>
									</label>
								))}
							</>
						)}
					></Controller>
					<div
						className={clsx(
							"flex items-center rounded-md border bg-theme-surface-primary pl-3 transition duration-150",
							{
								"border-primary-400": !!watch("other"),
								"border-transparent hover:border-theme-border-bold": !watch("other")
							}
						)}
					>
						<Checkbox
							onCheckedChange={(val) => setValue("other", !!val)}
							{...register(`other`, { value: false })}
							className="mr-2 h-3 w-3"
							id={"other"}
						/>
						{watchOtherCheckbox ? (
							<input
								{...register("otherVal")}
								ref={(e) => {
									register("otherVal").ref(e);
									inputRef.current = e;
								}}
								placeholder="Specify..."
								className="w-full border-none p-0 pr-2 placeholder:text-theme-text-tertiary focus:outline-none focus:ring-0"
							/>
						) : (
							<label
								className="w-full py-3 pr-3 text-theme-text-secondary hover:cursor-pointer"
								htmlFor={"other"}
							>
								Other (specify)
							</label>
						)}
					</div>
				</div>
				<Button disabled={!isValid} type="submit" className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
