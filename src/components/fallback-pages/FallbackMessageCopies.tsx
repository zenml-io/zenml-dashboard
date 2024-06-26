import Logs from "@/assets/icons/logs.svg?react";
import PipelineIcon from "@/assets/icons/dataflow.svg?react";
import RunIcon from "@/assets/icons/terminal-square.svg?react";

const className = "h-7 w-7 fill-primary-400";

export const fallbackMsg = () => ({
	// Pipelines
	noPipelines: {
		icon: <PipelineIcon className={className} />,
		title: "This Server has no Visible Pipelines",
		subtitle:
			"It looks like there are no pipelines in your server yet, or you may not have access.\n Create a pipeline to get started, or ask your organization admin for access.",
		paragraph: "In order to create a simple pipeline, run this script:",
		link: "Learn More About Pipelines",
		href: "https://docs.zenml.io/getting-started/core-concepts#pipelines",
		code: `from zenml import pipeline, step\n\n@step\ndef load_data() -> dict:\n    """Simulates loading of training data and labels."""\n\n    training_data = [[1, 2], [3, 4], [5, 6]]\n    labels = [0, 1, 0]\n    \n    return {'features': training_data, 'labels': labels}\n\n@step\ndef train_model(data: dict) -> None:\n    """\n    A mock 'training' process that also demonstrates using the input data.\n    In a real-world scenario, this would be replaced with actual model fitting logic.\n    """\n    total_features = sum(map(sum, data['features']))\n    total_labels = sum(data['labels'])\n    \n    print(f"Trained model using {len(data['features'])} data points. "\n          f"Feature sum is {total_features}, label sum is {total_labels}")\n\n@pipeline\ndef simple_ml_pipeline():\n    """Define a pipeline that connects the steps."""\n    dataset = load_data()\n    train_model(dataset)\n\nif __name__ == "__main__":\n    run = simple_ml_pipeline()\n    # You can now use the 'run' object to see steps, outputs, etc.`,
		isFullHeight: true
	},
	noRuns: {
		icon: <RunIcon className={className} />,
		title: "This Pipeline has no Visible Runs",
		subtitle:
			"It looks like there have been no runs for this pipeline yet, or you may not have access.\n Run a pipeline to get started, or ask your organization admin for access.",
		link: "Learn More About Pipelines",
		href: "https://docs.zenml.io/getting-started/core-concepts#pipelines",
		paragraph: "In order to run a simple pipeline, run this script:",
		code: `from zenml import pipeline, step\n\n@step\ndef load_data() -> dict:\n    """Simulates loading of training data and labels."""\n\n    training_data = [[1, 2], [3, 4], [5, 6]]\n    labels = [0, 1, 0]\n    \n    return {'features': training_data, 'labels': labels}\n\n@step\ndef train_model(data: dict) -> None:\n    """\n    A mock 'training' process that also demonstrates using the input data.\n    In a real-world scenario, this would be replaced with actual model fitting logic.\n    """\n    total_features = sum(map(sum, data['features']))\n    total_labels = sum(data['labels'])\n    \n    print(f"Trained model using {len(data['features'])} data points. "\n          f"Feature sum is {total_features}, label sum is {total_labels}")\n\n@pipeline\ndef simple_ml_pipeline():\n    """Define a pipeline that connects the steps."""\n    dataset = load_data()\n    train_model(dataset)\n\nif __name__ == "__main__":\n    run = simple_ml_pipeline()\n    # You can now use the 'run' object to see steps, outputs, etc.`
	},
	noPipelineLogs: {
		icon: <Logs className={className} />,
		title: "Logs are not available for this pipeline",
		subtitle: "It looks like logging was turned off for the current pipeline."
	},
	noLogsDocMissing: {
		icon: <Logs className={className} />,
		title: "Logs are not available for this pipeline",
		subtitle: "The logs file is missing, so it can't be displayed on this page."
	},
	noLogsNoServiceConnector: {
		icon: <Logs className={className} />,
		title:
			"The artifact store is not configured with a service connector, \n which means no logs are accessible here",
		subtitle:
			"It looks like you're using an artifact store without a service connector \n configured. Logs are only displayed in the dashboard when using a \n cloud artifact store with a service connector configured.",
		link: "Cloud artifact store",
		href: "https://docs.zenml.io/stack-components/artifact-stores"
	},
	noLogsLocalOnly: {
		icon: <Logs className={className} />,
		title:
			"The artifact store is not configured with a service connector, \n which means no logs are accessible here",
		subtitle:
			"It looks like you're using the local artifact store. Logs are only displayed \nin the dashboard when using a cloud artifact store with a service \n connector configured.",
		link: "Cloud artifact store",
		href: "https://docs.zenml.io/stack-components/artifact-stores"
	}
});
