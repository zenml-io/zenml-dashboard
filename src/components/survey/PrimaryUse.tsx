import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library";
import { Controller, useForm } from "react-hook-form";
import { PrimaryUseRadioButton } from "./UseRadioButton";
import { PrimaryUseFormType, primaryUseFormSchema } from "./form-schemas";
import { User, UserMetadata } from "@/types/user";
import { Icon } from "../Icon";

const modelsRange = ["0", "1-5", "6-25", "26-99", "100+"];

type Props = {
	submitHandler: (data: PrimaryUseFormType) => void;
	user?: User;
};

export function PrimaryUseForm({ submitHandler, user }: Props) {
	const {
		control,
		handleSubmit,
		register,
		formState: { isValid }
	} = useForm<PrimaryUseFormType>({
		defaultValues: {
			primaryUse: (user?.metadata?.metadata as UserMetadata)?.primary_use,
			amountProductionModels: (user?.metadata?.metadata as UserMetadata)?.models_production
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
						<Icon name="user" className="h-7 w-7 fill-primary-400" />
						<span>Personal</span>
					</PrimaryUseRadioButton>
					<PrimaryUseRadioButton {...register("primaryUse")} id="use-work" value="work">
						<Icon name="building" className="h-7 w-7 fill-primary-400" />
						<span>Work</span>
					</PrimaryUseRadioButton>

					<PrimaryUseRadioButton {...register("primaryUse")} id="use-student" value="student">
						<Icon name="hat" className="h-7 w-7 fill-primary-400" />
						<span>Student</span>
					</PrimaryUseRadioButton>
				</div>
				<div className="space-y-0.5">
					<label htmlFor="amount-select" className="font-semibold">
						How many models do you have in production?
					</label>
					<Controller
						name="amountProductionModels"
						control={control}
						render={({ field: { ref, onChange, ...rest } }) => (
							<Select {...rest} onValueChange={onChange}>
								<SelectTrigger
									id="amount-select"
									className="w-full border border-neutral-300 bg-theme-surface-primary px-2 text-left text-text-md"
								>
									<SelectValue placeholder="Select a range" />
								</SelectTrigger>
								<SelectContent className="">
									{modelsRange.map((item, i) => (
										<SelectItem key={i} value={item}>
											<div className="flex items-center gap-1">{item}</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
