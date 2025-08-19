import Warning from "@/assets/icons/alert-triangle.svg?react";
import Running from "@/assets/icons/dots-circle.svg?react";
import Info from "@/assets/icons/info.svg?react";
import AlertCircle from "@/assets/icons/alert-circle.svg?react";
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
		label: "Debug",
		icon: <Running className="size-3 shrink-0 fill-neutral-400" />
	},
	{
		value: 20,
		label: "Info",
		icon: <Info className="size-3 shrink-0 fill-blue-500" />
	},
	{
		value: 30,
		label: "Warning",
		icon: <Warning className="size-3 shrink-0 fill-warning-500" />
	},
	{
		value: 40,
		label: "Error",
		icon: <AlertCircle className="size-3 shrink-0 fill-error-500" />
	},
	{
		value: 50,
		label: "Critical",
		icon: <AlertCircle className="size-3 shrink-0 fill-error-700" />
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
							<div className="flex items-center gap-1">
								{logLevel.icon}
								{logLevel.label}
							</div>
						</SelectItem>
					))}
				</ScrollArea>
			</SelectContent>
		</Select>
	);
});

LogLevelSelect.displayName = "LogLevelSelect";
