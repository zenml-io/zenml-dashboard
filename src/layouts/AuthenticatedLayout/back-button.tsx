import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useLocation, useNavigate } from "react-router-dom";

export function BackButton() {
	const navigate = useNavigate();
	const location = useLocation();

	const segments = location.pathname.split("/").filter(Boolean);

	if (segments.length <= 1) {
		return null;
	}

	return (
		<Button
			className="flex aspect-square size-6 shrink-0 items-center justify-center"
			intent="secondary"
			emphasis="minimal"
			onClick={() => navigate(-1)}
		>
			<ArrowLeft className="size-5 shrink-0 fill-neutral-500" />
			<span className="sr-only">Go back</span>
		</Button>
	);
}
