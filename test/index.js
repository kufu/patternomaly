import { expect, describe, it } from "vitest";
import pattern from "../index.js";

describe("index", () => {
  describe("pattern", () => {
    it("should be an object", () => {
      expect(pattern).toBeTypeOf("object");
    });

    it("should have a `draw` function", () => {
      expect(pattern).toHaveProperty("draw");
      expect(pattern.draw).toBeTypeOf("function");
    });

    it("should have a `generate` function", () => {
      expect(pattern).toHaveProperty("generate");
      expect(pattern.generate).toBeTypeOf("function");
    });
  });
});
