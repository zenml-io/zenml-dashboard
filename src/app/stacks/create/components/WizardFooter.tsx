import { Footer } from "@/components/wizard/Wizard";
import { PropsWithChildren } from "react";
import { CancelButton } from "./CancelButton";

type Props = {
	displayCancel?: boolean;
};
export function StackWizardFooter({ children, displayCancel = true }: PropsWithChildren<Props>) {
	return (
		<Footer>
			{displayCancel && <CancelButton />}
			{children}
		</Footer>
	);
}
