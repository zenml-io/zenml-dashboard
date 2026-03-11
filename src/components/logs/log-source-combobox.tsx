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

/** Sentinel value used to represent "All Sources" in the combobox. */
export const ALL_SOURCES = "__all_sources__";

type Props = {
	sources: string[];
	selectedSource: string;
	setSelectedSource: (source: string) => void;
};

export function LogSourceCombobox({ sources, selectedSource, setSelectedSource }: Props) {
	const [open, setOpen] = useState(false);

	// Prepend "All Sources" when more than one real source exists
	const showAll = sources.length > 1;
	const displayLabel = selectedSource === ALL_SOURCES ? "All Sources" : selectedSource;

	return (
		<Popover modal open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					intent="secondary"
					emphasis="subtle"
					className="flex items-center gap-0.5 bg-theme-surface-primary capitalize"
					size="md"
				>
					{displayLabel}
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
							{showAll && (
								<CommandItem
									keywords={["all", "sources"]}
									className="group capitalize data-[selected=true]:rounded-sharp"
									value={ALL_SOURCES}
									onSelect={() => {
										setSelectedSource(ALL_SOURCES);
										setOpen(false);
									}}
								>
									{selectedSource === ALL_SOURCES ? (
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
									All Sources
								</CommandItem>
							)}
							{sources.map((s) => {
								const name = s.split("/").pop();
								return (
									<CommandItem
										keywords={[name ?? ""]}
										className="group capitalize data-[selected=true]:rounded-sharp"
										key={s}
										value={s}
										onSelect={() => {
											setSelectedSource(s);
											setOpen(false);
										}}
									>
										{s === selectedSource ? (
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
