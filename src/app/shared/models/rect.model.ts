import { Vector2D } from "./vector2d.model";

export class Rect {
    constructor();
    constructor(x: number, y: number);
    constructor(x: number, y: number, w: number, h: number)
    constructor(
        public x = 0,
        public y = 0,
        public w = 0,
        public h = 0,
    ) {}

    isInside(vector: Vector2D):boolean;
    isInside(x: number, y: number): boolean;
    // isInside(rect: Rect, allowPartial?: boolean): boolean
    isInside(arg0: Vector2D | number, arg1?: number): boolean {
        if(arg0 instanceof Vector2D) {
            const rVector = arg0.relativeTo(this.x, this.y);
            return rVector.x >= 0 && rVector.y >= 0 && rVector.x <= this.x + this.w && rVector.y <= this.y + this.h;
        }
        else {
            return this.isInside(new Vector2D(arg0, arg1));
        }
    }

    get topLeftCorner() {
        return new Vector2D(this.x, this.y);
    }

    get topRightCorner() {
        return new Vector2D(this.x + this.w, this.y);
    }

    get bottonLeftCorner() {
        return new Vector2D(this.x, this.y + this.h);
    }

    get bottonRightCorner() {
        return new Vector2D(this.x + this.w, this.y + this.h);
    }
} 