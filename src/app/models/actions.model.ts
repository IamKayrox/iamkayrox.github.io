import { Type } from "@angular/core";
import { ReadonlyVector2D } from "./vector-2d.model";

export enum ActionType {
  Web = "web-action",
  Component = "component-action",
}

export interface BaseAction {
  title: string;
  defaultWindowSize: ReadonlyVector2D;
}

export interface WebAction extends BaseAction {
  type: ActionType.Web;
  url: string;
}

export interface ComponentAction extends BaseAction {
  type: ActionType.Component;
  component: Type<unknown>;
}

export type Action = WebAction | ComponentAction;
