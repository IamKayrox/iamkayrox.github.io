export class Vector2D {
    constructor(
        public x: number = 0,
        public y: number = 0,
    ) { }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}