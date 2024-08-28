import Dots from "@/assets/icons/dots-horizontal.svg?react";
import Zenml from "@/assets/icons/zenml-icon.svg?react";
import { CloudProviderIcon } from "@/components/ProviderIcon";
import { Tick } from "@/components/Tick";
import { getCloudProviderName } from "@/lib/provider";
import { StackDeploymentProvider } from "@/types/stack";
import { Spinner } from "@zenml-io/react-component-library";
import {
	Dialog,
	DialogContent,
	DialogTitle
} from "@zenml-io/react-component-library/components/client";
import { PropsWithChildren, useEffect, useState } from "react";
import { useExistingInfraContext } from "../../ExistingInfraContext";

type Props = {
	open: boolean;
	loadingComponents: boolean;
};

export function LoadingModal({ open, loadingComponents }: Props) {
	const { data } = useExistingInfraContext();
	if (!data.connectorConfig?.type) return null;
	return (
		<Dialog open={open}>
			<DialogContent
				onPointerDownOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}
				className="max-w-[600px]"
			>
				<div className="flex items-center justify-between border-b border-theme-border-moderate py-2 pl-5 pr-3">
					<DialogTitle className="text-text-lg">
						Connecting and loading your components...
					</DialogTitle>
				</div>
				<div className="flex h-[200px] items-center justify-center gap-5 bg-primary-50">
					<Zenml className="h-[60px] w-[60px]" />
					<div className="flex h-[60px] w-[60px] items-center justify-center">
						<Dots className="h-5 w-5 fill-theme-text-tertiary" />
					</div>
					<CloudProviderIcon
						className="h-[60px] w-[60px]"
						provider={data.connectorConfig.type as StackDeploymentProvider}
					/>
				</div>
				<div className="flex flex-col gap-1 px-7 pb-6 pt-5">
					<p className="text-theme-text-secondary">
						We're securely connecting to {getCloudProviderName(data.connectorConfig?.type || "aws")}{" "}
						and retrieving your custom components. This process typically takes about 30-60 seconds.
					</p>
					<Loaders loadingComponents={loadingComponents} />
				</div>
			</DialogContent>
		</Dialog>
	);
}

type LoaderProps = {
	loadingComponents: boolean;
};
function Loaders({ loadingComponents }: LoaderProps) {
	const [conncetionLoading, setConnectionLoading] = useState(true);
	const [authLoading, setAuthLoading] = useState(true);

	useEffect(() => {
		const connectionTimeout = setTimeout(
			() => {
				setConnectionLoading(false);
			},
			Math.floor(Math.random() * 1000) + 500
		);

		const authTimeout = setTimeout(() => {
			setAuthLoading(false);
		}, 1500);

		return () => {
			clearTimeout(connectionTimeout);
			clearTimeout(authTimeout);
		};
	}, []);

	return (
		<ul className="mt-3 space-y-3 text-theme-text-secondary">
			<ListItem>
				<Indicator loading={conncetionLoading} />
				Establishing a secure connection
			</ListItem>
			<ListItem>
				<Indicator loading={authLoading} />
				Authenticating your account
			</ListItem>
			<ListItem>
				<Indicator loading={loadingComponents} />
				Fetching your existing components
			</ListItem>
		</ul>
	);
}

type IndicatorProps = {
	loading: boolean;
};
function Indicator({ loading }: IndicatorProps) {
	if (loading) {
		return <Spinner className="h-5 w-5 border-2" />;
	}
	return <Tick className="h-5 w-5" tickClasses="w-3 h-3" />;
}

function ListItem({ children }: PropsWithChildren) {
	return <li className="flex items-center gap-1">{children}</li>;
}
