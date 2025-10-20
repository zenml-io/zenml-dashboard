import { Outlet } from "react-router-dom";
import { PipelineDetailHeader } from "./_layout/header";

export default function PipelineDetailLayout() {
	return (
		<div>
			<PipelineDetailHeader />
			<section className="p-5 lg:px-[80px]">
				<Outlet />
			</section>
		</div>
	);
}
