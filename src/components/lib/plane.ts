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
    this.vectorB = new Vector(-this.width / 8, -this.height / 8, this);
    this.axes = new Axes(this);
    // this.#addEventListeners();
  }
  #addEventListeners() {
    this.canvas.addEventListener("mousemove", (e) => {
      console.log(e);
      this.vectorA.x = e.clientX - this.offset.x;
      this.vectorA.y = e.clientY - this.offset.y;
    });
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.offset.x, this.offset.y);

    this.axes.draw(ctx);

    this.vectorA.drawPoint(ctx);
    this.vectorA.drawArrow(ctx);
    // if (this.vectorA.magnitude() > 100) {
    //   this.vectorA.drawArrow(ctx);
    // } else {
    //   this.vectorA.drawArrow(ctx, "blue");
    // }
    this.vectorB.drawArrow(ctx, "blue");
    this.vectorB.drawPoint(ctx, "blue", 200);
    if (this.vectorA.distance(this.vectorB) > 100) {
      this.vectorB.drawPoint(ctx, "red", 200);
    }
    // const vectorC = this.vectorA.add(this.vectorB);
    // vectorC.normalized().scaleBy(30).drawArrow(ctx, "gray");
    // console.log(
    //   this.vectorA.normalized().dotProduct(this.vectorB.normalized())
    // );
    // this.vectorA.normalized().drawArrow(ctx, "blue");
    // const vectorProj = this.vectorB.vectorProjection(this.vectorA);
    // vectorProj.drawPoint(ctx);
    // const aNorm = this.vectorA.normalized();
    // aNorm.draw(ctx);
    // this.origin.drawPoint(ctx);
    ctx.restore();
  }
}
