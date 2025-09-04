import { Box } from "@zenml-io/react-component-library/components/server";

type Props = {
	title: string;
	description: string;
};

export function TimelineEmptyState({ title, description }: Props) {
	return (
		<div className="p-3">
			<Box className="flex flex-col items-center justify-center space-y-4 p-9">
				<div className="space-y-2 text-center">
					<p className="text-display-xs font-semibold text-theme-text-primary">{title}</p>
					<p className="text-theme-text-secondary">{description}</p>
				</div>
			</Box>
		</div>
	);
}
