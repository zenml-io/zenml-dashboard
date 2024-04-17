export class FetchError extends Error {
	public status: number;
	public statusText: string;
	public message: string;

	constructor({
		message,
		status,
		statusText
	}: {
		status: number;
		statusText: string;
		message: string;
	}) {
		super(message);
		this.status = status;
		this.statusText = statusText;
		this.message = message;
	}
}

export function isFetchError(err: unknown): err is FetchError {
	return err instanceof FetchError;
}
