"use client";

import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const stepIdSchema = z.string().uuid();

/**
 * Custom hook to manage step selection via URL query params.
 *
 * @returns {string | null} The selected step ID from URL params, or null if not set/invalid.
 * When null, the run itself should be selected.
 *
 * @example
 * const selectedStepId = useStepSelect();
 *
 * // To update the selection, use Link components:
 * <Link href={`?step=${stepId}`}>Select Step</Link>
 * <Link href={pathname}>Select Run</Link>
 */
export function useSelectedStep(): string | null {
	const [searchParams] = useSearchParams();
	const stepParam = searchParams.get("step");

	if (!stepParam) {
		return null; // No step selected, run should be selected
	}

	// Validate the step parameter as a valid UUID
	const validationResult = stepIdSchema.safeParse(stepParam);

	if (!validationResult.success) {
		return null; // Invalid UUID, fallback to run selection
	}

	return validationResult.data;
}

export function useIsStepSelected(): boolean {
	const selectedStep = useSelectedStep();
	return selectedStep !== null;
}
