import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { ZodError } from "zod";

type Props = {
	error: ZodError;
};

export function ValidationErrors({ error }: Props) {
	return (
		<div className="space-y-2 rounded-md border border-error-300 bg-error-50 p-4">
			<div className="flex items-center gap-2">
				<AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />
				<h3 className="text-text-md font-semibold text-error-900">Validation Errors</h3>
			</div>
			<ul className="space-y-1 text-text-sm text-error-800">
				{error.errors.map((err, idx) => {
					const path = err.path.length > 0 ? err.path.join(".") : "root";
					return (
						<li key={idx} className="flex items-start gap-2">
							<span className="font-mono text-error-700">•</span>
							<span>
								<strong>{path}:</strong> {err.message}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
