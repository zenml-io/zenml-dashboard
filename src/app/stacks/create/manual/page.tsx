import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs } from "@radix-ui/react-tabs";
import { cn } from "@zenml-io/react-component-library/utilities";
import { HTMLAttributes, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ComponentsSelection } from "./ComponentSelection";
import { formSchema, FormType } from "./schema";
import { TypeOverview } from "./TypeOverview";
import { useManualStack } from "./useManualStack";

export default function CreateStackManualPage() {
	const [selectedTab, setSelectedTab] = useState("");
	const { createManualStack } = useManualStack();
	const form = useForm<FormType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			components: {
				alerter: null,
				orchestrator: {},
				annotator: null,
				artifact_store: {},
				container_registry: null,
				data_validator: null,
				experiment_tracker: null,
				feature_store: null,
				model_registry: null,
				image_builder: null,
				model_deployer: null,
				step_operator: null
			},
			stackName: ""
		}
	});

	return (
		<FormProvider {...form}>
			<Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full">
				<form
					onSubmit={form.handleSubmit(createManualStack)}
					className="flex h-[calc(100vh_-_4rem_-_4rem_-_2px)] flex-1 flex-col divide-y divide-theme-border-moderate xl:flex-row-reverse xl:divide-x xl:divide-y-0 xl:divide-x-reverse"
				>
					<LayoutBox className="h-full flex-1 bg-theme-surface-primary">
						<TypeOverview />
					</LayoutBox>
					<LayoutBox>
						<ComponentsSelection />
					</LayoutBox>
				</form>
			</Tabs>
		</FormProvider>
	);
}

function LayoutBox({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("w-full overflow-y-auto xl:w-1/2", className)} {...rest} />;
}
