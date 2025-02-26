type Props = {
	label: string;
	isOptional: boolean;
};

export function RendererHeadline({ label, isOptional }: Props) {
	return (
		<>
			{label}
			{!isOptional && (
				<span className="text-theme-text-error" aria-label="required">
					*
				</span>
			)}
		</>
	);
}
