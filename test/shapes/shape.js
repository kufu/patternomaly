import { expect, describe, it } from "vitest";
import Shape from "../../src/shapes/shape";

describe("shape", () => {
  it("should create a canvas with the secified size", () => {
    const shape = new Shape(40);

    expect(shape._canvas.width).toBe(40);
  });

  it("should use a default size of `20` if no size is specifed", () => {
    const shape = new Shape();

    expect(shape._canvas.width).toBe(20);
  });
});
