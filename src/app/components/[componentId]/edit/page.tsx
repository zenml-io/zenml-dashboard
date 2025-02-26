import { Wrapper } from "@/components/wizard/Wizard";
import { EditComponentConfig } from "./form-step";

export default function ComponentEditPage() {
	return (
		<section className="layout-container mt-5 pb-5">
			<Wrapper>
				<EditComponentConfig />
			</Wrapper>
		</section>
	);
}
