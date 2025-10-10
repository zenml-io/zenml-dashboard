import { InlineAvatar } from "@/components/InlineAvatar";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";

type Props = {
	runId: string;
};

export function PlaygroundRunCardAvatar({ runId }: Props) {
	const runQuery = usePipelineRun({ runId });

	if (runQuery.isPending) return <Skeleton className="h-5 w-[100px]" />;
	if (runQuery.isError) return <div></div>;

	const user = runQuery.data?.resources?.user;
	if (!user) return <div></div>;

	return (
		<InlineAvatar
			username={user.name}
			isServiceAccount={!!user.body?.is_service_account}
			avatarUrl={user.body?.avatar_url || undefined}
		/>
	);
}
