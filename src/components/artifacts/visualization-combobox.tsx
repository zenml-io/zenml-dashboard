import Check from "@/assets/icons/check.svg?react";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Artifact from "@/assets/icons/file.svg?react";
import { ArtifactVisualization } from "@/types/artifact-versions";
import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";

type Props = {
	setIndex: (index: number) => void;
	visualizations: ArtifactVisualization[];
	index: number;
};

export function VisualizationCombobox({ setIndex, visualizations, index }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					intent="secondary"
					emphasis="subtle"
					className="flex items-center gap-0.5 bg-theme-surface-primary"
					size="md"
				>
					{visualizations[index].body?.uri.split("/").pop()}
					<ChevronDown width={24} height={24} className="fill-text-primary shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="px-0" align="start">
				<Command defaultValue={index.toString()} className="rounded-sharp">
					<CommandInput className="m-0" placeholder="Search visualizations...">
						<Input className="w-full" inputSize="sm" />
					</CommandInput>
					<CommandList>
						<CommandEmpty>No visualization found.</CommandEmpty>
						<CommandGroup className="max-h-[300px] overflow-y-auto">
							{visualizations.map((v, idx) => {
								const name = v.body?.uri.split("/").pop();
								return (
									<CommandItem
										keywords={[name ?? ""]}
										className="group data-[selected=true]:rounded-sharp"
										key={v.id}
										value={idx.toString()}
										onSelect={() => {
											setIndex(idx);
											setOpen(false);
										}}
									>
										{idx === index ? (
											<Check
												width={16}
												height={16}
												className="shrink-0 fill-theme-text-tertiary group-data-[selected=true]:fill-theme-text-brand"
											/>
										) : (
											<Artifact
												width={16}
												height={16}
												className="shrink-0 fill-theme-text-tertiary group-data-[selected=true]:fill-theme-text-brand"
											/>
										)}
										{name}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
