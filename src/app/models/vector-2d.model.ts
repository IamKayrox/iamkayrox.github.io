import { assertHasProperty, assertNumber, assertObject } from "../utils/assertion.util";

export interface IVector2D {
  readonly x: number;
  readonly y: number;
}

export function assertIVector2D(value: unknown, msg = "Expected value to be an IVector2D"): asserts value is IVector2D {
  assertObject(value, msg);
  assertHasProperty(value, "x", msg);
  assertNumber(value.x, msg);
  assertHasProperty(value, "y", msg);
  assertNumber(value.y, msg);
}

export class ReadonlyVector2D implements IVector2D {
  protected _x: number;
  protected _y: number;

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }
  
  public get width(): number {
    return this.x;
  }

  public get height(): number {
    return this.y;
  }

  public get length(): number {
    return Math.hypot(this.x, this.y);
  }

  public constructor();
  public constructor(other: IVector2D);
  public constructor(x: number, y: number);
  public constructor(otherOrX: IVector2D | number = 0, y = 0) {
    if (typeof otherOrX === 'number') {
      this._x = otherOrX;
      this._y = y;
    } else {
      this._x = otherOrX.x;
      this._y = otherOrX.y;
    }
  }

  public serialize(): IVector2D {
    return {
      x: this.x,
      y: this.y,
    }
  }

  public dot(other: IVector2D): number {
    return this.x * other.x + this.y * other.y;
  }

  public static equal(a: IVector2D, b: IVector2D) {
    return a.x === b.x && a.y === b.y;
  }
}

export class Vector2D extends ReadonlyVector2D {
  public override get x(): number {
    return super.x;
  }

  public override set x(value: number) {
    this._x = value;
  }

  public override get y(): number {
    return super.y;
  }

  public override set y(value: number) {
    this._y = value;
  }
  
  public override get width(): number {
    return super.width;
  }

  public override set width(value: number) {
    this._x = value;
  }

  public override get height(): number {
    return super.height;
  }

  public override set height(value: number) {
    this._y = value;
  }

  public add(other: IVector2D): Vector2D {
    this._x += other.x;
    this._y += other.y;
    return this;
  }

  public subtract(other: IVector2D): Vector2D {
    this._x -= other.x;
    this._y -= other.y;
    return this;
  }

  public scale(factor: number): Vector2D {
    this._x *= factor;
    this._y *= factor;
    return this;
  }

  public asReadonly(): ReadonlyVector2D {
    return new ReadonlyVector2D(this._x, this._y);
  }
}