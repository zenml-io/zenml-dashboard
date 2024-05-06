import { MultipleFieldErrors } from "react-hook-form";

const passwordCriteriaMap = {
	uppercase: "Password must contain at least one uppercase letter",
	lowercase: "Password must contain at least one lowercase letter",
	number: "Password must contain at least one number",
	special: "Password must contain at least one special character",
	length: "Password must be at least 8 characters"
};

export function PasswordChecker({ errors, val }: { errors?: MultipleFieldErrors; val: string }) {
	const allErrors = flattenObjectValues(errors || {});

	function getClassName(errorName: string) {
		if (!val) return "text-theme-text-secondary";
		if (allErrors.includes(errorName)) {
			return "text-theme-text-error";
		}
		return "text-theme-text-success";
	}

	return (
		<div className="space-y-1 rounded-md border border-theme-border-moderate bg-theme-surface-secondary px-5 py-3 text-text-xs text-theme-text-secondary">
			<p className="text-text-sm text-theme-text-primary">Password criteria</p>
			<div>
				<p className={getClassName(passwordCriteriaMap["length"])}>Minimum 8 characters</p>
				<p className={getClassName(passwordCriteriaMap["number"])}>
					Must Contain one Numeric value
				</p>
				<p className={getClassName(passwordCriteriaMap["uppercase"])}>Must include upper cases</p>
				<p className={getClassName(passwordCriteriaMap["lowercase"])}>Must include lower cases</p>
				<p className={getClassName(passwordCriteriaMap["special"])}>
					Must include one special character (!,@,#...)
				</p>
			</div>
		</div>
	);
}

function flattenObjectValues(obj: MultipleFieldErrors): string[] {
	const values: string[] = [];

	Object.values(obj).forEach((value) => {
		if (typeof value === "string") {
			values.push(value);
		} else if (Array.isArray(value)) {
			values.push(...value);
		} else if (typeof value === "object" && value !== null) {
			values.push(...flattenObjectValues(value as MultipleFieldErrors));
		}
	});

	return values;
}
