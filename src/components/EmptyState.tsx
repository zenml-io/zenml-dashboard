import { PropsWithChildren, ReactNode } from "react";

type Props = {
	icon?: ReactNode;
};

export function EmptyState({ children, icon }: PropsWithChildren<Props>) {
	return (
		<section className="layout-container flex h-full w-full flex-1 flex-col items-center justify-center gap-5">
			{icon}
			{children}
		</section>
	);
}
