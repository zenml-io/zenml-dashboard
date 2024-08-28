import { stackQueries } from "@/data/stacks";
import { StackDeploymentProvider } from "@/types/stack";
import { useQuery } from "@tanstack/react-query";
import {
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Skeleton
} from "@zenml-io/react-component-library";
import { Controller, useFormContext } from "react-hook-form";
import { ConfigurationForm } from "../schemas";
type Props = {
	provider: StackDeploymentProvider;
};
export function LocationSelect({ provider }: Props) {
	const { control } = useFormContext<ConfigurationForm>();
	const { isPending, isError, data } = useQuery({
		...stackQueries.stackDeploymentInfo({ provider: provider })
	});

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[40px] w-[100px]" />;

	const locations = Object.entries(data.locations);

	return (
		<Controller
			control={control}
			name="region"
			render={({ field: { onChange, ref, ...rest } }) => (
				<Select {...rest} onValueChange={onChange}>
					<SelectTrigger className="border border-neutral-300 text-left text-text-md">
						<SelectValue className="flex items-center gap-2" placeholder="Select your Location" />
					</SelectTrigger>
					<SelectContent>
						<ScrollArea viewportClassName="max-h-[300px]">
							{locations.map(([region, name]) => (
								<SelectItem key={region} value={name as string}>
									{region} - <span className="text-theme-text-secondary">{name as string}</span>
								</SelectItem>
							))}
						</ScrollArea>
					</SelectContent>
				</Select>
			)}
		/>
	);
}
