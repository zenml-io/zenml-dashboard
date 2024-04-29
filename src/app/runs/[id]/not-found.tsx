import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import { Button } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";

export default function RunNotFound() {
	const navigate = useNavigate();
	return (
		<>
			<section className="layout-container my-9 flex flex-col items-center gap-5">
				<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />
				<div className="text-center">
					<h1 className="mb-2 text-display-xs font-semibold">Error 404 - Run Not Found</h1>
					<p className="text-theme-text-secondary">
						Oh no! It seems that the run you are looking for doesn't exist.
					</p>
				</div>
				<Button intent="primary" size="lg" onClick={() => navigate(-1)}>
					<ArrowLeft className="h-5 w-5 fill-theme-text-negative" /> <span>Go back</span>
				</Button>
			</section>
		</>
	);
}
