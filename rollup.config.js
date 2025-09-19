import { readFileSync } from "fs";

// package.jsonを読み込み
const pkg = JSON.parse(readFileSync("./package.json", "utf8"));

export default {
  input: "index.js",
  external: Object.keys(pkg.dependencies || {}),
  output: [
    {
      file: pkg.main,
      format: "umd",
      name: "pattern",
      sourcemap: true,
    },
    {
      file: pkg["jsnext:main"],
      format: "es",
      sourcemap: true,
    },
  ],
};
