import CloudIcon from "@/assets/icons/cloud.svg?react";
import InfoIcon from "@/assets/icons/help.svg?react";
import LaptopIcon from "@/assets/icons/laptop.svg?react";
import KubernetesIcon from "@/assets/icons/server.svg?react";
import { INFRA_TYPE_OPTIONS, PRIMARY_ROLE_OPTIONS } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, cn } from "@zenml-io/react-component-library";
import { Controller, useForm } from "react-hook-form";
import { aboutYouFormSchema, AboutYouFormType } from "./form-schemas";

type AboutYouFormProps = {
	primaryRole?: AboutYouFormType["primaryRole"];
	infraType?: AboutYouFormType["infraType"];
	submitHandler: (data: AboutYouFormType) => void;
};

// Legacy primary_role values to account for if we normalize persisted metadata later:
// "ML Engineer / Data Scientist", "Platform Engineer / MLOps Engineer",
// "AI Engineer", "Engineering Lead / Tech Lead", "other".
const RoleOptions: {
	label: string;
	value: (typeof PRIMARY_ROLE_OPTIONS)[number];
}[] = [
	{
		label: "ML Engineer",
		value: "ml_engineer"
	},
	{
		label: "Platform Engineer",
		value: "platform_engineer"
	},
	{
		label: "AI Engineer",
		value: "ai_engineer"
	},
	{
		label: "Engineering Lead",
		value: "engineering_lead"
	},
	{
		label: "Student",
		value: "student"
	},
	{
		label: "Other",
		value: "other"
	}
] as const;

const InfraTypeOptions: {
	label: string;
	description: string;
	value: (typeof INFRA_TYPE_OPTIONS)[number];
	icon: typeof LaptopIcon;
}[] = [
	{
		label: "My Laptop",
		description: "Start local, no infra needed",
		value: "local",
		icon: LaptopIcon
	},
	{
		label: "Kubernetes",
		description: "An existing cluster",
		value: "kubernetes",
		icon: KubernetesIcon
	},
	{
		label: "Cloud",
		description: "AWS, GCP, Azure, etc.",
		value: "cloud",
		icon: CloudIcon
	},
	{
		label: "Not sure yet",
		description: "Describe this later",
		value: "not_sure_yet",
		icon: InfoIcon
	}
] as const;

export function AboutYouForm({ primaryRole, infraType, submitHandler }: AboutYouFormProps) {
	const {
		handleSubmit,
		control,
		formState: { isValid }
	} = useForm<AboutYouFormType>({
		resolver: zodResolver(aboutYouFormSchema),
		defaultValues: {
			primaryRole,
			infraType
		}
	});

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-display-xs font-semibold">Tell us a little about you</h1>
				<p className="text-theme-text-secondary">
					Two quick questions so we can tailor your setup.
				</p>
			</div>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
				<div className="space-y-2">
					<p id="primaryRole-label" className="text-text-sm">
						What best describes your primary role?
					</p>
					<Controller
						control={control}
						name="primaryRole"
						render={({ field: { onChange, value } }) => (
							<div
								role="radiogroup"
								aria-labelledby="primaryRole-label"
								className="flex flex-wrap justify-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate bg-theme-surface-primary"
							>
								{RoleOptions.map(({ label, value: optionValue }) => (
									<label
										key={optionValue}
										className={cn(
											"cursor-pointer px-3 py-1 text-text-sm transition-colors duration-150",
											value === optionValue
												? "bg-theme-text-brand text-white"
												: "text-theme-text-secondary hover:bg-theme-surface-tertiary"
										)}
									>
										<input
											type="radio"
											name="primaryRole"
											value={optionValue}
											checked={value === optionValue}
											onChange={() => onChange(optionValue)}
											className="sr-only"
										/>
										{label}
									</label>
								))}
							</div>
						)}
					/>
				</div>
				<div className="space-y-2">
					<p id="infraType-label" className="text-text-sm">
						What infrastructure are you using?
					</p>
					<Controller
						control={control}
						name="infraType"
						render={({ field: { value, ...rest } }) => (
							<div className="grid gap-2 md:grid-cols-2">
								{InfraTypeOptions.map(({ description, value: optionValue, label, icon: Icon }) => (
									<label
										key={optionValue}
										className={cn(
											"flex items-center gap-2 rounded-md border pl-3 transition-all duration-150",
											{
												"border-primary-400 bg-primary-25 shadow-sm": value === optionValue,
												"border-theme-border-minimal bg-theme-surface-primary hover:border-theme-border-bold hover:shadow-sm":
													value !== optionValue
											}
										)}
									>
										<input
											type="radio"
											{...rest}
											checked={value === optionValue}
											value={optionValue}
											className="h-3 w-3 border !border-theme-border-bold text-theme-surface-primary focus:ring-2 focus:ring-theme-surface-strong"
										/>
										<div className="flex w-full items-center gap-2 py-3 pr-3 hover:cursor-pointer">
											<Icon className="h-5 w-5 shrink-0 fill-primary-400" />
											<div>
												<div className="font-semibold text-theme-text-primary">{label}</div>
												<div className="text-text-sm text-theme-text-secondary">{description}</div>
											</div>
										</div>
									</label>
								))}
							</div>
						)}
					/>
				</div>

				<Button disabled={!isValid} className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
