import Robot from "@/assets/icons/robot.svg?react";
import UserLead from "@/assets/icons/user-lead.svg?react";
import UserEng from "@/assets/icons/user-eng.svg?react";
import UserIcon from "@/assets/icons/user.svg?react";
import { User, UserMetadata } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@zenml-io/react-component-library";
import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { PrimaryRoleFormType, primaryRoleFormSchema } from "./form-schemas";

type Props = {
	submitHandler: (data: PrimaryRoleFormType) => void;
	user?: User;
};

type Role = {
	name: string;
	icon: ReactNode;
};

const classNames = "shrink-0 size-5 fill-primary-400";

const roles: Role[] = [
	{
		name: "ML Engineer / Data Scientist",
		icon: <UserIcon className={classNames} />
	},
	{
		name: "Platform Engineer / MLOps Engineer",
		icon: <UserEng className={classNames} />
	},
	{
		name: "AI Engineer",
		icon: <Robot className={classNames} />
	},
	{
		name: "Engineering Lead / Tech Lead",
		icon: <UserLead className={classNames} />
	}
];

export function PrimaryRoleForm({ submitHandler, user }: Props) {
	const {
		handleSubmit,
		register,
		watch,
		formState: { isValid }
	} = useForm<PrimaryRoleFormType>({
		defaultValues: {
			primaryRole: (user?.metadata?.user_metadata as UserMetadata)?.primary_role
		},
		resolver: zodResolver(primaryRoleFormSchema),
		shouldUnregister: true
	});

	const inputRef = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		if (watch("primaryRole") === "other") {
			inputRef.current?.focus();
		}
	}, [watch("primaryRole")]);

	return (
		<div className="space-y-5">
			<div className="space-y-2">
				<h1 className="text-display-xs font-semibold">What is your primary role?</h1>
				<p className="text-theme-text-secondary">
					This helps us understand your perspective and needs
				</p>
			</div>
			<form
				onSubmit={handleSubmit(submitHandler)}
				className="w-full gap-[20px] space-y-5 lg:min-w-[700px]"
			>
				<ul className="space-y-2">
					{roles.map(({ icon, name }, i) => (
						<label
							key={i}
							className={clsx(
								"flex items-center gap-1 rounded-md border pl-3 transition-all duration-150",
								{
									"border-primary-400 bg-primary-25 shadow-sm": watch("primaryRole") === name,
									"border-theme-border-minimal bg-theme-surface-primary hover:border-theme-border-bold hover:shadow-sm":
										watch("primaryRole") !== name
								}
							)}
						>
							<input
								type="radio"
								{...register("primaryRole")}
								value={name}
								name="primaryRole"
								className="h-3 w-3 border !border-theme-border-bold text-theme-surface-primary focus:ring-2 focus:ring-theme-surface-strong"
							/>
							<div className="flex w-full items-center gap-1 py-3 pr-3 text-theme-text-secondary hover:cursor-pointer">
								{icon}
								{name}
							</div>
						</label>
					))}

					<li
						className={clsx(
							"flex items-center gap-1 rounded-md border bg-theme-surface-primary p-3 transition duration-150",
							{
								"border-primary-400": watch("primaryRole") === "other",
								"border-theme-border-minimal hover:border-theme-border-bold":
									watch("primaryRole") !== "other"
							}
						)}
					>
						<input
							id="other"
							type="radio"
							{...register("primaryRole")}
							value="other"
							name="primaryRole"
							className="h-3 w-3 border !border-theme-border-bold text-theme-surface-primary focus:ring-2 focus:ring-theme-surface-strong"
						/>
						{watch("primaryRole") === "other" ? (
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
								className="w-full text-theme-text-secondary hover:cursor-pointer"
								htmlFor="other"
							>
								Other
							</label>
						)}
					</li>
				</ul>
				<Button disabled={!isValid} className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
