import { Controller, useFormContext } from "react-hook-form";
import { RadioItem, RadioItemLabel } from "../../RadioItem";
import { useOrchestrator } from "./useOrchestrator";
import { Input } from "@zenml-io/react-component-library/components/server";
import { orchestratorFormBaseSchema, OrchestratorForm as OrchestratorFormType } from "./schema";
import { zodSchemaFromObject } from "@/lib/forms";
import { FlavorIcon } from "../../FlavorIcon";
import { StackComponentType } from "@/types/components";
import { useSchemaContext } from "@/context/SchemaContext";

const kubernetesKey = "kubernetes";
const type: StackComponentType = "orchestrator";

export function OrchestratorForm() {
	const { orchestrators, handleFormSubmit } = useOrchestrator();
	const { setSchema } = useSchemaContext();
	const { control, watch, setValue, register, reset, handleSubmit } =
		useFormContext<OrchestratorFormType>();

	const selectedFlavor = watch("flavor");

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} id="artifact-store-form">
			{selectedFlavor !== kubernetesKey && <input {...register("resourceId")} type="hidden" />}
			<ul className="space-y-1">
				{orchestrators.map((orchestrator, i) => (
					<li key={i}>
						<Controller
							control={control}
							name="flavor"
							render={({ field: { onChange, ...restField } }) => (
								<RadioItemLabel
									data-state={selectedFlavor === orchestrator.flavor ? "selected" : "unselected"}
									htmlFor={orchestrator.flavor}
								>
									<RadioItem
										onChange={(e) => {
											reset({ flavor: orchestrator.flavor });
											if (orchestrator.use_resource_value_as_fixed_config === true) {
												setSchema(orchestratorFormBaseSchema);
											}
											if (
												orchestrator.use_resource_value_as_fixed_config === false &&
												orchestrator.required_configuration
											) {
												setSchema(
													orchestratorFormBaseSchema.merge(
														zodSchemaFromObject(orchestrator.required_configuration)
													)
												);
											}
											if (orchestrator.flavor !== kubernetesKey)
												setValue("resourceId", orchestrator.accessible_by_service_connector[0]);
											onChange(e);
										}}
										{...restField}
										id={orchestrator.flavor}
										type="radio"
										value={orchestrator.flavor}
										name="orchestrator-flavor-radio"
									/>
									<FlavorIcon width={24} height={24} type={type} flavor={orchestrator.flavor} />
									<span>{orchestrator.flavor_display_name}</span>
								</RadioItemLabel>
							)}
						/>
						{selectedFlavor === orchestrator.flavor &&
							(orchestrator.flavor === kubernetesKey ||
								orchestrator.use_resource_value_as_fixed_config === false) && (
								<div className="space-y-3 py-5 pl-8">
									{orchestrator.flavor === kubernetesKey && (
										<ul>
											{orchestrator.accessible_by_service_connector.map((instance) => (
												<li key={instance}>
													<Controller
														control={control}
														name="resourceId"
														render={({ field }) => (
															<RadioItemLabel
																data-state={
																	watch("resourceId") === instance ? "selected" : "unselected"
																}
																htmlFor={instance}
															>
																<RadioItem
																	{...field}
																	id={instance}
																	type="radio"
																	value={instance}
																	name="instance-radio"
																/>
																<FlavorIcon
																	type={type}
																	width={24}
																	height={24}
																	flavor={orchestrator.flavor}
																/>
																<span>{instance}</span>
															</RadioItemLabel>
														)}
													/>
												</li>
											))}
										</ul>
									)}
									{orchestrator.use_resource_value_as_fixed_config === false &&
										orchestrator.required_configuration &&
										Object.keys(orchestrator.required_configuration || {}).length >= 1 && (
											<div>
												{Object.entries(orchestrator.required_configuration).map(([key, value]) => (
													<div key={key}>
														<Controller
															name={key as any}
															control={control}
															render={({ field }) => (
																<div>
																	<label htmlFor={key} className="text-text-sm">
																		{value}
																	</label>
																	<Input
																		{...field}
																		inputSize="md"
																		required
																		className="w-full"
																		id={key}
																	/>
																</div>
															)}
														/>
													</div>
												))}
											</div>
										)}
								</div>
							)}
					</li>
				))}
			</ul>
		</form>
	);
}
