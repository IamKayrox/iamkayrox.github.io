import { Type } from "@angular/core";
import { Rect } from "src/app/shared/models/rect.model";
import { Vector2D } from "src/app/shared/models/vector2d.model";
import { RectConfig } from "./rect-config";

export interface AppDescriptor<T> {
    handle: string;
    name: string;
    unique?: boolean;
    defaultRect?: RectConfig;
    minimumSize?: Vector2D;
    component: Type<T>;
    icon?: string;
    allowResize?: boolean;
    actionsButtons?: {
        close?: boolean;
        minize?: boolean;
    }
}