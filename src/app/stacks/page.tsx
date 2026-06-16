import { ResumeBanners } from "./ResumeBanner";
import { StackList } from "./StackList";

export default function StacksPage() {
	return (
		<div className="space-y-5 py-5">
			<ResumeBanners />
			<StackList />
		</div>
	);
}
