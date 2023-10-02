import { Plane } from "./plane";

export class Vector {
  constructor(public x: number, public y: number, public plane: Plane) {
    this.x = x;
    this.y = y;
    this.plane = plane;
  }
  magnitude() {
    return Math.hypot(this.x, this.y);
  }
  normalized() {
    const magnitude = this.magnitude();
    return new Vector(this.x / magnitude, this.y / magnitude, this.plane);
  }
  dotProduct(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }
  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y, this.plane);
  }
  // vector from v to this
  subtract(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y, this.plane);
  }
  scaleBy(k: number) {
    return new Vector(this.x * k, this.y * k, this.plane);
  }
  negate() {
    return this.scaleBy(-1);
  }
  scalarProjection(v: Vector) {
    return this.normalized().dotProduct(v);
  }
  vectorProjection(v: Vector) {
    return this.normalized().scaleBy(this.scalarProjection(v));
  }
  angle(v: Vector) {
    return Math.acos(this.normalized().dotProduct(v.normalized()));
  }
  distance(v: Vector) {
    return this.subtract(v).magnitude();
  }
  drawPoint(ctx: CanvasRenderingContext2D, color = "red", size = 10) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
  drawArrow(ctx: CanvasRenderingContext2D, color = "red", size = 50) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}
