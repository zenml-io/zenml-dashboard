import Github from "@/assets/icons/github.svg?react";
import Gitlab from "@/assets/icons/gitlab.svg?react";
import { useCodeRepository } from "@/data/code-repositories/code-repositories-detail-query";
import { transformToEllipsis } from "@/lib/strings";
import { Skeleton, Tag } from "@zenml-io/react-component-library";
import { CopyButton } from "../CopyButton";

type Props = {
	repositoryId: string | undefined;
	commit: string | undefined;
};
export function RepoBadge({ repositoryId, commit }: Props) {
	const { data, isPending, isError } = useCodeRepository(
		{
			repositoryId: repositoryId!
		},
		{ enabled: !!repositoryId }
	);

	if (!repositoryId || !commit) return <p>Not available</p>;
	if (isPending) return <Skeleton className="h-6" />;
	if (isError) return null;

	const repositoryMetadata = data.metadata?.config;

	const getRepositoryLink = () => {
		let Icon: React.FunctionComponent<
			React.SVGProps<SVGSVGElement> & {
				title?: string;
			}
		> | null = null;
		let name: string = data?.name as string;
		let url: string | undefined = undefined;

		if (data?.body?.source?.attribute === "GitHubCodeRepository") {
			Icon = Github;
			name = `${repositoryMetadata?.owner}/${repositoryMetadata?.repository}`;
			url =
				`https://www.${(typeof repositoryMetadata?.host === "string" ? repositoryMetadata.host : "github.com").replace(/\/$/, "")}/${name}` +
				(commit ? `/tree/${commit}` : "");
		} else if (data?.body?.source?.attribute === "GitLabCodeRepository") {
			Icon = Gitlab;
			name = `${repositoryMetadata?.group}/${repositoryMetadata?.project}`;
			url =
				`https://www.${(typeof repositoryMetadata?.host === "string" ? repositoryMetadata.host : "gitlab.com").replace(/\/$/, "")}/${name}` +
				(commit ? `/tree/${commit}` : "");
		}

		return (
			<a
				target="_blank"
				rel="noopener noreferrer"
				className={`flex items-center ${url ? "" : "pointer-events-none"}`}
				onClick={(e) => e.stopPropagation()}
				href={url}
			>
				{Icon && <Icon className="mr-1 h-5 w-5 fill-theme-text-brand" />}
				{name}
			</a>
		);
	};

	return (
		<div className="group/copybutton mr-1">
			<Tag
				color="grey"
				className="inline-flex items-center font-semibold text-neutral-900"
				rounded={false}
				emphasis="subtle"
			>
				{getRepositoryLink()}
				<div className="ml-1 rounded-sm bg-neutral-200 px-1 py-0.25">
					{transformToEllipsis(commit, 10)}
				</div>
			</Tag>
			<CopyButton copyText={commit} />
		</div>
	);
}
