import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const numberBoxVariants = cva(
	"flex h-7 w-7 items-center justify-center rounded-sm text-text-lg font-semibold",
	{
		variants: {
			intent: {
				default: "bg-primary-100 text-theme-text-brand",
				disabled: "bg-neutral-100 text-theme-text-tertiary"
			}
		},
		defaultVariants: {
			intent: "default"
		}
	}
);

type Props = VariantProps<typeof numberBoxVariants> & PropsWithChildren;

export function Numberbox({ children, intent }: Props) {
	return <div className={numberBoxVariants({ intent })}>{children}</div>;
}
