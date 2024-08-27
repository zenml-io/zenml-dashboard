import Building from "@/assets/icons/building.svg?react";
import Hat from "@/assets/icons/hat.svg?react";
import UserIcon from "@/assets/icons/user.svg?react";
import { User, UserMetadata } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@zenml-io/react-component-library";
import { useForm } from "react-hook-form";
import { PrimaryUseRadioButton } from "./UseRadioButton";
import { PrimaryUseFormType, primaryUseFormSchema } from "./form-schemas";

type Props = {
	submitHandler: (data: PrimaryUseFormType) => void;
	user?: User;
};

export function PrimaryUseForm({ submitHandler, user }: Props) {
	const {
		handleSubmit,
		register,
		formState: { isValid }
	} = useForm<PrimaryUseFormType>({
		defaultValues: {
			primaryUse: (user?.metadata?.user_metadata as UserMetadata)?.primary_use
		},
		resolver: zodResolver(primaryUseFormSchema)
	});

	return (
		<div className="space-y-5">
			<div>
				<h1 className="text-display-xs font-semibold">What will be your primary use for ZenML?</h1>
			</div>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
				<div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
					<PrimaryUseRadioButton id="use-personal" {...register("primaryUse")} value="personal">
						<UserIcon className="h-7 w-7 fill-primary-400" />
						<span>Personal</span>
					</PrimaryUseRadioButton>
					<PrimaryUseRadioButton {...register("primaryUse")} id="use-work" value="work">
						<Building className="h-7 w-7 fill-primary-400" />
						<span>Work</span>
					</PrimaryUseRadioButton>

					<PrimaryUseRadioButton {...register("primaryUse")} id="use-student" value="student">
						<Hat className="h-7 w-7 fill-primary-400" />
						<span>Student</span>
					</PrimaryUseRadioButton>
				</div>
				<Button disabled={!isValid} className="w-full text-center" size="md">
					<span className="w-full">Continue</span>
				</Button>
			</form>
		</div>
	);
}
