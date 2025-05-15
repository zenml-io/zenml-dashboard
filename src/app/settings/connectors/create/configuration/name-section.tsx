import { Input } from "@zenml-io/react-component-library/components/server";
import Name from "@/assets/icons/name.svg?react";
import { useFormContext } from "react-hook-form";
import { ConnectorConfigForm } from "./schema";

export function NameSection() {
	const {
		register,
		formState: { errors }
	} = useFormContext<ConnectorConfigForm>();
	return (
		<section className="space-y-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<Name width={24} height={24} className="shrink-0 fill-primary-400" />
					<p className="text-text-lg font-semibold">
						Select a name and description for your Service Connector
					</p>
				</div>
				<p className="text-theme-text-secondary">
					You can keep the suggested name or create your own.
				</p>
			</div>
			<div className="space-y-0.5">
				<label className="font-inter text-sm text-left font-medium leading-5">
					Name
					<span className="text-theme-text-error" aria-label="required">
						*
					</span>
				</label>
				<Input
					data-error={!!errors.name}
					{...register("name")}
					className="w-full data-[error=true]:border-error-500"
					inputSize="md"
				/>
				<p className="text-text-xs text-theme-text-secondary">
					Only letters, numbers and dashes. It should be 32 characters max. You cannot use an
					existing name.
				</p>
				{errors.name && (
					<p className="text-text-xs text-red-500">{errors.name.message?.toString()}</p>
				)}
			</div>
			<div className="space-y-0.5">
				<label className="font-inter text-sm text-left font-medium leading-5">Description</label>
				<Input {...register("description")} className="w-full" inputSize="md" />
				{errors.description && (
					<p className="text-text-xs text-red-500">{errors.description.message?.toString()}</p>
				)}
			</div>
		</section>
	);
}
