import { assertHasProperty, assertNumber, assertObject } from "../utils/assertion.util";
import { assertIVector2D, IVector2D, ReadonlyVector2D, Vector2D } from "./vector-2d.model";

export interface IRect2D {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export function assertIRect2D(value: unknown, msg = "Expected value to be an IRect2D"): asserts value is IRect2D {
  assertObject(value, msg);
  assertHasProperty(value, "x", msg);
  assertNumber(value.x, msg);
  assertHasProperty(value, "y", msg);
  assertNumber(value.y, msg);
  assertHasProperty(value, "width", msg);
  assertNumber(value.width, msg);
  assertHasProperty(value, "height");
  assertNumber(value.height);
}

export class ReadonlyRect2D implements IRect2D {
  protected _position: Vector2D;
  protected _size: Vector2D;
  
  public get x() {
    return this._position.x;
  }

  public get y() {
    return this._position.y;
  }

  public get position() {
    return this._position.asReadonly();
  }

  public get width() {
    return this._size.width;
  }

  public get height() {
    return this._size.height;
  }

  public get size() {
    return this._size.asReadonly();
  }

  public get center() {
    return new ReadonlyVector2D(this._position.x + this._size.width / 2, this._position.y + this._size.height / 2);
  }

  public get positionEnd() {
    return new ReadonlyVector2D(this._position.x + this._size.width, this._position.y + this._size.width);
  }

  public get area() {
    return this.size.width * this.size.height;
  }

  public constructor();
  public constructor(other: IRect2D);
  public constructor(position: IVector2D, size: IVector2D);
  public constructor(x: number, y: number, width: number, height: number);
  public constructor(otherOrPositionOrX?: IRect2D | IVector2D | number, sizeOrY?: IVector2D | number, width?: number, height?: number) {
    this._position = new Vector2D();
    this._size = new Vector2D();
    if (width !== undefined && height !== undefined) {
      assertNumber(otherOrPositionOrX);
      assertNumber(sizeOrY);
      this._position.x = otherOrPositionOrX;
      this._position.y = sizeOrY;
      this._size.width = width;
      this._size.height = height;
    } else if (sizeOrY !== undefined) {
      assertIVector2D(otherOrPositionOrX);
      assertIVector2D(sizeOrY);
      this._position.x = otherOrPositionOrX.x;
      this._position.y = otherOrPositionOrX.y;
      this._size.x = sizeOrY.x;
      this._size.y = sizeOrY.y;
    } else if (otherOrPositionOrX !== undefined) {
      assertIRect2D(otherOrPositionOrX);
      this._position.x = otherOrPositionOrX.x;
      this._position.y = otherOrPositionOrX.y;
      this._size.width = otherOrPositionOrX.width;
      this._size.height = otherOrPositionOrX.height;
    }
  }

  public intersectsVertically(other: IRect2D): boolean {
    return this.y < other.y + other.height && other.y < this.y + this.height;
  }

  public intersectsHorizontally(other: IRect2D): boolean {
    return this.x < other.x + other.width && other.x < this.x + this.width;
  }

  public intersects(other: IRect2D): boolean {
    return this.intersectsHorizontally(other) && this.intersectsVertically(other);
  }

  public serialize(): IRect2D {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
  }

  public toString() {
    return `{ x: ${this._position.x}, y: ${this._position.y}, width: ${this._size.width}, height: ${this._size.height} }`;
  }

  public static equal(a: IRect2D, b: IRect2D) {
    console.log(`Comparing:\nA =${a}\nB = ${b}`);
    return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
  }
}

export class Rect2D extends ReadonlyRect2D {
  public override get x() {
    return super.x;
  }

  public override set x(value: number) {
    this._position.x = value;
  }

  public override get y() {
    return super.y;
  }

  public override set y(value: number) {
    this._position.y = value;
  }

  public override get position() {
    return super.position;
  }

  public override set position(value: ReadonlyVector2D) {
    this._position.x = value.x;
    this._position.y = value.y;
  }

  public override get width() {
    return super.width;
  }

  public override set width(value: number) {
    this._size.width = value;
  }

  public override get height() {
    return super.height;
  }

  public override set height(value: number) {
    this._size.height = value;
  }

  public override get size() {
    return super.size;
  }

  public override set size(value: ReadonlyVector2D) {
    this._size.width = value.width;
    this._size.height = value.height;
  }

  public override get center() {
    return super.center;
  }

  public override set center(value: ReadonlyVector2D) {
    this._position.x = value.x - this._size.x / 2;
    this._position.y = value.y - this._size.y / 2;
  }

  public override get positionEnd() {
    return super.positionEnd;
  }

  public override set positionEnd(value: ReadonlyVector2D) {
    if (this._position.x > value.x) {
      this._size.width = this._position.x - value.x;
      this._size.height = this._position.y - value.y;
      this._position.x = value.x;
      this._position.y = value.y;
    } else {
      this._size.width = value.x - this._position.x;
      this._size.height = value.y - this._position.y;
    }
  }
}