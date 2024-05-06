import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogClose,
	Button
} from "@zenml-io/react-component-library";
import { useTourContext } from "./TourContext";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router/routes";
import TourImage from "@/assets/images/product-tour/tour-cover.webp";

type Props = {
	skipFunction: () => void;
};

export function StartTourDialog({ skipFunction }: Props) {
	const { setTourState } = useTourContext();
	const navigate = useNavigate();
	const [open, setOpen] = useState(true);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[600px]" onPointerDownOutside={(e) => e.preventDefault()}>
				<div className="flex h-[200px] items-center justify-center rounded-t-md bg-primary-25">
					<img
						className="mix-blend-multiply"
						alt="robot standing in front of a machine, with different items hanging on the wall behind the machine"
						src={TourImage}
					/>
				</div>
				<div className="flex flex-col gap-1 py-7 pl-5 pr-6">
					<p className="text-text-lg font-semibold">Fresh Look, Enhanced Experience!</p>
					<p className="text-theme-text-secondary">
						Explore our sleek new interface and reimagined layout. Some legacy features are set to
						join shortly.
						<br />
						<br />
						Dive into the tour to see what's new!
					</p>
				</div>

				<DialogFooter className="gap-[10px]">
					<DialogClose asChild>
						<Button intent="secondary" onClick={skipFunction} size="md">
							Skip
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							intent="primary"
							onClick={() => {
								navigate(routes.pipelines.overview);
								setTourState((prev) => ({ ...prev, run: true, stepIndex: 0, tourActive: true }));
							}}
							size="md"
						>
							Start the tour
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
