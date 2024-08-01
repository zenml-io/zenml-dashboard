import Transform from "@/assets/icons/transform.svg?react";
import { AuthMethodSelect } from "./AuthMethodSelect";

export function AuthenticationMethod() {
	return (
		<section className="space-y-5 py-5 first:pt-0 last:pb-0">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Transform className="h-5 w-5 fill-primary-400" />
					Select an Authentication Method
				</p>
				<p className="text-theme-text-secondary">
					Connect ZenML to your resources for seamless integration of cloud services into your ML
					pipelines.
				</p>
			</div>
			<AuthMethodSelect />
		</section>
	);
}
