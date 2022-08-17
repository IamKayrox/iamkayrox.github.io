import { SimpleChange } from "@angular/core"

export type CustomChanges<T> = {
    [k in keyof T]?: SimpleChange;
}