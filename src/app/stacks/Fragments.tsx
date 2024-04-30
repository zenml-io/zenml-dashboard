import { InfoBox as InfoBoxPrimitive } from "@/components/Infobox";
import { PageHeader } from "@/components/PageHeader";
import { Box } from "@zenml-io/react-component-library";
import { OnboardingVideoModal } from "@/components/VideoModal";

export function StacksHeader() {
	return (
		<PageHeader>
			<h1 className="text-display-xs font-semibold">Stacks</h1>
		</PageHeader>
	);
}

export function InfoBox() {
	return (
		<InfoBoxPrimitive>
			<div className="flex w-full flex-wrap items-center gap-x-2 gap-y-0.5 text-text-md">
				<p className="font-semibold">We are creating a new Stacks experience</p>
				<p>In the meanwhile you can use the CLI to add and admin your stacks.</p>
			</div>
		</InfoBoxPrimitive>
	);
}

export function HeaderBox() {
	const videoLink =
		"https://zenml.portal.trainn.co/share/pbJuqd7awpp5pjFQLoPmHQ/embed?autoplay=false";
	return (
		<Box className="flex flex-col-reverse items-stretch overflow-hidden md:flex-row">
			<div className="w-full p-7 md:w-2/3">
				<h2 className="text-display-xs font-semibold">Learn More about Stacks</h2>
				<p className="mt-2 text-text-lg text-theme-text-secondary">
					Get started with ZenML Stacks and Stack Components in this starter guide video. Set up
					Your Stack from local to cloud.
				</p>
				<OnboardingVideoModal videoLink={videoLink} buttonText="Watch the Starter Guide (5 min)" />
			</div>
			<div className="flex w-full items-center justify-center bg-primary-50 md:w-1/3">
				<OnboardingVideoModal videoLink={videoLink} isButton={false} />
			</div>
		</Box>
	);
}
