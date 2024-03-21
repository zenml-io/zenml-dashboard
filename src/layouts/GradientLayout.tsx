import { Outlet } from "react-router-dom";

export function GradientLayout() {
	return (
		<div className="relative flex h-full min-h-screen items-center justify-center bg-gradient-light px-4 lg:px-0">
			<div className="pt-7">
				{/* TODO Add ZenML Logo here */}
				<Outlet />
			</div>
		</div>
	);
}
