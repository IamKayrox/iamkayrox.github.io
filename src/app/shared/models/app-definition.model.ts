import { Type } from "@angular/core";
import { Vector2D } from "./vector2d.model";

export type AppDefinition<T = any> = AppDataDefinition<T> & InstanceDefinition;

type AppDataDefinition<T> = {
    title: string;
    initialSize?: Vector2D;
    component: Type<T>;
    canClose?: boolean;
    canMinimise?: boolean;
}

type InstanceDefinition = MultiInstanceAppDefinition | SingleInstanceAppDefinition;

type MultiInstanceAppDefinition = {
    name?: string;
    singleInstance?: false;
}

type SingleInstanceAppDefinition =  {
    name: string;
    singleInstance: true;
}