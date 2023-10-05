import { Plane } from "./plane";

export class Vector {
  constructor(public x: number, public y: number, public plane: Plane) {
    this.x = x;
    this.y = y;
    this.plane = plane;
  }
  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y, this.plane);
  }
  scaleBy(k: number) {
    return new Vector(this.x * k, this.y * k, this.plane);
  }
  magnitude() {
    return Math.hypot(this.x, this.y);
  }
  normalized() {
    return this.scaleBy(1 / this.magnitude());
  }
  negate() {
    return this.scaleBy(-1);
  }
  // vector from v to this
  subtract(v: Vector) {
    return this.add(v.negate());
  }
  distance(v: Vector) {
    return this.subtract(v).negate().magnitude();
  }
  dotProduct(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }
  scalarProjection(v: Vector) {
    return this.normalized().dotProduct(v);
  }
  vectorProjection(v: Vector) {
    return this.normalized().scaleBy(this.scalarProjection(v));
  }
  // angle(v: Vector) {
  //   return Math.acos(this.normalized().dotProduct(v.normalized()));
  // }
  angle() {
    return Math.atan2(this.y, this.x);
  }
  angleWith(v = new Vector(1, 0, this.plane)) {
    return Math.atan2(this.y, this.x) - Math.atan2(v.y, v.x);
  }
  rotate(angle: number) {
    return new Vector(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle),
      this.plane
    );
  }
  translate(x: number, y: number) {
    return new Vector(this.x + x, this.y + y, this.plane);
  }
  drawPoint(ctx: CanvasRenderingContext2D, color = "red", size = 10) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
  drawArrow(
    ctx: CanvasRenderingContext2D,
    color = "red",
    v = new Vector(0, 0, this.plane)
  ) {
    const size = 15;
    ctx.save();
    ctx.translate(v.x, v.y);
    // this.plane.createTransform(
    //   this.plane.offset.x + v.x,
    //   this.plane.offset.y + v.y,
    //   1,
    //   0,
    //   ctx
    // );
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.setLineDash([]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = color;
    ctx.stroke();

    const v1 = this.add(
      this.rotate(Math.PI * 0.8)
        .normalized()
        .scaleBy(size)
    );

    const v2 = this.add(
      this.rotate(-Math.PI * 0.8)
        .normalized()
        .scaleBy(size)
    );

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
}
