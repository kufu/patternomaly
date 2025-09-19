import { createCanvas } from "canvas";

// vitestのjsdom環境でcanvasライブラリを使うためのセットアップ
if (typeof document !== "undefined") {
  const originalCreateElement = document.createElement;
  document.createElement = function (tagName) {
    if (tagName === "canvas") {
      return createCanvas(20, 20); // デフォルトサイズ
    }
    return originalCreateElement.call(this, tagName);
  };
}
