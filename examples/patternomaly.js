(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.pattern = factory());
})(this, (function () { 'use strict';

  const BACKGROUND_COLOR = 'rgba(100, 100, 100, 0.7)';
  const PATTERN_COLOR = 'rgba(255, 255, 255, 0.8)';
  const POINT_STYLE = 'round';

  class Shape {
    constructor(size = 20, backgroundColor = BACKGROUND_COLOR, patternColor = PATTERN_COLOR) {
      this._canvas = document.createElement('canvas');
      this._context = this._canvas.getContext('2d');

      this._canvas.width = size;
      this._canvas.height = size;

      this._context.fillStyle = backgroundColor;
      this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

      this._size = size;
      this._patternColor = patternColor;

      return this;
    }

    setStrokeProps() {
      this._context.strokeStyle = this._patternColor;
      this._context.lineWidth = this._size / 10;
      this._context.lineJoin = POINT_STYLE;
      this._context.lineCap = POINT_STYLE;
    }

    setFillProps() {
      this._context.fillStyle = this._patternColor;
    }
  }

  class Plus extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setStrokeProps();

      this.drawPlus();
      this.drawPlus(halfSize, halfSize);

      this._context.stroke();

      return this._canvas;
    }

    drawPlus(offsetX = 0, offsetY = 0) {
      const size = this._size;
      const halfSize = size / 2;
      const quarterSize = size / 4;

      this._context.moveTo(quarterSize + offsetX, 0 + offsetY);
      this._context.lineTo(quarterSize + offsetX, halfSize + offsetY);
      this._context.moveTo(0 + offsetX, quarterSize + offsetY);
      this._context.lineTo(halfSize + offsetX, quarterSize + offsetY);

      this._context.closePath();
    }
  }

  class Cross extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setStrokeProps();

      this.drawCross();
      this.drawCross(halfSize, halfSize);

      this._context.stroke();

      return this._canvas;
    }

    drawCross(offsetX = 0, offsetY = 0) {
      const size = this._size;
      const halfSize = size / 2;
      const gap = 2;

      this._context.moveTo(offsetX + gap, offsetY + gap);
      this._context.lineTo((halfSize - gap) + offsetX, (halfSize - gap) + offsetY);
      this._context.moveTo(offsetX + gap, (halfSize - gap) + offsetY);
      this._context.lineTo((halfSize - gap) + offsetX, offsetY + gap);

      this._context.closePath();
    }
  }

  class Dash extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setStrokeProps();

      this.drawDash();
      this.drawDash(halfSize, halfSize);

      this._context.stroke();

      return this._canvas;
    }

    drawDash(offsetX = 0, offsetY = 0) {
      const size = this._size;
      const halfSize = size / 2;
      const gap = 2;

      this._context.moveTo(offsetX + gap, offsetY + gap);
      this._context.lineTo((halfSize - gap) + offsetX, (halfSize - gap) + offsetY);

      this._context.closePath();
    }
  }

  class CrossDash extends Shape {
    drawTile() {
      const halfSize = this._size / 2;
      this._context.beginPath();

      this.setStrokeProps();

      const cross = new Cross();
      cross.drawCross.call(this);

      const dash = new Dash();
      dash.drawDash.call(this, halfSize, halfSize);

      this._context.stroke();

      return this._canvas;
    }
  }

  class Dot extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setFillProps();

      this.drawDot();
      this.drawDot(halfSize, halfSize);

      this._context.fill();

      return this._canvas;
    }

    drawDot(offsetX = 0, offsetY = 0, diameter = this._size / 10) {
      const size = this._size;
      const quarterSize = size / 4;
      const x = quarterSize + offsetX;
      const y = quarterSize + offsetY;

      this._context.moveTo(x + quarterSize , y);
      this._context.arc(x, y, diameter, 0, 2 * Math.PI);

      this._context.closePath();
    }
  }

  class DotDash extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setStrokeProps();

      const dash = new Dash();
      dash.drawDash.call(this, halfSize, halfSize);

      this._context.closePath();
      this._context.stroke();

      this.setFillProps();

      const dot = new Dot();
      dot.drawDot.call(this);

      this._context.fill();

      return this._canvas;
    }
  }

  class Disc extends Dot {
    drawTile() {
      const halfSize = this._size / 2;
      const diameter = this._size / 5;

      this._context.beginPath();

      this.setFillProps();

      this.drawDot(0, 0, diameter);
      this.drawDot(halfSize, halfSize, diameter);

      this._context.fill();

      return this._canvas;
    }
  }

  class Ring extends Dot {
    drawTile() {
      const halfSize = this._size / 2;
      const diameter = this._size / 5;

      this._context.beginPath();

      this.setStrokeProps();

      this.drawDot(0, 0, diameter);
      this.drawDot(halfSize, halfSize, diameter);

      this._context.stroke();

      return this._canvas;
    }
  }

  class Line extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setStrokeProps();

      this.drawLine();
      this.drawLine(halfSize, halfSize);

      this._context.stroke();

      return this._canvas;
    }

    drawLine(offsetX = 0, offsetY = 0) {
      const size = this._size;
      const quarterSize = size / 4;

      this._context.moveTo(0, quarterSize + offsetY);
      this._context.lineTo(this._size, quarterSize + offsetY);

      this._context.closePath();
    }
  }

  class VerticalLine extends Line {
    drawTile() {
      this._context.translate(this._size, 0);
      this._context.rotate(90 * Math.PI / 180);

      Line.prototype.drawTile.call(this);

      return this._canvas;
    }
  }

  class Weave extends Shape {
    drawTile() {
      this._context.beginPath();

      this.setStrokeProps();

      this.drawWeave(0, 0);

      this._context.stroke();

      return this._canvas;
    }

    drawWeave(offsetX, offsetY) {
      const size = this._size;
      const halfSize = size / 2;

      this._context.moveTo(offsetX + 1, offsetY + 1);
      this._context.lineTo(halfSize - 1, halfSize - 1);

      this._context.moveTo(halfSize + 1, size - 1);
      this._context.lineTo(size - 1, halfSize + 1);

      this._context.closePath();
    }
  }

  class Zigzag extends Shape {
    drawTile() {
      this._context.beginPath();

      this.setStrokeProps();

      this.drawZigzag();
      this.drawZigzag(this._size / 2);

      this._context.stroke();

      return this._canvas;
    }

    drawZigzag(offsetY = 0) {
      const size = this._size;
      const quarterSize = size / 4;
      const halfSize = size / 2;
      const tenthSize = size / 10;

      this._context.moveTo(0, tenthSize + offsetY);
      this._context.lineTo(quarterSize, (halfSize - tenthSize) + offsetY);
      this._context.lineTo(halfSize, tenthSize + offsetY);
      this._context.lineTo(size - quarterSize, (halfSize - tenthSize) + offsetY);
      this._context.lineTo(size, tenthSize + offsetY);
    }
  }

  class ZigzagVertical extends Zigzag {
    drawTile() {
      this._context.translate(this._size, 0);
      this._context.rotate(90 * Math.PI / 180);

      Zigzag.prototype.drawTile.call(this);

      return this._canvas;
    }
  }

  class Diagonal extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setStrokeProps();

      this.drawDiagonalLine();
      this.drawDiagonalLine(halfSize, halfSize);

      this._context.stroke();

      return this._canvas;
    }

    drawDiagonalLine(offsetX = 0, offsetY = 0) {
      const size = this._size;
      const halfSize = size / 2;
      const gap = 1;

      this._context.moveTo((halfSize - gap) - offsetX, (gap * -1) + offsetY);
      this._context.lineTo((size + 1) - offsetX, (halfSize + 1) + offsetY);

      this._context.closePath();
    }
  }

  class DiagonalRightLeft extends Diagonal {
    drawTile() {
      this._context.translate(this._size, 0);
      this._context.rotate(90 * Math.PI / 180);

      Diagonal.prototype.drawTile.call(this);

      return this._canvas;
    }
  }

  class Square extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setFillProps();

      this.drawSquare();
      this.drawSquare(halfSize, halfSize);

      this._context.fill();

      return this._canvas;
    }

    drawSquare(offsetX = 0, offsetY = 0) {
      const size = this._size;
      const halfSize = size / 2;
      const gap = size / 20;

      this._context.fillRect(offsetX + gap, offsetY + gap, halfSize - (gap * 2), halfSize - (gap * 2));

      this._context.closePath();
    }
  }

  class Box extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setStrokeProps();

      this.drawBox();
      this.drawBox(halfSize, halfSize);

      this._context.stroke();

      return this._canvas;
    }

    drawBox(offsetX = 0, offsetY = 0) {
      const size = this._size;
      const halfSize = size / 2;
      const gap = size / 20;

      this._context.strokeRect(offsetX + gap, offsetY + gap, halfSize - (gap * 4), halfSize - (gap * 4));

      this._context.closePath();
    }
  }

  class Triangle extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setFillProps();

      this.drawTriangle();
      this.drawTriangle(halfSize, halfSize);

      this._context.fill();

      return this._canvas;
    }

    drawTriangle(offsetX = 0, offsetY = 0) {
      const size = this._size;
      const halfSize = size / 2;
      const quarterSize = size / 4;

      this._context.moveTo(quarterSize + offsetX, offsetY);
      this._context.lineTo(halfSize + offsetX, halfSize + offsetY);
      this._context.lineTo(offsetX, halfSize + offsetY);

      this._context.closePath();
    }
  }

  class TriangleVertical extends Triangle {
    drawTile() {
      const size = this._size;

      this._context.translate(size, size);
      this._context.rotate(180 * Math.PI / 180);

      Triangle.prototype.drawTile.call(this);

      return this._canvas;
    }
  }

  class Diamond extends Shape {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setFillProps();

      this.drawDiamond();
      this.drawDiamond(halfSize, halfSize);

      this._context.fill();

      return this._canvas;
    }

    drawDiamond(offsetX = 0, offsetY = 0) {
      const size = this._size;
      const halfSize = size / 2;
      const quarterSize = size / 4;

      this._context.moveTo(quarterSize + offsetX, offsetY);
      this._context.lineTo(halfSize + offsetX, quarterSize + offsetY);
      this._context.lineTo(quarterSize + offsetX, halfSize + offsetY);
      this._context.lineTo(offsetX, quarterSize + offsetY);

      this._context.closePath();
    }
  }

  class DiamondBox extends Diamond {
    drawTile() {
      const halfSize = this._size / 2;

      this._context.beginPath();

      this.setStrokeProps();

      this.drawDiamond();
      this.drawDiamond(halfSize, halfSize);

      this._context.stroke();

      return this._canvas;
    }

    drawDiamond(offsetX = 0, offsetY = 0) {
      const size = this._size;
      const halfSize = (size / 2) - 1;
      const quarterSize = size / 4;

      this._context.moveTo(quarterSize + offsetX, offsetY + 1);
      this._context.lineTo(halfSize + offsetX, quarterSize + offsetY);
      this._context.lineTo(quarterSize + offsetX, halfSize + offsetY);
      this._context.lineTo(offsetX + 1, quarterSize + offsetY);

      this._context.closePath();
    }
  }

  const shapes = {
    'plus': Plus,
    'cross': Cross,
    'dash': Dash,
    'cross-dash': CrossDash,
    'dot': Dot,
    'dot-dash': DotDash,
    'disc': Disc,
    'ring': Ring,
    'line': Line,
    'line-vertical': VerticalLine,
    'weave': Weave,
    'zigzag': Zigzag,
    'zigzag-vertical': ZigzagVertical,
    'diagonal': Diagonal,
    'diagonal-right-left': DiagonalRightLeft,
    'square': Square,
    'box': Box,
    'triangle': Triangle,
    'triangle-inverted': TriangleVertical,
    'diamond': Diamond,
    'diamond-box': DiamondBox,
  };

  const deprecatedShapes = {
    'circle': shapes['disc'],
    'triangle-vertical': shapes['triangle-inverted'],
    'line-horizontal': shapes['line'],
    'line-diagonal-lr': shapes['diagonal'],
    'line-diagonal-rl': shapes['diagonal-right-left'],
    'zigzag-horizontal': shapes['zigzag'],
    'diamond-outline': shapes['diamond-box']
  };

  const completeShapesList = [];

  function getRandomShape(excludedShapeTypes = []) {
    const shapesList = Object.keys(shapes);

    excludedShapeTypes.forEach(shapeType => {
      shapesList.splice(shapesList.indexOf(shapeType), 1);
    });

    const randomIndex = Math.floor(Math.random() * shapesList.length);

    return shapesList[randomIndex];
  }

  Object.assign(completeShapesList, shapes, deprecatedShapes);

  function draw (
    shapeType = 'square',
    backgroundColor,
    patternColor,
    size
  ) {
    const patternCanvas = document.createElement('canvas');
    const patternContext = patternCanvas.getContext('2d');
    const outerSize = size * 2;

    const Shape = completeShapesList[shapeType];
    const shape = new Shape(size, backgroundColor, patternColor);

    const pattern = patternContext.createPattern(shape.drawTile(), 'repeat');

    patternCanvas.width = outerSize;
    patternCanvas.height = outerSize;

    pattern.shapeType = shapeType;

    return pattern;
  }

  function generate(colorList) {
    let firstShapeType;
    let previousShapeType;

    return colorList.map((color, index, list) => {
      let shapeType;

      if (index === 0) {
        shapeType = getRandomShape();
        previousShapeType = shapeType;
        firstShapeType = previousShapeType;
      } else if (index === list.length - 1) {
        shapeType = getRandomShape([previousShapeType, firstShapeType]);
      } else {
        shapeType = getRandomShape([previousShapeType]);
        previousShapeType = shapeType;
      }

      return draw(shapeType, color);
    });
  }

  const pattern = {
    draw,
    generate
  };

  return pattern;

}));
//# sourceMappingURL=patternomaly.js.map
