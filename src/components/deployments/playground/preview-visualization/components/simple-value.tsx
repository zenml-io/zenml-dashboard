import { isBoolean, isString } from "@/lib/type-guards";
import { isUrl } from "@/lib/url";
import { Collapsiblevalue } from "./collapsible-string-value";
import { BooleanValue } from "./boolean-value";

export function RenderSimpleValue({
	value,
	alwaysOpen = false
}: {
	value: unknown;
	alwaysOpen?: boolean;
}) {
	if (value === null) {
		return <div>null</div>;
	}

	if (isBoolean(value)) {
		return <BooleanValue value={value} />;
	}

	if (isString(value) && isUrl(value)) {
		return (
			<a
				className="underline transition-all duration-200 hover:decoration-transparent"
				href={value}
				target="_blank"
				rel="noopener noreferrer"
			>
				{value}
			</a>
		);
	}

	const stringValue = isString(value) ? value : JSON.stringify(value, null, 2);

	// If alwaysOpen is true, just render the string without any collapsible logic
	if (alwaysOpen) {
		return <div className="whitespace-pre-wrap">{stringValue}</div>;
	}

	return <Collapsiblevalue value={stringValue} />;
}
