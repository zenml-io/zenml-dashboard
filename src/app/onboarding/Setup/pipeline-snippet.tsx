import { Codesnippet } from "@/components/CodeSnippet";

export function PipelineSnippet() {
	return (
		<div className="w-full space-y-1">
			<p className="text-text-sm text-theme-text-secondary">
				Create a{" "}
				<code className="rounded-sm bg-primary-25 px-[4px] py-[2px] text-theme-text-brand">
					run.py
				</code>{" "}
				file that defines your workflow using our Python SDK:
			</p>
			<Codesnippet className="w-full max-w-full" highlightCode code={snippet} />
		</div>
	);
}

const snippet = `from zenml import pipeline, step
from zenml.logger import get_logger

logger = get_logger(__name__)


@step
def say_hello() -> str:
    logger.info("Executing say_hello step")
    return "Hello World!"


@pipeline
def hello_pipeline():
    say_hello()


if __name__ == "__main__":
    run = hello_pipeline()
    out = run.steps["say_hello"].outputs["output"][0].load()
    logger.info(f"▶︎ Step returned: {out}")
`;
