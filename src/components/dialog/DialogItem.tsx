import { Dialog, DialogTrigger, DropdownMenuItem } from "@zenml-io/react-component-library";
import { forwardRef, ReactElement, ReactNode } from "react";

type DialogItemProps = {
	triggerChildren: ReactNode;
	icon?: ReactElement;
	children: ReactNode;
	open?: boolean;
	onSelect?: () => void;
	onOpenChange?: (isOpen: boolean) => void;
	// Add other props with their respective types if needed.
};

export const DialogItem = forwardRef<React.ElementRef<typeof DropdownMenuItem>, DialogItemProps>(
	(props, forwardedRef) => {
		const { triggerChildren, children, onSelect, onOpenChange, icon, open, ...itemProps } = props;
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogTrigger asChild>
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
				</DialogTrigger>
				{children}
			</Dialog>
		);
	}
);

DialogItem.displayName = "DialogItem";
