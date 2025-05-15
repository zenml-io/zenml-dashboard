import { BasicParams } from "./params";
import { ConfigurationPanel } from "./configuration";

export default function ConnectorConfigPage() {
	return (
		<div className="grid grid-cols-1 gap-5">
			<div>
				<BasicParams />
			</div>
			<div className="space-y-5">
				<ConfigurationPanel />
			</div>
		</div>
	);
}
