import { Codesnippet } from "@/components/CodeSnippet";
import { sanitizeDockerfile } from "./docker-image";
import { InfoBox } from "../Infobox";

export function DockerfileSnippet({ dockerfile }: { dockerfile: string }) {
	const dockerfileResult = sanitizeDockerfile(dockerfile);

	return (
		<div className="mt-5 space-y-2">
			<p className="text-theme-text-secondary">Dockerfile</p>

			{dockerfileResult.hasSensitiveValues && (
				<InfoBox className="border-warning-300 bg-warning-50" intent="warning">
					<strong>Security Notice:</strong> Sensitive environment variables detected in the
					Dockerfile. Please use secure secret management instead of hardcoding sensitive values.{" "}
					<a
						href="https://docs.zenml.io/concepts/environment-variables"
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-warning-700"
					>
						Learn more about environment variables
					</a>
				</InfoBox>
			)}
			<Codesnippet
				language="dockerfile"
				highlightCode
				fullWidth
				wrap
				code={dockerfileResult.sanitized}
				copyCode={dockerfile}
			/>
		</div>
	);
}
