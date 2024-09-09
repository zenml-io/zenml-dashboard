import {
	AlertDialog,
	AlertDialogPortal,
	AlertDialogTrigger,
	DropdownMenuItem
} from "@zenml-io/react-component-library";
import { forwardRef } from "react";

type DialogItemProps = {
	triggerChildren: React.ReactNode;
	icon?: React.ReactElement;
	children: React.ReactNode;
	open?: boolean;
	onSelect?: () => void;
	onOpenChange?: (isOpen: boolean) => void;
	// Add other props with their respective types if needed.
};

export const AlertDialogItem = forwardRef<
	React.ElementRef<typeof DropdownMenuItem>,
	DialogItemProps
>((props, forwardedRef) => {
	const { triggerChildren, children, onSelect, onOpenChange, icon, open, ...itemProps } = props;
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem
					{...itemProps}
					className="hover:cursor-pointer"
					icon={props.icon}
					ref={forwardedRef}
					onSelect={(event) => {
						event.preventDefault();
						onSelect && onSelect();
					}}
				>
					{triggerChildren}
				</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogPortal>
				{/* <RDialog.Overlay className="fixed inset-0 bg-neutral-900/20" /> */}
				{children}
			</AlertDialogPortal>
		</AlertDialog>
	);
});

AlertDialogItem.displayName = "AlertDialogItem";
