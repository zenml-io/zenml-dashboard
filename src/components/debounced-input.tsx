import { Input } from "@zenml-io/react-component-library/components/server";
import debounce from "lodash.debounce";
import {
	ComponentPropsWithoutRef,
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useState
} from "react";

type Props = {
	debounceMs?: number;
	onChange?: (value: string) => void;
};

export const DebouncedInput = forwardRef<
	HTMLInputElement,
	Omit<ComponentPropsWithoutRef<typeof Input>, "onChange"> & Props
>(({ debounceMs = 300, value, onChange, ...props }, ref) => {
	const [localValue, setLocalValue] = useState(value);

	// Update local state when value prop changes
	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	// Create debounced onChange handler
	const debouncedOnChange = useMemo(
		() =>
			debounce((newValue: string) => {
				onChange?.(newValue);
			}, debounceMs),
		[onChange, debounceMs]
	);

	// Cleanup debounced function on unmount
	useEffect(() => {
		return () => {
			debouncedOnChange.cancel();
		};
	}, [debouncedOnChange]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setLocalValue(newValue);
			debouncedOnChange(newValue);
		},
		[debouncedOnChange]
	);

	return <Input {...props} ref={ref} value={localValue} onChange={handleChange} />;
});

DebouncedInput.displayName = "DebouncedInput";
