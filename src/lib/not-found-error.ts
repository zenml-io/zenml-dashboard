const NotFoundErrorCode = "NotFoundError";

type NotFoundError = Error & { cause: typeof NotFoundErrorCode };

export function notFound(): never {
	const error = new Error(NotFoundErrorCode);
	(error as NotFoundError).cause = NotFoundErrorCode;
	throw error;
}

export function isNotFoundError(error: unknown): error is NotFoundError {
	if (typeof error !== "object" || error === null || !("cause" in error)) {
		return false;
	}
	return error.cause === NotFoundErrorCode;
}
