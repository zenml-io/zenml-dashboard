import { Outlet } from "react-router-dom";
import { PipelineDetailHeader } from "./_layout/header";

export default function PipelineDetailLayout() {
	return (
		<div>
			<PipelineDetailHeader />
			<section className="px-5 pt-5 lg:px-[80px]">
				<Outlet />
			</section>
		</div>
	);
}
