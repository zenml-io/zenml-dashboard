import {
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library/components/client";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const logLevels = [
	{
		value: 10,
		label: "Debug"
	},
	{
		value: 20,
		label: "Info"
	},
	{
		value: 30,
		label: "Warning"
	},
	{
		value: 40,
		label: "Error"
	},
	{
		value: 50,
		label: "Critical"
	}
] as const;

export const LogLevelSelect = forwardRef<
	ElementRef<typeof SelectTrigger>,
	ComponentPropsWithoutRef<typeof Select>
>(({ ...props }, ref) => {
	return (
		<Select {...props}>
			<SelectTrigger
				ref={ref}
				className="h-7 w-full truncate border border-[#D0D5DD] bg-theme-surface-primary p-2 text-left text-text-md"
			>
				<SelectValue
					className="data-[placeholder]:text-theme-text-secondary"
					placeholder="Select a role..."
				/>
			</SelectTrigger>
			<SelectContent className="">
				<ScrollArea viewportClassName="max-h-[300px]">
					{logLevels.map((logLevel, idx) => (
						<SelectItem key={idx} className="rounded-sm p-2" value={logLevel.value.toString()}>
							{logLevel.label}
						</SelectItem>
					))}
				</ScrollArea>
			</SelectContent>
		</Select>
	);
});

LogLevelSelect.displayName = "LogLevelSelect";
