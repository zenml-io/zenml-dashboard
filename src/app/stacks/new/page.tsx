import { PageHeader } from "@/components/PageHeader";
import Stack from "@/assets/icons/stack.svg?react";
import { SmartSetup } from "./SmartSetup";

export default function NewStacksPage() {
	return (
		<div>
			<Header />
			<section className="layout-container flex gap-2 p-5">
				<SmartSetup />
			</section>
		</div>
	);
}

function Header() {
	return (
		<PageHeader>
			<div className="flex items-center gap-1">
				<Stack className="h-5 w-5 fill-turquoise-400" />
				<h1 className="text-display-xs  font-semibold">Register a Stack</h1>
			</div>
		</PageHeader>
	);
}
