import { expect, describe, it } from "vitest";
import { getRandomShape } from "../../src/shapes/index";
import { shapes, deprecatedShapes } from "../../src/shapes/shapes-list";

describe("shapes", () => {
  describe("#getRandomShape", () => {
    it("should NOT generate the specified excluded shape types", () => {
      const randomShapes = [];
      const excludedShapes = Object.keys(shapes);
      const removedShape = excludedShapes.splice(0, 1)[0];
      let containsExcludedShape = false;

      for (let i = 0; i < 30; i++) {
        randomShapes.push(getRandomShape(excludedShapes));
      }

      containsExcludedShape = randomShapes.some(
        (shape) => shape !== removedShape
      );

      expect(containsExcludedShape).toBe(false);
    });

    it("should NOT return a list that includes any deprecated patterns", () => {
      const deprecatedShapesList = Object.keys(deprecatedShapes);
      const randomShapes = [];
      let containsDeprecatedShapes = false;

      for (let i = 0; i < 30; i++) {
        randomShapes.push(getRandomShape());
      }

      containsDeprecatedShapes = randomShapes.some((pattern) => {
        return deprecatedShapesList.indexOf(pattern) >= 0;
      });

      expect(containsDeprecatedShapes).toBe(false);
    });
  });
});
