import { Axes } from "./axes";
import { Vector } from "./vector";

export class Plane {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  vectorA: Vector;
  vectorB: Vector;
  origin: Vector = new Vector(0, 0, this);
  offset: { x: number; y: number };
  axes: Axes;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.offset = { x: this.width / 2, y: this.height / 2 };
    this.vectorA = new Vector(this.width / 4, this.height / 4, this);
    // this.vectorB = new Vector(-this.width / 8, -this.height / 8, this);
    this.vectorB = new Vector(20, 50, this);
    this.axes = new Axes(this);
  }
  createTransform(
    originX: number,
    originY: number,
    scale: number,
    rotate: number,
    ctx: CanvasRenderingContext2D
  ) {
    const xAxisX = Math.cos(rotate) * scale;
    const xAxisY = Math.sin(rotate) * scale;
    ctx.setTransform(xAxisX, xAxisY, -xAxisY, xAxisX, originX, originY);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.offset.x, this.offset.y);
    // this.createTransform(this.offset.x, this.offset.y, 1, 0, ctx);
    ctx.clearRect(
      -this.offset.x,
      -this.offset.y,
      ctx.canvas.width,
      ctx.canvas.height
    );

    this.axes.draw(ctx);

    this.vectorA.drawArrow(ctx);
    this.vectorB.drawArrow(ctx);
    const sum = this.vectorA.add(this.vectorB);
    sum.drawArrow(ctx, "yellow");
    const difference = this.vectorA.subtract(this.vectorB);
    difference.drawArrow(ctx, "blue");
    ctx.restore();
  }
}
