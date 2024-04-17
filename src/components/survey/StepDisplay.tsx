type StepDisplayProps = {
	activeStep: number;
	stepAmount: number;
};

export default function StepDisplay({ stepAmount, activeStep }: StepDisplayProps) {
	return (
		<ol className="flex flex-wrap justify-center gap-1 pb-5" aria-label="progress">
			{Array.from({ length: stepAmount }, (_, i) => (
				<li
					aria-current={activeStep === i + 1 ? "step" : undefined}
					key={i}
					className={`h-0.5 w-[90px] rounded-rounded ${
						activeStep === i + 1
							? "bg-primary-100"
							: activeStep > i
								? "bg-primary-300"
								: "bg-neutral-200"
					}`}
				></li>
			))}
		</ol>
	);
}
