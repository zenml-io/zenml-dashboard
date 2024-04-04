import { DAG } from "./Dag";
import { RunsDetailHeader } from "./Header";

export default function RunDetailPage() {
	return (
		<div>
			<RunsDetailHeader />
			<div className="flex h-[calc(100vh_-_4rem_-_4rem_-_2px)] w-full">
				<div className={`relative w-full bg-white/40 transition-all duration-500`}>
					<DAG />
				</div>
			</div>
		</div>
	);
}
