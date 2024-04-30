import { InfoBox as InfoBoxPrimitive } from "@/components/Infobox";
import { Box } from "@zenml-io/react-component-library";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import { Fragment } from "react/jsx-runtime";
import { generateCommandList } from "@/components/fallback-pages/Commands";
import { secretCommands } from "@/contents/secrets";
import { VideoModal } from "@/components/VideoModal";
import SecretsVideo from "@/assets/illustrations/secrets-video.svg";

export function InfoBox() {
	return (
		<InfoBoxPrimitive>
			<div className="flex w-full flex-wrap items-center gap-x-2 gap-y-0.5 text-text-md">
				<p className="font-semibold">We are creating a new Secrets experience</p>
				<p>In the meanwhile you can use the CLI to add and manage your secrets.</p>
			</div>
		</InfoBoxPrimitive>
	);
}

export function HeaderBox() {
	const videoLink =
		"https://zenml.portal.trainn.co/share/R0A37qU8LVfcvPi6wxdhaQ/embed?autoplay=false";
	return (
		<Box className="flex flex-col-reverse items-stretch overflow-hidden md:flex-row">
			<div className="w-full p-7 md:w-2/3">
				<h2 className="text-display-xs font-semibold">Learn More about Secrets</h2>
				<p className="mt-2 text-text-lg text-theme-text-secondary">
					Learn about using ZenML Secrets for a secure, centralized management of your pipeline
					secrets and configurations.
				</p>
				<VideoModal videoLink={videoLink} buttonText="Watch the Starter Guide (1 min)" />
			</div>
			<div className="flex w-full items-center justify-center bg-primary-50 lg:w-1/3">
				<VideoModal
					fallbackImage={
						<img
							src={SecretsVideo}
							alt="Purple squares with text indicating a starter guide for secrets"
							className="h-full w-full"
						/>
					}
					videoLink={videoLink}
					isButton={false}
				/>
			</div>
		</Box>
	);
}

export function Commands() {
	return (
		<section className="space-y-5 pl-8 pr-5">
			<InfoBoxPrimitive className="text-text-md" intent="neutral">
				A ZenML Secret is a collection or grouping of key-value pairs stored by the ZenML secrets
				store. ZenML Secrets are identified by a unique name which allows you to fetch or reference
				them in your pipelines and stacks.
			</InfoBoxPrimitive>
			{secretCommands.map((item, index) => (
				<Fragment key={index}>{generateCommandList(item)}</Fragment>
			))}
			<HelpBox
				text="Check all the commands and find more about Secrets in our Docs"
				link="https://docs.zenml.io/user-guide/advanced-guide/secret-management"
			/>
		</section>
	);
}
