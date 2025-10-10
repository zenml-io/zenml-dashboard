import { Spinner } from "@zenml-io/react-component-library";

type Props = {
	subtitle?: string;
};

export function PlaygroundLoader({ subtitle }: Props) {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2">
			<Spinner />
			{subtitle && <p className="text-text-lg font-semibold">{subtitle}</p>}
		</div>
	);
}
