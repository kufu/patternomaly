import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    setupFiles: ["./test/setup.js"],
    globals: true,
    include: ["test/**/*.js"],
    exclude: ["test/setup.js"],
  },
});
