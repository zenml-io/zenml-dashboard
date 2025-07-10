import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import CheckCircle from "@/assets/icons/check-circle.svg?react";
import { Button } from "@zenml-io/react-component-library/components/server";
import { cn } from "@zenml-io/react-component-library/utilities";
import { Controller, useFormContext } from "react-hook-form";
import { constructPayload } from "./helper";
import { ConnectorConfigForm } from "./schema";
import { useVerifyButton } from "./use-verify-button";
import { useRegisterConnectorContext } from "../create-context";

type Props = {
	user: string;
	mandatoryFields: string[];
};
export function VerifyConnectorButton({ user, mandatoryFields }: Props) {
	const { connectorType } = useRegisterConnectorContext();
	const { control, getValues } = useFormContext<ConnectorConfigForm>();

	const { disabled, errorMsg, verifyConfig } = useVerifyButton({
		mandatoryFields
	});

	return (
		<Controller
			control={control}
			name="isValid"
			render={({ field }) => (
				<div className="space-y-5">
					<Button
						disabled={disabled}
						size="md"
						className={cn("flex w-full items-center justify-center gap-3", {
							"border-success-500 bg-success-500 text-white": field.value === true
						})}
						type="button"
						intent="primary"
						emphasis="subtle"
						onClick={() => {
							const payload = constructPayload({
								...getValues(),
								connectorType,
								user
							});

							verifyConfig.mutate({
								payload
							});
						}}
					>
						<ButtonContent
							disabled={disabled}
							isValid={field.value}
							isPending={verifyConfig.isPending}
						/>
					</Button>
					{errorMsg && (
						<p className="max-h-[250px] overflow-auto rounded-md border border-theme-border-moderate bg-theme-surface-secondary p-1 text-left font-mono">
							{errorMsg}
						</p>
					)}
				</div>
			)}
		/>
	);
}

type ButtonContentProps = {
	isValid: boolean | null;
	isPending: boolean;
	disabled: boolean;
};

function ButtonContent({ isValid, isPending, disabled }: ButtonContentProps) {
	if (isPending)
		return (
			<>
				<div
					role="alert"
					aria-busy="true"
					className="full h-5 w-5 animate-spin rounded-rounded border-2 border-neutral-300 border-b-theme-text-brand"
				></div>
				Validating Credentials...
			</>
		);
	if (isValid === null)
		return (
			<>
				<CheckCircle
					width={24}
					height={24}
					data-disabled={disabled}
					className="fill-primary-600 data-[disabled=true]:fill-primary-100"
				/>
				Validate Credentials
			</>
		);
	if (isValid)
		return (
			<>
				<CheckCircle width={24} height={24} className="fill-white" />
				Verified successfully
			</>
		);
	return (
		<>
			<AlertCircle
				width={24}
				height={24}
				data-disabled={disabled}
				className="fill-primary-600 data-[disabled=true]:fill-primary-100"
			/>
			Invalid Credentials
		</>
	);
}
