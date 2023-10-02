import { Plane } from "./plane";

export class Axes {
  plane: Plane;
  constructor(plane: Plane) {
    this.plane = plane;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(-this.plane.offset.x, 0);
    ctx.lineTo(this.plane.width - this.plane.offset.x, 0);
    ctx.moveTo(0, -this.plane.offset.y);
    ctx.lineTo(0, this.plane.height - this.plane.offset.y);
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
}
