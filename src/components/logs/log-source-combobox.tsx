import Check from "@/assets/icons/check.svg?react";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Logs from "@/assets/icons/logs.svg?react";
import { LogSourceOption } from "@/types/logs";
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
	options: LogSourceOption[];
	selectedValue: string;
	onValueChange: (value: string) => void;
};

export function LogSourceCombobox(props: Props) {
	const [open, setOpen] = useState(false);
	const { options, selectedValue, onValueChange } = props;
	const selectedLabel =
		options.find((option) => option.value === selectedValue)?.label ?? selectedValue;

	return (
		<Popover modal open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					intent="secondary"
					emphasis="subtle"
					className="flex items-center gap-0.5 bg-theme-surface-primary capitalize"
					size="md"
				>
					{selectedLabel}
					<ChevronDown width={24} height={24} className="fill-text-primary shrink-0" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="px-0" align="start">
				<Command defaultValue={selectedLabel} className="rounded-sharp">
					<CommandInput className="m-0" placeholder="Search sources...">
						<Input className="w-full" inputSize="sm" />
					</CommandInput>
					<CommandList>
						<CommandEmpty>No source found.</CommandEmpty>
						<CommandGroup className="max-h-[300px] overflow-y-auto">
							{options.map((option) => {
								return (
									<CommandItem
										className="group capitalize data-[selected=true]:rounded-sharp"
										key={option.value}
										value={option.label}
										onSelect={() => {
											onValueChange(option.value);
											setOpen(false);
										}}
									>
										{option.value === selectedValue ? (
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
										{option.label}
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
