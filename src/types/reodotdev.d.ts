declare module "reodotdev" {
	interface ReoInstance {
		init(options: { clientID: string }): void;
		identify(identity: { username: string; type: string }): void;
	}

	export function loadReoScript(options: { clientID: string }): Promise<ReoInstance>;
}
