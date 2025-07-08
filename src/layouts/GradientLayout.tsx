import { Outlet } from "react-router-dom";
import Gradient from "@/assets/images/gradient_bg.webp";
import ZenML from "@/assets/icons/zenml.svg?react";

export function GradientLayout() {
	return (
		<div
			style={{ backgroundImage: `url(${Gradient})` }}
			className="relative flex h-full min-h-screen items-center justify-center bg-cover bg-center px-4 lg:px-0"
		>
			<div className="flex flex-col items-center pt-7">
				<ZenML className="mb-7 h-7" />
				<Outlet />
			</div>
		</div>
	);
}
