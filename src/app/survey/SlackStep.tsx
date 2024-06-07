import Slack from "@/assets/icons/services/slack.svg?react";
import Adam from "@/assets/images/portraits/adam.webp";
import Alex from "@/assets/images/portraits/alex.webp";
import Baris from "@/assets/images/portraits/baris.webp";
import Hamza from "@/assets/images/portraits/hamza.webp";
import Stefan from "@/assets/images/portraits/stefan.webp";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@zenml-io/react-component-library";

export function SlackStep() {
	const { setSurveyStep } = useSurveyContext();
	return (
		<div className="max-w-[540px] space-y-5">
			<div>
				<h1 className="text-display-xs font-semibold">Join The ZenML Slack Community</h1>
				<p className="text-theme-text-secondary">
					Connect to our growing community and meet fellow ZenML enthusiasts, get support, and share
					your insights. Let's grow together!
				</p>
			</div>
			<AvatarStack />
			<Button
				className="h-auto min-h-10 w-full flex-wrap justify-center gap-3 bg-theme-surface-primary py-3"
				intent="secondary"
				emphasis="subtle"
				size="lg"
				asChild
			>
				<a target="_blank" rel="noopener noreferrer" href="https://zenml.io/slack">
					<Slack className="h-7 w-7 shrink-0" />
					<p className="text-xl font-semibold">Join the ZenML Community</p>
				</a>
			</Button>
			<Button
				onClick={() => setSurveyStep((prev) => prev + 1)}
				className="w-full justify-center"
				size="lg"
			>
				Continue
			</Button>
		</div>
	);
}

const avatarList = [
	{
		name: "Adam",
		image: Adam
	},
	{
		name: "Hamza",
		image: Hamza
	},
	{
		name: "Alex",
		image: Alex
	},
	{
		name: "Stefan",
		image: Stefan
	},
	{ name: "Baris", image: Baris }
];

function AvatarStack() {
	return (
		<div className="space-y-1">
			<div className="flex items-center justify-center -space-x-[7px]">
				{avatarList.map((avatar) => (
					<Avatar key={avatar.name} size="lg" type="rounded">
						<AvatarImage alt={`Portrait of ${avatar.name}`} src={avatar.image} />
						<AvatarFallback size="lg">{avatar.name[0]}</AvatarFallback>
					</Avatar>
				))}
			</div>
			<p className="text-center text-text-xs text-theme-text-tertiary">
				Adam Probst, Hamza Tahir, and +1,800 others have already joined
			</p>
		</div>
	);
}
