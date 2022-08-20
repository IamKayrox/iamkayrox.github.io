import { Type } from "@angular/core";
import { Rect } from "src/app/shared/models/rect.model";
import { RectConfig } from "./rect-config";

export interface AppDescriptor<T> {
    handle: string;
    name: string;
    unique?: boolean;
    defaultRect?: RectConfig;
    component: Type<T>;
    icon?: string;
    allowResize?: boolean;
}