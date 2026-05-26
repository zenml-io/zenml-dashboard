import Logs from "@/assets/icons/logs.svg?react";
import Check from "@/assets/icons/check.svg?react";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
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

export type LogSourceOption = {
	label: string;
	value: string;
};

type Props = {
	sources: LogSourceOption[];
	selectedSource: string;
	setSelectedSource: (source: string) => void;
};

export function LogSourceCombobox({ sources, selectedSource, setSelectedSource }: Props) {
	const [open, setOpen] = useState(false);

	const selectedLabel = sources.find((s) => s.value === selectedSource)?.label ?? selectedSource;

	return (
		<Popover modal open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					intent="secondary"
					emphasis="subtle"
					className="flex items-center gap-0.5 whitespace-nowrap bg-theme-surface-primary capitalize"
					size="md"
				>
					{selectedLabel}
					<ChevronDown width={24} height={24} className="fill-text-primary shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="px-0" align="start">
				<Command defaultValue={selectedSource} className="rounded-sharp">
					<CommandInput className="m-0" placeholder="Search sources...">
						<Input className="w-full" inputSize="sm" />
					</CommandInput>
					<CommandList>
						<CommandEmpty>No source found.</CommandEmpty>
						<CommandGroup className="max-h-[300px] overflow-y-auto">
							{sources.map(({ label, value }) => {
								return (
									<CommandItem
										keywords={[label]}
										className="group capitalize data-[selected=true]:rounded-sharp"
										key={value}
										value={value}
										onSelect={() => {
											setSelectedSource(value);
											setOpen(false);
										}}
									>
										{value === selectedSource ? (
											<Check
												width={16}
												height={16}
												className="shrink-0 fill-theme-text-tertiary group-data-[selected=true]:fill-theme-text-brand"
											/>
										) : (
											<Logs
												width={16}
												height={16}
												className="shrink-0 fill-theme-text-tertiary group-data-[selected=true]:fill-theme-text-brand"
											/>
										)}
										{label}
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
