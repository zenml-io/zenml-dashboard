import { Switch } from "@zenml-io/react-component-library/components/client";
import { Controller, useFormContext } from "react-hook-form";
import { ConnectorConfigForm } from "./schema";
export function SkipVerify() {
	const { control } = useFormContext<ConnectorConfigForm>();

	return (
		<Controller
			name="skipValidation"
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div className="space-y-0.5">
					<label className="flex items-center gap-2">
						<Switch checked={field.value} onCheckedChange={field.onChange} />
						<span>Register without validation</span>
					</label>
					{error && <p className="text-text-xs text-red-500">{error.message?.toString()}</p>}
				</div>
			)}
		/>
	);
}
