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

// let TAU = 6.28318530718;

// let dateStart = new Date();

// function time(){
// 	let dateNow = new Date();
// 	let diffMs = dateNow - dateStart;
// 	return diffMs / 1000; // return in seconds
// }

// function isNumber(v){ return typeof(v) == "number"; }
// function isVector(v){ return v instanceof Vector2; }

// // float functions
// Number.prototype.clamp = function(min = 0, max = 1) {
// 	return Math.min(Math.max(this, min), max);
// }
// Number.prototype.lerp   = function( a, b ) {
// 	return a*(1-this)+b*this;
// }
// Number.prototype.invLerp = function( a, b ) {
// 	return (this-a)/(b-a);
// }
// Number.prototype.within = function(min, max) {
// 	return this >= Math.min(min,max) && this <= Math.max(min,max);
// }
// Number.prototype.radToDeg = function() { return this*360/TAU; }
// Number.prototype.sign = function() { return Math.sign(this); }

// // math functions
// Math.lerp    = ( a, b, t ) => { return a*(1-t)+b*t; }
// Math.invLerp = ( a, b, v ) => { return (v-a)/(b-a); }
// Math.remap = ( iMin, iMax, oMin, oMax, value ) => { return Math.lerp(oMin, oMax, Math.invLerp(iMin, iMax, value)); }

// Number.prototype.remapClamped = function(iMin, iMax, oMin, oMax ) {
// 	return Math.lerp(oMin, oMax, Math.invLerp(iMin, iMax, this).clamp());
// }
// Number.prototype.remap = function(iMin, iMax, oMin, oMax) {
// 	return Math.lerp(oMin, oMax, Math.invLerp(iMin, iMax, this) );
// }

// // colors
// class Colors{
// 	static white = "#ffffff";
// 	static whiteFaded = "#ffffff55";

// 	static black = "#000000";

// 	static fRed = "#ff1155";
// 	static fRedFaded = "#ff115555";

// 	static fBlue = "#33bbff";
// 	static fBlueFaded = "#33bbff55";

// 	static fGreen = "#11ffaa";
// 	static fGreenFaded = "#11ffaa55";

// 	static fYellow = "#ffdd55";
// 	static fYellowFaded = "#ffdd5555";

// 	static fBg = "#0f1720";
// }

// // vectors
// class Vector2{

// 	static zero = new Vector2(0,0);

// 	constructor(x,y){
// 		this.x = x;
// 		this.y = y;
// 	}

// 	valueOf() { throw "pls no convert vec2 to number"; }
// 	copy() { return new Vector2( this.x, this.y ); }

// 	div( v ){
// 		if( isVector(v) ) return new Vector2( this.x/v.x, this.y/v.y );
// 		if( isNumber(v) ) return new Vector2( this.x/v, this.y/v );
// 		throw "invalid type";
// 	}

// 	mul( v ){
// 		if( isVector(v) ) return new Vector2( this.x*v.x, this.y*v.y );
// 		if( isNumber(v) ) return new Vector2( this.x*v, this.y*v );
// 		throw "invalid type";
// 	}

// 	add( v ){
// 		if( isVector(v) ) return new Vector2( this.x+v.x, this.y+v.y );
// 		if( isNumber(v) ) return new Vector2( this.x+v, this.y+v );
// 		throw "invalid type";
// 	}

// 	sub( v ){
// 		if( isVector(v) ) return new Vector2( this.x-v.x, this.y-v.y );
// 		if( isNumber(v) ) return new Vector2( this.x-v, this.y-v );
// 		throw "invalid type";
// 	}

// 	static dot( a, b ){ 		return a.x*b.x+a.y*b.y; }
// 	static det( a, b ){ 		return a.x*b.y-a.y*b.x; }
// 	static distance( a, b ){	return a.sub(b).length(); }
// 	static angToDir( a ){ 		return new Vector2( Math.cos(a), Math.sin(a) ); }
// 	static dirToAng( v ){ 		return Math.atan2(v.y, v.x); }
// 	static lerp( a, b, t ){		return a.mul(1-t).add(b.mul(t)); }
// 	static angBetween( a, b ){	return Math.acos(Vector2.dot(a.normalized(), b.normalized()).clamp(-1,1)); }
// 	static clampMagnitude( v, m ){
// 		let mSq = m*m;
// 		let vSq = Vector2.dot(v,v);
// 		if(vSq > mSq){
// 			let vMag = Math.sqrt(vSq);
// 			let sc = m / vMag;
// 			return new Vector2(v.x*sc, v.y*sc);
// 		}
// 		return v;
// 	}

// 	// component-wise math
// 	abs(){			return new Vector2(Math.abs(this.x),Math.abs(this.y)); }
// 	round(){		return new Vector2(Math.round(this.x),Math.round(this.y)); }
// 	floor(){		return new Vector2(Math.floor(this.x),Math.floor(this.y)); }
// 	ceil(){			return new Vector2(Math.ceil(this.x),Math.ceil(this.y)); }
// 	min(){ 			return Math.min( this.x, this.y ); }
// 	max(){ 			return Math.max( this.x, this.y ); }

// 	// swizzles & ortho rotations
// 	yx(){ 			return new Vector2( this.y,  this.x ); }
// 	rot90CW(){ 		return new Vector2( this.y, -this.x ); }
// 	rot90CCW(){ 	return new Vector2(-this.y,  this.x ); }
// 	negate(){ 		return new Vector2(-this.x, -this.y ); }

// 	// lengths & projections
// 	length(){ 			return Math.sqrt( Vector2.dot(this,this) ); }
// 	normalized(){		return this.div(this.length()); }
// 	addLength( n ){
// 		let lenCurr = this.length();
// 		let lenTarget = lenCurr + n;
// 		return this.mul(lenTarget/lenCurr);
// 	}
// 	projectToLineSegment( a, b ) { return this.sub(a).vectorProjectToClamped(b.sub(a)).add(a); }
// 	vectorProjectTo( n ){	return n.mul(this.scalarProjectTo(n)); }
// 	vectorProjectToClamped( n ){	return n.mul(this.scalarProjectTo(n).clamp(0,1)); }
// 	scalarProjectTo( n ){	return Vector2.dot(this,n)/Vector2.dot(n,n); }
// 	reflectAround( n ){ 	return n.mul(this.scalarProjectTo(n)*2).sub(this);}
// 	to( v ){ 				return v.sub(this); }
// 	distanceToLineSegment( a, b ) {
// 		let ab = a.to(b);
// 		let t = a.to(this).scalarProjectTo( ab ).clamp(0,1);
// 		let lSegPt = Vector2.lerp(a,b,t);
// 		return Vector2.distance( lSegPt, this );
// 	}

// 	// angles & rotations
// 	angle(){ return Vector2.dirToAng(this); }
// 	rotateAround( p, a ){ return this.sub(p).rotate(a).add(p); }
// 	rotate( a ) {
// 		let v = Vector2.angToDir(a).yx();
// 		return new Vector2( Vector2.det(this,v), Vector2.dot(this,v) );
// 	}

// }
