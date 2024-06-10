import Adam from "@/assets/images/portraits/adam.webp";
import Alex from "@/assets/images/portraits/alex.webp";
import Baris from "@/assets/images/portraits/baris.webp";
import Hamza from "@/assets/images/portraits/hamza.webp";
import Stefan from "@/assets/images/portraits/stefan.webp";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@zenml-io/react-component-library";

export function SlackStep() {
	const { setSurveyStep } = useSurveyContext();

	function joinAndContinue() {
		window.open("https://zenml.io/slack", "_blank");
		setSurveyStep((prev) => prev + 1);
	}

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
				onClick={() => joinAndContinue()}
				className="h-auto min-h-8 w-full justify-center py-1"
				intent="primary"
				emphasis="bold"
				size="lg"
			>
				Join the ZenML Community and Continue
			</Button>
			<Button
				intent="secondary"
				emphasis="minimal"
				onClick={() => setSurveyStep((prev) => prev + 1)}
				className="mx-auto justify-center text-neutral-500"
				size="sm"
			>
				Skip this step
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
