import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@zenml-io/react-component-library";
import { ReactNode, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AwarenessFormType, AwarenessFormSchema } from "./form-schemas";
import LinkedIn from "@/assets/services/linkedin.svg?react";
import Twitter from "@/assets/services/x-twitter-primary.svg?react";
import Reddit from "@/assets/services/reddit-primary.svg?react";
import { Icon } from "../Icon";

export type AwarenessFormProps = {
	user?: User;
	submitHandler: (data: AwarenessFormType) => void;
};

type AwarenessChannel = {
	channel: string;
	icon: ReactNode;
};

const channels: AwarenessChannel[] = [
	{
		channel: "LinkedIn",
		icon: <LinkedIn className="h-5 w-5 fill-primary-400" />
	},
	{
		channel: "X / Twitter",
		icon: <Twitter className="h-5 w-5" />
	},
	{
		channel: "Newsletter",
		icon: <Icon name="mail" className="h-5 w-5 fill-primary-400" />
	},
	{
		channel: "Webinar",
		icon: <Icon name="play-circle" className="h-5 w-5 fill-primary-400" />
	},
	{
		channel: "Reddit",
		icon: <Reddit className="h-5 w-5" />
	},
	{
		channel: "Conference",
		icon: <Icon name="announcement" className="h-5 w-5 fill-primary-400" />
	},
	{
		channel: "Recommendation",
		icon: <Icon name="users" className="h-5 w-5 fill-primary-400" />
	},
	{
		channel: "Blog",
		icon: <Icon name="file-text" className="h-5 w-5 fill-primary-400" />
	},
	{
		channel: "Google / Search Engine",
		icon: <Icon name="search" className="h-5 w-5 fill-primary-400" />
	}
];

export function AwarenessForm({ submitHandler }: AwarenessFormProps) {
	const {
		register,
		setValue,
		watch,
		handleSubmit,
		unregister,
		control,
		formState: { isValid }
	} = useForm<AwarenessFormType>({
		resolver: zodResolver(AwarenessFormSchema),
		defaultValues: { channels: [] }
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
				<div className="grid w-full grid-cols-1 gap-[20px] md:grid-cols-2 xl:min-w-[700px]">
					<Controller
						control={control}
						name="channels"
						render={({ field: { onChange, value } }) => (
							<>
								{channels.map((channel, i) => (
									<div
										key={i}
										className="flex items-center gap-1 rounded-md bg-theme-surface-primary p-3"
									>
										<Checkbox
											onCheckedChange={(val) => {
												if (val) {
													onChange([...value, channel.channel]);
												} else {
													onChange(value.filter((item) => item !== channel.channel));
												}
											}}
											value={channel.channel}
											className="h-3 w-3"
											id={channel.channel}
										/>
										{channel.icon}
										<label className="w-full text-theme-text-secondary" htmlFor={channel.channel}>
											{channel.channel}
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
