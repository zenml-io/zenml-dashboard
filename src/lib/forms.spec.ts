import { describe, expect, test } from "vitest";
import {
	zodSchemaFromObject,
	getisOptional,
	resolveRefName,
	resolveDefinitions,
	resolveRef
} from "./forms";
import { JSONSchema, JSONSchemaDefinition } from "@/types/forms";

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

describe("getisOptional", () => {
	test("returns true if the key is optional", () => {
		const result = getisOptional("val1", ["val1"]);
		expect(result).toBe(false);
	});
	test("returns false if the key is required", () => {
		const result = getisOptional("val1", ["val2"]);
		expect(result).toBe(true);
	});
});

describe("resolveRefName", () => {
	test("returns the ref name", () => {
		const result = resolveRefName("#/definitions/val1");
		expect(result).toBe("val1");
	});
});

describe("resolveDefinitions", () => {
	test("returns null if definitions object is null", () => {
		const defs = undefined;
		const result = resolveDefinitions(defs, "#/definitions/val1");
		expect(result).toBeNull();
	});

	test("returns null if definition for key does not exist", () => {
		const defs: JSONSchema["$defs"] = {
			val2: { properties: { field: { type: "string" } } }
		};
		const result = resolveDefinitions(defs, "#/definitions/val1");
		expect(result).toBeNull();
	});

	test("returns properties if definition exists with key path", () => {
		const defs: JSONSchema["$defs"] = {
			val1: { properties: { field: { type: "string" } } }
		};
		const result = resolveDefinitions(defs, "#/definitions/val1");
		expect(result).toEqual({ field: { type: "string" } });
	});

	test("returns properties if key does not include '/'", () => {
		const defs: JSONSchema["$defs"] = {
			val3: { properties: { field: { type: "number" } } }
		};
		const result = resolveDefinitions(defs, "val3");
		expect(result).toEqual({ field: { type: "number" } });
	});
});

describe("resolveRef", () => {
	test("returns original schema when $ref is not provided", () => {
		const schema: JSONSchemaDefinition = { type: "string" };
		const definitions: JSONSchema["$defs"] = { someRef: { type: "number" } };
		const result = resolveRef(schema, definitions);
		expect(result).toEqual(schema);
	});

	test("returns original schema when definitions is undefined", () => {
		const schema: JSONSchemaDefinition = { $ref: "#/definitions/val1", type: "string" };
		const result = resolveRef(schema, undefined);
		expect(result).toEqual(schema);
	});

	test("returns original schema if referenced definition is not found in definitions", () => {
		const schema: JSONSchemaDefinition = { $ref: "#/definitions/nonExistent", type: "string" };
		const definitions: JSONSchema["$defs"] = { existing: { type: "number" } };
		const result = resolveRef(schema, definitions);
		expect(result).toEqual(schema);
	});

	test("returns the referenced definition when it exists in definitions", () => {
		const schema: JSONSchemaDefinition = { $ref: "#/definitions/testDef", type: "string" };
		const definitions: JSONSchema["$defs"] = {
			testDef: { type: "number", minimum: 0 }
		};
		const result = resolveRef(schema, definitions);
		expect(result).toEqual({ type: "number", minimum: 0 });
	});

	test("works with plain reference string without slashes", () => {
		const schema: JSONSchemaDefinition = { $ref: "plainDef", type: "string" };
		const definitions: JSONSchema["$defs"] = {
			plainDef: { type: "boolean", default: true }
		};
		const result = resolveRef(schema, definitions);
		expect(result).toEqual({ type: "boolean", default: true });
	});
});
