import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox } from "@zenml-io/react-component-library";
import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { UsageReasonFormSchema, UsageReasonFormType } from "./form-schemas";

export type InfrastructureFormProps = {
	submitHandler: (data: UsageReasonFormType) => void;
};

const options: { key: string; label: string }[] = [
	{ label: "I'm new to MLOps and exploring", key: "exploring" },
	{ label: "I'm planning or conducting a Proof of Concept", key: "planning_poc" },
	{ label: "I'm comparing ZenML to other MLOps tools", key: "comparing_tools" },
	{
		label: "I'm implementing ZenML in a production environment",
		key: "implementing_production_environment"
	}
];

const tools: {
	icon: ReactNode;
	name: string;
}[] = [
	{
		name: "Metaflow",
		icon: ""
	},
	{
		name: "Flyte",
		icon: ""
	},
	{
		name: "Prefect",
		icon: ""
	},
	{
		name: "Kedro",
		icon: ""
	},
	{
		name: "Airflow",
		icon: ""
	}
];

export function UsageReasonForm({ submitHandler }: InfrastructureFormProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const {
		register,
		setValue,
		watch,
		handleSubmit,
		control,
		formState: { isValid }
	} = useForm<UsageReasonFormType>({
		resolver: zodResolver(UsageReasonFormSchema),
		defaultValues: {
			usageReason: ""
		},
		shouldUnregister: true
	});

	const watchOtherCheckbox = watch("otherTool");
	useEffect(() => {
		if (watchOtherCheckbox) {
			inputRef.current?.focus();
		}
	}, [watchOtherCheckbox]);

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-display-xs font-semibold">
					What best describes your current situation with ZenML?
				</h1>
				<p className="text-theme-text-secondary">Select only one of the options</p>
			</div>
			<form onSubmit={handleSubmit(submitHandler)} className="w-full space-y-5 lg:w-[700px]">
				<ul className="space-y-2">
					{options.map(({ key, label }) => (
						<li className="space-y-2" key={key}>
							<label
								className={clsx(
									"flex items-center gap-1 rounded-md border pl-3 transition-all duration-150",
									{
										"border-primary-400 bg-primary-25 shadow-sm": watch("usageReason") === key,
										"border-transparent bg-theme-surface-primary hover:border-theme-border-bold hover:shadow-sm":
											watch("usageReason") !== key
									}
								)}
							>
								<input
									type="radio"
									{...register("usageReason")}
									value={key}
									name="usageReason"
									className="h-3 w-3 border !border-theme-border-bold text-theme-surface-primary focus:ring-2 focus:ring-theme-surface-strong"
								/>
								<div className="flex w-full items-center gap-1 py-3 pr-3 text-theme-text-secondary hover:cursor-pointer">
									{label}
								</div>
							</label>
							{watch("usageReason") === "comparing_tools" && key === "comparing_tools" && (
								<>
									<p className="text-text-sm text-theme-text-secondary">
										Select all the tools that apply:
									</p>
									<ul className="grid w-full grid-cols-1 gap-2 xl:grid-cols-2">
										{tools.map(({ icon, name }) => (
											<li key={name} className="">
												<Controller
													defaultValue={[]}
													control={control}
													name="comparison_tools"
													render={({ field: { onChange, value, ...rest } }) => (
														<label
															className={clsx(
																"flex items-center gap-1 rounded-md border pl-3 transition-all duration-150",
																{
																	"border-primary-400 bg-primary-25 shadow-sm":
																		watch("comparison_tools")?.includes(name),
																	"border-transparent bg-theme-surface-primary hover:border-theme-border-bold hover:shadow-sm":
																		!watch("comparison_tools")?.includes(name)
																}
															)}
														>
															<Checkbox
																{...rest}
																checked={value?.includes(name)}
																onCheckedChange={(val) => {
																	if (val) {
																		onChange([...(value ?? []), name]);
																	} else {
																		onChange(value?.filter((item) => item !== name));
																	}
																}}
																value={name}
																className="h-3 w-3"
															/>
															<div className="flex w-full items-center gap-1 py-3 pr-3 text-theme-text-secondary hover:cursor-pointer">
																{icon}
																{name}
															</div>
														</label>
													)}
												/>
											</li>
										))}
										<li>
											<div
												className={clsx(
													"flex h-full items-center rounded-md border bg-theme-surface-primary p-3 transition duration-150",
													{
														"border-primary-400": !!watch("otherTool"),
														"border-transparent hover:border-theme-border-bold": !watch("otherTool")
													}
												)}
											>
												<Checkbox
													onCheckedChange={(val) => setValue("otherTool", !!val)}
													{...register(`otherTool`, { value: false })}
													className="mr-2 h-3 w-3"
													id={"other"}
												/>
												{watchOtherCheckbox ? (
													<input
														{...register("otherToolVal")}
														ref={(e) => {
															register("otherToolVal").ref(e);
															inputRef.current = e;
														}}
														placeholder="Specify..."
														className="border-none p-0 pr-2 placeholder:text-theme-text-tertiary focus:outline-none focus:ring-0"
													/>
												) : (
													<label
														className="w-full text-theme-text-secondary hover:cursor-pointer"
														htmlFor={"other"}
													>
														Other
													</label>
												)}
											</div>
										</li>
									</ul>
								</>
							)}
						</li>
					))}
				</ul>
				<Button disabled={!isValid} type="submit" className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
