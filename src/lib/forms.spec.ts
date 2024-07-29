import { describe, expect, test } from "vitest";
import { zodSchemaFromObject } from "./forms";

describe("Zod schema is generated correctly", () => {
	test("generate zod schema from object", () => {
		const object = {
			val1: "val1"
		};
		const schema = zodSchemaFromObject(object);

		expect(schema).toBeDefined();
		expect(Object.keys(schema.shape)[0]).toEqual("val1");
	});
});
