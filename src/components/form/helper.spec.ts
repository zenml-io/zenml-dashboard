import { describe, expect, test } from "vitest";
import {
	isEnumField,
	isArrayField,
	isSensitiveField,
	isBooleanField,
	isObjectField,
	isIntegerField,
	isTextField,
	resolveRef,
	generateDefaultValues,
	getEnumValues,
	getNameFromSchema
} from "./helper";
import { JSONSchemaDefinition, JSONSchema } from "@/types/forms";

// Start Generation Here
describe("isEnumField", () => {
	test("should return true for a schema with an enum property", () => {
		const schema: JSONSchemaDefinition = { enum: ["option1", "option2"], type: "string" };
		expect(isEnumField(schema)).toBe(true);
	});

	test("should return false for a schema without an enum property", () => {
		const schema: JSONSchemaDefinition = { type: "string" };
		expect(isEnumField(schema)).toBe(false);
	});
	test("should return false for a schema that is not a string", () => {
		const schema: JSONSchemaDefinition = { type: "integer" };
		expect(isEnumField(schema)).toBe(false);
	});
});

describe("isArrayField", () => {
	test("should return true for a schema with an array type", () => {
		const schema: JSONSchemaDefinition = { type: "array" };
		expect(isArrayField(schema)).toBe(true);
	});

	test("should return false for a schema that is not an array", () => {
		const schema: JSONSchemaDefinition = { type: "string" };
		expect(isArrayField(schema)).toBe(false);
	});
});

describe("isSensitiveField", () => {
	test("should return true for a schema with a sensitive property", () => {
		const schema: JSONSchemaDefinition = { sensitive: true, type: "string" };
		expect(isSensitiveField(schema)).toBe(true);
	});

	test("should return false for a schema that is not a string", () => {
		const schema: JSONSchemaDefinition = { type: "integer" };
		expect(isSensitiveField(schema)).toBe(false);
	});
});

describe("isBooleanField", () => {
	test("should return true for a schema with type boolean", () => {
		const schema: JSONSchemaDefinition = { type: "boolean" };
		expect(isBooleanField(schema)).toBe(true);
	});

	test("should return false for a schema with a non-boolean type", () => {
		const schema: JSONSchemaDefinition = { type: "string" };
		expect(isBooleanField(schema)).toBe(false);
	});
});

describe("isObjectField", () => {
	test("should return true for a schema with type object", () => {
		const schema: JSONSchemaDefinition = { type: "object" };
		expect(isObjectField(schema)).toBe(true);
	});

	test("should return false for a schema with a non-object type", () => {
		const schema: JSONSchemaDefinition = { type: "array" };
		expect(isObjectField(schema)).toBe(false);
	});
});

describe("isIntegerField", () => {
	test("should return true for a schema with type integer", () => {
		const schema: JSONSchemaDefinition = { type: "integer" };
		expect(isIntegerField(schema)).toBe(true);
	});

	test("should return false for a schema with a non-integer type", () => {
		const schema: JSONSchemaDefinition = { type: "string" };
		expect(isIntegerField(schema)).toBe(false);
	});
});

describe("isTextField", () => {
	test("should return true for a schema with type string", () => {
		const schema: JSONSchemaDefinition = { type: "string" };
		expect(isTextField(schema)).toBe(true);
	});

	test("should return false for a schema with a non-string type", () => {
		const schema: JSONSchemaDefinition = { type: "object" };
		expect(isTextField(schema)).toBe(false);
	});
});

describe("resolveRef", () => {
	test("should return the resolved schema", () => {
		const schema: JSONSchemaDefinition = { $ref: "#/$defs/test" };
		const definitions: JSONSchema["$defs"] = { test: { type: "string" } };
		expect(resolveRef(schema, definitions)).toEqual({ type: "string" });
	});

	test("should return the original schema if the $ref is not found in the definitions", () => {
		const schema: JSONSchemaDefinition = { $ref: "#/$defs/test" };
		const definitions: JSONSchema["$defs"] = undefined;
		expect(resolveRef(schema, definitions)).toEqual(schema);
	});
});

describe("getEnumValues", () => {
	test("should return the enum values", () => {
		const schema: JSONSchemaDefinition = { enum: ["option1", "option2"], type: "string" };
		expect(getEnumValues(schema)).toEqual(["option1", "option2"]);
	});
});

describe("generateDefaultValues", () => {
	test("should return the default values for a string", () => {
		const schema: JSONSchemaDefinition = { properties: { test: { default: "defaultValue" } } };
		expect(generateDefaultValues(schema)).toEqual({ test: "defaultValue" });
	});
	test("should return the default values for a boolean", () => {
		const schema: JSONSchemaDefinition = {
			properties: { test: { default: true, type: "boolean" } }
		};
		expect(generateDefaultValues(schema)).toEqual({ test: true });
	});
	test("should return the default values for an object", () => {
		const schema: JSONSchemaDefinition = {
			properties: { test: { default: { test: "defaultValue" }, type: "object" } }
		};
		expect(generateDefaultValues(schema)).toEqual({
			test: JSON.stringify({ test: "defaultValue" })
		});
	});
	test("should return the default values for an array", () => {
		const schema: JSONSchemaDefinition = {
			properties: { test: { default: ["defaultValue"], type: "array" } }
		};
		expect(generateDefaultValues(schema)).toEqual({ test: JSON.stringify(["defaultValue"]) });
	});
});

describe("getNameFromSchema", () => {
	test("should return the name from the schema", () => {
		const schema: JSONSchemaDefinition = { type: "string", title: "Test" };
		expect(getNameFromSchema(schema, "test")).toEqual("Test");
	});
	test("should return the name from the key name", () => {
		const schema: JSONSchemaDefinition = { type: "string" };
		expect(getNameFromSchema(schema, "keyName")).toEqual("KeyName");
	});
});
