import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { FallbackProps } from "react-error-boundary";

export function LogsTabBoundary({ error }: FallbackProps) {
	if (!(error instanceof Error)) throw error;
	return <EmptyStateLogs title="Error displaying logs" subtitle={error.message} />;
}
