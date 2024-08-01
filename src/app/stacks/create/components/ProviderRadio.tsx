import { Badge, cn } from "@zenml-io/react-component-library";
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

type ProviderRadioProps = InputHTMLAttributes<HTMLInputElement>;
export const CloudProviderRadioButton = forwardRef<HTMLInputElement, ProviderRadioProps>(
	({ children, className, id, ...rest }, ref) => (
		<div className="min-h-[160px] min-w-[160px]">
			<input id={id} {...rest} ref={ref} className={cn("peer sr-only", className)} type="radio" />
			<label
				htmlFor={id}
				className="flex h-full w-full flex-col items-start justify-center space-y-5 rounded-md border border-theme-border-minimal bg-theme-surface-primary p-5 text-text-lg text-theme-text-secondary hover:cursor-pointer	peer-checked:border-primary-100 peer-checked:bg-primary-25 peer-focus-visible:border-primary-100 peer-disabled:cursor-default peer-disabled:bg-neutral-50"
			>
				{children}
			</label>
		</div>
	)
);

CloudProviderRadioButton.displayName = "CloudProviderRadioButton";

type ProviderCardProps = {
	icon: ReactNode;
	title: ReactNode;
	subtitle: ReactNode;
	comingSoon?: boolean;
};
export function ProviderCard({ icon, title, subtitle, comingSoon }: ProviderCardProps) {
	return (
		<div className="space-y-1 text-left">
			{icon}
			<div className="flex items-center gap-1">
				<p className="text-text-lg font-semibold text-theme-text-primary">{title}</p>
				{comingSoon && (
					<Badge className="font-semibold" color="purple" size="sm">
						Coming Soon
					</Badge>
				)}
			</div>
			<p className="text-text-sm text-theme-text-secondary">{subtitle}</p>
		</div>
	);
}
