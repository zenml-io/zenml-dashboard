import { StackComponentType } from "@/types/components";
import { Input } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FlavorIcon } from "../../FlavorIcon";
import { RadioItem, RadioItemLabel } from "../../RadioItem";
import { ContainerRegistryFormType } from "./schema";
import { useContainerRegistries } from "./useContainerRegistry";

const type: StackComponentType = "container_registry";

export function ContainerRegistryForm() {
	const [filter, setFilter] = useState("");
	const { control, setValue, handleSubmit, register, watch, trigger, reset } =
		useFormContext<ContainerRegistryFormType>();

	const { flattenedInstances, handleFormSubmit } = useContainerRegistries();

	const filtered = flattenedInstances.filter((instance) =>
		instance.value.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	);

	return (
		<>
			<Input
				placeholder="Search..."
				onChange={(e) => {
					reset();
					setFilter(e.target.value);
				}}
			/>
			<form onSubmit={handleSubmit(handleFormSubmit)} id="artifact-store-form">
				<input type="hidden" {...register("flavor")} />
				<ul className="space-y-1">
					{filtered.map((instance) => (
						<li key={instance.value}>
							<Controller
								name="resourceId"
								control={control}
								render={({ field: { onChange, ...restField } }) => (
									<RadioItemLabel
										data-state={watch("resourceId") === instance.value ? "selected" : "unselected"}
										htmlFor={instance.value}
									>
										<RadioItem
											id={instance.value}
											type="radio"
											{...restField}
											onChange={(e) => {
												setValue("flavor", instance.flavor, {
													shouldValidate: true,
													shouldDirty: true,
													shouldTouch: true
												});
												onChange(e.target.value);
												trigger();
											}}
											value={instance.value}
											name="connector-radio"
										/>
										<FlavorIcon width={24} height={24} type={type} flavor={instance.flavor} />{" "}
										<span>{instance.value}</span>
									</RadioItemLabel>
								)}
							/>
						</li>
					))}
				</ul>
			</form>
		</>
	);
}
