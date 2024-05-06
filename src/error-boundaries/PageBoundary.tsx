import { isNotFoundError } from "@/lib/not-found-error";
import { PropsWithChildren } from "react";
import { useRouteError } from "react-router-dom";

export function PageBoundary({ children }: PropsWithChildren) {
	const error = useRouteError();
	if (isNotFoundError(error)) {
		return <>{children ?? <h1>Not Found</h1>}</>;
	}

	throw error;
}
