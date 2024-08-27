import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@zenml-io/react-component-library";
import { ReactNode, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { InfrastructureFormSchema, InfrastructureFormType } from "./form-schemas";
import Linkedin from "@/assets/icons/services/linkedin.svg?react";
import Twitter from "@/assets/icons/services/x-twitter-primary.svg?react";
import Mail from "@/assets/icons/mail.svg?react";
import PlayCircle from "@/assets/icons/play-circle.svg?react";
import Reddit from "@/assets/icons/services/reddit-primary.svg?react";
import Announcement from "@/assets/icons/announcement.svg?react";
import Users from "@/assets/icons/users.svg?react";
import FileText from "@/assets/icons/file-text.svg?react";
import Search from "@/assets/icons/search.svg?react";

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
		name: "LinkedIn",
		icon: <Linkedin className="h-5 w-5 fill-primary-400" />
	},
	{
		name: "X / Twitter",
		icon: <Twitter className="h-5 w-5" />
	},
	{
		name: "Newsletter",
		icon: <Mail className="h-5 w-5 fill-primary-400" />
	},
	{
		name: "Webinar",
		icon: <PlayCircle className="h-5 w-5 fill-primary-400" />
	},
	{
		name: "Reddit",
		icon: <Reddit className="h-5 w-5" />
	},
	{
		name: "Conference",
		icon: <Announcement className="h-5 w-5 fill-primary-400" />
	},
	{
		name: "Recommendation",
		icon: <Users className="h-5 w-5 fill-primary-400" />
	},
	{
		name: "Blog",
		icon: <FileText className="h-5 w-5 fill-primary-400" />
	},
	{
		name: "Google / Search Engine",
		icon: <Search className="h-5 w-5 fill-primary-400" />
	}
];

export function InfrastructureForm({ submitHandler }: InfrastructureFormProps) {
	const {
		register,
		setValue,
		watch,
		handleSubmit,
		unregister,
		control,
		formState: { isValid }
	} = useForm<InfrastructureFormType>({
		resolver: zodResolver(InfrastructureFormSchema),
		defaultValues: { providers: [] }
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
				<h1 className="text-display-xs font-semibold">How did you hear about us?</h1>
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
									<div
										key={i}
										className="flex items-center gap-1 rounded-md bg-theme-surface-primary pl-3"
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
											id={name.name}
										/>
										<label
											className="flex w-full items-center gap-1 py-3 pr-3 text-theme-text-secondary hover:cursor-pointer"
											htmlFor={name.name}
										>
											{name.icon}
											{name.name}
										</label>
									</div>
								))}
							</>
						)}
					></Controller>
					<div className="flex items-center rounded-md bg-theme-surface-primary pl-3">
						<Checkbox
							onCheckedChange={(val) => setValue("other", !!val)}
							{...register(`other`, { value: false })}
							className="mr-2 h-3 w-3"
							id={"other"}
						/>
						<label
							className="w-full py-3 pr-3 text-theme-text-secondary hover:cursor-pointer"
							htmlFor={"other"}
						>
							Other (specify)
						</label>
					</div>
					{watchOtherCheckbox && (
						<Input
							inputSize="lg"
							{...register("otherVal")}
							placeholder="Specify..."
							className="w-full border-theme-border-minimal"
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
