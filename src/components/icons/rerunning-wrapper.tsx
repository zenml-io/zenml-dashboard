import Rerunning from "@/assets/icons/rerun.svg?react";
import { SVGProps, useEffect, useRef } from "react";

type Props = SVGProps<SVGSVGElement> & {
	isSpinning: boolean;
};
export function RerunningWrapper({ isSpinning, ...props }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const arrowElement = node.querySelector(".arrow") as HTMLElement;

		if (arrowElement) {
			if (isSpinning) {
				arrowElement.style.transformOrigin = "center";
				arrowElement.classList.add(
					"animate-spin",
					"[animation-duration:_5s]",
					"motion-reduce:animate-none"
				);
			} else {
				arrowElement.classList.remove(
					"animate-spin",
					"[animation-duration:_5s]",
					"motion-reduce:animate-none"
				);
			}
		}
	}, [isSpinning]);

	return (
		<div ref={ref}>
			<Rerunning {...props} />
		</div>
	);
}
