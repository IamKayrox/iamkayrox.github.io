export class Vector2D {
    constructor(
        public x: number = 0,
        public y: number = 0,
    ) { }

    relativeTo(vector: Vector2D): Vector2D;
    relativeTo(x: number, y: number): Vector2D;
    relativeTo(arg0: number | Vector2D, arg1?: number): Vector2D {
        let vector: Vector2D;
        if(arg0 instanceof Vector2D)
            vector = arg0;
        else
            vector = new Vector2D(arg0, arg1);
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    get w() {
        return this.x;
    }

    set w(val: number) {
        this.x = val;
    }

    get h() {
        return this.y;
    }

    set h(val: number) {
        this.y = val;
    }


    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}