import { useSurvayContext } from "./SurveyContext";

type StepDisplayProps = {
	stepAmount: number;
};

export default function StepDisplay({ stepAmount }: StepDisplayProps) {
	const { surveyStep } = useSurvayContext();
	return (
		<ol className="flex flex-wrap justify-center gap-1 pb-5" aria-label="progress">
			{Array.from({ length: stepAmount }, (_, i) => (
				<li
					aria-current={surveyStep === i + 1 ? "step" : undefined}
					key={i}
					className={`h-0.5 w-[90px] rounded-rounded ${
						surveyStep === i + 1
							? "bg-primary-100"
							: surveyStep > i
								? "bg-primary-300"
								: "bg-neutral-200"
					}`}
				></li>
			))}
		</ol>
	);
}
