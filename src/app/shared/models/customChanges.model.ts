import { SimpleChange, SimpleChanges } from "@angular/core"

export type CustomChanges<T> = {
    [P in keyof T]?: CustomChage<T[P]>;
}

export class CustomChage<T> extends SimpleChange {
    constructor(
        public override previousValue: T,
        public override currentValue: T, 
        firstChange: boolean,
    ) {
        super(previousValue, currentValue, firstChange)
    }
}