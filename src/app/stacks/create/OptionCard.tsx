import Clock from "@/assets/icons/clock.svg?react";
import Terraform from "@/assets/icons/services/terraform.svg?react";
import User from "@/assets/icons/users.svg?react";
import { ProgressBar } from "@zenml-io/react-component-library";
import { Box } from "@zenml-io/react-component-library";
import { cn } from "@zenml-io/react-component-library/utilities";
import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { CloudProviderIcon } from "../../../components/ProviderIcon";

export function Root({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
	return (
		<Box {...rest} className={cn("h-full w-full space-y-1 px-6 py-5", className)}>
			{children}
		</Box>
	);
}

export function Icon({ children }: PropsWithChildren) {
	return <>{children}</>;
}

export function Body({ children }: PropsWithChildren) {
	return <div className="space-y-0.5">{children}</div>;
}

export function TitleLine({ children }: PropsWithChildren) {
	return <div className="flex items-center gap-1">{children}</div>;
}

export function Title({ children }: PropsWithChildren) {
	return <h2 className="text-text-lg font-semibold">{children}</h2>;
}

export function Subtitle({ children }: PropsWithChildren) {
	return <p className="text-theme-text-secondary">{children}</p>;
}

export function Header({ children }: PropsWithChildren) {
	return (
		<div className="flex w-full flex-wrap items-start justify-between gap-y-1">{children}</div>
	);
}

export function Icons({ hasTerraform = false }: { hasTerraform?: boolean }) {
	return (
		<div className="flex items-center gap-2">
			{hasTerraform && <Terraform className="h-4 w-4 shrink-0" />}
			<CloudProviderIcon className="h-4 w-4" provider="aws" />
			<CloudProviderIcon className="h-4 w-4" provider="gcp" />
			<CloudProviderIcon className="h-4 w-4" provider="azure" />
		</div>
	);
}

export function EstimatedTime({ min }: { min: ReactNode }) {
	return (
		<div className="flex items-center gap-0.5">
			<Clock className="h-3 w-3 shrink-0 fill-theme-text-tertiary" />
			<p className="text-text-xs text-theme-text-tertiary">Estimated time: {min} mins</p>
		</div>
	);
}

export function Flexibility({ flexibility, children }: PropsWithChildren<{ flexibility: number }>) {
	return (
		<div className="flex w-full items-center gap-0.5 lg:w-1/3">
			<div className="flex items-center gap-0.5">
				<span className="text-theme-text-secondary">Flexibility</span>
				{children}
			</div>
			<ProgressBar className="h-1 flex-1 shrink-0 rounded-rounded" value={flexibility} />
		</div>
	);
}

export function Footer({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-wrap items-center justify-between gap-y-1 text-text-xs">
			{children}
		</div>
	);
}

export function RecommendedFor({ recommendataion }: { recommendataion: ReactNode }) {
	return (
		<div className="flex items-center gap-0.5 text-text-xs text-theme-text-success">
			<User className="h-3 w-3 shrink-0 fill-theme-text-success" />
			<p>Recommended for {recommendataion}</p>
		</div>
	);
}
