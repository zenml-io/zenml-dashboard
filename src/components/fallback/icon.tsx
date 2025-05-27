import CodeBox from "@/assets/icons/code-box.svg?react";
import { ReactNode } from "react";

export function FallbackIcon({ icon }: { icon: ReactNode }) {
	return (
		<div className="relative">
			<CodeBox />
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-rounded bg-primary-25 p-3">
				{icon}
			</div>
		</div>
	);
}
