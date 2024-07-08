import Stack from "@/assets/icons/stack.svg?react";
import { fetchStacks } from "@/data/stacks/stacklist-query";
import { Input, Spinner } from "@zenml-io/react-component-library";
import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ConfigurationForm } from "../schemas";

export function StackName() {
	const {
		register,
		setError,

		clearErrors,
		formState: { errors }
	} = useFormContext<ConfigurationForm>();
	const [isLoading, setIsLoading] = useState(false);
	const checkNameAvailability = useCallback(
		debounce(async (name: string) => {
			setIsLoading(true);
			try {
				const data = await fetchStacks({ name });

				if (data.total > 0) {
					setError("stackName", { type: "manual", message: "Name already exists" });
				} else {
					clearErrors("root.stackName.manual");
				}
			} catch (error) {
				console.error("API call failed", error);
			} finally {
				setIsLoading(false);
			}
		}, 500),
		[]
	);

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value;
		if (name) {
			checkNameAvailability(name);
		}
	};

	return (
		<div className="space-y-5 border-b border-theme-border-moderate pb-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Stack className="h-5 w-5 fill-primary-400" />
					Select a name for your Stack
				</p>
				<p className="text-theme-text-secondary">
					Please select a name for your stack, that is not used already.
				</p>
			</div>
			<div className="flex items-center space-x-2">
				<div className="space-y-1">
					<Input
						className={`${errors.stackName ? "border-red-500" : ""}`}
						placeholder="zenml-remote-stack"
						{...register("stackName", {
							onChange(event) {
								handleNameChange(event);
							}
						})}
					/>
					{errors.stackName && (
						<p className="text-text-xs text-red-500">{errors.stackName.message}</p>
					)}
				</div>
				{isLoading && <Spinner className="h-5 w-5 shrink-0 border-[3px]" />}
			</div>
		</div>
	);
}
