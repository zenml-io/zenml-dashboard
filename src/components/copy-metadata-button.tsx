import { Button, ButtonProps } from "@zenml-io/react-component-library/components/server";
import CheckCircle from "@/assets/icons/check-circle.svg?react";
import Copy from "@/assets/icons/copy.svg?react";
import { cn } from "@zenml-io/react-component-library/utilities";
import { useCopy } from "@/lib/copy";

type Props = ButtonProps & {
	copyText: string;
};

export function CopyMetadataButton({ copyText, className, ...props }: Props) {
	const { copyToClipboard, copied } = useCopy();
	return (
		<Button
			size="sm"
			className={cn("flex items-center gap-1 bg-theme-surface-primary", className)}
			intent="secondary"
			emphasis="subtle"
			onClick={() => copyToClipboard(copyText)}
			{...props}
		>
			{copied ? (
				<CheckCircle width={16} height={16} className="shrink-0 fill-neutral-500" />
			) : (
				<Copy width={16} height={16} className="shrink-0 fill-neutral-500" />
			)}
			{copied ? "Copied" : <span>Copy</span>}
		</Button>
	);
}
