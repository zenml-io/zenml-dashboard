import CheckCircle from "@/assets/icons/check-circle.svg?react";
import X from "@/assets/icons/close.svg?react";
import { useNavigate } from "react-router-dom";

export function SuccessBanner() {
	const navigate = useNavigate();

	return (
		<div className="flex w-full items-center justify-between gap-2 rounded-md border border-success-300 bg-success-50 px-4 py-3 text-success-900">
			<div className="flex items-center gap-2">
				<CheckCircle className="size-5 shrink-0 fill-current" />
				<p className="font-semibold">Great job! You've mastered the ZenML basics.</p>
				<p className="text-text-sm">Time to level up with production workflows.</p>
			</div>

			<button onClick={() => navigate(window.location.pathname)}>
				<span className="sr-only">Close</span>
				<X className="size-5 fill-current" />
			</button>
		</div>
	);
}
